import * as React from 'react';
import Box from '@mui/material/Box';
import { axios_api } from '../../App';
import CircularIndeterminate from '../Booking/CircularProgress';
import { Card, CardContent, FormControl, Grid, List, ListItem, ListItemButton, ListItemText, Paper, TextField, Typography } from '@mui/material';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import ShowNavBar from '../Hosting/ManagementDashboard/ShowNavbar';
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
import Divider from '@mui/material/Divider';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import Rating from '@mui/material/Rating';
import PropertyDetailsNavbar from './PropertyDetailsNavbar';


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


function PropertyDetails(props){
    const navigate = useNavigate();
    // console.log(props.propertyDetails);
    console.log(props.token)

    const [message, setMessage] = React.useState("");

    const handleShowImage = (url) => {
        props.setImgUrl(url);
        props.handleOpen();
    }


    const changeDescription = (val) => {
        setMessage(val);
    }

    function handleSubmitApprove(event) {
        //setMessage(event.target.value);
        const data={
            message: message
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        setMessage("");
        fetch(`http://localhost:8000/hosting/approve/`+props.propertyId, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response
                }
                else {
                    let err = new Error(response.status + ": " + response.text);
                    throw err;
                }
            })
            .then((response) => response.json())
            .then((response) => {
                navigate('/admin');
            })
            .catch((err) => {
                alert(err.message);
            });

            
    }

    function handleSubmitReject(event) {
        //setMessage(event.target.value);
        const data = {
            message: message
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        setMessage("");
      
        fetch(`http://localhost:8000/hosting/reject/`+props.propertyId, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response
                }
                else {
                    let err = new Error(response.status + ": " + response.text);
                    throw err;
                }
            })
            .then((response) => response.json())
            .then((response) => {
                navigate('/admin');
            })
            .catch((err) => {
                alert(err.message);
            })

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
                    </Grid>
                }
                
                <Grid item xs={6}>
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
                
                <Grid item xs={12} sx={{mt:5}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{fontWeight:"bold"}}>{props.propertyDetails.property.catagory} hosted by {props.propertyDetails.property.ownerName}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" sx={{mt:1, mb:3}}>{props.propertyDetails.property.noOfGuests} guests, {props.propertyDetails.property.noOfBedrooms} bedrooms, {props.propertyDetails.property.noOfBeds} beds, {props.propertyDetails.property.noOfBathrooms} bathrooms</Typography>
                            <hr />
                        </Grid>
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
                
                {props.propertyDetails.dos[0][0].length === 1 ? <div></div>:
                <Grid item xs={12} sx={{mt:5}}><Typography variant='h6'>Rules to follow:</Typography></Grid>
                }

                {props.propertyDetails.dos[0][0].length === 1 ? <div></div>:
                    props.propertyDetails.dos.map((rule) => {
                        return(
                            <Grid item xs={12} sx={{mt:1}}>
                                <Card>
                                    <CardContent>
                                        {rule[0]}
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
                
                {props.propertyDetails.donts[0][0].length === 1 ? <div></div>:
                <Grid item xs={12} sx={{mt:5}}><Typography variant='h6'>Things to avoid:</Typography></Grid>
                }

                {props.propertyDetails.donts[0][0].length === 1 ? <div></div>:
                    props.propertyDetails.donts.map((rule) => {
                        return(
                            <Grid item xs={12} sx={{mt:1}}>
                                <Card>
                                    <CardContent>
                                        {rule[0]}
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }


                <Grid item xs={12}>
                    <hr style={{marginTop:50}}/>
                </Grid>

                <Grid item xs={6}>
                    <Button size='large' sx={{mt:5, fontSize:20}} color='inherit' startIcon={<AccountCircleOutlinedIcon  fontSize='large'/>}>Hosted by {props.propertyDetails.property.ownerName}</Button>
                    <hr />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" sx={{mt:5}}>Review Property:</Typography>
                </Grid>

                <Grid item xs={6} sx={{mt:5}}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        sx={{minWidth:600}}
                        onChange={(event) => {changeDescription(event.target.value)}}
                    />
                </Grid>

                <Grid item xs={1} sx={{mt:5}}>
                    <Button  
                        variant="contained" 
                        onClick={handleSubmitApprove} 
                        sx={{bgcolor: '#282c34', marginTop: 2}} 
                        endIcon={<ThumbUpOffAltIcon sx={{ color: 'white' }}/>}
                    >
                        Approve
                    </Button>
                </Grid>

                <Grid item xs={2} sx={{mt:5}}>
                    <Button 
                        variant="contained" 
                        onClick={handleSubmitReject}  
                        endIcon={<ThumbDownOutlinedIcon sx={{ color: 'white' }} />}
                        sx={{bgcolor: '#282c34', marginTop: 2, marginLeft: 4}}
                    >
                        Request Change
                    </Button>
                </Grid>
                
            </Grid>
        );
    }
    
}

export default function AdminViewPropertyDetails(props){
    const [propertyDetails, setPropertyDetails] = React.useState(null);
    const [message, setMessage] = React.useState("");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [imgUrl, setImgUrl] = React.useState("");

    const [review, setReview] = React.useState("");
    const [rating, setRating] = React.useState(0);    

    const navigate = useNavigate();
    let param = useParams();

    const fetchProperty = async(propertyId) => {
        try{
            let response = await axios_api.get(`booking/propertydetails/${propertyId}/`);

            if(response.status === 200){
                console.log(response.data);
                setPropertyDetails(response.data);
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
            fetchProperty(param.property_id);
        }
    },[]);

    return(
    
    <Box sx={{ flexGrow: 1 }}>
      <PropertyDetailsNavbar />
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
        setLoginRedirection={(val) => {props.setLoginRedirection(val)}}
        setLoggedIn = {(value)=>{props.setLoggedIn(value)}}
        rating={rating}
        setRating={(val)=>{setRating(val); console.log(rating)}}
        propertyId={param.property_id}
      />
    </Box>
    );
}