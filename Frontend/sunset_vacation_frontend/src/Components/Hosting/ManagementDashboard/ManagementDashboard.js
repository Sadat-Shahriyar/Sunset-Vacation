import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import HomeIcon from '@mui/icons-material/Home';
export default function ManagementDashboard(props) {
   const navigate = useNavigate();
  
    const useHandleHostNewPropertyButton = (event) => {
        navigate("/hostproperty");
    }
    const useHostingRedirect = (event) => {
      navigate("/hosting");
  }
    const useShowProperties=(event)=>{
      navigate("/showProperties")
    }
    function mouseOver(event){
      event.target.style.color = "black";
    }
    function mouseOut(event){
      event.target.style.color = "white";
    }
  return (
    <Box sx={{ flexGrow: 1 } }>
      <AppBar position="static" sx={{bgcolor:"#C4036C"}}>
      <Toolbar>
         
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <p  style={{"fontFamily": "Jokerman","fontSize":"25px"}}>ManagementDashboard</p>
           
          </Typography>
          {/* <Button disabled></Button> */}
          <Button color="inherit" onClick={useHostingRedirect}><HomeIcon /></Button>

          <Button color="inherit"  sx={{fontFamily : "Lucida Handwriting", fontSize: "15px"}} onClick={useShowProperties} onMouseOver={mouseOver} onMouseOut={mouseOut}>Your Listing</Button>
          <Button color="inherit"   sx={{ fontFamily : "Lucida Handwriting", fontSize: "15px"}} onClick={useHandleHostNewPropertyButton} onMouseOver={mouseOver} onMouseOut={mouseOut}>Create Listing</Button>

        </Toolbar>
      </AppBar>
     
    </Box>
  );
}
