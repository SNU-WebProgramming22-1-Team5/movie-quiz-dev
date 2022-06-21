import React,{useState} from 'react'
import styled from 'styled-components'
import {NavLink,Link} from "react-router-dom"
import RuleModal from './RuleModal'

const Bar=styled.div`
  height:90px;
  width:100%;
  max-width:420px;
  position:relative;
  img.rule{
    width:24px;
    height:24px;
    position:absolute;
    top:36px;
    left:30px;
  }
  div:nth-child(2){
    text-align:center;
    font-weight: 700;
    font-size: 25px;
    line-height: 90px;
  }
  img.mypage{
    width:24px;
    height:24px;
    position:absolute;
    top:36px;
    right:30px;
  }
`
export default function AppBar() {
  const [show,setShow]=useState('')
  const handleShow=()=>{
    setShow('show')  
  }
  const handleDelete=()=>{
    setShow('') 
  }
  return (
    <>
      <RuleModal onClick={()=>handleDelete()} show={show}></RuleModal>
      <Bar>
        <img onClick={handleShow} className="rule" alt="rule" src={process.env.PUBLIC_URL +'/img/rule.png'}></img>
        <div><NavLink style={{textDecoration:'none',color:'white'}} to='/Home'>Movie Quiz</NavLink></div>
        <Link to='/Mypage'><img className='mypage' alt="mypage" src={process.env.PUBLIC_URL +'/img/mypage.png'}></img></Link>
      </Bar>
    </>
  )
}
