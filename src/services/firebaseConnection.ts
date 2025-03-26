import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDvad7UwcOd3DmibnkWzYQjT_CInXvq0VY",
  authDomain: "webauto-eb597.firebaseapp.com",
  projectId: "webauto-eb597",
  storageBucket: "webauto-eb597.firebasestorage.app",
  messagingSenderId: "427967902524",
  appId: "1:427967902524:web:2e50f68a098d81f5fe2439",
  measurementId: "G-8X3C3DJ7MT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
