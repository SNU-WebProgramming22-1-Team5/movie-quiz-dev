// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInAnonymously, updateProfile} from "firebase/auth";
import { browserLocalPersistence, setPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBH5GEuWjqCvwstosSsmH3z88Nb6fPoDqE",
    authDomain: "reactdemo-642cd.firebaseapp.com",
    projectId: "reactdemo-642cd",
    storageBucket: "reactdemo-642cd.appspot.com",
    messagingSenderId: "847945455955",
    appId: "1:847945455955:web:66c640a01a7eccdb6769a6",
    measurementId: "G-27VV5X6338"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

export const loginGuest = () => {
    return signInAnonymously(auth)
}

export const renameUser = (name,user=auth.currentUser) => {
    if (user) {
        return updateProfile(user, {displayName: name}).catch(error => console.log(error));
    } else {
        return null;
    }
}

export const persistenceSet = () => {
    setPersistence(auth, browserLocalPersistence).catch(error => console.log(error));
}

export const add_history = async (user_id, name, score, date) => {
    //const fileName = String(Date.parse(date));
    const docSnap = await getDoc(doc(db,"scoreHistory",user_id));
    if (!docSnap.exists()) {
        await setDoc(doc(db,"scoreHistory", user_id), {
            name: name,
            score: score,
            date: date,
        })
    } else {
        console.log('LOL');
    }

}
export { db, auth };

