import React,{useState} from 'react'
import AppBar from './AppBar'
import styled from 'styled-components'
import BottomBox from './BottomBox';
import { useEffect } from 'react';
import { getRank } from '../firebase';



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
    margin-top:30px;
    padding:20px 0px 0px 0px;
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

const Logout=styled.div`
  text-decoration:underline;
  font-size:11px;
  padding:5px;
  cursor:pointer;
`;

const Challenge=styled.div`
  text-align:center;
  margin:110px 0px 60px 0px;
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
    background-color:gray;
    border-radius:10px;
  }
  .not{
    opacity:0.4;
  }

`
function Mypage(props) {
  const [user,setUser]=useState('')
  const [record,setRecord]=useState([])
  const [scores,setScores]=useState([])
  const [rank,setRank]=useState('')
  const [sum,setSum]=useState(0)
  const [page,setPage]=useState(2)
  const len=(user!==''?user.scores.length:'')
  const pageNum=Math.floor(len/4)+(Math.floor(len%4)>0?1:0);
  const pageArray=new Array(pageNum).fill(0)
  console.log(pageNum,pageArray)
  const user_id=props.user_id
  console.log(user)
  useEffect(()=>{
    setUser(props.user)
  },[props.user])
  console.log(user)
  useEffect(()=>{
    if(user!==''){
      getRank(user_id).then(result=>setRank(result))
      setScores(user.scores)
      const scoreArray=user.scores
      const arraySum=scoreArray.reduce(function add(sum,currValue){return parseInt(sum)+parseInt(currValue)})
      setSum(arraySum) 
    }
  },[user,user_id])
  useEffect(()=>{
    if(user!==''){
      setRecord(scores.slice(4*(page-1),4*(page-1)+4))    
    }
  },[page,user,scores])
  console.log(record)

  const googleLogin=props.googleLogin;
  const handleLogout=props.onClick();

  const handlePage=(e)=>{
    setPage(parseInt(e.target.innerText));
  }
  console.log(page)
  return (
    <Wrap>
      <AppBar></AppBar>
      {user!==''?
        <>
        <div className='Profile'>
          <div>{user.email.split("@")[0]}</div>
          <div>총점 : <span>{sum}</span>점</div>
          <div>랭킹 : <span>{rank}</span>등</div>
          <Logout onClick={handleLogout}>로그아웃</Logout>
        </div>
        <BottomBox>
          <div style={{fontWeight: '700',fontSize: '32px',marginBottom:'30px',marginLeft:'20px'}}>Record</div>
          {record.length!==0?
          <>
            {record.map((score,idx)=><div style={{marginBottom:'20px',justifyContent:'space-between'}} key={idx} className='record'><div style={{width:'100px'}}>{(page-1)*4+idx+1}</div><div className='score'>{score}점</div></div>)}
            <Page>
              {pageArray.map((non,idx)=><div key={idx} className={(idx+1)===page?"select":'not'} onClick={handlePage}>{idx+1}</div>)}
            </Page>
          </>
          :<Challenge>게임 기록이 없습니다❗️<br/>게임에 도전해주세요 👊</Challenge>}
          
        </BottomBox>
        </>:
      <Login>
        <img alt="GoogleLogin" src='/img/GoogleLogin.png' onClick={googleLogin}></img>
      </Login>
      }
    </Wrap>
  )
}

export default Mypage