import '../styles/App.css';
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';

import {BrowserRouter,Routes,Route} from 'react-router-dom'


function App ()
  {
    return(
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/quiz' element={<CheckUserExist><Quiz/></CheckUserExist>}/>
        <Route path='/result' element={<CheckUserExist><Result/></CheckUserExist>}/>
      </Routes>
      </BrowserRouter>
    )
  }

 

  


export default App;
