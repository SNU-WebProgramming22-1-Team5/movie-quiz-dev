import React from 'react'
import styled from 'styled-components'
import {NavLink,Link} from "react-router-dom"

const Bar=styled.div`
  height:90px;
  width:100%;
  max-width:420px;
  position:relative;
  span{
    position:absolute;
    margin-left:30px;
    line-height: 90px;
  }
  div:nth-child(2){
    text-align:center;
    font-weight: 700;
    font-size: 25px;
    line-height: 90px;
  }
  img{
    width:24px;
    height:24px;
    position:absolute;
    top:36px;
    right:30px;
  }
`
export default function AppBar() {
  return (
    <Bar>
      <span>Rule</span>
      <div><NavLink style={{textDecoration:'none',color:'white'}} to='/Home'>Movie Quiz</NavLink></div>
      <Link to='/Mypage'><img alt="mypage" src={process.env.PUBLIC_URL +'/img/mypage.png'}></img></Link>
    </Bar>
  )
}
