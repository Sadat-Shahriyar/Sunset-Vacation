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
import Notification from "./Components/Hosting/ManagementDashboard/Notifications";
import ShowNotification from "./Components/Hosting/ManagementDashboard/ShowNotification";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import SearchPage from './Components/Homepage/SearchPage';
import SearchResult from './Components/Homepage/SearchResult';
import UserStaticSearch from './Components/Homepage/UserStaticSearch';
import ShowMore from './Components/Homepage/ShowMore';
import GiftCard from './Components/Hosting/Offer&Giftcard/GiftCard';

import * as React from 'react';
import PropertyDetailsForBooking from './Components/Booking/PropertyDetails';
import PropertyReservation from './Components/Booking/PropertyReservation';
import BookingConfirm from './Components/Booking/BookingConfirm';

import ShowGiftcard from './Components/Hosting/Offer&Giftcard/ShowGiftcard';
import HomePageSearchResult from './Components/Homepage/HomePageSearchResult';
import ContactHost from './Components/Booking/ContactHost';
import Inbox from './Components/Messaging/Inbox';
import ReplyMessage from "./Components/Messaging/ReplyMessage";
import InboxNavbar from "./Components/Messaging/InboxNavbar";
import Profile from './Components/Profile/Profile';
import MyBookings from './Components/Profile/MyBookings/MyBookings';
import BookingDetails from './Components/Profile/MyBookings/BookingDetails';
import HostingBookingDetails from './Components/Hosting/ManagementDashboard/HostingBookingDetails';
import SeePropertyDetails from './Components/Hosting/ManagementDashboard/SeePropertyDetails';
import AdminControl from './Components/Admin/AdminControl';

import ForumAccessControl from './Components/QAForum/ForumAccessControl';
import ForumHome from './Components/QAForum/ForumHome';
import CreatePost from './Components/QAForum/CreatePost';
import MyPost from './Components/QAForum/MyPost';
import EditPost from './Components/QAForum/EditPost';

import ShowUserGiftCard from './Components/Homepage/ShowUserGiftCard';

export const axios_api = axios.create({
  baseURL: BASE_URL
})


const dummyFunc = ({match}) => {
  console.log("hello");
  let booking_id = match.params.id;
  console.log(booking_id);
  return (<BookingDetails id={booking_id}/>);
}


function App() {
  const [property, setProperty] = useState({});
  const [booking, setBooking] = useState({});
  const [notification, setNotification] = useState({});
  const [admin, setAdmin] = useState(sessionStorage.getItem("isAdmin"));
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn"));
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedFac,setSelectedFac]=useState('');
  const [display,setDisplay]=useState('none');
  var [flags,setFlags]=useState("");
  const [userStaticSearch,setStaticUserSearch]=useState({});
  const [selectedAmenityList, setSelectedAmenityList] =useState([]);
  const [selectedGuestsFavouriteItemList, setSelectedGuestsFavouriteItemList] = useState([]);
  const [selectedSafetyItemList, setSelectedSafetyItemList] = useState([]);
  const [selectedFacility,setSelectedFacility]=useState(0);

  const [searchresults, setSearchResults] = useState([]);
  const [showMore,setShowMore]=useState({});
  const [homepagesearch,setHomepagesearch]=useState({});
  const [reply, setReply] = useState(false);

  const [selectedQuestionForEdit,setSelectedQuestionForEdit]=useState();

// ************************* For booking details page *********************
  const [selectedPropertyForDetails, setSelectedPropertyForDetails] = useState(-1);
  const [checkInDate, setCheckInDate] = useState(new Date());
  let today = new Date();
  today.setDate(today.getDate() + 5);
  let tempDate = new Date(today);
  const [checkOutDate, setCheckOutDate] = useState(tempDate);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [offers, setOffers] = useState([]);

  // ******************************* end ********************************

  // ********************************* Login page redirection url*************************************
  const [loginRedirection, setLoginRedirection] = useState('/')
  // ******************************* end ********************************

  //***********************************check out form***************************
  const [receipt, setReceipt] = useState("");
  // ******************************* end ********************************


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
        <Route path='/' element={<Homepage token={token} isLoggedin={loggedIn} setflags={(val)=>{setFlags(val)}}  setHomepagesearch={(val)=>{setHomepagesearch(val)}} setLoginRedirection={(val) => {setLoginRedirection(val)}}/>} />
        <Route path='/login' element={<Login setAdmin={(val)=>{setAdmin(val)}} loginRedirection={loginRedirection} isLoggedin={loggedIn}  setLoggedIn = {(value)=>{setLoggedIn(value)}} setUser = {(value) => {setUser(value)}} setToken = {(t) => {setToken(t)}}/>} />
        <Route path='/signup' element={<Signup loginRedirection={loginRedirection} isLoggedin={loggedIn} setLoggedIn = {(value)=>{setLoggedIn(value)}} setUser = {(value) => {setUser(value)}} setToken = {(t) => {setToken(t)}}/>} />
        <Route path='/hosting' element={<ManagementDashboardAccessControl token = {token} isLoggedin={loggedIn} setLoginRedirection={(val) => {setLoginRedirection(val)}} />} />
        <Route path='/hostproperty' element={<HostNewProperty isLoggedin = {loggedIn} token = {token}/>} />
        <Route path='/admin' element={<AdminControl setLoggedIn = {(value)=>{setLoggedIn(value)}}  setToken = {(t) => {setToken(t)}}  setSelectedPropertyForDetails={(val)=>{setSelectedPropertyForDetails(val)}} setProperty={(p)=>{setProperty(p)}}/>}/>
        <Route path='/notification' element={<Notification token={token} setNotification={(notification)=>setNotification(notification)}/>}/>
        <Route path='/showNotification' element={<ShowNotification notification={notification} setNotification={(notification)=>setNotification(notification)} token={token}/>}/>
        <Route path='/showProperties' element={<ShowPropertyList setProperty={(p)=>{setProperty(p)}} setflags={(val)=>{setFlags(val)}}  token = {token}/>} />
        <Route path='/showPropertyDetails' element={<ShowPropertyDetails token = {token} property={property}  setProperty={(p)=>{setProperty(p)}}/>}/>
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
        <Route path='/showOffers' element={<ShowOffer setflags={(val)=>{setFlags(val)}} property={property} token={token}/>}/>
        <Route path='/confirmOffer' element={<OfferConfirmation/>}/>

        <Route path='/search' element={<SearchPage isLoggedin={loggedIn} setHomepagesearch={(val)=>{setHomepagesearch(val)}} setSelectedPropertyForDetails={(val)=>{setSelectedPropertyForDetails(val)}} setShowMore={(val)=>{setShowMore(val)}} searchresults={searchresults} setSearchResults={(val)=>{setSearchResults(val)}} setflags={(val)=>{setFlags(val)}} setSelectedFac={(f)=>{setSelectedFac(f)}} display={display} setDisplay={(val)=>{setDisplay(val)}} setStaticUserSearch={(v)=>{setStaticUserSearch(v)}} token={token}/>}/>
        <Route path='/searchResult' element={<SearchResult isLoggedin={loggedIn} setHomepagesearch={(val)=>{setHomepagesearch(val)}} setShowMore={(val)=>{setShowMore(val)}} searchresults={searchresults} setSearchResults={(val)=>{setSearchResults(val)}} userStaticSearch={userStaticSearch} selectedFac={selectedFac} display={display} setDisplay={(val)=>{setDisplay(val)}}  setflags={(val)=>{setFlags(val)}} setStaticUserSearch={(v)=>{setStaticUserSearch(v)}} setSelectedFac={(f)=>{setSelectedFac(f)}}  token={token} />}/>
        <Route path='/userStaticSearch' element={<UserStaticSearch isLoggedin={loggedIn} setShowMore={(val)=>{setShowMore(val)}} searchresults={searchresults} setSearchResults={(val)=>{setSearchResults(val)}} userStaticSearch={userStaticSearch} selectedFac={selectedFac} display={display} setDisplay={(val)=>{setDisplay(val)}}  setflags={(val)=>{setFlags(val)}} setStaticUserSearch={(v)=>{setStaticUserSearch(v)}} setSelectedFac={(f)=>{setSelectedFac(f)}}  token={token} />} />
        <Route path='/showmore'  element={<ShowMore isLoggedin={loggedIn} setShowMore={(val)=>{setShowMore(val)}} searchresults={searchresults} setSearchResults={(val)=>{setSearchResults(val)}} setflags={(val)=>{setFlags(val)}} setSelectedFac={(f)=>{setSelectedFac(f)}} display={display} setDisplay={(val)=>{setDisplay(val)}} setStaticUserSearch={(v)=>{setStaticUserSearch(v)}} token={token} showMore={showMore}/>}/>
        <Route path='/giftcard' element={<GiftCard token={token}/>}/>
                  

        {/* <Route path='/search' element={<SearchPage setSelectedPropertyForDetails={(val) => {setSelectedPropertyForDetails(val)}}  setflags={(val)=>{setFlags(val)}} setSelectedFac={(f)=>{setSelectedFac(f)}} display={display} setDisplay={(val)=>{setDisplay(val)}} token={token}/>}/>
        <Route path='/searchResult' element={<SearchResult selectedFac={selectedFac}  setflags={(val)=>{setFlags(val)}}  setSelectedFac={(f)=>{setSelectedFac(f)}} />}/> */}
        <Route 
          path='/booking/property/details' 
          element={
              <PropertyDetailsForBooking 
                selectedPropertyForDetails={selectedPropertyForDetails}
                checkInDate = {checkInDate}
                checkOutDate = {checkOutDate}
                setCheckInDate = {(val) => {setCheckInDate(val)}}
                setCheckOutDate = {(val) => {setCheckOutDate(val)}}
                adults = {adults}
                setAdults = {(val) => {setAdults(val)}}
                children = {children}
                setChildren = {(val) => {setChildren(val)}}
                infants = {infants}
                setInfants = {(val) => {setInfants(val)}}
                setLoginRedirection={(val) => {setLoginRedirection(val)}}
                token = {token}
                isLoggedin={loggedIn}
                setLoggedIn = {(value)=>{setLoggedIn(value)}}
                setUser = {(value) => {setUser(value)}}
                setToken = {(t) => {setToken(t)}}
                setOffers = {(val) => {setOffers(val)}}
                offers = {offers}
              />
          } 
          />
          <Route 
            path='/booking/property/reserve' 
            element={
              <PropertyReservation 
                selectedPropertyForDetails={selectedPropertyForDetails}
                checkInDate = {checkInDate}
                checkOutDate = {checkOutDate}
                setCheckInDate = {(val) => {setCheckInDate(val)}}
                setCheckOutDate = {(val) => {setCheckOutDate(val)}}
                adults = {adults}
                setAdults = {(val) => {setAdults(val)}}
                children = {children}
                setChildren = {(val) => {setChildren(val)}}
                infants = {infants}
                setInfants = {(val) => {setInfants(val)}}
                setLoginRedirection={(val) => {setLoginRedirection(val)}}
                token = {token}
                isLoggedin={loggedIn}
                setLoggedIn = {(value)=>{setLoggedIn(value)}}
                setUser = {(value) => {setUser(value)}}
                setToken = {(t) => {setToken(t)}}
                setReceipt={(val) => {setReceipt(val)}}
                offers = {offers}
              />
            }
          />
          <Route 
            path='/booking/property/confirm'
            element={
              <BookingConfirm
                receipt={receipt}
                setCheckInDate = {(val) => {setCheckInDate(val)}}
                setCheckOutDate = {(val) => {setCheckOutDate(val)}}
                setAdults = {(val) => {setAdults(val)}}
                setChildren = {(val) => {setChildren(val)}}
                setInfants = {(val) => {setInfants(val)}}
              />
            }
          />

          <Route 
            path='/booking/property/contacthost' 
            element={
              <ContactHost 
                selectedPropertyForDetails={selectedPropertyForDetails}
                setLoginRedirection={(val) => {setLoginRedirection(val)}}
                token = {token}
                isLoggedin={loggedIn}
                setLoggedIn = {(value)=>{setLoggedIn(value)}}
                setUser = {(value) => {setUser(value)}}
                setToken = {(t) => {setToken(t)}}
              />
            }
          />

        <Route  path='/showGiftcard'  element={<ShowGiftcard setflags={(val)=>{setFlags(val)}} token={token}/>}/>

        <Route path='/forum' element={<ForumAccessControl token = {token} isLoggedin={loggedIn} setLoginRedirection={(val) => {setLoginRedirection(val)}} />} />

        <Route  path='/showUserGiftcard'  element={<ShowUserGiftCard setSelectedPropertyForDetails={(val)=>{setSelectedPropertyForDetails(val)}} isLoggedin={loggedIn}  token={token}/>}/>

        <Route path='/forumHome' element={<ForumHome token={token} setflags={(val)=>{setFlags(val)}}   setSelectedPropertyForDetails={(val)=>{setSelectedPropertyForDetails(val)}} />}/>
        <Route path='/createPost' element={<CreatePost token={token} />}/>
        <Route path='/editPost' element={<EditPost selectedQuestionForEdit={selectedQuestionForEdit} token={token} />}/>
        <Route path='/forumMyhome' element={<MyPost token={token} setSelectedQuestionForEdit={(val)=>{setSelectedQuestionForEdit(val)}} setflags={(val)=>{setFlags(val)}}   setSelectedPropertyForDetails={(val)=>{setSelectedPropertyForDetails(val)}} />}/>
        <Route path='/homepagesearchresult' element={<HomePageSearchResult isLoggedin={loggedIn} setHomepagesearch={(val)=>{setHomepagesearch(val)}} setSelectedPropertyForDetails={(val)=>{setSelectedPropertyForDetails(val)}} setShowMore={(val)=>{setShowMore(val)}} searchresults={searchresults} setSearchResults={(val)=>{setSearchResults(val)}} userStaticSearch={userStaticSearch} selectedFac={selectedFac} display={display} setDisplay={(val)=>{setDisplay(val)}}  setflags={(val)=>{setFlags(val)}} setStaticUserSearch={(v)=>{setStaticUserSearch(v)}} setSelectedFac={(f)=>{setSelectedFac(f)}} homepagesearch={homepagesearch}/>}/>
       
        <Route 
          path='/inbox' 
          element={
            <Inbox 
              token = {token}
              isLoggedin={loggedIn}
              setReply={(val)=>{setReply(val)}}
              reply={reply}
            />
          }
        />
         {/*<Route*/}
         {/*    path='/messageThread'*/}
         {/*    element={*/}
         {/*        <ReplyMessage*/}
         {/*            token = {token}*/}
         {/*            isLoggedin={loggedIn}*/}
         {/*            setMessageToReply={(val)=>{setMessageToReply(val)}}*/}
         {/*        />*/}
         {/*    }*/}
         {/*/>*/}

        <Route 
          path='/profile' 
          element={
            <Profile 
              token = {token}
              isLoggedin={loggedIn}
            />
          }
        />
        <Route 
          path='/my-bookings' 
          element={
            <MyBookings 
              token = {token}
              isLoggedin={loggedIn}
            />
          }
        />

        <Route 
          path='/booking/details/:booking_id' 
          element={
            <BookingDetails 
              token = {token}
              isLoggedin={loggedIn}
              setSelectedPropertyForDetails={(val)=>{setSelectedPropertyForDetails(val)}} 
            />
          }
        />

        <Route 
          path='/hosting/booking/details/:booking_id' 
          element={
            <HostingBookingDetails 
              token = {token}
              isLoggedin={loggedIn}
            />
          }
        />

        <Route 
          path='/hosting/propertydetails/:property_id' 
          element={
            <SeePropertyDetails 
              token = {token}
              isLoggedin={loggedIn}
            />
          }
        />
     </Routes>
   </BrowserRouter>
  );
}

export default App;
