import './App.css';
import {BrowserRouter,Router,Route, Navigate, Routes} from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import SignInSide from './Components/Login/Login';
import { useState } from 'react';
function App() {
  const [property, setProperty] = useState({})
  return (
   <BrowserRouter>
     <Routes>
        <Route path='/' element={<Homepage helloWorld={(value)=> {setProperty(value)}} hiWorld={property}/>} />
        <Route path='/login' element={<SignInSide />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
     </Routes>
   </BrowserRouter>
  );
}

export default App;
