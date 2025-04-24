// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqQH1sqHhyu1tsIhppJB2xAJHl5YYQ-EE",
  authDomain: "qr-gospel.firebaseapp.com",
  projectId: "qr-gospel",
  storageBucket: "qr-gospel.firebasestorage.app",
  messagingSenderId: "117928601351",
  appId: "1:117928601351:web:b387bafeb1b421c49b87a2",
  measurementId: "G-NG955FJ638"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);