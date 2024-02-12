import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SearchResults({ q, token, add }) {
    const [tracks, setTracks] = useState([]);

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
                setTracks(response.data.tracks.items); // Store the array of track objects
                console.log(response.data.tracks.items)
            } catch (error) {
                console.error('Error connecting to Spotify:', error.response || error);
            }
        };

        searchApi();
    }, [q, token]);

    // No need to filter on the client side if q is the query used in the API request
    // The API already returns filtered search results based on q

    return (
        <div className="main">
            <ul>
                {tracks.map((track) => (
                    <li key={track.id}>
                        <button onClick={() => add(track)}> {/* Updated this line */}
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
