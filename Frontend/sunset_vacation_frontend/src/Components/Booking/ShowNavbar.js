import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { Button, Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Navigate, useNavigate } from 'react-router-dom';



export default function ShowNavBar(props){
    const navigate = useNavigate();
    const becomeAHostButton = (event) => {
        navigate("/hosting");
    }

    const menuId = 'primary-search-account-menu';

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
                {/* <Button variant="text" sx={{fontFamily:"Jokerman",color: "black"}} onClick={()=>{{navigate('/search');}}}>search</Button> */}
                          
    
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
                  color="inherit"
                  onClick={()=>{navigate("/login");}}
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
      </Box>
    )
  }