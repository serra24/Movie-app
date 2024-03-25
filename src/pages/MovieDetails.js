import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axiosInstance";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    axios.get(`/movie/${id}`).then((response) => {
      setMovieDetails(response.data);
    });
  }, [id]);

  return (
    <div className="container mt-4 text-center" style={{ minHeight: "400px" }}>
      <h2 className="mb-3">{movieDetails.title}</h2>
      <div className="row ">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="img-fluid rounded"
            style={{ maxWidth: "100%", height: "250px" }}
          />
        </div>
        <div>
          <p className="lead">{movieDetails.overview}</p>
          <p>
            <strong>Release Date:</strong> {movieDetails.release_date}
          </p>
          <p>
            <strong>Vote Average:</strong> {movieDetails.vote_average}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
