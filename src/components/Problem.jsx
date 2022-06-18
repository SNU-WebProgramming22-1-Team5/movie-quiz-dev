import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import BottomBox from './BottomBox'
import AppBar from './AppBar'
import Button from './Button'
import Score from './Score'

const translate = require('../Api');
const Wrap=styled.div`

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
  div{
    width:60px;
    height:60px;
    border:white 5px solid;
    border-radius:100%;
    margin:8px;
  }
`;
const Result=styled.div`
  font-weight:700;
  font-size:38px;
  text-align:center;
  margin:30px 0px 50px 0px;
  color:${props=>props.result==='틀렸습니다'?'red':'#04C000'}
`
const Answer=styled.div`
  font-weight: 700;
  font-size: 30px;

`
const AnswerWrap=styled.div`
  text-align:center;
  margin-top:50px;
  div{
    margin:30px;
  }
`

function Problem() {
  const answer='용의자';
  const english='suspect';
  const num = [...answer]
  const [text,setText]=useState('')
  const [result,setResult]=useState('')
  const [hint, setHint]=useState('')

  const onChange=(e)=>{
    setText(e.target.value)
  }

  const onSubmit=(e)=>{
    if(text){
      if(answer===text){
        setResult('정답입니다')
      }else{
        setResult('틀렸습니다')
      }
      setText('')
    }
  }

  const onKeyPress=(e)=>{
    if(e.key==='Enter'){
      onSubmit();
    }
  }

  async function getHint(query) {
    const translated = await translate(query);
    setHint(translated);
  }

  useEffect(() => {
    getHint(answer);
}, []);

  return (
    <Wrap>
      <AppBar></AppBar>
      <Score score='6'></Score>
      {result===''?
      <>
      <Hint>{hint}</Hint>
      <Hole>{num.map((idx)=><div key={idx}></div>)}</Hole>
      </>:
      <AnswerWrap>
        <Answer>{hint}</Answer>
        <div><img alt="arrow" src='/img/arrow.png'></img></div>
        <Answer style={{fontSize:'40px'}}>{english}</Answer>
        <div><img alt="arrow" src='/img/arrow.png'></img></div>
        <Answer style={{fontSize:'55px'}}>{answer}</Answer>
      </AnswerWrap>
      }
      <BottomBox>
        {result===''?
        <div style={{marginBottom:'20px'}}>
          <div style={{lineHeight:'49px',textAlign:'center',marginBottom:'20px',fontWeight:'700',fontSize:'21px'}}>정답을 입력해주세요.</div>
          <div style={{textAlign:'center',padding:'10px 0px 30px 0px'}}><input onChange={onChange} value={text} onKeyPress={onKeyPress} type='text' name='title' style={{width:'90%',border:'1px solid rgba(0, 0, 0, 0.2)',height:'50px',borderRadius:'10px',margin:'0px',textAlign:'center',fontSize:'20px'}} required></input></div>
        </div>:
        <Result result={result}>{result}</Result>}
      </BottomBox>
      {result===''?
      <Button onClick={onSubmit}>Submit</Button>:
      <Button>Next</Button>}
    </Wrap>
  )
}

export default Problem
