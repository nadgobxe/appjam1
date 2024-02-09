import React from "react";
import datas from "./dataFeed"

export default function SearchResults({q}) {

        const filteredSongs = datas.filter((song) => {
        // Convert both search query and song properties to lowercase for case-insensitive comparison
        const queryLower = q.toLowerCase();
        const songNameLower = song.songName.toLowerCase();
        const artistLower = song.artist.toLowerCase();

        // Check if the song name or artist includes the search query
        return songNameLower.includes(queryLower) || artistLower.includes(queryLower);
    });

    return (
        <>
            <div className="main">
                <ul>
                    {filteredSongs.map((song) => (
                        <li key={song.id}>
                            <div className="loader">
                                <div className="song">
                                    <p className="name">{song.songName}</p>
                                    <p className="artist">{song.artist}</p>
                                </div>
                                <div class="albumcover"><img src={song.src} alt={song.songName} /></div>
                                <div class="play"></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}