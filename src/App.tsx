import { useState, useEffect } from "react";
import "./App.scss";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";


const API_URL = "http://www.omdbapi.com/?apikey=b1bf619a";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title: string) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Response === "True") {
      setMovies(data.Search);
    }
  };

  useEffect(() => {
    searchMovies("avengers");
  }, []);

  return (
    <div className="app">
      <h1>Movie Profiler</h1>
      <div className="search">
        <input
          type="text"
          className="search__input"
          value={searchTerm}
          placeholder="Search for a movie"
          onChange={(e) => {
            searchMovies(e.target.value);
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          className=""
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie: any, index: number) => (
            <MovieCard {...movie} key={index} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>There was no movies found or too many results!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
