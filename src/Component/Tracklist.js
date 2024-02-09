import React from "react";
import Track from "./Track";
import SearchResults from "./SearchResults";

export default function Tracklist({q}) {
  return (
    <>
      <div className="flexMe">

          <Track />
          <SearchResults q={q} />
      </div>
    </>
  );
}
