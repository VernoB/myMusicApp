import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLaj6loVSPWhnRGjsvJFzldZEX-7bB6t4",
  authDomain: "mymusicapp-63b18.firebaseapp.com",
  projectId: "mymusicapp-63b18",
  storageBucket: "mymusicapp-63b18.appspot.com",
  messagingSenderId: "427171244439",
  appId: "1:427171244439:web:a3451f76489b4cf2d27cd2",
  measurementId: "G-2H2V0MB9RE",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
// const usersCollections = collection(db, "users");

export { auth, db };
