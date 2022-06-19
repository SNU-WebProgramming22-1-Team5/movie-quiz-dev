import React,{useEffect, useState} from 'react'
// import styled from 'styled-components'
import {getQuiz,getRandomNumArray} from "../firebase.js";
import Problem from './Problem';

function Quiz() {
  const [quizes, setQuiz] = useState([]);
  const [index,setIndex]=useState(0)
  const [loading,setLoading]=useState('')

  const setMyQuiz = () => {
    getQuiz(getRandomNumArray()).then(result => {
        setQuiz(result);
        setLoading("complete")
    })
  }
  useEffect(()=>setMyQuiz(),[])
  const nextProblem=()=>{
    setIndex(index+1)
  }

  return (
    <>
      {loading===''?'':<Problem answer={quizes[index]} index={index} onClick={nextProblem}/>}
    </>
  )
}

export default Quiz