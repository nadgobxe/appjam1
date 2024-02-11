import React from "react";

export default function Track({ tracks, remove }) {

  return (
    <>
      <div className="main">
        <ul>
          {tracks.map((track) => (
            <li key={track.id}>
              <button onClick={() => remove(track)}> {/* Updated this line */}
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
    </>
  );
}
