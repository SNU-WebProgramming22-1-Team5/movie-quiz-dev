import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Mypage from './components/Mypage';
import Start from './components/Start';
import styled from 'styled-components'
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from "./components/Result";
import {useEffect, useState} from "react";
import {loginGoogle,addUser,getUser} from "./firebase.js";
import {useCookies} from "react-cookie"

const Screen=styled.div`
  max-width:420px;
  min-width:300px;
  width:100%;
  background-color:black;
  margin:0 auto;
  position:relative;
  color:white;

`

function App() {
  const [cookies, setCookie,deleteCookie] = useCookies(["user_id"]);
  const [user,setUser]=useState('');
  useEffect(()=>{
    console.log(1)
    const cookie=cookies.user_id
    if(cookie){
      getUser(cookie).then(user=>{setUser(user)})
      }
  },[cookies])
  const googleLogin = (e) => {
    e.preventDefault();
    loginGoogle()
      .then(data => {
        getUser(data.user.uid).then(user=>setUser(user))
        addUser(data.user.uid,data.user.email)
        setCookie("user_id",data.user.uid);
      }).catch(error => console.log(error))
  }
  const handleLogout=()=>{
    console.log(1)
    setUser('')
    deleteCookie("user_id")
  }

  return (

      <Screen>
        <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<Start user={user} googleLogin={googleLogin}/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/Quiz" element={<Quiz/>}/>
            <Route path="/Result" element={<Result user={user} user_id={cookies.user_id}/>}/>
            <Route path="/Mypage" element={<Mypage user={user} user_id={cookies.user_id} googleLogin={googleLogin} onClick={()=>handleLogout}/>}/>
          </Routes>
        </Router>
      </Screen>

    
  );
}

export default App;
