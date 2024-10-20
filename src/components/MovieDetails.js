// MovieDetails.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieDetails = () => {
  const location = useLocation();
  const { movie } = location.state || {};

  if (!movie) {
    return <p>No movie details available.</p>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}> {/* Centering with Flexbox */}
      <div className="card h-80" > {/* Set fixed dimensions */}
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
          className="card-img-top"
        //   style={{ height: '300px', objectFit: 'cover' }} // Set height and ensure image covers area
          alt={movie.Title}
        />
        <div className="card-body" style={{ padding: '5px' }}> {/* Adjust padding */}
          <h5 className="card-title" style={{ fontSize: '14px' }}>{movie.Title}</h5> {/* Adjust font size */}
          <p className="card-text" style={{ fontSize: '10px' }}><strong>Year:</strong> {movie.Year}</p> {/* Adjust font size */}
          <p className="card-text" style={{ fontSize: '10px' }}><strong>Type:</strong> {movie.Type}</p> {/* Adjust font size */}
          <p className="card-text" style={{ fontSize: '10px' }}><strong>IMDB ID:</strong> {movie.imdbID}</p> {/* Adjust font size */}
          <a href="/home" className="btn btn-primary btn-sm">Go to Home</a> {/* Adjust button size */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
