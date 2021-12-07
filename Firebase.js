import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getFirestore, collection, doc, getDocs, setDoc, addDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAAttU6lmWphDl63h76c4D8-UohJbG2I0I",
  authDomain: "quickstart-1600242582049.firebaseapp.com",
  databaseURL: "https://quickstart-1600242582049-default-rtdb.firebaseio.com",
  projectId: "quickstart-1600242582049",
  storageBucket: "quickstart-1600242582049.appspot.com",
  messagingSenderId: "1088112829187",
  appId: "1:1088112829187:web:debdca5e4724e73badff36",
  measurementId: "G-GMHRJJY0C5"
};

const app = initializeApp(firebaseConfig);


export { getDatabase, ref, set, onValue, collection, onSnapshot ,getDocs, getFirestore, doc, setDoc, addDoc } 
