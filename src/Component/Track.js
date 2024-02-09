import React from "react";
import datas from "./dataFeed"

export default function Track() {

  return (
    <>
       <div className="main">
      <ul>
        {datas.map((song) => (
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
  );
}
