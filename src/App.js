// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './app/store';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} /> {/* Protect Home route */}
          <Route path="/movie-details" element={<ProtectedRoute element={<MovieDetails />} />} /> {/* Protect MovieDetails route */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
