import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import BottomBox from './BottomBox'
import AppBar from './AppBar'
import Button from './Button'
import Progress from './Progress'
import { useNavigate } from 'react-router-dom'
const Api = require('../Api.js');


const Wrap=styled.div`
  min-height:820px;
`;

const Hint=styled.div`
  font-weight: 700;
  font-size: 38px;
  text-align:center;
  padding:100px;
`;

const Hole=styled.div`
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  display:flex;
  .hole{
    width:10px;
    height:10px;
    border:white 5px solid;
    border-radius:100%;
    margin:8px;
  }
  .blank{
    border:none;
    margin:8px;
  }
`;

const Result=styled.div`
  font-weight:700;
  font-size:30px;
  text-align:center;
  margin:10px 0px 50px 0px;
  color:${props=>props.result==='틀렸습니다'?'red':'#04C000'}
`;

const Answer=styled.div`
  font-weight: 700;
  font-size: 30px;
`;

const AnswerWrap=styled.div`
  text-align:center;
  margin-top:50px;
  div{
    margin:30px;
  }
`;

function Problem(props) {
  
  const navigate=useNavigate();
  const answer=props.answer;
  console.log(answer)
  const index=props.index+1;
  const [english,setEnglish]=useState('')
  const [hint, setHint]=useState('');
  const num = [...answer]
  const [text,setText]=useState('');
  const [result,setResult]=useState('');
  const [present,setPresent]=useState('problem');  
  const [score,setScore]=useState(0);
  const onChange=(e)=>{
    setText(e.target.value)
  }

  const onSubmit=(e)=>{
    if(text){
      if(answer===text){
        setResult('정답입니다')
        setScore(score+1)
      }else{
        setResult('틀렸습니다')
      }
      setText('')
      setPresent('result')
    }
    
  }

  const onKeyPress=(e)=>{
    if(e.key==='Enter'){
      onSubmit();
    }
  }



  useEffect(() => {
    Api.translate(answer).then((result)=>setHint(result))
    Api.translateKor(answer).then((result)=>setEnglish(result));
    
  }, [answer,english]);

  const nextProblem=()=>{
    if(index===10){
      navigate("/Result", {state: {score:score}}) 
    }
    props.onClick()
    setPresent('problem')
  }
  return (
    <Wrap>
      <AppBar></AppBar>
      <Progress score={index}></Progress>
      {present==='problem'?
      <>
      <Hint>{hint}</Hint>
      <Hole>{num.map((hole,index)=>hole===' '?<div className='blank'></div>:<div className='hole'></div>)}</Hole>
      </>:
      <AnswerWrap>
        <Answer>{hint}</Answer>
        <div><img alt="arrow" src='/img/arrow.png'></img></div>
        <Answer style={{fontSize:'30px'}}>{english}</Answer>
        <div><img alt="arrow" src='/img/arrow.png'></img></div>
        <Answer style={{fontSize:'35px'}}>{answer}</Answer>
      </AnswerWrap>
      }
      <BottomBox>
        {present==='problem'?
        <div style={{marginBottom:'20px'}}>
          <div style={{lineHeight:'49px',textAlign:'center',marginBottom:'20px',fontWeight:'700',fontSize:'21px'}}>정답을 입력해주세요.</div>
          <div style={{textAlign:'center',padding:'10px 0px 30px 0px'}}><input onChange={onChange} value={text} onKeyPress={onKeyPress} type='text' name='title' style={{width:'90%',border:'1px solid rgba(0, 0, 0, 0.2)',height:'50px',borderRadius:'10px',margin:'0px',textAlign:'center',fontSize:'20px'}} required autoFocus></input></div>
        </div>:
        <Result result={result}>{result}</Result>}
      </BottomBox>
      {present==='problem'?
      <Button onClick={onSubmit}>Submit</Button>
      :<Button onClick={nextProblem}>Next</Button>}
    </Wrap>
  )
}

export default Problem