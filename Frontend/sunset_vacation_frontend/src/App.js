import './App.css';
import {BrowserRouter,Router,Route, Navigate, Routes} from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import { useState } from 'react';
import ManagementDashboardAccessControl from './Components/Hosting/ManagementDashboard/ManagementDashboardAccessControl';
import HostNewProperty from './Components/Hosting/NewProperty/HostNewProperty';
import ShowCatagory from './Components/Hosting/ShowProperty/ShowCatagory';
import ShowDescription from './Components/Hosting/ShowProperty/ShowDescription';
import ShowFacility from './Components/Hosting/ShowProperty/ShowFacility';
import ShowFaq from './Components/Hosting/ShowProperty/ShowFaq';
import ShowLocation from './Components/Hosting/ShowProperty/ShowLocation';
import ShowPropertyList from './Components/Hosting/ShowProperty/ShowPropertyList';
import ShowPropertyDetails from './Components/Hosting/ShowProperty/ShowPropertyDetails';
import ADDNewFacility from './Components/Hosting/ShowProperty/ADDnewFacility';
import axios from 'axios';
import { BASE_URL } from './Utils';
import Signup from './Components/Authentication/Signup';
import Login from './Components/Authentication/Login';

import * as React from 'react';
export const axios_api = axios.create({
  baseURL: BASE_URL
})




function App() {
  const [property, setProperty] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({})
  const [token, setToken] = useState("")
  const [selectedProperty, setSelectedProperty] = useState('');

  const [selectedAmenityList, setSelectedAmenityList] = React.useState([]);
  const [selectedGuestsFavouriteItemList, setSelectedGuestsFavouriteItemList] = React.useState([]);
  const [selectedSafetyItemList, setSelectedSafetyItemList] = React.useState([]);

  const handleSetSelectedAmenityList = (val) => {
    let amenities = [...selectedAmenityList];
    let idx = amenities.indexOf(val);
    if(idx === -1){
        amenities.push(val);
        setSelectedAmenityList(amenities);
    }
    else{
        amenities.splice(idx, 1);
        setSelectedAmenityList(amenities);
    }
}

const handleSelectedGuestsFavouriteItemList = (val) => {
    let favs = [...selectedGuestsFavouriteItemList];
    let idx = favs.indexOf(val);
    if(idx === -1){
        favs.push(val);
        setSelectedGuestsFavouriteItemList(favs);
    }
    else{
        favs.splice(idx,1);
        setSelectedGuestsFavouriteItemList(favs);
    }
}

const handleSetSelectedSafetyItemList = (val) => {
    let safetyItem = [...selectedSafetyItemList];
    let idx = safetyItem.indexOf(val);
    if(idx === -1){
        safetyItem.push(val);
        setSelectedSafetyItemList(safetyItem);
    }
    else{
        safetyItem.splice(idx, 1);
        setSelectedSafetyItemList(safetyItem);
    }
}

  return (
   <BrowserRouter>
     <Routes>
        <Route path='/' element={<Homepage helloWorld={(value)=> {setProperty(value)}} hiWorld={property}/>} />
        <Route path='/login' element={<Login isLoggedin={loggedIn}  setLoggedIn = {(value)=>{setLoggedIn(value)}} setUser = {(value) => {setUser(value)}} setToken = {(t) => {setToken(t)}}/>} />
        <Route path='/signup' element={<Signup isLoggedin={loggedIn} setLoggedIn = {(value)=>{setLoggedIn(value)}} setUser = {(value) => {setUser(value)}} setToken = {(t) => {setToken(t)}}/>} />
        <Route path='/hosting' element={<ManagementDashboardAccessControl token = {token} isLoggedin={loggedIn} />} />
        <Route path='/hostproperty' element={<HostNewProperty isLoggedin = {loggedIn} token = {token}/>} />
  
        <Route path='/showProperties' element={<ShowPropertyList setProperty={(p)=>{setProperty(p)}}/>} />
        <Route path='/showPropertyDetails' element={<ShowPropertyDetails property={property}  setProperty={(p)=>{setProperty(p)}}/>}/>
        <Route path='/showPropertyDetails/location' element={<ShowLocation property={property}/>}/>
        <Route path='/showPropertyDetails/description' element={<ShowDescription property={property}/>}/>
        <Route path='/showPropertyDetails/faq' element={<ShowFaq property={property}/>}/>
        <Route path='/showPropertyDetails/facility' element={<ShowFacility property={property} token = {token}/>}/>
        <Route path='/showPropertyDetails/catagory' element={<ShowCatagory property={property}/>}/>
        <Route path='/addnewfacility' element={<ADDNewFacility property={property} 
        token = {token}
        selectedAmenityList = {selectedAmenityList}
        selectedGuestsFavouriteItemList = {selectedGuestsFavouriteItemList}
        selectedSafetyItemList = {selectedSafetyItemList}
        setSelectedAmenityList = {(val) => {handleSetSelectedAmenityList(val)}}
        setSelectedGuestsFavouriteItemList = {(val) => {handleSelectedGuestsFavouriteItemList(val)}}
        setSelectedSafetyItemList = {(val) => {handleSetSelectedSafetyItemList(val)}}
        empty ={()=>{
          setSelectedAmenityList([]);
          setSelectedGuestsFavouriteItemList([]);
          handleSetSelectedSafetyItemList([]);
        }}
        />}/>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
     </Routes>
   </BrowserRouter>
  );
}

export default App;
