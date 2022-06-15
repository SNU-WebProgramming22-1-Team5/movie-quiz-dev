import React from 'react'
import styled from 'styled-components'
import {NavLink} from "react-router-dom"

const Wrab=styled.div`
  max-width:420px;
  min-width:300px;
  width:100%;
  background-color:black;
  margin:0 auto;
  position:relative;
  color:white;
  min-height:900px;
`
const Title=styled.div`
  font-weight: 700;
  font-size: 49px;
  line-height: 20px;
  position:absolute;
  top:40%;
  left:50%;
  transform:translate(-50%,-50%);
  width:300px;
  text-align:center;
`
const Sub=styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:300px;
  text-align:center;
`
const Login=styled.div`
  img{
    width: 198px;
    height: 48px;
    position:absolute;
    top:70%;
    left:50%;
    transform:translate(-50%,-50%);
  }
  div{
    padding:15px;
    font-weight: 400;
    font-size: 11px;
    line-height: 20px;
    position:absolute;
    top:77%;
    left:50%;
    transform:translate(-50%,-50%);
    text-align:center;
  }
`
export default function Start(props) {
  const googleLogin=props.googleLogin

  return (
    <Wrab>
      <Title>Movie Quiz</Title>
      <Sub>영화 게임 맞추기에 도전하시겠습니까?</Sub>
      <Login>
        <img alt="GoogleLogin" src='/img/GoogleLogin.png' onClick={googleLogin}></img>
        <div><NavLink style={{color:'white'}} to='/Home'>로그인없이 하러가기</NavLink></div>
      </Login>
    </Wrab>
  )
}
