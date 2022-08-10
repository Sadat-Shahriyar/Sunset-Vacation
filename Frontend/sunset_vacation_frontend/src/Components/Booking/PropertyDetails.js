import * as React from 'react';
import Box from '@mui/material/Box';
import { axios_api } from '../../App';
import CommonNavbar from './Navbar';
import CircularIndeterminate from './CircularProgress';
import { Grid, List, ListItem, ListItemButton, ListItemText, Paper, TextField, Typography } from '@mui/material';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

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



function ViewImage(props) {
  let cols = 2;
  let rows = 2;
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <ImageList
                sx={{
                    width: 700,
                    height: 500,
                    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                    transform: 'translateZ(0)',
                }}
                rowHeight={200}
                gap={1}
                >
                    <ImageListItem cols={cols} rows={rows}>
                        <img
                        {...srcset(props.photo_url, 250, 200, rows, cols)}
                        loading="lazy"
                        />
                    </ImageListItem>
                    
            </ImageList>
        </Box>
      </Modal>
    </div>
  );
}


function PropertyDetails(props){
    console.log(props.propertyDetails);
    // console.log(props.token)

    const handleShowImage = (url) => {
        props.setImgUrl(url);
        props.handleOpen();
    }

    console.log(props.review);

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
        
        let idx = 1;
        return(
            <Grid container sx={{ ml:10}}>
                <Grid item xs={12}>
                    <Typography variant="h3" sx={{mt:5}}>{props.propertyDetails.property.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{mt:1}}>{props.propertyDetails.property.address}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <ImageList
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
                    </ImageList>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{mt:1}}>{props.propertyDetails.property.catagory} hosted by {props.propertyDetails.property.ownerName}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{mt:1}}>{props.propertyDetails.property.noOfGuests} guests, {props.propertyDetails.property.noOfBedrooms} bedrooms, {props.propertyDetails.property.noOfBeds} beds, {props.propertyDetails.property.noOfBathrooms} bathrooms</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{mt:5}}>Have any review?</Typography>
                </Grid>

                <Grid item xs={6}>
                    <TextField value={props.review} id="standard-basic" label="Review" variant="standard"  onChange={(event)=> {props.setReview(event.target.value)}}/>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={()=>{postReview(props.review, props.propertyDetails.property.propertyID )}}>Post review</Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{mt:1}}>All review</Typography>
                </Grid>
                <Grid item xs={12}>
                    <List>
                        {
                            props.propertyDetails.reviews.map((review)=>{
                                return(
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={review.username + ": " + review.review} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </Grid>
                {props.imgUrl === ""? null:<ViewImage photo_url={props.imgUrl} open={props.open} handleClose={props.handleClose}/>}
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

    const navigate = useNavigate();

    const fetchProperty = async(propertyId) => {
        try{
            let response = await axios_api.get(`booking/propertydetails/${propertyId}/`);
            console.log(response)

            if(response.status === 200){
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
            console.log(props.selectedPropertyForDetails);
            fetchProperty(props.selectedPropertyForDetails);
        }
    },[]);

    return(
    
    <Box sx={{ flexGrow: 1 }}>
      <CommonNavbar />
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
      />
    </Box>
    );
}