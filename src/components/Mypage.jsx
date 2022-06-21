import React,{useState} from 'react'
import AppBar from './AppBar'
import styled from 'styled-components'
import BottomBox from './BottomBox';
import { useEffect } from 'react';
import { getRank,getUserData } from '../firebase';



const Login=styled.div`
  img{
    width: 198px;
    height: 48px;
    position:absolute;
    top:40%;
    left:50%;
    transform:translate(-50%,-50%);
  }
`

const Wrap=styled.div`
  max-width:420px;
  min-width:300px;
  width:100%;
  background-color:black;
  margin:0 auto;
  position:relative;
  color:white;
  min-height:900px;
  
  .Profile{
    border:white 1px solid;
    width:80%;
    margin:auto;
    text-align:center;
    font-weight: 700;
    font-size: 16px;
    padding:20px 0px 0px 0px;
    border-radius:10px;
    .name{
      font-size: 28px;
      margin:20px;
    }
  }
  .record{
    height:60px;
    font-weight: 500;
    font-size: 20px;
    display:flex;
    margin-bottom:20px;
    
    div:nth-child(1){
      line-height:60px;
      text-align:center;
      width:70px;
    }
  }
  .score{
    background-color:white;
    color:black; 
    border-radius:5px;
    text-align:center;
    line-height:40px;
    padding:10px 0px;
    width:85px;
  }
`;

const Logout=styled.div`
  text-decoration:underline;
  font-size:11px;
  padding:5px;
  cursor:pointer;
  margin:15px;
`;

const Challenge=styled.div`
  text-align:center;
  margin:70px 0px 40px 0px;
  font-size:24px;
  line-height:50px;
`;

const Page=styled.div`
  position:relative;
  top:20px;
  justify-content:center;
  display:flex;
  div{
    padding:2px 6px;
    margin:0px 4px;
  }
  .select{
    opacity:1;
    text-decoration:underline;
    cursor:pointer;
  }
  .not{
    opacity:0.4;
  }
`;
const LvImg=styled.div`
  margin:10px 0px;
  text-align:center;
  div{
    text-align:center;
    font-size:30px;
  }
  
  img{
    width:150px;
    height:150px;
  }
`
const ExpBar=styled.div`
  height:20px;
  border:1px solid white;
  position:relative;
  margin:0px 10px;
  div{
    width:${props=>props.exp}%;
    background-color:white;
    height:20px;
    position:absolute;
    left:0px;
    top:0px;
  }
`

function Mypage(props) {
  const [user,setUser]=useState('')
  const [record,setRecord]=useState([])
  const [scores,setScores]=useState([])
  const [rank,setRank]=useState('')
  const [exp,setExp]=useState(0)
  const [page,setPage]=useState(1)
  const [len,setLen]=useState('')
  const [pageArray,setPageArray]=useState('')
  const [level,setLevel]=useState(1);
  const [showExp,setShowExp]=useState(10)
  const user_id=props.user_id

  useEffect(()=>{
    setUser(props.user)
  },[props.user])
  useEffect(()=>{
    if(user){
      getUserData(user_id).then((data)=>{
        getRank(user_id).then(result=>setRank(result))
        setScores(data.scores)
        if(data.scores.length!==0){
          setExp(data.EXP)
          setLen(data.scores.length)
          setPageArray(new Array(Math.floor(len/4)+(Math.floor(len%4)>0?1:0)).fill(0))
        }
        
        
      }).catch(error=>console.log(error))
    }
  },[user,user_id,len])
  useEffect(()=>{
    if(exp<100){
      setLevel(1)
      setShowExp(exp)
    }else if(exp<200){
      setLevel(2)
      setShowExp(exp-100)
    }else if(exp<300){
      setLevel(3)
      setShowExp(exp-200)
    }else if(exp<400){
      setLevel(4)
      setShowExp(exp-300)
    }else if(exp<500){
      setLevel(5)
      setShowExp(exp-400)
    }else if(exp<600){
      setLevel(6)
      setShowExp(exp-500)
    }else if(exp<700){
      setLevel(7)
      setShowExp(exp-600)
    }else if(exp<800){
      setLevel(8)
      setShowExp(exp-700)
    }else if(exp<900){
      setLevel(9)
      setShowExp(exp-900)
    }else if(exp<1000){
      setLevel(10)
      setShowExp(exp-900)
    }else{
      setLevel(10)
      setShowExp(100)
    }
  },[exp])
  useEffect(()=>{
    if(user){
      if(scores)setRecord(scores.slice(4*(page-1),4*(page-1)+4))  
    }
  },[page,user,scores])

  const googleLogin=props.googleLogin;
  const handleLogout=props.onClick();

  const handlePage=(e)=>{
    setPage(parseInt(e.target.innerText));
  }
  useEffect(()=>{
    console.log(user)
  },[user])

  return (
    <Wrap>
      <AppBar></AppBar>
      {user?
        <>
        <LvImg >
          <div>Lv. {level}</div>
          <img alt="level" src={process.env.PUBLIC_URL +`/img/lv${level}.png`}></img>
        </LvImg>
        <div className='Profile'>
          <div className='name'>{user.email.split("@")[0]}</div>
          <ExpBar exp={showExp}>
            <div></div>
          </ExpBar>
          <div style={{margin:'15px'}}>랭킹 : <span>{rank}</span>등</div>
          <Logout onClick={handleLogout}>로그아웃</Logout>
        </div>
        <BottomBox>
          <div style={{fontWeight: '700',fontSize: '32px',marginBottom:'30px',marginLeft:'20px'}}>Record</div>
          {record.length!==0?
          <>
            <div style={{display:'flex'}}>{record.map((score,idx)=>idx<2?<div key={idx} className='record'><div >{(page-1)*4+idx+1}</div><div className='score'>{score}점</div></div>:'')}</div>
            <div style={{display:'flex'}}>{record.map((score,idx)=>idx>=2?<div key={idx} className='record'><div >{(page-1)*4+idx+1}</div><div className='score'>{score}점</div></div>:'')}</div>
            <Page>
              {pageArray.map((non,idx)=><div key={idx} className={(idx+1)===page?"select":'not'} onClick={handlePage}>{idx+1}</div>)}
            </Page>
          </>
          :<Challenge>게임 기록이 없습니다❗️<br/>게임에 도전해주세요 👊</Challenge>}
          
        </BottomBox>
        </>:
      <Login>
        <img alt="GoogleLogin" src={process.env.PUBLIC_URL+'/img/GoogleLogin.png'} onClick={googleLogin}></img>
      </Login>
      }
    </Wrap>
  )
}

export default Mypage