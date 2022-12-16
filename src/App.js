import React, { useEffect, useState } from "react";
import Card from "./Card.js";
import Loading from "./Loading.js";

import logo from "./assets/logo.png";

const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

const App = () => {
  // state values
  const [loading, setLoading] = useState(true);
  const [recentMovies, setRecentMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);

  // function to fetch recent movies
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecentMovies(data.results);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  //function to fetch movies based n search query
  const fetchSearchedMovies = async (value) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${value}`
      );
      const data = await response.json();
      setSearchedMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    // Implement the search functionality
    e.preventDefault();
    setQuery(e.target.value);
    if (e.target.value === "") {
      setSearchedMovies(recentMovies);
      return;
    }
    fetchSearchedMovies(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }
  if (searchedMovies.length === 0) {
    setSearchedMovies(recentMovies);
  }
  return (
    <div className="container">
      {/* Navbar */}
      <header className="header">
        <img src={logo} alt="logo" className="logo" />
        <div>
          <input
            type="text"
            placeholder="Search for a movie"
            value={query}
            onChange={onChange}
          ></input>
        </div>
      </header>
      <h1>Most Recent Movies</h1>
      {/* Movies Container */}
      <div className="movies">
        {searchedMovies.map((movie) => {
          const {
            id,
            backdrop_path: image,
            original_title: title,
            vote_average: rating,
            release_date,
            vote_count,
            overview,
          } = movie;
          return (
            <Card
              key={id}
              image={image ? image : "default"}
              title={title}
              rating={rating}
              release_date={release_date}
              vote_count={vote_count}
              overview={overview}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
