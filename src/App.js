import './App.css';
import {useEffect, useState} from "react";
import {auth, loginGoogle, loginGuest, renameUser, persistenceSet, add_history} from "./firebase.js";


function App() {

    const [user, setUser] = useState(null);
    const [score, setScore] = useState(0);
    const [scores, setScores] = useState([]);

    const addScoreHistory = (e, score) => {
        e.preventDefault();
        const curr = new Date();
        const utc = curr.getTime() + (curr.getTimezoneOffset()*60*1000);
        const kr_curr = new Date(utc+9*60*60*1000);
        add_history(user.uid,user.displayName, score, kr_curr).then(result =>
            {
                setScores((prevState) => [...prevState, score]);
            }
        ).catch(err => console.log(err))
    }

    const googleLogin = (e) => {
        e.preventDefault();
        loginGoogle().then(result => {
        }).catch(error => console.log(error))
    }

    const guestLogin = (e) => {
        e.preventDefault();
        loginGuest().then((result) => {

        }).catch(error => console.log(error));
    }

    const onAuthStateChanged = () => {
        const currentUser = auth.currentUser;
        if (!currentUser.displayName || currentUser.isAnonymous){
            renameUser('Guest').then(e => {setUser(currentUser);})
        } else {
            setUser(currentUser);
        }
    }

    useEffect( () => {
        persistenceSet();
    }, [])

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
