import React, { useState } from "react"; 
import Questions from "./Questions";
import '../styles/Quiz.css';
import {useSelector, useDispatch} from 'react-redux';
import { moveNextQusetion, movePrevQusetion } from "../hooks/FetchQuestions";
import pushAnswer from '../hooks/setResult';
import {Navigate} from 'react-router-dom';

 const Quiz =function Quiz() {

   const [check, setChecked] = useState(undefined)
   const result= useSelector(state =>state.result.result);
   const {queue, trace}= useSelector(state =>state.questions);
   const dispatch = useDispatch()

//    useEffect(()=>{
//     console.log(result);
    
//    })
    function onPrev(){
         if(trace>0){
            dispatch(movePrevQusetion()) 
         }
         }
    function onNext(){
        // console.log('on onNext click');
        if(trace<queue.length){
        dispatch(moveNextQusetion()); 

        /*inserting the trace value*/
        if(result.length <= trace){
            dispatch(pushAnswer(check));
         
        }
    }   /* update the trace value*/

    /* RESET THE VALUE OF THE CHECKED VARIABLE */
    setChecked(undefined);
   }

   function onChecked(check){
    // console.log(check);
    setChecked(check)
    
   }
   // Finishing Exam
   if(result.length && result.length>=queue.length){
    return <Navigate to ={'/result'} replace={true}></Navigate>
   }

    return (
        <div className="container">
            <h3 className="title">Quiz Application</h3>
            <Questions onChecked={onChecked}/>
    <div className="grid" >
        { trace>0 ? <button className="btn-prev" onClick={onPrev}>Previous</button> : <div></div>}
        <button className="btn-next" onClick={onNext}>Next</button>
    </div>
            </div>
    )
}



export default Quiz;