import * as firebase from 'firebase/app';
import { doc, 
         onSnapshot, 
         collection,
         getFirestore, 
         getDocs, 
         addDoc,
         updateDoc
} from 'firebase/firestore';

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

firebase.initializeApp(firebaseConfig);

const db = getFirestore();
const col = collection(db, "Devices");

class Fire {
  getAllDevices() {
    return onSnapshot(col);
  }
  
  addDevices = async (data) => {
    return await addDoc(col, data);
  }
  
  updateDevice = async (id, data) => {
    return await updateDoc(doc(col, id), data);
  }
  
  removeDevice = async (id) => {
    return await deleteDoc(doc(col, id));
  }
}

export default new Fire;