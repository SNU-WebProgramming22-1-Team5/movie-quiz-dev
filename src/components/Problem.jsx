import React,{useEffect,  useState} from 'react'
import styled,{keyframes} from 'styled-components'
import BottomBox from './BottomBox'
import AppBar from './AppBar'
import Button from './Button'
import Progress from './Progress'
import { useNavigate } from 'react-router-dom'
import hangul from 'hangul-js'

const Wrap=styled.div`
  min-height:900px;
`;

const Hint=styled.div`
  font-weight: 700;
  font-size: 38px;
  text-align:center;
  padding:100px 0px 80px 0px;
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
    margin:30px 0px;
  }
`;

const rotator = keyframes`
  0% {
    -webkit-transform: rotate(-45deg) translateZ(0);
    transform: rotate(-45deg) translateZ(0);
  }
  100% {
    -webkit-transform: rotate(315deg) translateZ(0);
    transform: rotate(315deg) translateZ(0);
  }
`;

const Loading=styled.div`
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  img{
    widht:70px;
    height:70px;
    animation-name: ${rotator};
    animation-iteration-count: infinite;
    animation-duration: 3s;
  }
  div{
    text-align:center;
    font-size:20px;
    margin-top:20px;
  }
`;
const AddHint=styled.div`
  font-size:30px;
  text-align:center;
`;

const HintClick=styled.div`
  text-align:center;
  margin-top:90px;
  text-decoration:underline;
`;
const Timer=styled.div`
  height:50px;
  line-height:50px;
  text-align:center;
  font-size:30px;
  margin-top:20px;
`;

function Problem(props) {
  const loading=props.loading;
  const navigate=useNavigate();
  const quiz=props.quiz;
  const index=props.index+1;
  const [answer,setAnswer]=useState('')
  const [english,setEnglish]=useState('')
  const [hint, setHint]=useState('');
  const num = (answer?[...answer]:'')
  const [text,setText]=useState('');
  const [result,setResult]=useState('');
  const [present,setPresent]=useState('problem');  
  const [correct,setCorrect]=useState(0);
  const [addHint,setAddHint]=useState('')
  const [consonant,setConsonant]=useState('')
  const [time,setTime]=useState('1:00')

  useEffect(()=>{
    const timer=setInterval(()=>{
      if(present==='problem'){
          const sec=time.slice(2,4)
          const min=time.slice(0,1)
          if(sec==='00'){
            const timeRef=`${min-1}`.concat(':').concat('59')
            setTime(timeRef)
          }else if(parseInt(sec)<11){
            const timeRef=min.concat(':').concat(`0${sec-1}`)
            setTime(timeRef)
          }else{
            const timeRef=min.concat(':').concat(`${sec-1}`)
            setTime(timeRef)
          }

      }
  },1000)

    return ()=>clearInterval(timer)
  },[time,present])
  useEffect(()=>{
    if(time==='0:00'){
      navigate("/Result", {state: {correct:correct,time:parseInt((time.slice(0,1)==='1'?60:time.slice(2,4)))}}) 
    }
  },[navigate,time,correct])

  const onChange=(e)=>{
    setText(e.target.value)
  }
  useEffect(()=>{
    if(quiz){
      setAnswer(quiz.title_ans)
      setEnglish(quiz.title_eng)
      setHint(quiz.title_hint)
    }
  },[quiz])

  window.onkeydown=(e)=>{
    if(present==='result'&&e.key==="Enter"){
      nextProblem();
    }
  }

    
  const onSubmit=()=>{
    if(text){
      if(answer===text){
        setResult('정답입니다')
        setCorrect(correct+1)
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

  useEffect(()=>{
    setConsonant('')
    setAddHint('')
  },[index])

  const nextProblem=()=>{
    if(index===10){
      navigate("/Result", {state: {correct:correct,time:parseInt((time.slice(0,1)==='1'?60:time.slice(2,4)))}})
    }
    props.onClick()
    setPresent('problem')
  }

  const handleAddHint=()=>{
    const hangleArray=hangul.d(quiz.title_ans,true)
    let str=''
    hangleArray.map((hangle)=>
      str+=hangle[0]
    )
      
    setConsonant(str)
    setAddHint('show')
  }
  return (
    <Wrap>
      <AppBar></AppBar>
      <Progress state={index}></Progress>
      <Timer>⏰ {time}</Timer>
      {loading?
        <>
          {present==='problem'?
          <>
          <Hint>{hint}</Hint>
          {addHint?<AddHint>{consonant}</AddHint>:
          <>
            {num?
            <>
              <Hole>
                {num.map((hole,index)=>hole===' '?<div className='blank' key={index}></div>:<div className='hole'key={index}></div>)}
              </Hole>
              <HintClick onClick={handleAddHint}>힌트보기</HintClick>
            </>
            :null}
          </>}
          </>:
          <AnswerWrap>
            <Answer>{hint}</Answer>
            <div><img alt="arrow"  src={process.env.PUBLIC_URL+'/img/arrow.png'}></img></div>
            <Answer style={{fontSize:'30px'}}>{english}</Answer>
            <div><img alt="arrow"  src={process.env.PUBLIC_URL+'/img/arrow.png'}></img></div>
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
        </>
        :
        <Loading>
          <div><img alt="img" src={process.env.PUBLIC_URL + `/img/loading.png`}></img></div>
          <div>문제를 준비중입니다</div>
        </Loading>
        
      }
      
      
    </Wrap>
  )
}

export default Problem