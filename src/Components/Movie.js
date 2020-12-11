import React from "react";

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
const MovieComponent = ({ title, overview, poster_path, vote_average }) => (
  <div className="movie">
    <img
      src={
        poster_path
          ? IMAGE_API + poster_path
          : "https://i.ibb.co/Zgf4Fnn/Binge-Watch.png"
      }
      alt={title}
    />
    <div className="movie-info">
      <p>{title}</p>
      <span className={`tag ${setVoteClas(vote_average)}`}>{vote_average}</span>
    </div>
    <div className="movie-overview">
      <h2>Overview</h2>
      <p>{overview}</p>
    </div>
  </div>
);

export default MovieComponent;
