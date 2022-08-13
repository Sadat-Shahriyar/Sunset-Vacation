import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CottageIcon from '@mui/icons-material/Cottage';
import { IconButton, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import Button from '@mui/material/Button';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import VillaIcon from '@mui/icons-material/Villa';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Filter(props) {
  let navigate=useNavigate();
  const [catagories, setCatagories] = React.useState([]);
  const [amenities, setAmenities] = React.useState([]);
  const [guestFavs, setGuestFavs] = React.useState([]);
  const [safetyItem, setSafetyItems] = React.useState([]);
  const [selectedFac,setFac]=React.useState([]);
  const [minprice,setMinprice]=React.useState(0);
  const [maxprice,setMaxprice]=React.useState(0);
  const [type,setType]=React.useState([]);
  const [propertyType,setPropertyType]=React.useState([]);
  var iconCount = -1;
  React.useEffect(() => {
    fetch(`http://localhost:8000/hosting/getPropertyCatagory/`)
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

        setCatagories(response.catagories);

      })
      .catch((err) => {
        alert(err.message);
      })
    fetch(`http://localhost:8000/hosting/getfacilities/`)
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
        setAmenities(response.amenities);
        setGuestFavs(response.guestsFavourite);
        setSafetyItems(response.safetyItems);
       

      })
      .catch((err) => {
        alert(err.message);
      })
  }, [])


  const displayFunc = () => {
    return props.display.display;
  }
  const handleChange = (event) => {
   
    var fac=[...selectedFac]
    if(fac.includes(event.target.name)){
      let idx=fac.indexOf(event.target.name)
      fac.splice(idx,1);
    }else{
      fac.push(event.target.name);
    }
    setFac(fac)


    console.log(fac)
    
  };

  const handleChangeType = (event) => {
    var t=[...type]
    if(t.includes(event.target.name)){
      let idx=t.indexOf(event.target.name);
      t.splice(idx,1);
    }else{
      t.push(event.target.name);
    }
    setType(t);
    console.log(t);
    
  };

  function handleSearch(){
      console.log(selectedFac);
      console.log(type);
      console.log(propertyType);
      console.log(minprice);
      console.log(maxprice);
     
      let body={
        facility: selectedFac,
        placeType: type,
        propertyType: propertyType,
        minprice: minprice,
        maxprice: maxprice,
      };
     
     props.display.setStaticUserSearch(body);
     props.display.setDisplay('none');
     navigate('/userStaticSearch');
      
  }

  function getIcon(props) {
    iconCount = iconCount + 1;

    if (iconCount % 4 === 0) {

      return <OtherHousesIcon />
    } else if (iconCount % 4 === 1) {
      return <HolidayVillageIcon />
    } else if (iconCount % 4 === 2) {
      return <VillaIcon />
    } else {
      return <CottageIcon />
    }

  }
  
  function handlePropertyType(catagory){
    var types=[...propertyType]
    if(types.includes(catagory)){
      var idx=types.indexOf(catagory);
      types.splice(idx,1);
    }else{
      types.push(catagory);
    }
    setPropertyType(types);

  }

  function checkPropertyType(catagory){
    let bg = 'grey';
   
    if(propertyType.includes(catagory)){
      bg = '#EAA49B';
    }
    return(
      <Button id={catagory} variant="outlined" color='inherit' sx={{ fontFamily: 'Lucida Handwriting', m: 2, bgcolor: bg }} endIcon={getIcon(props)} onClick={() => {handlePropertyType(catagory)}}>
    {catagory}
  </Button>
    )
  }

  function filterSearch(props) {
    return (
      <Box id="overlay"  sx={{   display: displayFunc(),flexWrap: 'wrap' }} >     
     
        <Paper elevation={6} sx={{ ":hover": "none", padding: 4 }}>
          <Typography sx={{ marginTop: "0px", fontFamily: "Lucida Handwriting" }} align='center' variant="h5" component="h5">
            filter
          </Typography>
          <Divider />

          <Typography sx={{ marginTop: "30px", fontFamily: "Lucida Handwriting" }} align='left' variant="h6" component="h6">
            Price range
          </Typography>

          <Grid container columns={12} spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                label="min price"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                onChange={(event)=>{setMinprice(event.target.value)}}
              />

            </Grid>
            <Grid item xs={6}>
              <TextField
                label="max price"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                onChange={(event)=>{setMaxprice(event.target.value)}}
              />

            </Grid>
          </Grid>
          <Typography sx={{ marginTop: "30px", fontFamily: "Lucida Handwriting" }} align='left' variant="h6" component="h6">
            Type of place
          </Typography>
          <FormControl sx={{ m: 1,fontFamily: 'candara' }} component="fieldset" variant="standard">
          <FormControlLabel control={<Checkbox  onChange={handleChangeType} name="An entire place" />} label="An entire place" />
          <FormControlLabel control={<Checkbox  onChange={handleChangeType} name="A private room" />} label="A private room" />
          <FormControlLabel control={<Checkbox  onChange={handleChangeType} name="A shared room" />} label="A shared room" />

        </FormControl>
          <Typography sx={{ marginTop: "30px", fontFamily: "Lucida Handwriting" }} align='left' variant="h6" component="h6">
            Property type
          </Typography>
          <Grid container columns={16} spacing={1}>
            {catagories.map((catagory) => (
                

              <Grid item xs={4}>
                {checkPropertyType(catagory)}
              </Grid>


            ))}
          </Grid>
          <Typography sx={{ marginTop: "30px", fontFamily: "Lucida Handwriting" }} align='left' variant="h6" component="h6">
            Select facility
          </Typography>
          <Typography sx={{ ml:5,marginTop: "30px", fontSize:18,fontFamily: "Lucida Handwriting" }} align='left' variant="h6" component="h6">
            Amenities
          </Typography>
          <Grid container spacing={1}>
            {
             
              amenities.map((a) => (
                <Grid item xs={4}>
                  <FormControl sx={{ m: 0,fontFamily: 'candara' }} component="fieldset" variant="standard">
            
                    
                      <FormControlLabel
                        control={
                          <Checkbox  onChange={handleChange} name={a[0]} />
                        }
                        label={a[0]}
                      />
                   

                  </FormControl>
                </Grid>
              ))
            }
          </Grid>

          <Typography sx={{ ml:5,marginTop: "30px", fontSize:18,fontFamily: "Lucida Handwriting" }} align='left' variant="h6" component="h6">
           Guests Favourites
          </Typography>
          <Grid container spacing={1}>
            {
             
              guestFavs.map((a) => (
                <Grid item xs={4}>
                  <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
            
                    
                      <FormControlLabel
                      sx={{fontFamily: "Lucida Handwriting" }}
                        control={
                          <Checkbox  onChange={handleChange} name={a[0]} />
                        }
                        label={a[0]}
                      />
                   

                  </FormControl>
                </Grid>
              ))
            }
          </Grid>

          <Typography sx={{ ml:5,marginTop: "30px", fontSize:18,fontFamily: "Lucida Handwriting" }} align='left' variant="h6" component="h6">
           Safety Items
          </Typography>
          <Grid container >
            {
             
              safetyItem.map((a) => (
                <Grid item xs={4}>
                  <FormControl sx={{ m: 0,fontFamily: 'candara' }} component="fieldset" variant="standard">
            
                    
                      <FormControlLabel
                        control={
                          <Checkbox  onChange={handleChange} name={a[0]} />
                        }
                        label={a[0]}
                      />
                   

                  </FormControl>
                </Grid>
              ))
            }
          </Grid>
            <Divider />
          <Button variant="contained" color='inherit' sx={{ml: 45,mt:3}} onClick={handleSearch}>search</Button>
  

        </Paper>
        {/* </MenuItem>

        </Menu>  */}


      </Box>
    )
  }
  return (
    <div>
      {filterSearch(props)}

    </div>
  )
}