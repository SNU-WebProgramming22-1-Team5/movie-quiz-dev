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
    getScoreboard,
    getRank,
    getRandomNumArray,
    getQuiz,
    getUser,
    addUnknownUser,

} from "./firebase.js";

function App() {

    const [user, setUser] = useState(null);
    const [score, setScore] = useState(1);
    const [scores, setScores] = useState([]);
    const [rank, setRank] = useState(null);
    const [quiz, setQuiz] = useState([]);
    //const movies = null;

    //Will remove a part after testing
    //At the end of a game, append a score result to userData DB's scores array.
    const addScoreHistory = (e, score) => {
        e.preventDefault();
        if (score) {
            addScore(user.uid, score).catch(err => console.log(err))
        } else {
            alert('insert a score');
        }

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

    //get top 10 best score histories
    const setScoreboard = () => {
        getScoreboard().then(result => {
            setScores(result);

        })
    }

    //get my rank on entire best scores. this function does not add rank to scoreboard
    const setMyRank = () => {
        if (!user.isAnonymous) {
            getRank(Number(score)).then(result => {
                setRank(result);
            })
        }
    }

    //get random 10 movie titles from db
    const setMyQuiz = () => {
        getQuiz(getRandomNumArray()).then(result => {
            setQuiz(result);
        })
    }

    const userGet = () => {
        getUser(user.uid).then(result => {
            console.log(result);
        }).catch(err => {console.log(err)})
        //getUser('WrpQWv64tYNyTUAMlP7cYnYhLqB2').catch(err => {console.log(err)})
    }

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

    //convert firestore timestamp to localestring
    const dateToString = (timestamp) => {
        if (timestamp) {
            return timestamp.toDate().toLocaleString('ko-KR');
        }
        return 'No Time Record';
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
                <input type="number" id="score" onChange={e => {setScore(e.target.value);}} defaultValue={1}/>
                <input type="submit" value="addScoreHistory" onClick={e => addScoreHistory(e,score)} />
            </form>
        </div>
        <button onClick={e => googleLogin(e)}>googleLogin</button>
        <button onClick={e => guestLogin(e)}>guestLogin</button>
        <button onClick={e => setScoreboard(e)}>getScoreboard</button>
        <button onClick={e => setMyRank(e)}>getRank(use before getScoreboard)</button>
        <button onClick={e => setMyQuiz(e)}>getQuiz</button>
        <button onClick={e => userGet(e)}>getUser</button>
        <button onClick={e => addUnknownUser()}>addUnknownUser</button>
        {(user && user.isAnonymous)? <div id="rank">No Rank for Guest.</div> : rank? <div id="rank">Your score is {rank}th!</div> : <div>No Data for Rank</div>}
        <div id="scoreboard">
            {scores.map((obj,index) => { return <div className="score" key={index}>{index+1} : {obj['bestScore']} by {obj['email']} at {dateToString(obj['bestScoreDate'])} </div> })}
        </div>
        <div id="quiz">
            {quiz.map((obj,index) => {return <div className="a-quiz" key={index}>{index+1} > {obj} </div> })}
        </div>
    </div>
  );
}

/*
//used for making movieData. set movies variable with array.
const makeMovieData = () => {
    movies.forEach((value, index) => addMovie(String(index),value[0]))
}
*/
export default App;
