//
import React from "react";
import "./styles.css";
import MovieComponent from "./Components/Movie";
import { useEffect, useState } from "react";

export default function App() {
  let SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?api_key=968a6cce98ad094cf7b4d6ceb3e74f7c&language=en-US&query=";
  let FEATURED_API =
    "https://api.themoviedb.org/3/discover/movie?api_key=968a6cce98ad094cf7b4d6ceb3e74f7c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=2";
 
    const [movies, setMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovie(data.results);
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (searchTerm) {
      let searchQuery = SEARCH_API + searchTerm;
      getMovies(searchQuery);
      setSearchTerm("");
    }
  };

  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <nav>
        <h1 className="brand-name">Binge Watch</h1>
      </nav>
      <header>
        <form onSubmit={onSubmitHandler}>
          <input
            type="search"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={onChangeHandler}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.map((item) => (
          <MovieComponent key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
