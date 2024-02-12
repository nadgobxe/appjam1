import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SearchResults({ q, token, add, songs }) {
    const [tracks, setTracks] = useState([]);
    const [displayTracks, setDisplayTracks] = useState([]);


    useEffect(() => {
        const searchApi = async () => {
            if (!token || !q) return;

            try {
                const response = await axios.get(`https://api.spotify.com/v1/search`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        q: q,
                        type: 'track',
                        limit: 10
                    }
                });
                // Store the array of track objects
                setTracks(response.data.tracks.items);
                // Attempting to log .uri of undefined will cause an error. Removed for correction.
            } catch (error) {
                console.error('Error connecting to Spotify:', error.response || error);
            }
        };

        searchApi();
    }, [q, token]);

    useEffect(() => {
        // Filter tracks to exclude those that are already in songs
        const filteredTracks = tracks.filter(track => 
          !songs.some(song => song.uri === track.uri)
        );
        setDisplayTracks(filteredTracks);
      }, [tracks, songs]); // Re-run filter when tracks or songs change
    
      const handleAdd = (trackToAdd) => {
        add(trackToAdd); // Call the add function passed as prop
        // Optionally, filter displayTracks immediately without waiting for songs prop to update
        // setDisplayTracks(displayTracks.filter(track => track.id !== trackToAdd.id));
      };

    return (
        <div className="main">
            <ul>
                {displayTracks.map((track) => (
                    <li key={track.id}>
                        <button onClick={() => handleAdd(track)}>
                            <div className="loader">
                                <div className="song">
                                    <p className="name">{track.name}</p>
                                    <p className="artist">{track.artists.map(artist => artist.name).join(', ')}</p>
                                </div>
                                {track.album.images.length > 0 && (
                                    <div className="albumcover">
                                        <img src={track.album.images[0].url} alt={track.name} />
                                    </div>
                                )}
                                <div className="play"></div>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
