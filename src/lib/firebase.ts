import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};
export default firebaseConfig;
const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
const firestore = getFirestore(app);
const auth = initializeAuth(app, {});
const functions = getFunctions(app);
const storage = getStorage();
export { auth, firestore, functions, storage };
