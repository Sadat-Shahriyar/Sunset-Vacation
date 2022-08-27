import * as React from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Divider, Paper, responsiveFontSizes } from '@mui/material';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



export default function QAnavbar(props) {
    const navigate = useNavigate();
    const [notificationCount,setNotificationCount]=React.useState(0);
    const [notifications,setNotifications]=React.useState();
    const [msgCount,setMsgCount]=React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl); 

    React.useEffect(() => {
        
        fetch(`http://localhost:8000/message/getNotifications/`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Authorization' : `Bearer ${props.token}`
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
                setNotifications(response.notifications)
                setNotificationCount(response.len)
            })
            .catch((err) => {
                alert(err.message);
            })

    }, [])
    function notificationsLabel(count) {
        if (count === 0) {
          return 'no notifications';
        }
        if (count > 10) {
          return 'more than 10 notifications';
        }
        return `${count} notifications`;
      }
      const becomeAHostButton = (event) => {
        navigate("/hosting");
    }
    function mouseOver(event) {
        event.target.style.color = "#C4036C";
    }

    function mouseOut(event) {
        event.target.style.color ='black' ;
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
               
      };
      const handleLogin = () => {
        setAnchorEl(null);
        navigate('/Login');
        
      };
    const handleLogOut = () => {
      setAnchorEl(null);
      navigate('/Login');
      
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
          sx={{mt:5}}
        >
          <MenuItem sx={{fontFamily:'Lucida Handwriting'}} onClick={handleLogin}>Login</MenuItem>
          <MenuItem sx={{fontFamily:'Lucida Handwriting'}}  onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      );

    return (
        <Box sx={{boxShadow: 3, position:"fixed",width:"100%",zIndex:2,bgcolor:"white"}} >
        <Toolbar >
            <Typography
                variant="h6"
                noWrap
                component="div"
               
                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                onMouseOver={mouseOver} onMouseOut={mouseOut}
            >
                <p onClick={() => { { navigate('/'); } }} style={{ "fontFamily": "Jokerman", "fontSize": "25px"
                // color: "#C4036C" 
                 }}>SUNSET VACATION FORUM</p>

            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        //ml: 15,
                        
                    },
                    ml:30,
                    mr:'auto'
                }}
            >
                
            </Box>

            {/* <Box sx={{ flexGrow: 1 ,mr:2}} /> */}
            <Box
             sx={{
                display: 'block',
                flexDirection: 'row',
                alignItems: 'right',
                //position:'fixed',
                position:'absolute',
                '& > *': {
                   m:0
                },
                ml:140,
                              
                //mt:2.5
               
            }}>
                <Box
             sx={{
                display: 'block',
                flexDirection: 'row',
                //alignItems: 'right',
                //position:'fixed',
                '& > *': {
                   m:0
                },
                ml:15,
                              
                mt:-3
               
            }}>
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label={notificationsLabel(notificationCount)}
                  onClick={()=>{navigate("/login");}}
                >
                  <Badge badgeContent={notificationCount} >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label={notificationsLabel(msgCount)}>
      <Badge badgeContent={msgCount}  sx={{color:'black'}} max={9}>
        <MailIcon />
      </Badge>
    </IconButton>
                </Box>
            </Box>
            <Box
            sx={{
                display: 'block',
                flexDirection: 'row',
                alignItems: 'right',
                //position:'fixed',
                position:'absolute',
                '& > *': {
                   m:0.5
                },
                ml:155
               
            }}
            >
            {/* <Box sx={{ display: { xs: 'none', md: 'flex',alignContent:'marginRight' } }}> */}
                <Button onMouseOver={mouseOver} onMouseOut={mouseOut} variant="outlined" color='inherit' sx={{ fontFamily: "Jokerman" }} onClick={becomeAHostButton}>Become a host</Button>
               

        <IconButton                     
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
            </Box>

        </Toolbar>
       
  {renderMenu}
        <Divider />


    </Box>
    )
        

}
