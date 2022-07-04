import './App.css';
import {BrowserRouter,Router,Route, Navigate, Routes} from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import SignInSide from './Components/Login/Login';
import { useState } from 'react';
import ManagementDashboardAccessControl from './Components/Hosting/ManagementDashboard/ManagementDashboardAccessControl';
import HostNewProperty from './Components/Hosting/NewProperty/HostNewProperty';
function App() {
  const [property, setProperty] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  return (
   <BrowserRouter>
     <Routes>
        <Route path='/' element={<Homepage helloWorld={(value)=> {setProperty(value)}} hiWorld={property}/>} />
        <Route path='/login' element={<SignInSide setLoggedIn = {(value)=>{setLoggedIn(value)}}/>} />
        <Route path='/hosting' element={<ManagementDashboardAccessControl isLoggedin={loggedIn} />} />
        <Route path='/hostproperty' element={<HostNewProperty isLoggedin = {loggedIn}/>} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
     </Routes>
   </BrowserRouter>
  );
}

export default App;
