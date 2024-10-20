import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, signIn, clearError } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AuthForm = () => {
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [verifyMessage, setVerifyMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      const result = await dispatch(signUp(email, password)); // Wait for the sign-up to complete
      if (result.success) {
        setSuccessMessage('Sign Up Successful! Please check your email to verify.');
      }
    } else {
      const result = await dispatch(signIn(email, password)); // Wait for the sign-in to complete
      if (result.success) {
        // Check if the user object is defined before accessing properties
        if (user && !user.emailVerified) {
          setVerifyMessage('Please verify your email. Check your inbox for a verification link.');
        } else {
          setSuccessMessage('Login Successful!');
          navigate('/home');
        }
      }
    }
  };

  const clearSuccessMessage = () => {
    setSuccessMessage('');
    setVerifyMessage('');
    dispatch(clearError());
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-100">
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
        <button onClick={() => setIsSignUp(!isSignUp)} className="btn btn-link mt-3 w-100">
          {isSignUp ? 'Already have an account? Sign In' : 'Create an account'}
        </button>

        {successMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {successMessage}
            <button onClick={clearSuccessMessage} className="btn-close" aria-label="Close"></button>
          </div>
        )}
        {verifyMessage && (
          <div className="alert alert-warning mt-3" role="alert">
            {verifyMessage}
            <button onClick={clearSuccessMessage} className="btn-close" aria-label="Close"></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
