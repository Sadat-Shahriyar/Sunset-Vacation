import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PoolIcon from '@mui/icons-material/Pool';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import KitchenIcon from '@mui/icons-material/Kitchen';
import Box from '@mui/material/Box';
import SailingIcon from '@mui/icons-material/Sailing';
import { useNavigate } from 'react-router-dom';
import WavesIcon from '@mui/icons-material/Waves';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import BathroomIcon from '@mui/icons-material/Bathroom';
import DeckIcon from '@mui/icons-material/Deck';
import TvIcon from '@mui/icons-material/Tv';
import WifiIcon from '@mui/icons-material/Wifi';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TuneIcon from '@mui/icons-material/Tune';
import Filter from './Filter';
export default function SearchNav(props){

  let navigate = useNavigate();
  
  const [outdoor,setOutdoor]=React.useState('');
  const [safety,setSafety]=React.useState('');
  const [bathroom,setBathroom]=React.useState('');
  const [laundry,setLaundry]=React.useState('');
  const [kitchen,setKitchen]=React.useState('');
  

  React.useEffect(() => {
  
    fetch(`http://localhost:8000/hosting/getCatagoryForSearch/` )
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
        
        setCatagoryBasedfacilities(response.catagoryBasedFacility);
        
      })
      .catch((err) => {
        alert(err.message);
      })

     
  }, [])

   function handleClick(value){
    props.setSelectedFac(value);
    props.setflags("search");
    navigate('/showProperty/Redirect');
   }
   function setCatagoryBasedfacilities(Facilities){
    var fac=Facilities.find(element => element["catagory"] === 'Outdoor');        
    setOutdoor(fac.facilities);
    
    fac=Facilities.find(element => element["catagory"] === 'Bathroom');
    setBathroom(fac.facilities);
    fac=Facilities.find(element => element["catagory"] === 'Bedroom & Laundry');
    setLaundry(fac.facilities);
    fac=Facilities.find(element => element["catagory"] === 'Home safety');
    setSafety(fac.facilities);
    
    fac=Facilities.find(element => element["catagory"] === 'Kitchen and dining');
    setKitchen(fac.facilities);
   }
   function changeDisplay(){
    if(props.display === 'none'){
      props.setDisplay('block') ;console.log("check: ",props.display);
    props.setflags('filter');
    navigate('/showProperty/Redirect');
    }else{
      props.setDisplay('none') ;console.log("check: ",props.display);
    props.setflags('none');
    }
   }

  return (
    
     <div>
       <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="10vh"
  mt="5px"
 
>
  
<Grid container columns={16}>
  <Grid item xs={14}>
  <Tabs variant="scrollable"
  scrollButtons={true}  aria-label="icon tabs example">
      <Tab icon={<PoolIcon />} sx={{fontFamily: 'Lucida Handwriting'}} onClick={()=>{handleClick("pool")}}  label="Pool"  />
      <Tab icon={<SoupKitchenIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("kitchen")}}  label="Kitchen"/>
      <Tab icon={<MicrowaveIcon />} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("microwave")}}  label="Microwave" />
      <Tab icon={<KitchenIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("refrigerator")}}  label="refrigerator"/>
      <Tab icon={<WavesIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("sea view bay view")}}  label="sea view"/>
      <Tab icon={<SailingIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("boat")}}  label="boat slip"/>
      <Tab icon={<DirectionsCarIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("parking")}}  label="parking"/>
      <Tab icon={<MedicalServicesIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("First aid")}}  label="first aid"/>
      <Tab icon={<HealthAndSafetyIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick(safety)}}  label="safety"/>
      <Tab icon={<FreeBreakfastIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("breakfast")}}  label="breakfast"/>
      <Tab icon={<FireplaceIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("heating")}}  label="heating"/>
      <Tab icon={<FitnessCenterIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("gym")}}  label="gym"/>
      <Tab icon={<WifiIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("wifi")}}  label="wifi"/>
      <Tab icon={<AcUnitIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("air conditioning")}}  label="air conditioning"/>
      <Tab icon={<TvIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("tv")}}  label="tv"/>
      <Tab icon={<LocalLaundryServiceIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick("washer")}}  label="washer"/>
      <Tab icon={<DeckIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick(outdoor)}}  label="outdoor"/>
      <Tab icon={<BathroomIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick(bathroom)}}  label="bathroom"/>
      <Tab icon={<FoodBankIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick(kitchen)}}  label="kitchen accessories"/>
      <Tab icon={<DryCleaningIcon/>} sx={{fontFamily: 'Lucida Handwriting'}}  onClick={()=>{handleClick(laundry)}}  label="Laundry"/>

    </Tabs>
  </Grid>
  <Grid item xs={2}>
  <Button variant="outlined" color='inherit' sx={{fontFamily: 'Lucida Handwriting',m:2,bgcolor: "grey"}} endIcon={<TuneIcon />} onClick={changeDisplay}>
        Filter
      </Button>
  </Grid>
</Grid>

      </Box>
      <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
 // minHeight="100vh"
  mt="10px"
>
  <Filter display={props}/>
  </Box>
     </div>

    
  )
}
