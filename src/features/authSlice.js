import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setUser, setError, clearError } = authSlice.actions;

export const signUp = (email, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Send verification email
      await sendEmailVerification(user);
  
      dispatch(setUser(user));
      dispatch(setError(null)); // Clear any previous errors
  
      return { success: true }; // Return success
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email address is already in use. Please use a different email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid. Please enter a valid email.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is too weak. Please enter a stronger password.';
          break;
        default:
          errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      return { success: false }; // Return failure
    } finally {
      dispatch(setLoading(false));
    }
  };

export const signIn = (email, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(userCredential.user));
      dispatch(setError(null)); // Clear any previous errors
      return { success: true }; // Return success
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email. Please check the email or sign up.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        default:
          errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      return { success: false }; // Return failure
    } finally {
      dispatch(setLoading(false));
    }
  };

export default authSlice.reducer;
