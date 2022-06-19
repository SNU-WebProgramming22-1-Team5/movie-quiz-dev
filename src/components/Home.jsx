import React,{useState} from 'react'
import styled from 'styled-components'
import BottomBox from './BottomBox'
import AppBar from './AppBar'
import Box from './Box'
import Button from './Button'
import {NavLink} from "react-router-dom"
import {getScoreboard} from "../firebase.js";
import { useEffect } from 'react'

const Wrap=styled.div`
  min-height:820px;
  max-height:900px;
`
const Gold=styled.div`
  img{
    width:100px;
    height:100px;
  }
  position:absolute;
  top:23%;
  left:50%;
  transform:translate(-50%,-50%);
  text-align:center;
  div{
    margin:5px;
  }

` 
const Silver=styled.div`
  img{
    width:100px;
    height:100px;
  }
  position:absolute;
  top:43%;
  left:10%;
  transform:translate(0%,-50%);
  text-align:center;
  div{
    margin:5px;
  }
`

const Ddong=styled.div`
  img{
    width:100px;
    height:100px;
  }
  position:absolute;
  top:43%;
  right:10%;
  transform:translate(0%,-50%);
  text-align:center;
  div{
    margin:5px;
  }
`


export default function Home() {
  const [scores, setScores] = useState([]);
  const bottom=scores.slice(3,7)
  const [loading,setLoading]=useState('')
  const setScoreboard = () => {
    getScoreboard().then(result => {
        setScores(result);
        setLoading('complete')
    })
  }
  useEffect(()=>{
    setScoreboard();
  },[])
  return (
    <Wrap>
      <AppBar></AppBar>
      {loading===''?'':
      <>
        <Gold>
          <img alt="GoogleLogin" src={process.env.PUBLIC_URL +'/img/gold.png'}></img>
          <div>{scores[0].email.split('@')[0]}</div><div>{scores[0].bestScore}</div>
        </Gold>
        <Silver>
          <img alt="GoogleLogin" src={process.env.PUBLIC_URL +'/img/silver.png'}></img>
          <div>{scores[1].email.split('@')[0]}</div><div>{scores[1].bestScore}</div>
        </Silver>
        <Ddong>
          <img alt="GoogleLogin" src={process.env.PUBLIC_URL +'/img/ddong.png'}></img>
          <div>{scores[2].email.split('@')[0]}</div><div>{scores[2].bestScore}</div>
        </Ddong>
        <BottomBox>
          {bottom.map((obj,idx)=>
            <div key={idx} style={{display:'flex',marginBottom:'20px'}}>
              <div style={{lineHeight:'49px',textAlign:'center',marginRight:'20px',fontWeight:'700',fontSize:'21px'}}>{idx+3}</div>
              <Box style={{fontSize:'14px'}}>{obj.email.split('@')[0]}</Box>
              <div style={{lineHeight:'49px',textAlign:'center',marginLeft:'20px',fontWeight:'700',fontSize:'21px'}}>{obj.bestScore}</div>
            </div>)}
        </BottomBox>
        <Button><NavLink style={{color:'white',textDecoration:'none'}} to='/Quiz'>Game Start</NavLink></Button>
      </>}
    </Wrap>
  )
}
