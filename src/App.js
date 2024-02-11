import logo from './logo.svg';
import './App.css';
import Tracklist from './Component/Tracklist';
import SearchBar from './Component/SearchBar';
import { useState } from 'react';
import FetchApi from './Component/FetchApi';

function App() {

  const [q, newQ] = useState("");
  const [token, setToken] = useState("");
  const [songs, setSongs] = useState([]);

  const addNewSong = (newSong) => {
    setSongs(currentSongs => [...currentSongs, newSong]);
  }

  const removeSong = (songIdToRemove) => {
    setSongs(currentSongs => currentSongs.filter(song => song.id !== songIdToRemove.id));
  }
  const handleTokenChange = (paramToken) => {
    setToken(paramToken);
  }

  const setQValue = (query) => {
    newQ(query);
  }

  return (
    <>
      <header>
        <div className='text-white'>
          <FetchApi handleTokenChange={handleTokenChange} />
        </div>
        <SearchBar setQ={setQValue} />
      </header>
      <main>
        <Tracklist q={q} token={token} songs={songs} add={addNewSong} remove={removeSong}/>
        {token && (token)}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
