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
import Redirect from './Components/Hosting/ShowProperty/Redirect';
import AddFacilityDescription from './Components/Hosting/ShowProperty/AddFacilityDescription';
import Editfacility from './Components/Hosting/ShowProperty/EditFacility';
import Offer from './Components/Hosting/Offer&Giftcard/Offer';
import OfferConfirmation from './Components/Hosting/Offer&Giftcard/OfferConfirmation';
import ShowOffer from './Components/Hosting/Offer&Giftcard/ShowOffer';
import SearchPage from './Components/Homepage/SearchPage';
import SearchResult from './Components/Homepage/SearchResult';

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
  const [selectedFac,setSelectedFac]=useState('');
  var [flags,setFlags]=useState("");
  const [selectedAmenityList, setSelectedAmenityList] =useState([]);
    const [selectedGuestsFavouriteItemList, setSelectedGuestsFavouriteItemList] = useState([]);
    const [selectedSafetyItemList, setSelectedSafetyItemList] = useState([]);
    const [selectedFacility,setSelectedFacility]=useState(0);
  
    function handleSetSelectedAmenityList (val)  {
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
  
  function handleSetSelectedGuestsFavouriteItemList  (val) {
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
  
  function handleSetSelectedSafetyItemList  (val) {
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
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login isLoggedin={loggedIn}  setLoggedIn = {(value)=>{setLoggedIn(value)}} setUser = {(value) => {setUser(value)}} setToken = {(t) => {setToken(t)}}/>} />
        <Route path='/signup' element={<Signup isLoggedin={loggedIn} setLoggedIn = {(value)=>{setLoggedIn(value)}} setUser = {(value) => {setUser(value)}} setToken = {(t) => {setToken(t)}}/>} />
        <Route path='/hosting' element={<ManagementDashboardAccessControl token = {token} isLoggedin={loggedIn} />} />
        <Route path='/hostproperty' element={<HostNewProperty isLoggedin = {loggedIn} token = {token}/>} />
  
        <Route path='/showProperties' element={<ShowPropertyList setProperty={(p)=>{setProperty(p)}} setflags={(val)=>{setFlags(val)}}  token = {token}/>} />
        <Route path='/showPropertyDetails' element={<ShowPropertyDetails property={property}  setProperty={(p)=>{setProperty(p)}}/>}/>
        <Route path='/showPropertyDetails/location' element={<ShowLocation property={property}/>}/>
        <Route path='/showPropertyDetails/description' element={<ShowDescription property={property}/>}/>
        <Route path='/showPropertyDetails/faq' element={<ShowFaq property={property} setflags={(val)=>{setFlags(val)}}  token={token}/>}/>
        <Route path='/showPropertyDetails/facility' element={<ShowFacility property={property} selectedFacility={selectedFacility}
        setSelectedFacility={(val)=>{setSelectedFacility(val)}}
        setflags={(val)=>{setFlags(val)}}  token = {token}/>}/>
        <Route path='/showPropertyDetails/catagory' element={<ShowCatagory property={property}/>}/>
        <Route path='/showProperty/Redirect' element={<Redirect flags={flags} property={property} setflags={(val)=>{setFlags(val)}}  token = {token} />}/>
        <Route path='/addnewfacility' element={<ADDNewFacility property={property} 
        token = {token}
        empty={()=>{
          setSelectedAmenityList([]);
          setSelectedSafetyItemList([]);
        setSelectedGuestsFavouriteItemList([]);}}
        selectedAmenityList={selectedAmenityList}
        selectedGuestsFavouriteItemList={selectedGuestsFavouriteItemList}
        selectedSafetyItemList={selectedSafetyItemList}
        setSelectedAmenityList={(val)=>{handleSetSelectedAmenityList(val)}}
        setSelectedGuestsFavouriteItemList={(val)=>{handleSetSelectedGuestsFavouriteItemList(val)}}
        setSelectedSafetyItemList={(val)=>{handleSetSelectedSafetyItemList(val)}} />}/>
        <Route path='/addnewfacility/addFacilityDescription' element={<AddFacilityDescription property={property} 
                token = {token}
                empty={()=>{
                  setSelectedAmenityList([]);
                  setSelectedSafetyItemList([]);
                setSelectedGuestsFavouriteItemList([]);}}
                selectedAmenityList={selectedAmenityList}
                selectedGuestsFavouriteItemList={selectedGuestsFavouriteItemList}
                selectedSafetyItemList={selectedSafetyItemList}
                />}/>
        <Route path='/Editfacility' element={<Editfacility selectedFacility={selectedFacility} property={property} token={token}/>}/>
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
        <Route path='/createOffer' element={<Offer property={property} token={token}/>}/>
        <Route path='/showOffers' element={<ShowOffer property={property} token={token}/>}/>
        <Route path='/confirmOffer' element={<OfferConfirmation/>}/>
        <Route path='/search' element={<SearchPage  setflags={(val)=>{setFlags(val)}} setSelectedFac={(f)=>{setSelectedFac(f)}} token={token}/>}/>
        <Route path='/searchResult' element={<SearchResult selectedFac={selectedFac}  setflags={(val)=>{setFlags(val)}}  setSelectedFac={(f)=>{setSelectedFac(f)}} />}/>
       
     </Routes>
   </BrowserRouter>
  );
}

export default App;
