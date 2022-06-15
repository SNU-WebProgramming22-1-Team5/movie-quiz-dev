import React from 'react'
import styled from 'styled-components'
import BottomBox from './BottomBox'
import AppBar from './AppBar'
import Box from './Box'
import Button from './Button'
import {NavLink} from "react-router-dom"

const Wrap=styled.div`

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
  return (
    <Wrap>
      <AppBar></AppBar>
      <Gold>
        <img alt="GoogleLogin" src={process.env.PUBLIC_URL +'/img/gold.png'}></img>
        <div>dfsdf님</div><div>234점</div>
      </Gold>
      <Silver>
        <img alt="GoogleLogin" src={process.env.PUBLIC_URL +'/img/silver.png'}></img>
        <div>dfsdf님</div><div>234점</div>
      </Silver>
      <Ddong>
        <img alt="GoogleLogin" src={process.env.PUBLIC_URL +'/img/ddong.png'}></img>
        <div>dfsdf님</div><div>234점</div>
      </Ddong>
      <BottomBox>
        <div style={{display:'flex',marginBottom:'20px'}}>
          <div style={{lineHeight:'49px',textAlign:'center',marginRight:'20px',fontWeight:'700',fontSize:'21px'}}>4</div><Box style={{fontSize:'14px'}}>sdsdfsdff</Box>
        </div>
        <div style={{display:'flex',marginBottom:'20px'}}>
          <div style={{lineHeight:'49px',textAlign:'center',marginRight:'20px',fontWeight:'700',fontSize:'21px'}}>5</div><Box>sdf</Box>
        </div>
        <div style={{display:'flex',marginBottom:'20px'}}>
          <div style={{lineHeight:'49px',textAlign:'center',marginRight:'20px',fontWeight:'700',fontSize:'21px'}}>6</div><Box>sdf</Box>
        </div>
        <div style={{display:'flex',marginBottom:'20px'}}>
          <div style={{lineHeight:'49px',textAlign:'center',marginRight:'20px',fontWeight:'700',fontSize:'21px'}}>7</div><Box>sdf</Box>
        </div>
      </BottomBox>
      <Button><NavLink style={{color:'white',textDecoration:'none'}} to='/Problem'>Game Start</NavLink></Button>
    </Wrap>
  )
}
