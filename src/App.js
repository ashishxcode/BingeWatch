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
  let GENRE_API =
    "https://api.themoviedb.org/3/discover/movie?api_key=968a6cce98ad094cf7b4d6ceb3e74f7c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres";
  const genreList = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };

  const genreNameList = Object.values(genreList);

  const [movies, setMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.results);
      });
  };

  function genreClickHandler(item) {
    console.log(item);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (searchTerm) {
      let searchQuery = SEARCH_API + searchTerm;
      getMovies(searchQuery);
      setSearchTerm("");
    }
  };

  function getGenreKey(object, item) {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (object[prop] === item) {
          return prop;
        }
      }
    }
  }

  function genreClickHandler(item) {
    let KEY = getGenreKey(genreList, item);
    let genreQuery = `${GENRE_API}=${KEY}`;
    getMovies(genreQuery);
  }

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
      <div className="genres-container">
        {genreNameList.map((item) => {
          return (
            <span
              className="genre-span"
              key={item}
              onClick={() => genreClickHandler(item)}
            >
              {item}
            </span>
          );
        })}
      </div>
      <div className="movie-container">
        {movies.map((item) => (
          <MovieComponent key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
