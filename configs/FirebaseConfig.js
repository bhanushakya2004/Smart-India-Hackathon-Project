// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// First Firebase configuration (for the first Firebase project)
const firebaseConfig1 = {
  apiKey: "AIzaSyDw_h6J9oAg_2HdpsDpPtsKIn-v0qOV14M",
  authDomain: "tubeguruji-startups.firebaseapp.com",
  projectId: "tubeguruji-startups",
  storageBucket: "tubeguruji-startups.appspot.com",
  messagingSenderId: "706430327770",
  appId: "1:706430327770:web:e4280dbe09246d53ad3ee3",
  measurementId: "G-PZFCW9X9BC"
};

// Second Firebase configuration (for the second Firebase project)
const firebaseConfig2 = {
  apiKey: "AIzaSyC1mU4cGi0kxGmAjzvA-zrkGVbXqfMQBtQ",
  authDomain: "krashak-setu-testing.firebaseapp.com",
  projectId: "krashak-setu-testing",
  storageBucket: "krashak-setu-testing.appspot.com",
  messagingSenderId: "730432132265",
  appId: "1:730432132265:web:eb84541bbc422dfa1705b8"
};

// Initialize both Firebase apps with unique names
const app1 = initializeApp(firebaseConfig1, "app1"); // First app
const app2 = initializeApp(firebaseConfig2, "app2"); // Second app

// Access Firestore and Storage for each app using the app names
export const db1 = getFirestore(app1); // Firestore for the first app
export const storage1 = getStorage(app1); // Storage for the first app

export const db2 = getFirestore(app2); // Firestore for the second app
export const storage2 = getStorage(app2); // Storage for the second app

// You can now interact with both Firestore and Storage from both Firebase projects
