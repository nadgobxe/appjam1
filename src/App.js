import logo from './logo.svg';
import './App.css';
import Tracklist from './Component/Tracklist';
import SearchBar from './Component/SearchBar';
import FetchApi from './Component/FetchApi';
import { useState } from 'react';

function App() {

  const [q, newQ] = useState("")

  const  setQValue = (query) => {
      newQ(query);
  } 

  return (
<>
<header>

<SearchBar setQ={setQValue} />
<FetchApi />
</header>
<main>
<Tracklist q={q} />
</main>
<footer></footer>
</>
  );
}

export default App;
