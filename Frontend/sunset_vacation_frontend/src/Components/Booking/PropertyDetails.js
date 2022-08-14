import * as React from 'react';
import Box from '@mui/material/Box';
import { axios_api } from '../../App';
import CommonNavbar from './Navbar';
import CircularIndeterminate from './CircularProgress';
import { Card, CardContent, FormControl, Grid, List, ListItem, ListItemButton, ListItemText, Paper, TextField, Typography } from '@mui/material';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import ShowNavBar from './ShowNavbar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import ClearIcon from '@mui/icons-material/Clear';
import ShowOffer from './ShowOffers';
import Divider from '@mui/material/Divider';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import Rating from '@mui/material/Rating';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

function ReservationCard(props){
    console.log(props.token);
    const checkInMinDate = new Date();
    let today = new Date();
    today.setDate(today.getDate() + 1);
    let checkOutMiDate = new Date(today);
    // console.log(props);

    let guestsTextField;

    if(props.adults === 1){
        guestsTextField = props.adults + " Adult";
    }
    else{
        guestsTextField = props.adults + " Adults";
    }

    if(props.children > 0){
        if(props.children > 1){
            guestsTextField = guestsTextField + ", " + props.children + " Children";
        }
        else{
            guestsTextField = guestsTextField + ", " + props.children + " Child";
        }
        
    }
    if(props.infants > 0){
        if(props.infants > 1){
            guestsTextField = guestsTextField + ", " + props.infants + " Infants";
        }
        else{
            guestsTextField = guestsTextField + ", " + props.infants + " Infant";
        }
    }

    const setCheckInDate = (date) =>{
        let checkIn = new Date(date);
        let checkOut = new Date(props.checkOutDate);
        if(checkOut.getTime() - checkIn.getTime() < 1){
            alert("Check in date must be smaller than check out date");
        }
        else{
            props.setCheckInDate(date);
        }
        
    }

    const setCheckOutDate = (date) =>{
        let checkIn = new Date(props.checkInDate);
        let checkOut = new Date(date);
        if(checkOut.getTime() - checkIn.getTime() < 1){
            alert("Check out date must be greater than check in date");
        }
        else{
            props.setCheckOutDate(checkOut);
        }
        
    }

    const handleReserveButton = async() => {
        // try{
            
        //     let body = {property_id:props.propertyDetails.property.propertyID, 
        //         checkInDate: props.checkInDate.toISOString().split('T')[0], 
        //         checkOutDate: props.checkOutDate.toISOString().split('T')[0], 
        //         noOfGuest: props.adults + props.children}

        //     let availabilityResponse = await axios_api.post('booking/checkAvailabilityOfDate/', body,{
        //         headers: {
        //             "Content-Type": "application/json",
        //         }
        //     });

        //     if(availabilityResponse.status === 200){
                
        //         if(availabilityResponse.data.available){
        //             alert("available");
        //         }
        //         else{
        //             alert("not available");
        //         }
        //     }
        //     else{
        //         alert("not ok");
        //     }

        //     console.log(availabilityResponse);
        // }
        // catch(err){
        //     alert(err.message);
        // }



        try{
            let response = await axios_api.get("users/verify/", 
            {
                headers: {
                    'Authorization' : `Bearer ${props.token}`
                }
            })

            console.log(response);
            if(props.isLoggedin && response.data.valid){

                //check for the availability of the date
                let body = {property_id:props.propertyDetails.property.propertyID, 
                    checkInDate: props.checkInDate.toISOString().split('T')[0], 
                    checkOutDate: props.checkOutDate.toISOString().split('T')[0], 
                    noOfGuest: props.adults + props.children}
    
                let availabilityResponse = await axios_api.post('booking/checkAvailabilityOfDate/', body,{
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
    
                if(availabilityResponse.status === 200){
                    
                    if(availabilityResponse.data.available){
                        props.navigate('/booking/property/reserve');
                    }
                    else{
                        alert("This property is not available for that time period");
                    }
                }
                else{
                    alert("This property is not available for that time period");
                }
                
            }
            else{
                alert("Unauthorized");
                props.setLoginRedirection('/booking/property/details');
                props.navigate("/login");
            }
            
        }
        catch(error){
            alert(error.message);
            props.setUser({});
            props.setToken("");
            props.setLoggedIn(false);
            
            sessionStorage.setItem("user", {});
            sessionStorage.setItem("token", "");
            sessionStorage.setItem("loggedIn", false);
            sessionStorage.setItem("isAdmin", false);

            props.setLoginRedirection('/booking/property/details')
            props.navigate("/login");
        }
    }

    return(
        <Card elevation={5} sx={{ ml:10, minWidth:400, maxWidth:400 }}>
            <CardContent>
            {/* <MonetizationOnIcon />
                <Typography variant='h5' sx={{fontWeight:"bold" }} color="text.secondary" gutterBottom>
                    {props.propertyDetails.property.perNightCost} per night 
                </Typography> */}
                <Button disableRipple variant="text" color='inherit'  startIcon={<AttachMoneyIcon sx={{fontSize:"large"}} />} sx={{fontWeight:"bold", fontSize:18, mb:4 }}> {props.propertyDetails.property.perNightCost} per night </Button>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <Grid 
                            container 
                            spacing={0}
                            // direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Grid item xs={6}>
                                <DesktopDatePicker
                                    minDate={checkInMinDate}
                                    label="Check in"
                                    inputFormat="MM/dd/yyyy"
                                    value={props.checkInDate}
                                    onChange={setCheckInDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DesktopDatePicker
                                    minDate={checkOutMiDate}
                                    label="Check out"
                                    inputFormat="MM/dd/yyyy"
                                    value={props.checkOutDate}
                                    onChange={setCheckOutDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{mt:2}}>

                                <InputLabel id="demo-simple-select-label">Guests</InputLabel>
                                <Box
                                    display="flex" 
                                    width={370}
                                    height={50}
                                    bgcolor="white"
                                    // ml={10}
                                    // mt={10}
                                    sx={{
                                        position: 'relative'
                                    }}
                                >

                                    <Typography sx={{position:'absolute', top:10, left:10}}>{guestsTextField}</Typography>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value=""
                                        label="Guests"
                                        // onChange={handleChange}
                                        sx={{minWidth:370, maxWidth:370,minHeight:50, maxHeight:50, position:'absolute'}}
                                    >
                                        <MenuItem disableRipple disableTouchRipple>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography variant='h6' sx={{fontSize:16}}>Adults:</Typography>
                                                    <Typography variant="body1" sx={{fontSize:16}}>Age 13+</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {props.adults <= 1 ?  
                                                        <IconButton disabled color="primary"  sx={{mr:2}}>
                                                            <RemoveCircleOutlineRoundedIcon />
                                                        </IconButton> :
                                                        <IconButton color="primary"  sx={{mr:2}} onClick={()=>{props.setAdults(props.adults-1)}}>
                                                            <RemoveCircleOutlineRoundedIcon />
                                                        </IconButton>
                                                    }
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography sx={{mt:1, ml:1.5}}>{props.adults}</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {
                                                        props.adults + props.children >= props.propertyDetails.property.noOfGuests ? 
                                                        <IconButton disabled color="primary"  sx={{mr:2}} onClick={()=>{props.setAdults(props.adults+1)}}>
                                                            <AddCircleOutlineRounded />
                                                        </IconButton>:
                                                        <IconButton color="primary"  sx={{mr:2}} onClick={()=>{props.setAdults(props.adults+1)}}>
                                                            <AddCircleOutlineRounded />
                                                        </IconButton>
                                                    }
                                                    
                                                </Grid>
                                            </Grid>
                                        </MenuItem>
                                        <MenuItem disableRipple disableTouchRipple>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography variant='h6' sx={{fontSize:16}}>Children:</Typography>
                                                    <Typography variant="body1" sx={{fontSize:16}}>Ages 2-12</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {
                                                        props.children <= 0 ? 
                                                        <IconButton disabled color="primary"  sx={{mr:2}}>
                                                            <RemoveCircleOutlineRoundedIcon />
                                                        </IconButton> :
                                                        <IconButton color="primary"  sx={{mr:2}} onClick={() => {props.setChildren(props.children-1)}}>
                                                            <RemoveCircleOutlineRoundedIcon />
                                                        </IconButton>
                                                    }
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography sx={{mt:1, ml:1.5}}>{props.children}</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {
                                                        props.adults + props.children >= props.propertyDetails.property.noOfGuests ?
                                                        <IconButton disabled color="primary"  sx={{mr:2}} onClick={() => {props.setChildren(props.children+1)}}>
                                                            <AddCircleOutlineRounded />
                                                        </IconButton> :
                                                        <IconButton color="primary"  sx={{mr:2}} onClick={() => {props.setChildren(props.children+1)}}>
                                                            <AddCircleOutlineRounded />
                                                        </IconButton>
                                                    }
                                                    
                                                </Grid>
                                            </Grid>
                                        </MenuItem>
                                        <MenuItem disableRipple disableTouchRipple>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                    <Typography variant='h6' sx={{fontSize:16}}>Infants:</Typography>
                                                    <Typography variant="body1" sx={{fontSize:16}}>Under 2</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {
                                                        props.infants <= 0 ? 
                                                        <IconButton disabled color="primary"  sx={{mr:2}}>
                                                            <RemoveCircleOutlineRoundedIcon />
                                                        </IconButton>:
                                                        <IconButton color="primary"  sx={{mr:2}} onClick={() => {props.setInfants(props.infants-1)}}>
                                                            <RemoveCircleOutlineRoundedIcon />
                                                        </IconButton>
                                                    }
                                                    
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography sx={{mt:1, ml:1.5}}>{props.infants}</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <IconButton color="primary"  sx={{mr:2}} onClick={() => {props.setInfants(props.infants+1)}}>
                                                        <AddCircleOutlineRounded />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </MenuItem>
                                        <MenuItem disableRipple disableTouchRipple>
                                            <Typography variant='body2' sx={{mt:2}}>This place has a maximum of {props.propertyDetails.property.noOfGuests} guests excluding infants</Typography>
                                        </MenuItem>
                                        {/* <Box clone display={{ sm: "none" }}>
                                            <MenuItem value={40}>hello</MenuItem>
                                        </Box> */}
                                    </Select>
                                </Box>
                                
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    color='inherit' 
                                    variant="contained" 
                                    sx={{mt:2,minHeight:50, maxHeight:50,minWidth:370, maxWidth:370, background: 'linear-gradient(to right bottom, #99029e, #eb11f2)' }}
                                    onClick={() => {handleReserveButton()}}
                                >
                                    Reserve
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button disabled color='inherit' variant="text" sx={{mt:1,minHeight:50, maxHeight:50,minWidth:370, maxWidth:370, fontSize:12 }}>You won't be charged yet</Button>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <Button disableRipple color='inherit' startIcon={<AttachMoneyIcon/>}>{props.propertyDetails.property.perNightCost}</Button>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                    <AttachMoneyIcon fontSize='small' sx={{ml:0}}/>
                                    <span style={{fontSize:20}}>{props.propertyDetails.property.perNightCost}</span>
                                    <ClearIcon fontSize='small'/>
                                </div>
                            </Grid> */}
                            <Grid item xs={1} >
                                <AttachMoneyIcon /> 
                            </Grid>
                            <Grid item xs={1}>
                                <Typography>{props.propertyDetails.property.perNightCost}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <ClearIcon />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>{props.checkOutDate.getDate() - props.checkInDate.getDate()}  Nights</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Button disabled color='inherit' variant='text'></Button>
                            </Grid>
                            <Grid item xs={1}>
                                <AttachMoneyIcon /> 
                            </Grid>
                            <Grid item xs={2}>
                                <Typography >{(props.checkOutDate.getDate() - props.checkInDate.getDate()) * props.propertyDetails.property.perNightCost}</Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                </LocalizationProvider>
            </CardContent>
        </Card>
    );
}


function PropertyDetails(props){
    // console.log(props.propertyDetails);
    console.log(props.token)

    const handleShowImage = (url) => {
        props.setImgUrl(url);
        props.handleOpen();
    }

    let ratinBG1 = 'white'
    let ratinBG2 = 'white'
    let ratinBG3 = 'white'
    let ratinBG4 = 'white'
    let ratinBG5 = 'white'

    const handleRating = async(val) => {
        // props.setRating(val);
        try{
            if(props.isLoggedin){
                let body = {rating:val, propertyID:props.propertyDetails.property.propertyID}
                let response = await axios_api.post("hosting/addrating/", body,{
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization' : `Bearer ${props.token}`
                    }
                });

                if(response.status === 200){
                    console.log(response.statusText);
                }
            }
            else{
                props.setLoginRedirection('/booking/property/details' )
                props.navigate("/login");
            }
        }
        catch(err){
            alert(err.message);
        }
    }


    const postReview = async(review, property_id) => {
        try{
            if(props.isLoggedin){
                let formdata = new FormData();
                formdata.append("property_id", property_id);
                formdata.append("review", review);
                // console.log(formdata.get("review"));
                // console.log(formdata.get("property_id"));

                // console.log(props.token);

                let response = await axios_api.post("hosting/addreview/",formdata,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization' : `Bearer ${props.token}`
                    }
                } )

                if(response.status === 200){
                    props.fetchProperty(property_id);
                    props.setReview("")
                }
                else{
                    alert(response.status + ": " + response.statusText );
                }
            }
            else{
                props.setLoginRedirection('/booking/property/details' )
                props.navigate("/login");
            }
            
        }
        catch(error){
            alert(error)
        }
        // console.log(review);
        // console.log(property_id);
    }

    
    if(props.propertyDetails === null){
        return(
            <CircularIndeterminate/>
        );
    }
    else{    
        
        let rating = 0;
        for(let i = 0; i < props.propertyDetails.ratings.length; i++){
            rating = rating + props.propertyDetails.ratings[i].rating
        }

        let finalRating = 0
        if(props.propertyDetails.ratings.length > 0){
            finalRating = rating/props.propertyDetails.ratings.length;
        }

        let idx = 1;
        return(
            <Grid container sx={{ ml:17, maxWidth:1300, mb:30}}>
                <Grid item xs={12}>
                    <Typography variant="h3" sx={{mt:5, fontFamily:"Lucida Handwriting"}}>{props.propertyDetails.property.title}</Typography>
                </Grid>
                {finalRating === 0 ? 
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{mt:1}}>{props.propertyDetails.reviews.length} reviews, {props.propertyDetails.property.address}</Typography>
                    </Grid>:
                    <Grid item xs={12}>
                        <Button disabled  color='inherit' startIcon={<StarBorderIcon/>}>{finalRating} ,{props.propertyDetails.reviews.length} reviews, {props.propertyDetails.property.address}</Button>
                        {/* <Typography variant="body1" sx={{mt:1}}>{finalRating} star, {props.propertyDetails.property.address}</Typography> */}
                    </Grid>
                }
                
                <Grid item xs={6}>
                    {/* <ImageList
                        sx={{
                            width: 1200,
                            height: 400,
                            // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                            transform: 'translateZ(0)',
                        }}
                        rowHeight={200}
                        gap={1}
                        >
                        {props.propertyDetails.photos.map((item) => {
                            let cols, rows;
                            if(idx % 3 === 1){
                                cols = 2;
                                rows = 2;
                            }
                            else if(idx === props.propertyDetails.photos.length && idx % 3 === 2){
                                cols = 2;
                                rows = 2;
                            }
                            else{
                                cols = 1;
                                rows = 1;
                            }

                            idx++;

                            return (
                            <ImageListItem key={item.id} cols={cols} rows={rows}>
                                <img
                                {...srcset(item.photo_url, 250, 200, rows, cols)}
                                alt={item.id}
                                loading="lazy"
                                onClick={()=>{handleShowImage(item.photo_url)}}
                                />
                                <ImageListItemBar
                                sx={{
                                    background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                }}
                                title={idx-1}
                                position="top"
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'white' }}
                                        aria-label={`star ${idx-1}`}
                                        onClick={()=>{handleShowImage(item.photo_url)}}
                                    >
                                        <StarBorderIcon />
                                    </IconButton>
                                }
                                actionPosition="left"
                                />
                            </ImageListItem>
                            );
                        })}
                    </ImageList> */}
                    <Paper elevation={5} sx={{mt:5, paddingTop:1, paddingLeft:1, paddingRight:0.8, paddingBottom:0.5}}>
                        <img src={props.propertyDetails.photos[0].photo_url} style={{maxWidth: 740, minWidth:740, maxHeight:385,minHeight:385}}/>
                    </Paper>
                </Grid>
                <Grid item xs = {6}>
                    <Grid container>
                        <Grid item xs = {5}>
                            <Paper elevation={5} sx={{mt:5, maxWidth:300, paddingTop:1, paddingLeft:1, paddingRight:0.8, paddingBottom:0.5}}>
                                <img src={props.propertyDetails.photos[1].photo_url} style={{maxWidth: 300, minWidth:300, maxHeight:184,minHeight:184}}/>
                            </Paper>
                        </Grid>
                        <Grid item xs = {7}>
                            <Paper elevation={5} sx={{mt:5,maxWidth:300, paddingTop:1, paddingLeft:1, paddingRight:0.8, paddingBottom:0.5}}>
                                <img src={props.propertyDetails.photos[2].photo_url} style={{maxWidth: 300, minWidth:300, maxHeight:184,minHeight:184}}/>
                            </Paper>
                        </Grid>

                        <Grid item xs = {5}>
                            <Paper elevation={5} sx={{ maxWidth:300, paddingTop:1, paddingLeft:1, paddingRight:0.8, paddingBottom:0.5}}>
                                <img src={props.propertyDetails.photos[3].photo_url} style={{maxWidth: 300, minWidth:300, maxHeight:184,minHeight:184}}/>
                            </Paper>
                        </Grid>
                        <Grid item xs = {7}>
                            <Paper elevation={5} sx={{maxWidth:300, paddingTop:1, paddingLeft:1, paddingRight:0.8, paddingBottom:0.5}}>
                                <img src={props.propertyDetails.photos[4].photo_url} style={{maxWidth: 300, minWidth:300, maxHeight:184,minHeight:184}}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={7} sx={{mt:5}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{fontWeight:"bold"}}>{props.propertyDetails.property.catagory} hosted by {props.propertyDetails.property.ownerName}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" sx={{mt:1, mb:3}}>{props.propertyDetails.property.noOfGuests} guests, {props.propertyDetails.property.noOfBedrooms} bedrooms, {props.propertyDetails.property.noOfBeds} beds, {props.propertyDetails.property.noOfBathrooms} bathrooms</Typography>
                            <hr />
                        </Grid>
                        {/* {Advertisements()} */}
                        {props.propertyDetails.ads.length > 0 ? 
                         props.propertyDetails.ads.map((ad) => {
                            return(
                                <Grid item xs={12}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" component="div">
                                                    {ad.Title}
                                                </Typography>

                                                <Typography variant="body1" component="div">
                                                    {ad.Description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                </Grid>
                            );
                        }):
                        <div></div>
                        }
                    </Grid>
                </Grid>
                <Grid item xs={5} sx={{mt:5}}>
                    <ReservationCard 
                        propertyDetails={props.propertyDetails}
                        checkInDate = {props.checkInDate}
                        checkOutDate = {props.checkOutDate}
                        setCheckInDate = {(val) => {props.setCheckInDate(val)}}
                        setCheckOutDate = {(val) => {props.setCheckOutDate(val)}}
                        adults = {props.adults}
                        setAdults = {(val) => {props.setAdults(val)}}
                        children = {props.children}
                        setChildren = {(val) => {props.setChildren(val)}}
                        infants = {props.infants}
                        setInfants = {(val) => {props.setInfants(val)}}
                        navigate = {(val) => {props.navigate(val)}}
                        token = {props.token}
                        isLoggedin = {props.isLoggedin}
                        setLoginRedirection={(val) => {props.setLoginRedirection(val)}}
                        setLoggedIn = {(value)=>{props.setLoggedIn(value)}}
                        setUser = {(value) => {props.setUser(value)}}
                        setToken = {(t) => {props.setToken(t)}}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{mt:3}} variant='h6'> What this place offers?</Typography>
                </Grid>

                {props.propertyDetails.facilities.map((facility) => {
                    return(
                        <Grid item xs={3}>
                            <Card sx={{mt:1, maxWidth:252}}>
                                <CardContent>
                                    <Typography variant='body1'>{facility.facility_name_id}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
                <Grid item xs={3}>
                    <Typography variant='h6' sx={{mt:5}}>Want to rate this property?</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Rating name="half-rating" defaultValue={0} precision={0.5} sx={{mt:5.5}} onChange={(event) => {handleRating(event.target.value)}}/>
                </Grid>
                
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{mt:5}}>Have any review?</Typography>
                </Grid>

                <Grid item xs={6}>
                    <TextField value={props.review} id="standard-basic" label="Review" variant="standard" sx={{minWidth:600, maxWidth:600}}  onChange={(event)=> {props.setReview(event.target.value)}}/>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={()=>{postReview(props.review, props.propertyDetails.property.propertyID )}}>Post review</Button>
                </Grid>

                {props.propertyDetails.reviews.length > 0 ? 
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{mt:5}}>All review</Typography>
                </Grid>: <div></div>
                }
                {
                props.propertyDetails.reviews.map((review) => {
                    return(
                        <Grid item xs={6}>
                            <Card sx={{mt:1}}>
                                <CardContent>
                                    <Typography variant='h6' component='div'>
                                        {review.username}
                                    </Typography>
                                    <Typography variant='body1' component='div'>
                                        {review.review}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })
                }
                <Grid item xs={12}>
                    {/* <Divider sx={{mt:10, fontWeight:'bold'}}/> */}
                    <hr style={{marginTop:50}}/>
                </Grid>

                <Grid item xs={6}>
                    {/* <Typography sx={{mt:5}} variant='h6'>Hosted by {props.propertyDetails.property.ownerName}</Typography> */}
                    <Button size='large' sx={{mt:5, fontSize:20}} color='inherit' startIcon={<AccountCircleOutlinedIcon  fontSize='large'/>}>Hosted by {props.propertyDetails.property.ownerName}</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button size='large' sx={{mt:5}} variant='contained' onClick={() => {props.navigate("/booking/property/contacthost")}}>Contact host</Button>
                </Grid>
                
            </Grid>
        );
    }
    
}

export default function PropertyDetailsForBooking(props){
    const [propertyDetails, setPropertyDetails] = React.useState(null);
    const [message, setMessage] = React.useState("");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [imgUrl, setImgUrl] = React.useState("");

    const [review, setReview] = React.useState("");
    const [rating, setRating] = React.useState(0);

    console.log(props)
    

    const navigate = useNavigate();

    const fetchProperty = async(propertyId) => {
        try{
            let response = await axios_api.get(`booking/propertydetails/${propertyId}/`);
            console.log(response)

            if(response.status === 200){
                setPropertyDetails(response.data);
                props.setOffers(response.data.offers);
                setMessage(response.data.property.title);
            }
        }
        catch(error){
            alert(error);
        }
        
    }

    React.useEffect(()=>{

        if(props.selectedPropertyForDetails === -1) {
            setMessage("Invalid property id");
        }
        else{
            console.log(props.selectedPropertyForDetails);
            fetchProperty(props.selectedPropertyForDetails);
        }
    },[]);

    return(
    
    <Box sx={{ flexGrow: 1 }}>
      <ShowNavBar />
      <ShowOffer
        propertyDetails = {propertyDetails}
      />
      <PropertyDetails 
        propertyDetails = {propertyDetails}
        open = {open}
        handleOpen = {() => {handleOpen()}}
        handleClose = {handleClose}
        imgUrl = {imgUrl}
        setImgUrl = {(val) => {setImgUrl(val)}}
        review = {review}
        setReview = {(val) => {setReview(val)}}
        token = {props.token}
        isLoggedin = {props.isLoggedin}
        fetchProperty = {(id) => {fetchProperty(id)}}
        navigate = {(val) => {navigate(val)}}
        checkInDate = {props.checkInDate}
        checkOutDate = {props.checkOutDate}
        setCheckInDate = {(val) => {props.setCheckInDate(val)}}
        setCheckOutDate = {(val) => {props.setCheckOutDate(val)}}
        adults = {props.adults}
        setAdults = {(val) => {props.setAdults(val)}}
        children = {props.children}
        setChildren = {(val) => {props.setChildren(val)}}
        infants = {props.infants}
        setInfants = {(val) => {props.setInfants(val)}}
        setLoginRedirection={(val) => {props.setLoginRedirection(val)}}
        setLoggedIn = {(value)=>{props.setLoggedIn(value)}}
        setUser = {(value) => {props.setUser(value)}}
        setToken = {(t) => {props.setToken(t)}}
        rating={rating}
        setRating={(val)=>{setRating(val); console.log(rating)}}
      />
    </Box>
    );
}