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
import { useNavigate } from 'react-router-dom';
const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }),
);
function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

export default function Filter(props) {
 const [catagories,setCatagories]=React.useState([]);
 var iconCount=-1;
  React.useEffect(()=>{
    fetch(`http://localhost:8000/hosting/getPropertyCatagory/` )
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
  },[])
  const displayFunc=()=>{
    console.log(props.display);
    return props.display;
  }
 
  function getIcon(props){
    iconCount=iconCount+1;
   
    if(iconCount%4 === 0){
      
     return <OtherHousesIcon/>
    }else if(iconCount%4 === 1){      
      return <HolidayVillageIcon/>       
    }else if(iconCount%4 === 2){
     return <VillaIcon/>
    }else{
      return <CottageIcon/>
    }
    
  }
  function filterSearch(props) {
    return (
      <Box
      id="overlay"
           
        sx={{
          display:displayFunc(),
          flexWrap: 'wrap',
               
        }}
      >
        {/* <Menu
          id="basic-menu"
          anchorEl={props.anchorEl}
          open={props.open}
          onClose={handleClose}
          
          elevation={0}
        >
          <MenuItem > */}
            <Paper  elevation={6} sx={{ ":hover":"none",padding:4}}>
            <Typography sx={{ marginTop: "0px", fontFamily: "Lucida Handwriting" }} align='center' variant="h5" component="h5">
              filter
            </Typography>
            <Divider />
            
            <Typography sx={{ marginTop: "30px", fontFamily: "Lucida Handwriting" }} align='left' variant="h6" component="h6">
              Price range
            </Typography>



            <Grid container columns={12} spacing={2} sx={{mt: 1}}>
              <Grid item xs={6}>
                <TextField
                  label="start date"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />

              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="end date"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />

              </Grid>
            </Grid>
            <Typography sx={{ marginTop: "30px", fontFamily: "Lucida Handwriting" }} align='left' variant="h6" component="h6">
              Type of place
            </Typography>
            <RadioGroup name="use-radio-group" >
      <MyFormControlLabel value="entire" label="Entire room" control={<Radio />} />
      <MyFormControlLabel value="private" label="a private room" control={<Radio />} />
      <MyFormControlLabel value="shared" label="a shared room" control={<Radio />} />
    </RadioGroup>
    <Typography sx={{ marginTop: "30px", fontFamily: "Lucida Handwriting" }} align='left' variant="h6" component="h6">
              Type of place
            </Typography>
            <Grid container columns={16} spacing={1}>
       {catagories.map((catagory)=>(
        
       
        <Grid item xs={4}>
          <Button variant="outlined" color='inherit' sx={{fontFamily: 'Lucida Handwriting',m:2,bgcolor: "grey"}} endIcon={getIcon(props)} onClick={()=>{}}>
        {catagory}
      </Button>
          </Grid>
         
        
       ))}
         </Grid>
      <Typography sx={{ marginTop: "30px", fontFamily: "Lucida Handwriting" }} align='left' variant="h6" component="h6">
              Type of place
            </Typography>
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