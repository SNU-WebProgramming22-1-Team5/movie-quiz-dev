import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Mypage from './components/Mypage';
import Start from './components/Start';
import styled from 'styled-components'
import Home from './components/Home';
import Problem from './components/Problem';
import {loginGoogle} from "./firebase.js";
const Screen=styled.div`
  max-width:420px;
  min-width:300px;
  width:100%;
  background-color:black;
  margin:0 auto;
  position:relative;
  color:white;
  min-height:900px;
`

function App() {
  const googleLogin = (e) => {
    e.preventDefault();
    loginGoogle().then(result => {
    }).catch(error => console.log(error))
  }
  return (
    <Screen>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Start  googleLogin={googleLogin}/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Problem" element={<Problem/>}/>
          <Route path="/Mypage" element={<Mypage/>}/>
        </Routes>
      </Router>
    </Screen>
    
  );
}

export default App;
