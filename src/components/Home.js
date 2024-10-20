import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/authSlice';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaSearch } from "react-icons/fa";
import { BsEmojiSmileFill, BsFillEmojiSunglassesFill } from "react-icons/bs";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(setUser(null)); // Clear user state
    navigate('/'); // Redirect to sign-in page
  };

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Batman');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8); // Number of movies per page
  const apiKey = 'eb1b69cb'; // Replace with your API key

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search);
          setError(null);
        } else {
          setError(data.Error);
          setMovies([]);
        }
      } catch (error) {
        setError('Failed to fetch movies.');
        setMovies([]);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = e.target.elements.search.value.trim();
    if (term) {
      setSearchTerm(term);
      setCurrentPage(1); // Reset to the first page on new search
    } else {
      setSearchTerm("Batman");
      setCurrentPage(1); // Reset to the first page on new search
    }
  };

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  useEffect(() => {
    if (!user) {
      navigate('/'); // Redirect to sign-in if not authenticated
    }
  }, [user, navigate]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-light" style={{ position: 'fixed', height: '100vh', overflowY: 'auto' }}>
          <h2 className="mt-4">Watchlists</h2>
          <div className="form-group my-3">
            <form onSubmit={handleSearch} className="input-group">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Search"
              />
              <button type="submit" className="input-group-text">
                <FaSearch /> {/* Search icon */}
              </button>
            </form>
          </div>
          <div className="nav flex-column">
            <button className="btn btn-danger text-start" onClick={() => setSearchTerm("Batman")}>
              <FaHome className='mb-1' /> Home
            </button>
            <h4 className="mt-4">My Lists</h4>
            <a href="#" className="nav-link text-dark">
              <i className="bi bi-file-earmark-text"></i> Movies by Tom Cruise
            </a>
          </div>
        </div>

        {/* Main content */}
        <div className="col-md-9 offset-md-3" style={{ marginLeft: '25%' }}>
          <div className="d-flex justify-content-between align-items-center my-4">
            <h2>Movies by {searchTerm}</h2>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <p>About this watchlist: This list lorem ipsum dolor et blah blah blah.</p>

          {/* Movie Cards */}
          {error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <div className="row custom-row g-3">
              {currentMovies.map((movie, index) => (
                <div className="col-md-3 custom-col" key={movie.imdbID}>
                  <div className="card h-100">
                    <img
                      src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                      className="card-img-top"
                      alt={movie.Title}
                    />
                    <p className='text-end'>
                      {index % 2 === 0 ? (
                        <span className='flex'>
                          <BsEmojiSmileFill size={24} style={{color:"#A2770B"}}/>
                          <span style={{ fontSize: '1.2rem', fontWeight: '500', marginTop:'3px' }}>68</span><sup><span style={{ fontSize: '0.8rem' }}>/100</span></sup>

                        </span>
                      ) : (
                        <div className='flex'>
                          <BsFillEmojiSunglassesFill size={24} style={{color:"#548C0C"}}/>
                          <span style={{ fontSize: '1.2rem', fontWeight: '500', marginTop:'3px' }}>83</span><sup><span style={{ fontSize: '0.8rem' }}>/100</span></sup>
                          
                        </div>
                      )}
                      {/* <span style={{ fontSize: '1rem', marginLeft: '0.25rem' }}>/100</span> */}
                    </p><div className="card-body">
                      <h5 className="card-title">{movie.Title}</h5>
                      <p className="card-text">Year: {movie.Year}</p>
                      <p className="card-text">Type: {movie.Type}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <span className="badge bg-secondary"></span>
                      <span className="badge bg-warning text-dark"></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
<br />
          {/* Pagination */}
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li className={`page-item ${index + 1 === currentPage ? 'active' : ''}`} key={index}>
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div >
  );
};

export default Home;
