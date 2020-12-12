import React, { useState } from "react";

const IMAGE_API = "https://image.tmdb.org/t/p/w500/";

const setVoteClas = (vote) => {
  if (vote >= 7) {
    return "good";
  } else if (vote >= 5) {
    return "average";
  } else {
    return "bad";
  }
};

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
let genreName = "Unknown";
const getGenreName = (genre_ids) => {
  const id = genre_ids[0];
  const name = genreList[id];
  if (name === undefined) {
    genreName = "Unknown";
  } else {
    genreName = name;
  }
};
const MovieComponent = ({
  title,
  overview,
  poster_path,
  vote_average,
  genre_ids
}) => (
  <div className="movie">
    <img
      src={
        poster_path
          ? IMAGE_API + poster_path
          : "https://i.ibb.co/Zgf4Fnn/Binge-Watch.png"
      }
      alt={title}
    />
    <div className="movie-title">
      <p>{title}</p>
    </div>
    <div className="movie-info">
      <span className="movie-genre">
        {(getGenreName(genre_ids), genreName)}
      </span>
      <span className={`tag ${setVoteClas(vote_average)}`}>{vote_average}</span>
    </div>
    <div className="movie-overview">
      <h2>Overview</h2>
      <p>{overview}</p>
    </div>
  </div>
);

export default MovieComponent;
