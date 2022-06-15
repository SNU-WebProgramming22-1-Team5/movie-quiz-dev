import './App.css';
import {useEffect, useState} from "react";
import {auth, loginGoogle, loginGuest, renameUser, persistenceSet, addScore, addUser} from "./firebase.js";


function App() {

    const [user, setUser] = useState(null);
    const [score, setScore] = useState(0);
    const [scores, setScores] = useState([]);

    //At the end of a game, append a score result to userData DB's scores array.
    const addScoreHistory = (e, score) => {
        e.preventDefault();
        // use to get current time in KST. (kr_curr)
        // const curr = new Date();
        // const utc = curr.getTime() + (curr.getTimezoneOffset()*60*1000);
        // const kr_curr = new Date(utc+9*60*60*1000);
        addScore(user.uid,user.displayName, score).then(result =>
            {
                setScores((prevState) => [...prevState, score]);
            }
        ).catch(err => console.log(err))
    }

    //Pop-up Google Login when clicking on 'Login with Google'
    const googleLogin = (e) => {
        e.preventDefault();
        loginGoogle().then(result => {
            const userInfo = result.user;
            addUser(userInfo.uid, userInfo.email).catch(err => console.log(err));
        }).catch(error => console.log(error))
    }

    //Changeable - Anonymous Login when clicking on 'Play without Login'
    const guestLogin = (e) => {
        e.preventDefault();
        loginGuest().then((result) => {
        }).catch(error => console.log(error));
    }

    //Currently Testing...
    //Whenever auth state is changed(login/logout), set user value to current user.
    //If its display name is null or user is anonymous, update user's display name to 'Guest' and do setUser.
    const onAuthStateChanged = () => {
        const currentUser = auth.currentUser;
        if ( currentUser && (!currentUser.displayName || currentUser.isAnonymous)){
            renameUser('Guest').then(e => {setUser(currentUser);})
        } else {
            setUser(currentUser);
        }
    }

    //When page is loaded, account persistence option will be set.
    useEffect( () => {
        persistenceSet();
    }, [])

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
        <div id="scores">
            {scores.map((score,index) => <div key={index} className="score">{score}</div>)}
        </div>
    </div>
  );
}

export default App;
