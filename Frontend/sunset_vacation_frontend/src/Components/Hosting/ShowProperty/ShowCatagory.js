import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DetailsIcon from '@mui/icons-material/Details';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DescriptionIcon from '@mui/icons-material/Description';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

export default function ShowCatagory(props) {
  let navigate = useNavigate();

  const [prop, setProp] = React.useState({});
  const [edit, setEdit] = React.useState(false);


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
  React.useEffect(() => {
    fetch(`http://localhost:8000/hosting/getProperty/` + `${props.property.propertyID}`)
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
        
        setProp(response.property)
        
      })
      .catch((err) => {
        alert(err.message);
      })
  })

  function editClicked(event){
    console.log("edit value ", edit)
    setEdit(!edit);
    console.log("edit value change ", edit)
  }
 
  function handleSubmit(event) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props.property)
    };
    fetch(`http://localhost:8000/hosting/updateProperty/` + `${props.property.propertyID}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("updated successsfully")
      });
  }
  function changeConciseType(event) {
    props.property.conciseType = event.target.value;
  }
  function changeEntirePrivateOrShared(event) {
    props.property.entirePrivateOrShared = event.target.value;
  }
  function changeNoOfGuests(event) {
    props.property.noOfGuests = event.target.value;
  }
  function changeNoOfBeds(event) {
    props.property.noOfBeds = event.target.value;
  }
  function changeNoOfBedrooms(event) {
    props.property.noOfBedrooms = event.target.value;
  }
  function changeNoOfBathrooms(event) {
    props.property.noOfBathrooms = event.target.value;
  }

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
              <p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "25px", "color": "black" }}>{prop.title}
                &nbsp;&nbsp;&nbsp;<IconButton><EditIcon onClick={editClicked}/></IconButton></p>
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar position='static' color='inherit' >
          <Toolbar>
            <Button onClick={useHome} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Images</Button><IconButton><InsertPhotoOutlinedIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useCatagory} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "#C4036C" }} >Catagory</Button><IconButton><DetailsIcon sx={{ color: '#C4036C' }} /></IconButton>
            <Button onClick={useLocation} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Location</Button><IconButton><LocationOnIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useFacility} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Facilities & Safety Items</Button><IconButton><DesktopMacIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useDescription} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Description,price & Cancellation policy</Button><IconButton><DescriptionIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useFaq} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Faq</Button><IconButton><QuestionAnswerIcon sx={{ color: 'black' }} /></IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
  function showCategory(props) {
    return (
        <div>
          <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch' },
              }}
              noValidate
              m={2}
              p={2}
              autoComplete="off"
          >
            <Grid container>
              <Grid item xs={1}/>
              <Grid item xs={5.5}>
                <label><p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "12px", "color": "black" }}>Concise Type</p></label>
                <TextField
                    id="outlined-disabled"
                    disabled={!edit}
                    defaultValue={props.property.conciseType}
                    onChange={changeConciseType}/>
                <label><p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "12px", "color": "black" }}>Type Of Hosting</p></label>
                <FormControl sx={{ m: 1, minWidth: 120 }} disabled={!edit}>
                  <Select
                      labelId="demo-simple-select-disabled-label"
                      id="demo-simple-select-disabled"
                      defaultValue={props.property.entirePrivateOrShared}
                      onChange={changeEntirePrivateOrShared}
                  >
                    <MenuItem value="Entire">Entire</MenuItem>
                    <MenuItem value="Private">Private</MenuItem>
                    <MenuItem value="Shared">Shared</MenuItem>
                  </Select>
                </FormControl>
                <label><p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "12px", "color": "black" }}>No of Guests</p></label>
                <TextField
                    id="outlined-disabled"
                    disabled={!edit}
                    defaultValue={props.property.noOfGuests}
                    onChange={changeNoOfGuests}/>
              </Grid>
              <Grid item xs={5.5}>
                <label><p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "12px", "color": "black" }}>No of Guests</p></label>
                <TextField
                    id="outlined-disabled"
                    disabled={!edit}
                    defaultValue={props.property.noOfBeds}
                    onChange={changeNoOfBeds}/>
                <label><p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "12px", "color": "black" }}>No of Guests</p></label>
                <TextField
                    id="outlined-disabled"
                    disabled={!edit}
                    defaultValue={props.property.noOfBedrooms}
                    onChange={changeNoOfBedrooms}/>
                <label><p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "12px", "color": "black" }}>No of Guests</p></label>
                <TextField
                    id="outlined-disabled"
                    disabled={!edit}
                    defaultValue={props.property.noOfBathrooms}
                    onChange={changeNoOfBathrooms}/>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}/>
              <Grid item xs={8}>
            <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor:'#282c34', marginTop:2, marginLeft: 15}}>Update</Button>
                </Grid>
              </Grid>
          </Box>
        </div>
    )
  }
  
  return (
    <div>

      <ManagementDashboard />

      {showPropertyNavbar(props)}

      {showCategory(props)}

    </div>
  );
}
