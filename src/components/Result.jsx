import React,{useState} from 'react';
import {useLocation} from "react-router-dom";
import styled from 'styled-components'
import AppBar from './AppBar';
import {addScore} from "../firebase.js";
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';



const Wrap=styled.div`
  min-height:820px;
`;

const Score=styled.div`
  color:white;
`
const Restart=styled.div`
  text-decoration:none;
  border:1px white solid;
`

const Home=styled.div` 
  text-decoration:none;
`

function Result(props) {
  const [check,setCheck]=useState('')
  const user_id=props.user_id
  const user=props.user;
  const location=useLocation();
  const {score}=location.state;

  useEffect(()=>{
    if(user&&check===''){
      addScore(user_id,score)
      setCheck('check')
    }
  },[score,user_id,user,check])

  return (
    <Wrap>
      <AppBar/>
      <Score>{score}</Score>
      <NavLink to='/Quiz' style={{textDecoration:'none',color:'white'}}><Restart>다시게임하기</Restart></NavLink>
      <Home><NavLink to='/Home'>홈으로 가기</NavLink></Home>
    </Wrap>
  )
}

export default Result