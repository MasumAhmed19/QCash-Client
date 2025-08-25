// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDivAa7YOBySAT8cXkoDWqTP32EkiLhoUo",
  authDomain: "qcash-2278d.firebaseapp.com",
  projectId: "qcash-2278d",
  storageBucket: "qcash-2278d.firebasestorage.app",
  messagingSenderId: "279793628209",
  appId: "1:279793628209:web:6109df4dece6524b0a1110"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)