import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './Components/Header';
import { DisplayComponent } from './Components/DisplayComponent';

function App() {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState({});
  const [episodes, setEpisodes] = useState({});
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Fetching details of 20 characters at once using the page no.
  const getAllCharacters = async () => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    const data = await res.json();
    setCharacters((prev) => [...prev, ...data.results]);
  }

  //Fetching all the locations at once 
  const getAllLocation = async () => {
    let allLocations = [];
    let nextPage = 1;
    let totalPages = 1;

    while (nextPage <= totalPages) {
      const res = await fetch(`https://rickandmortyapi.com/api/location?page=${nextPage}`);
      const data = await res.json();
      allLocations = [...allLocations, ...data.results];
      totalPages = data.info.pages;
      nextPage++;
    }

    let locationMap = {};
    allLocations.forEach((loc) => {
      locationMap = { ...locationMap, [loc.name]: loc };
    })
    setLocations((prev) => ({ ...prev, ...locationMap }));
  };

  //Fetching all the episodes at once
  const getAllEpisode = async () => {
    let allEpisodes = [];
    let nextPage = 1;
    let totalPages = 1;

    while (nextPage <= totalPages) {
      const res = await fetch(`https://rickandmortyapi.com/api/episode?page=${nextPage}`);
      const data = await res.json();

      allEpisodes = [...allEpisodes, ...data.results];
      totalPages = data.info.pages;
      nextPage++;
    }
    let episodeMap = {};
    allEpisodes.forEach((ep) => {
      episodeMap = { ...episodeMap, [ep.id]: ep };
    })
    setEpisodes(episodeMap);
  };

  // Updating the page count once scroller hit the bottom/ reached at the end of page.
  const handleInfiniteScroll = async () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPage((prev) => (prev + 1));
    }
  }

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      getAllCharacters();
    } // eslint-disable-next-line
  }, [isInitialRender, page]);

  useEffect(() => {
    getAllEpisode();
    getAllLocation();
  }, []);

  // For infinite scrolling
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  

  return (
    <>
      <Header />
      <DisplayComponent characterInfo={characters} episodes={episodes} locations={locations} />
    </>
  );
}

export default App;
