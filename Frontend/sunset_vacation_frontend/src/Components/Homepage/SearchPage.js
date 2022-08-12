import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Navigate, useNavigate } from 'react-router-dom';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import { Button, Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import { axios_api } from '../../App';

import SearchNav from './SearchNav';
import Rating from '@mui/material/Rating';

function ViewAllProperties(propertyData, props, navigate){
  // console.log(props.properties);
  // let propertyData = [];
  // if(props.properties.data != undefined)
  //   propertyData = props.properties.data;

  console.log(props)

  const goToDetailsPage = (id) => {
    props.setSelectedPropertyForDetails(id);
    navigate('/booking/property/details');
  }

  let properties = propertyData.map((property) => {
    return(
      <Grid item xs={2.5} key={property.propertyID}>
        <Card sx={{ maxWidth: 345, maxHeight:500, m:2}}>
        <CardMedia
          component="img"
          height="250"
          image={property.images[0].photo_url}
          alt={property.title}
        />
        <CardContent>
          <Typography sx={{fontFamily: 'Lucida Handwriting'}} gutterBottom variant="h5" component="div">
            {property.title}
          </Typography>
          <Typography variant="body2" sx={{fontFamily: 'Lucida Handwriting'}} color="text.inherit">
           $ {property.perNightCost} per night
          </Typography>
          <Typography variant="body2" >
          <Rating name="half-rating-read" defaultValue={property.rating} precision={0.5} readOnly />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" onClick={() => {goToDetailsPage(property.propertyID)}}>View Details</Button>
        </CardActions>
        </Card>
      </Grid>
    );
  })
  // let properties = "hello"
  return(
    <Grid container>
      {properties}
    </Grid>
  );
}


export default function SearchPage(props) {

  const [properties, setProperties] = React.useState([])
  const [value, setValue] = React.useState(0);
  const [selectedProperty, setSelectedProperty] = React.useState('');
  const [offers,setOffers]=React.useState([]);
  const [pool,setPool]=React.useState([]);
  const [rating,setRating]=React.useState([]);
  const [nearby,setNearby]=React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(()=>{
   
    fetch(`http://localhost:8000/hosting/recommandations/` )
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
      
      setAllProperties(response.properties)
      
    })
    .catch((err) => {
      alert(err.message);
    })
  }, [])

  function setAllProperties(properties){
    var p=properties.find(element => element["title"] === 'pool');        
    setPool(p.list);
    p=properties.find(element => element["title"] === 'offer'); 
    setOffers(p.list)
    p=properties.find(element => element["title"] === 'rating'); 
    setRating(p.list);
    
  }
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const becomeAHostButton = (event) => {
    navigate("/hosting");
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 19 new notifications"
          color="inherit"
        >
          <Badge badgeContent={19} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  function showNavBar(props){
    return(
      <Box>
        <AppBar position="static" sx={{bgcolor: "#C4036C"}}>
            <Toolbar>
            
            
         
        <IconButton>
          < WbTwilightIcon sx={{color: 'white'}} />
        </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                <p style={{"fontFamily": "Jokerman","fontSize":"25px"}}>SUNSET VACATION</p>
               
              </Typography>
              
        
            
              
              <Box sx={{ flexGrow: 1 }} />
    
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {/* <IconButton size="large" aria-label="show 6 new mails" color="inherit">
                  <Badge badgeContent={6} color="error">
                    <MailIcon />
                    
                   
                  </Badge>
                </IconButton> */}
                <Button variant="text" sx={{fontFamily:"Jokerman",color: "white"}} onClick={()=>{{navigate('/');}}}>Home</Button>
                          <Button variant="text" sx={{fontFamily:"Jokerman",color: "black"}} onClick={()=>{{navigate('/search');}}}>search</Button>
                          
    
                <Button variant="text" sx={{fontFamily:"Jokerman",color: "white"}} onClick={becomeAHostButton}>Become a host</Button>
                {/* <IconButton
                  size="large"
                  aria-label="show 19 new notifications"
                  color="inherit"
                  onClick={()=>{navigate("/login");}}
                >
                  <Badge badgeContent={19} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  //onClick={()=>{navigate("/login");}}
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
      </Box>
    )
  }
  function handleShowMore(description,list){
      var dict={'title': description, 'list': list}
      console.log(dict)
      props.setShowMore(dict);

       navigate('/showmore');
  }
  function show4property(list){
    if(list.length >4){
      return <div>{ViewAllProperties(list.slice(0,4), props, navigate)}</div>
    }else{
      return <div>{ViewAllProperties(list, props, navigate)}</div>
    }
  }
  function showMore(description,list){
    if(list.length >4){
      return <Button sx={{mt: 30,ml: -25}} variant='contained' color='inherit' endIcon={<DoubleArrowIcon/>} onClick={(event)=>{handleShowMore(description,list)}} >show more</Button>
    }else{
        return <div></div>
    }
  }
  function show(description,list){
    return(
     <div>
      <Grid container>
      <Grid item xs={11}>
       <Typography sx={{ marginTop: "30px", marginLeft: "30px",fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
     {description}
    </Typography>
    {show4property(list)}
       </Grid>
       <Grid item xs={1}>
        {showMore(description,list)}
       </Grid>
      </Grid>
     </div>
    );
  }
      function showProperties(props){
        
        return(

          <Box position="static" sx={{ flexGrow: 1 }}>
          
          {show("Checkout the Best Rated Properties",rating)}         
          {show("Grab the Best Offer",offers)}
          {show("Splash in the pool",pool)}

        </Box>
    
        );
      }
  
  return (
   <div >
    {showNavBar(props)}
     {SearchNav(props)} 
    {showProperties(props)}
   </div>
  );
}



