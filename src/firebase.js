// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc} from 'firebase/firestore';
import {
    browserLocalPersistence,
    getAuth,
    GoogleAuthProvider,
    setPersistence,
    signInAnonymously,
    signInWithPopup,
    updateProfile
} from "firebase/auth";

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

//for google login
export const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

//Changeable - for anonymous login (guest play)
export const loginGuest = () => {
    return signInAnonymously(auth)
}

//for setting a user's displayName. used at adding displayname for guest users
export const renameUser = (name,user=auth.currentUser) => {
    if (user) {
        return updateProfile(user, {displayName: name}).catch(error => console.log(error));
    } else {
        return null;
    }
}

//for letting login info persistent. Only Logout function can make it deleted.
export const persistenceSet = () => {
    setPersistence(auth, browserLocalPersistence).catch(error => console.log(error));
}

//for updating scores, bestScore, bestScoreDate on firestore userData DB.
//arrayUnion() does not support to store duplicate elements on an array so following 'if' statements used.
export const addScore = async (user_id, score) => {
    const docRef = doc(db,"userData",user_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        const pastScores = docSnap.data().scores;
        if (pastScores && pastScores.includes(score)) {
            const data = {
                scores: [...pastScores, score]
            };
            await updateDoc(docRef, data);
        } else {
            const numberScoreArr = pastScores.map(str => Number(str));
            const numberScore = Number(score);
            if (pastScores && Math.max(...numberScoreArr) < numberScore) {
                const curr = new Date();
                const utc = curr.getTime() + (curr.getTimezoneOffset()*60*1000);
                const kr_curr = new Date(utc+9*60*60*1000);
                await updateDoc(docRef, {
                    bestScore: score,
                    bestScoreDate : kr_curr
                });
            }
            await updateDoc(docRef,{
                scores: arrayUnion(score)
            })
        }
    } else {
        console.log('No Document Record');
    }
}

// if there's no info on UserData with user's id, add new document with blank score history and email
export const addUser = async (user_id,email) => {
    const docSnap = await getDoc(doc(db, "userData", user_id));
    if (!docSnap.exists()) {
        const data = {
            email : email,
            scores : [],
            bestScore : 0,
            bestScoreDate : ''
        }
        await setDoc(doc(db, "userData", user_id), data).catch(err => console.log(err))
    }
}

//for adding title data of a movie on movieData DB with random-gen id-named document
export const addMovie = async (index,title1) => {
    console.log('Added a movie.');
    const data = {
        title1 : title1
    }
    await setDoc(doc(db,"movieData", String(index)), data).catch(err => console.log(err));
}

// for getting 10 random unique numbers within movieData index.
export const getRandomNumArray = (size=10, movieLength=86) => {
    const arr = Array.from(Array(movieLength).keys());
    function shuffleArray(array) {
        for (let index = array.length - 1; index > 0; index--) {
            const randomPosition = Math.floor(Math.random() * (index + 1));
            const temporary = array[index];
            array[index] = array[randomPosition];
            array[randomPosition] = temporary;
        }
    }
    shuffleArray(arr);
    return arr.slice(0,size);
}


//for getting top 10 scores and username info from db. (scoreboard info)
export const getScoreboard = async () => {

}

//for getting rank of game result. guest doesn't get rank.
export const getRank = () => {

}

//for getting 10 movies data from movieData for quiz.
export const getQuiz = () => {

}

export { db, auth };


