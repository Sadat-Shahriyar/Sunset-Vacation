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
import { axios_api } from '../../../App';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
 
  textAlign: 'center',
  color: "black",
  fontFamily: "Lucida Handwriting"
}));
const style = {
  width: '20%',
  bgcolor: 'background.paper',
  marginTop: "10px",
  marginLeft: "auto",
  marginRight: "auto"

};
const button= {
  marginTop: "20px",
   fontFamily: "Lucida Handwriting",
   bgcolor:"#EAA49B",
  '&:hover': {
    backgroundColor: '#EAA49B',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#EAA49B',
  },
}
export default function ShowFacility(props) {
  let navigate = useNavigate();


  // const [amenities, setAmenities] = React.useState([]);
  // const [guestsFavourites, setGuestsFavourites] = React.useState([]);
  // const [safetyItems, setSafetyItems] = React.useState([]);

  var [facilities,setFacilities]=React.useState([]);



  React.useEffect(() => {

    fetch(`http://localhost:8000/hosting/getPropertyFacilities/` + `${props.property.propertyID}`,
    {
          method:"GET",
          headers: {
          'Content-type': 'application/json',
          'Authorization':  `Bearer ${props.token}`,
          
          }
      })
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
          setFacilities(response.pfacilities);
        
      })
      .catch((err) => {
        alert(err.message);
      })
  }, [])
  function changeDescription(event) {
    props.property.description = event.target.value;
  }
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

  function DeleteFacility(fac) {
    console.log("delete button pressed")
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' ,
                'Authorization':  `Bearer ${props.token}`,
    },
      body: JSON.stringify(fac)
    };
    fetch(`http://localhost:8000/hosting/deleteFacility/` + `${fac.id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        //console.log(response.msg);
        props.setflags("fac");
        navigate('/showProperty/Redirect')
        
      });

      navigate('/showPropertyDetails/facility');
  }
  function showPropertyFacilities(props) {
    return (
     

    <Box sx={{flexGrow: 1 , width:"90%",marginLeft:"100px",marginRight: "auto"}}>
      <Button  sx={button} 
      onClick={()=>{navigate('/addnewfacility')}}
      variant="contained">ADD new Facility</Button>
    {facilities.map((fac)=>(
     <div>
       <Typography sx={{ marginTop: "30px", marginLeft:"auto",marginRight:"auto",fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
      {fac.catagory}
     </Typography>
    <Grid container spacing={1}>
    {fac.list.map((f)=>(
     <Grid item xs={3}>
       <List  sx={{
        width: '80%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        border: "2px solid #EAA49B",
        boxShadow: "2px 2px 2px 2px #EADBD9",
        marginTop: "10px",
        fontFamily: "Lucida Handwriting",
      }}>
            
            <ListItem>
        
        <ListItemText  primary={f.facility_name} secondary={f.description} />
      <IconButton><DeleteIcon onClick={() => DeleteFacility(f)}/></IconButton>
      </ListItem>
           
            

          </List>
      </Grid >
     ))}
    </Grid>
     </div>
    ))}

</Box>
    )
  }


  return (
    <div>

      <ManagementDashboard />

      {showPropertyNavbar(props)}
      {/* {showPropertyFacilities(props)} */}
    </div>
  );
}
