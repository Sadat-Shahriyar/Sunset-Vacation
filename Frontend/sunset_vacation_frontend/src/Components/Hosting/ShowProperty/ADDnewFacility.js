import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import {  IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { axios_api } from '../../../App';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import DetailsIcon from '@mui/icons-material/Details';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function ADDNewFacility(props) {
  let navigate = useNavigate();

  const [amenities, setAmenities] = React.useState([]);
    const [guestsFavourites, setGuestsFavourites] = React.useState([]);
    const [safetyItems, setSafetyItems] = React.useState([]);
    const [selectedAmenityList, setSelectedAmenityList] = React.useState([]);
    const [selectedGuestsFavouriteItemList, setSelectedGuestsFavouriteItemList] = React.useState([]);
    const [selectedSafetyItemList, setSelectedSafetyItemList] = React.useState([]);
   
  
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
  
    
    React.useEffect(() => {

      const fetchFacilityList = async() => {
        try{
          let response = await axios_api.get("hosting/getfacilities/", 
          {
              headers: {
                  'Authorization' : `Bearer ${props.token}`
              }
          });

          console.log(response);
          if(response.data.success){
            setAmenities(response.data.amenities);
            setGuestsFavourites(response.data.guestsFavourite);
            setSafetyItems(response.data.safetyItems);
            
            
          }
          else{
            alert(response.data.error);
          }
        }
        catch(err){
          alert(err);
        }
          
      }

      fetchFacilityList();
    }, [props.token])



  const useLocation = (event) => {
    navigate("/showPropertyDetails/location");
  }
  const useDescription = (event) => {
    navigate('/showPropertyDetails/description');
  }
  const useFaq = (event) => {
    navigate('/showPropertyDetails/faq');
  }
  const useCatagory = (event) => {
    navigate('/showPropertyDetails/catagory');
  }
  const useFacility = (event) => {
    navigate('/showPropertyDetails/facility');
  }
  const useHome = (event) => {
    navigate('/showPropertyDetails');
  }
 
  const handleCancel = (event) => {
   setSelectedAmenityList([])
   setSelectedSafetyItemList([])
   setSelectedGuestsFavouriteItemList([])
    navigate('/showPropertyDetails/facility');
  }

  const handleSubmit=(event)=>{
    const body={
      amenityList: selectedAmenityList,
      guestFavs: selectedGuestsFavouriteItemList,
      safetyItems : selectedSafetyItemList,
      
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization':  `Bearer ${props.token}`, },
      body: JSON.stringify(body)
    };
    fetch(`http://localhost:8000/hosting/addNewFacility/`+`${props.property.propertyID}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        // console.log(response.msg)
      });
      navigate('/showPropertyDetails/facility');
    }
  

  let getButton = () => {
    if(selectedAmenityList.length === 0 && selectedGuestsFavouriteItemList.length === 0 && selectedSafetyItemList.length === 0) {
      return <Button disabled variant='outlined' color='secondary' sx={{ml: '85%'}} >Submit</Button> 
    }
    else return <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={()=>{handleSubmit()}}>Submit</Button>
  }

  let button = getButton()
  function showPropertyNavbar(props) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "inherit" }}>
          <Toolbar>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "25px", "color": "black" }}>{props.property.title}
                &nbsp;&nbsp;&nbsp;<IconButton><EditIcon /></IconButton></p>
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar position='static' color='inherit' >
          <Toolbar>
            <Button onClick={useHome} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Images</Button><IconButton><InsertPhotoOutlinedIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useCatagory} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Catagory</Button><IconButton><DetailsIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useLocation} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Location</Button><IconButton><LocationOnIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useFacility} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "#C4036C" }} >Facilities & Safety Items</Button><IconButton><DesktopMacIcon sx={{ color: '#C4036C' }} /></IconButton>
            <Button onClick={useDescription} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Description,price & Cancellation policy</Button><IconButton><DescriptionIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useFaq} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Faq</Button><IconButton><QuestionAnswerIcon sx={{ color: 'black' }} /></IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
  function ViewRender(props){
  
 
    let Pamenities = amenities.map((amenity) => {
      let bg = "white";
      let idx = selectedAmenityList.indexOf(amenity[0]);
      if(idx > -1){
        bg="#EAA49B"
      }
      return(
        <Grid item xs={4}>
          <Paper elevation={3} style={{marginLeft:100, background: bg}}>
            <Box
              display="flex" 
              width={200} height={80} 
              ml={2}
              mt={2}
            >
                <Box m="auto">
                  {/* <Typography variant='body1'>{amenity[0]}</Typography> */}
                  <Button variant='text' sx={{color: 'black'}} onClick={() => {handleSetSelectedAmenityList(amenity[0])}}>{amenity[0]}</Button>
                </Box>
            </Box>
          </Paper>
        </Grid>
      );
      });
  
  let PguestsFavourite = guestsFavourites.map((fav) => {
      let bg = "white";
      let idx = selectedGuestsFavouriteItemList.indexOf(fav[0]);
      if(idx > -1){
        bg="#EAA49B"
      }
    return(
      <Grid item xs={4}>
        <Paper elevation={3} style={{marginLeft:100, background: bg}}>
          <Box
            display="flex" 
            width={200} height={80} 
            ml={2}
            mt={2}
          >
              <Box m="auto">
                {/* <Typography variant='body1'>{fav[0]}</Typography> */}
                <Button variant='text' sx={{color: 'black'}} onClick={() => {handleSetSelectedGuestsFavouriteItemList(fav[0])}}>{fav[0]}</Button>
              </Box>
          </Box>
        </Paper>
      </Grid>
    );
  });
  
  let PsafetyItems = safetyItems.map((sItem) => {
      let bg = "white";
      let idx = selectedSafetyItemList.indexOf(sItem[0]);
      if(idx > -1){
        bg="#EAA49B"
      }
      
    return(
      <Grid item xs={4}>
        <Paper elevation={3} style={{marginLeft:100, background: bg}}>
          <Box
            display="flex" 
            width={200} height={80} 
            ml={2}
            mt={2}
          >
              <Box m="auto">
                {/* <Typography variant='body1'>{sItem[0]}</Typography> */}
                <Button 
                variant='text' 
                sx={{color: 'black'}} 
                onClick={() => {handleSetSelectedSafetyItemList(sItem[0])}}
                >
                  {sItem[0]}
                </Button>
              </Box>
          </Box>
        </Paper>
        
      </Grid>
    );
  });
  
    
    return(
      <Paper elevation={0} style={{maxHeight: 520, overflow: 'auto'}}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h5' sx={{fontFamily: "Lucida Handwriting"}} marginTop={5}>Amenities: </Typography>
          </Grid>
  
          {Pamenities}
  
          <Grid item xs={12}>
            <Typography variant='h5' sx={{fontFamily: "Lucida Handwriting"}}  marginTop={5}>Guests favourite: </Typography>
          </Grid>
  
          {PguestsFavourite}
  
          <Grid item xs={12}>
            <Typography variant='h5' sx={{fontFamily: "Lucida Handwriting"}} marginTop={5}>Safety items: </Typography>
          </Grid>
  
          {PsafetyItems}
        </Grid>
      </Paper>
    );
  }
  function show(props){

  
  return (
      <Box sx={{ flexGrow: 1 ,width: "80%",marginLeft:"auto",marginRight:"auto"}}>
        <Grid container>
          
          <Grid item xs={12} direction='column'>
            <Item sx={{height:"5%", ml:1, mt:0.5}}>
              <Paper elevation={0}>
                <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={() => {handleCancel()}}>Back</Button>
              </Paper>
            </Item>
            <Item sx={{ height:'80%', mt: 1, ml:1}}>
              {ViewRender(props)}
            </Item>
            <Item sx={{height:'5%', ml:1, mt: 1}}>
              <Paper elevation={0}>
                {button}
              </Paper>
            </Item>
          </Grid>
        </Grid>
      </Box>
    );
  }
  return (
    <div>

      
    {<ManagementDashboard/>}
      {showPropertyNavbar(props)}
      {show(props)}

    </div>
  );
}
