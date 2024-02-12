import React from "react";
import Track from "./Track";
import SearchResults from "./SearchResults";

export default function Tracklist({q, token, songs, add, remove}) {
  return (
    <>
      <div className="flexMe">

          <Track tracks={songs} remove={remove} token={token}/>
          <SearchResults q={q} token={token} add={add} songs={songs}/>
      </div>
    </>
  );
}
