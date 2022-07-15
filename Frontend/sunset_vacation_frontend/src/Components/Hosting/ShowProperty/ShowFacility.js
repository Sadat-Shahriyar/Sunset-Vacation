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
import Chip from '@mui/material/Chip';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
export default function ShowFacility(props) {
  let navigate = useNavigate();

  var [facilities, setFacilities] = React.useState([]);


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
    fetch(`http://localhost:8000/hosting/getPropertyFacilities/` + `${props.property.propertyID}`)
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
        setFacilities(response.pfacilities)
      
        
      })
      .catch((err) => {
        alert(err.message);
      })
  })
  function changeDescription(event) {
    props.property.description = event.target.value;

  }
  function changeTitle(event) {

    props.property.title = event.target.value;

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
  
  function showPropertyFacilities(porps){
    return(
      <div>
        {facilities.map((fac) => (
          <div>
            <BottomNavigation showLabels>
            <Chip
  label={f.facility_name}
  onClick={handleClick}
  onDelete={handleDelete}
  deleteIcon={<DeleteIcon />}
  variant="outlined"
/>
            </BottomNavigation>
            <p>{fac.catagory}</p>
            {fac.list.map((f) =>(
            <Fab variant="extended">
            {f.facility_name}
            <DeleteIcon sx={{ mr: 1 }} />
          </Fab>
          ))}
          </div>
            
          
        ))}
        
         
      </div>
    )
  }


  return (
    <div>

      <ManagementDashboard />

      {showPropertyNavbar(props)}
      {showPropertyFacilities(props)}
    </div>
  );
}
