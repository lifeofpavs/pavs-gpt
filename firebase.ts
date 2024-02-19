import { initializeApp, getApp, getApps } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxFKs-IiyzOi4cHje20i8OrpBHBbe5B8c",
  authDomain: "chatgpt-clone-dc933.firebaseapp.com",
  projectId: "chatgpt-clone-dc933",
  storageBucket: "chatgpt-clone-dc933.appspot.com",
  messagingSenderId: "455979971777",
  appId: "1:455979971777:web:80a2533739bb620b10d040"
};

// Initialize Firebase.
// If it is initialized already, return it. Initialize it  if not.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app)

export {
  db
}
