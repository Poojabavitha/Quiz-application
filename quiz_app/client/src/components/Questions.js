import React, { useEffect, useState } from "react";
// import data from '../database/data.js';
import '../styles/Quiz.css';
import useFetchQuestion from '../hooks/FetchQuestions.js';// custom hook
import { useDispatch, useSelector } from "react-redux";
import { updateResult } from "../hooks/setResult.js";


const Questions = function Questions({onChecked}){

     const [checked,setChecked]=useState(undefined)
     const {trace} = useSelector(state=> state.questions);
     const result = useSelector(state=> state.result.result);
     const [{ isLoading, serverError}] = useFetchQuestion()
    //  useSelector(state=> console.log(state));
    //  const question =  data[0]

     const questions= useSelector(state =>state.questions.queue[state.questions.trace])
     const dispatch = useDispatch()
    //  const trace =useSelector(state =>state.questions.trace)

     useEffect(()=>{
      // console.log({trace,checked});
      dispatch(updateResult({trace, checked}))
     },[checked])

    //  useEffect(()=>{
    //      console.log(question);
    //      console.log(isLoading);
    //      console.log(apidata);
    //     console.log(serverError);8
    //  })
      function onSelect(i)
        {
           onChecked(i)
          setChecked(i)
          dispatch(updateResult({trace, checked}))
        }
      
          if (isLoading) return <h3 className="text-light">isLoading</h3>
          if (serverError) return <h3 className="text-light">{serverError || "Unknown Error"}</h3>

    return(
        <div className="questions">

            <h2 className="text-light">{questions?.question}</h2>
            <ul  key={questions?.id}>
             {
                questions?.options.map((q,i)=>(
                    <li key={i}>
                    <input type="radio"
                    value={checked}
                    name="options"
                    id={`q${i}-option`}
                    onChange={()=>onSelect(i)}/>
                  
                <label className="text-primary" htmlFor={`q${i}-option`}>{q}</label>   
                 <div className={`check ${result[trace] === i ? 'checked': ''}`}></div>   
                </li>
                ))
             }
            </ul>
        </div>
    )
}

export default Questions;
