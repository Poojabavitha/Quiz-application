import {useEffect,useState} from 'react';
import {useDispatch} from 'react-redux';
// import data, {answers} from '../database/data';
import { getServerData } from '../helper/helper';

// redux actions
import *as Action from '../redux/question_reducer';

const useFetchQuestion =()=>{
    const dispatch = useDispatch();
   const [getData, setGetData] = useState({isLoading: false, apidata: [], serverError: null })

    useEffect(()=> {
     setGetData (prev=>({...prev, isLoading: true}));
    
 
    (async()=>{
        try{
            
            // let question = await data;
            const [{questions, answers}] =await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data)=> data)
             console.log({questions, answers});
              
            if(questions.length >0){
                setGetData(prev=>({...prev, isLoading: false}));
                setGetData(prev=>({...prev, apidata: questions}));

                dispatch(Action.startExamAction({question: questions, answers}))
            }
            else{
                throw new Error("No Question Available");
            }
        }        catch(error){

            setGetData (prev=>({...prev, isLoading: false}));
            setGetData (prev=>({...prev, serverError : error})); 
        }
    })();
},[dispatch]);

return[getData,setGetData]
}

export const moveNextQusetion = ()=> async(dispatch)=>{
    try{
      dispatch(Action.moveNextAction())
    }catch(error){
       console.log(error);
        
    }
}

export const movePrevQusetion = ()=> async(dispatch)=>{
    try{
      dispatch(Action.movePrevAction())
    }catch(error){
       console.log(error);
          
    }
}




export default useFetchQuestion;