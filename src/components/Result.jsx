import React,{useState} from 'react';
import {useLocation} from "react-router-dom";
import styled from 'styled-components'
import AppBar from './AppBar';
import {addExp, addScoreHistory} from "../firebase.js";
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';



const Wrap=styled.div`
  min-height:820px;
`;

const Score=styled.div`
  color:white;
  text-align:center;
  font-size:30px;
  padding:130px 0px;
`
const Restart=styled.div`
  text-decoration:none;
  border:1px white solid;
  margin:80px 60px 20px 60px;
  text-align:center;
  background-color:white;
  color:black;
  border-radius:10px;
  height:50px;
  line-height:50px;
  font-weight:700;
`

const Home=styled.div` 
  text-decoration:none;
  border:1px white solid;
  margin:0px 60px;
  text-align:center;
  border-radius:10px;
  height:50px;
  line-height:50px;
  font-weight:700;
`

function Result(props) {
  const [check,setCheck]=useState('')
  const user_id=props.user_id
  const user=props.user;
  const location=useLocation();
  const {correct,time}=location.state;
  const expression=()=>{
    if(correct>7){
      return "🎉"
    }else if(correct>4){
      return "😊"
    }else{
      return "🥲"
    }
  }

  useEffect(()=>{
    window.scrollTo(0,0)
    if(user&&check===''){
      addScoreHistory(user_id,correct,time)
      addExp(user_id,correct*10)
      setCheck('check')
    }
  },[correct,user_id,user,check,time])

  return (
    <Wrap>
      <AppBar/>
      <Score>
        <div style={{fontSize:'30px',marginBottom:'20px',padding:'20px 0px',borderBottom:'1px gray solid',borderTop:'1px gray solid'}}>Result</div>
        <div>맞춘 갯수: {correct}개 {expression()}</div>
        <div>남은시간 : {time}초</div>
        <div>총점 : 50 X {correct} + {time} = {correct*50+time}</div>
      </Score>
      <NavLink to='/Quiz' style={{textDecoration:'none',color:'white'}}><Restart>다시도전하기</Restart></NavLink>
      <NavLink to='/Home' style={{textDecoration:'none',color:'white'}}><Home>홈으로 가기</Home></NavLink>
    </Wrap>
  )
}

export default Result