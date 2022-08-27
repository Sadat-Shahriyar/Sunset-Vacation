import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { axios_api } from '../../App';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Divider, Paper, responsiveFontSizes, TextareaAutosize } from '@mui/material';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail'
import Menu from '@mui/material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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

export default function ProfileNavbar(props) {
    
    let navigate = useNavigate();
    const fetchNotification=async()=>{
       
  
            fetch(`http://localhost:8000/message/getNotifications/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
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
                    setNotificationNew(response.notifications.new)
                    console.log(response.notifications)
                    setNotificationRead(response.notifications.read)
                    setNotificationCount(response.len)
                })
                .catch((err) => {
                    alert(err.message);
                })
        
    }
    React.useEffect(() => {      
        fetchNotification();
  
    }, [])
      
   
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEln, setAnchorEln] = React.useState(null);

    const [notificationCount,setNotificationCount]=React.useState(0);
    const [notificationNew,setNotificationNew]=React.useState([]);
    const [notificationRead,setNotificationRead]=React.useState([]);
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
    const handleProfileMenuOpenN = (event) => {
        setAnchorEln(event.currentTarget);
    };
    const becomeAHostButton = (event) => {
        navigate("/hosting");
    }
    const isMenuOpen = Boolean(anchorEl); 
    const isMenuOpenN = Boolean(anchorEln); 

    const goToMyBookings = () =>{
        setAnchorEl(null);
        navigate('/my-bookings');
        
    };
    const handleLogin = () => {
        setAnchorEl(null);
        navigate('/Login');
    };
    const handleLogOut = () => {
      setAnchorEl(null);
      navigate('/');
      
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
      };
      const handleMenuCloseN = () => {
        setAnchorEln(null);
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
                    <MenuItem sx={{fontFamily:'Lucida Handwriting'}} onClick={goToMyBookings}>My Bookings</MenuItem>
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
    const markNotification= async (notification) => {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization':  `Bearer ${props.token}` },
            body: JSON.stringify(notification)
          };
          fetch(`http://localhost:8000/message/markNotification/`+`${notification.id}/` , requestOptions)
            .then(response => response.json())
            .then(data => {
              navigate(notification.link);
            });

    }
    function notificationCardNew(notification) {
        return (

            <Card  sx={{ boxShadow: 2, fontSize: 12, p: 1, width: 500, bgcolor: "#FDF2E9" }}>
                <Grid container>
                    <Grid onClick={(event) => {markNotification(notification)}} item xs={11}>{notification.title}</Grid>
                    <Grid item xs={1}><CloseIcon onClick={(event) => { removeNotification(notification.id) }} sx={{ fontSize: 15 }} /></Grid>
                </Grid>             </Card>

        )
    }
    function notificationCardRead(notification) {
        return (

            <Card  sx={{ boxShadow: 2, fontSize: 12, p: 1, width: 500 }}>
                <Grid container>
                    <Grid onClick={(event) => { navigate(notification.link) }} item xs={11}>{notification.title}</Grid>
                    <Grid item xs={1}><CloseIcon onClick={(event) => { removeNotification(notification.id) }} sx={{ fontSize: 15 }} /></Grid>
                </Grid>             </Card>

        )
    }
    const removeNotification=async(id)=>{
        if (props.isLoggedin === true & props.token != null) {

            fetch(`http://localhost:8000/message/deleteNotification/`+`${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
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
                  
                    fetchNotification();
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
    }

    function showNoti(props) {
        if (props.isLoggedin === true) {
            return (
                <div>
                    {notificationNew.map((n) => (
                        <MenuItem sx={{ fontFamily: 'Lucida Handwriting' }}>{notificationCardNew(n)}</MenuItem>

                    ))}
                    {notificationRead.map((n) => (
                        <MenuItem sx={{ fontFamily: 'Lucida Handwriting' }}>{notificationCardRead(n)}</MenuItem>

                    ))}
                </div>
            )
        }
    }
    function showNotificationMessage(props) {
            
            const menuid = 'primary-search-account-menu';
            const renderNMenu = (
                <Menu
                    anchorEl={anchorEln}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    id={menuid}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isMenuOpenN}
                    onClose={handleMenuCloseN}
                    sx={{ mt: 5 }}
                >

                    {showNoti(props)}
                </Menu>
            );
            return (
                <div>

                    <Box
                        sx={{
                            display: 'block',
                            flexDirection: 'row',
                            //alignItems: 'right',
                            //position:'fixed',
                            '& > *': {
                                m: 0
                            },
                            ml: 15,

                            mt: -3

                        }}>

                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label={notificationsLabel(notificationCount)}
                            aria-controls={menuid}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpenN}

                        >
                            <Badge badgeContent={notificationCount} >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        {renderNMenu}
                        <IconButton aria-label={notificationsLabel(msgCount)}>
                            <Badge badgeContent={msgCount} sx={{ color: 'black' }} max={9}>
                                <MailIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                </div>
            )
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