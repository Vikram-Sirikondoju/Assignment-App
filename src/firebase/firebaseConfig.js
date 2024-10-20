import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBGcxZ0TqY8twpgfNzkUzn_wZjDXFddCNw",
    authDomain: "assignment-app-dc43c.firebaseapp.com",
    projectId: "assignment-app-dc43c",
    storageBucket: "assignment-app-dc43c.appspot.com",
    messagingSenderId: "99962941158",
    appId: "1:99962941158:web:b767d0a5d4e2262f8a1527",
    measurementId: "G-S4NN3NDPG7"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
