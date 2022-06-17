import './App.css';
import {useEffect, useState} from "react";
import {
    auth,
    loginGoogle,
    loginGuest,
    renameUser,
    persistenceSet,
    addScore,
    addUser,
} from "./firebase.js";


function App() {

    const [user, setUser] = useState(null);
    const [score, setScore] = useState(0);
    const [scores, setScores] = useState([]);
    //const movies = null;

    //Will remove a part after testing
    //At the end of a game, append a score result to userData DB's scores array.
    const addScoreHistory = (e, score) => {
        e.preventDefault();
        addScore(user.uid, score).then(result =>
            {
                // this is for test_App!
                setScores((prevState) => [...prevState, score]);
            }
        ).catch(err => console.log(err))
    }

    //Pop-up Google Login when clicking on 'Login with Google'
    const googleLogin = async (e) => {
        e.preventDefault();
        await persistenceSet();
        await loginGoogle().then(result => {
            const userInfo = result.user;
            addUser(userInfo.uid, userInfo.email).catch(err => console.log(err));
        }).catch(error => console.log(error))
    }

    //Under Construction - must decide whether use anonymous login or no login for guests.
    //Anonymous Login when clicking on 'Play without Login'
    const guestLogin = async (e) => {
        e.preventDefault();
        await persistenceSet();
        await loginGuest().then((result) => {
        }).catch(error => console.log(error));
    }

    /*
    //used for making movieData. set movies variable with array.
    const makeMovieData = () => {
        movies.forEach((value, index) => addMovie(String(index),value[0]))
    }
    */

    //Under construction - Don't know if condition is correct for this, will check.
    //Whenever auth state is changed(login/logout), set user value to current user.
    //If its display name is null or user is anonymous, update user's display name to 'Guest' and do setUser.
    const onAuthStateChanged = () => {
        const currentUser = auth.currentUser;
        // this part
        if ( currentUser && (!currentUser.displayName || currentUser.isAnonymous)){
            renameUser('Guest').then(e => {setUser(currentUser);})
        } else {
            setUser(currentUser);
        }
    }

    //Whenever auth state is changed, onAuthStateChanged will execute once.
    useEffect(() => {
        return auth.onAuthStateChanged(onAuthStateChanged);
    }, []);


  return (
    <div className="App">
        <div id="Username">
            { !user ? <span> No Login Info </span> : !user.displayName ? <span> Welcome, UnKnown!</span> : <span> Welcome, {user.displayName}! </span>}
        </div>
        <div id="submit-score">
            <form id="score-form">
                <input type="number" id="score" onChange={e => {setScore(e.target.value);}}/>
                <input type="submit" onClick={e => addScoreHistory(e,score)} />
            </form>
        </div>
        <button onClick={e => googleLogin(e)}>Sign In with Google</button>
        <button onClick={e => guestLogin(e)}>Play without Login</button>
        <button>Button for another function test</button>
        <div id="scores">
            {scores.map((score,index) => <div key={index} className="score">{score}</div>)}
        </div>
    </div>
  );
}

export default App;
