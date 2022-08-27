// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import WbTwilightIcon from '@mui/icons-material/WbTwilight';
// import { Button, Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MoreIcon from '@mui/icons-material/MoreVert';
// import { Navigate, useNavigate } from 'react-router-dom';



// export default function ShowNavBar(props){
//     const navigate = useNavigate();
//     const becomeAHostButton = (event) => {
//         navigate("/hosting");
//     }

//     const menuId = 'primary-search-account-menu';

//     return(
//       <Box>
//         <AppBar position="static" sx={{bgcolor: "#C4036C"}}>
//             <Toolbar>
            
            
         
//         <IconButton>
//           < WbTwilightIcon sx={{color: 'white'}} />
//         </IconButton>
//               <Typography
//                 variant="h6"
//                 noWrap
//                 component="div"
//                 sx={{ display: { xs: 'none', sm: 'block' } }}
//               >
//                 <p style={{"fontFamily": "Jokerman","fontSize":"25px"}}>SUNSET VACATION</p>
               
//               </Typography>
              
        
            
              
//               <Box sx={{ flexGrow: 1 }} />
    
//               <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//                 {/* <IconButton size="large" aria-label="show 6 new mails" color="inherit">
//                   <Badge badgeContent={6} color="error">
//                     <MailIcon />
                    
                   
//                   </Badge>
//                 </IconButton> */}
//                 <Button variant="text" sx={{fontFamily:"Jokerman",color: "white"}} onClick={()=>{{navigate('/');}}}>Home</Button>
//                 {/* <Button variant="text" sx={{fontFamily:"Jokerman",color: "black"}} onClick={()=>{{navigate('/search');}}}>search</Button> */}
                          
    
//                 <Button variant="text" sx={{fontFamily:"Jokerman",color: "white"}} onClick={becomeAHostButton}>Become a host</Button>
//                 {/* <IconButton
//                   size="large"
//                   aria-label="show 19 new notifications"
//                   color="inherit"
//                   onClick={()=>{navigate("/login");}}
//                 >
//                   <Badge badgeContent={19} color="error">
//                     <NotificationsIcon />
//                   </Badge>
//                 </IconButton> */}
//                 <IconButton
//                   size="large"
//                   edge="end"
//                   aria-label="account of current user"
//                   aria-controls={menuId}
//                   aria-haspopup="true"
//                   color="inherit"
//                   onClick={()=>{navigate("/login");}}
//                 >
//                   <AccountCircle />
//                 </IconButton>
//               </Box>
//             </Toolbar>
//           </AppBar>
//       </Box>
//     )
//   }


import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Divider, Paper, responsiveFontSizes, TextareaAutosize } from '@mui/material';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail'
import Menu from '@mui/material/Menu';
const StyledMenu = styled((props) => (
    <Menu
        elevation={3}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            // '&:active': {
            //   backgroundColor: alpha(
            //     theme.palette.primary.main,
            //     theme.palette.action.selectedOpacity,
            //   ),
            // },
        },
    },
}));

function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 10) {
      return 'more than 10 notifications';
    }
    return `${count} notifications`;
  }

export default function ShowNavbar(props) {
    
    let navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notificationCount,setNotificationCount]=React.useState(0);
    const [msgCount,setMsgCount]=React.useState(0);
    
    function mouseOver(event) {
        event.target.style.color = "#C4036C";
    }

    function mouseOut(event) {
        event.target.style.color ='black' ;
    }
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const becomeAHostButton = (event) => {
        navigate("/hosting");
    }
    const isMenuOpen = Boolean(anchorEl); 
    const goToProfile = () =>{
        setAnchorEl(null);
        navigate('/profile');
        
    };
    const handleLogin = () => {
        setAnchorEl(null);
        navigate('/Login');
    };
    const handleLogOut = () => {
      setAnchorEl(null);
      navigate('/')
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
      };
    const menuId = 'primary-search-account-menu';
    const renderMenu = ()=>{
        if(props.isLoggedin === true){
            return (
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
                    <MenuItem sx={{fontFamily:'Lucida Handwriting'}} onClick={goToProfile}>Profile</MenuItem>
                    <MenuItem sx={{fontFamily:'Lucida Handwriting'}}  onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
            );
        }
        else{
            return (
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
                </Menu>
            );
        }
    }
   function showNotificationMessage(props){
    console.log(props.isLoggedin)
    if(props.isLoggedin === true){
        
        return(
           <div>
            
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
           </div>
        )
    }
   }
    
    
    return (
        <Box sx={{boxShadow: 3}} >
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
                     }}>SUNSET VACATION</p>

                </Typography>

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
                    ml:125,
                                  
                    mt:2.5
                   
                }}>
                    {showNotificationMessage(props)}
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
           
            {renderMenu()}
            <Divider />


        </Box>
    )
}