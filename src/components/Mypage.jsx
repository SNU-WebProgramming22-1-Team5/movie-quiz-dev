import React from 'react'
import AppBar from './AppBar'
import styled from 'styled-components'
import BottomBox from './BottomBox';

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
    margin-top:30px;
    padding:20px 0px;
    border-radius:10px;
    div{
      margin:15px;
    }
    div:nth-child(1){
      font-size: 28px;
      margin:20px;
    }
  }
  .record{
    display:flex;
    height:60px;
    font-weight: 500;
    font-size: 20px;
    div:nth-child(1){
      width:60%;
      line-height:60px;
      text-align:center;
    }
    div:nth-child(2){
      width:40%;
    }
  }
  .score{
    background-color:white;
    color:black;
    border-radius:5px;
    margin:10px;
    text-align:center;
    line-height:40px;
  }
`;


function Mypage(props) {
  return (
    <Wrap>
      <AppBar></AppBar>
      <div className='Profile'>
        <div>sdfsdf님</div>
        <div>총점 : <span>29</span>점</div>
        <div>랭킹 : <span>12</span>등</div>
      </div>

      <BottomBox>
        <div style={{fontWeight: '700',fontSize: '32px',marginBottom:'30px',marginLeft:'20px'}}>Record</div>
        <div className='record'><div>2022/10/12</div><div className='score'>sdef</div></div>
        <div className='record'><div>2022/10/12</div><div className='score'>sdef</div></div>
        <div className='record'><div>2022/10/12</div><div className='score'>sdef</div></div>
        <div className='record'><div>2022/10/12</div><div className='score'>sdef</div></div>
        <div className='record'><div>2022/10/12</div><div className='score'>sdef</div></div>
        <div className='record'><div>2022/10/12</div><div className='score'>sdef</div></div>
      </BottomBox>
    </Wrap>
  )
}

export default Mypage