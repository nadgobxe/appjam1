import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FetchPlaylists({ token }) {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            if (!token) return; // Ensure there's a token

            try {
                const response = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log("Playlists fetched:", response.data);
                setPlaylists(response.data.items); // Assuming response.data.items contains the playlists
            } catch (error) {
                console.error('Error fetching the playlists:', error.response || error);
            }
        };

        fetchPlaylists();
    }, [token]); // Run when `token` changes

    return (
        <div>
            {playlists.map((playlist) => (
                <h1 key={playlist.id}>{playlist.name}</h1> // Make sure to return the element and use a key
            ))}
        </div>
    );
}
