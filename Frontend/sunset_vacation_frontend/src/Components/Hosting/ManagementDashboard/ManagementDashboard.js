import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';

import {styled, alpha} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import { Grid } from '@mui/material';
import Content from './ManagementDashboardContent';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
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
))(({theme}) => ({
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
                color: theme.palette.text.inherit,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function ManagementDashboard(props) {
    const navigate = useNavigate();

    const [bookingData, setBookingData] = React.useState([]);


    const useReservation = (event) => {
        navigate("/reservation");
    }
    const useNotification = (event) => {
        navigate("/notification");
    }
    const useHandleHostNewPropertyButton = (event) => {
        navigate("/hostproperty");
    }
    const useOfferpage = (event) => {
        navigate("/createOffer");
    }
    const useShowOffer = (event) => {
        navigate("/showOffers");
    }
    const useHostingRedirect = (event) => {
        navigate("/hosting");
    }
    const useShowProperties = (event) => {
        navigate("/showProperties")
    }

    function mouseOver(event) {
        event.target.style.color = "black";
    }

    function mouseOut(event) {
        event.target.style.color = "white";
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
        console.log(event.target.value);
    };
    const AdminButton = (event) => {
        navigate("/admin");
    }
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{bgcolor: "#C4036C"}}>
                <Toolbar>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        <p style={{"fontFamily": "Jokerman", "fontSize": "25px"}}>ManagementDashboard</p>


                    </Typography>
                    {/* <Button disabled></Button> */}
                    <Button color="inherit" onClick={useHostingRedirect}><HomeIcon/></Button>

                    <Button color="inherit" sx={{fontFamily: "Lucida Handwriting", fontSize: "15px"}}
                            onClick={useShowProperties} onMouseOver={mouseOver} onMouseOut={mouseOut}>Your
                        Listing</Button>
                    <Button color="inherit" sx={{fontFamily: "Lucida Handwriting", fontSize: "15px"}}
                            onClick={useHandleHostNewPropertyButton} onMouseOver={mouseOver} onMouseOut={mouseOut}>Create
                        Listing</Button>

                    <Button
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="inherit"
                        sx={{fontFamily: "Lucida Handwriting", fontSize: "15px"}}
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon/>}
                    >
                        Menu
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem value="offer" onClick={useOfferpage} disableRipple>
                            <LocalOfferRoundedIcon/>
                            Create Offer
                        </MenuItem>
                        <MenuItem value="offer" onClick={useShowOffer} disableRipple>
                            <LocalOfferRoundedIcon/>
                            show all Offer
                        </MenuItem>
                        <MenuItem onClick={()=>{navigate('/giftcard')}} disableRipple>
                            <CardGiftcardRoundedIcon/>
                            Create Gift card
                        </MenuItem>
                        <MenuItem onClick={()=>{navigate('/showGiftcard')}} disableRipple>
                            <CardGiftcardRoundedIcon/>
                            show all Giftcard
                        </MenuItem>
                        <MenuItem onClick={useReservation} disableRipple>
                            <CollectionsBookmarkIcon/>
                            Reservation
                        </MenuItem>
                        <MenuItem onClick={useNotification} disableRipple>
                            <NotificationsIcon/>
                            Notification
                        </MenuItem>
                        <MenuItem onClick={()=>{navigate('/inbox')}} disableRipple>
                            <MailIcon/>
                            Inbox
                        </MenuItem>
                    </StyledMenu>
                    {/* {sessionStorage.getItem("isAdmin") && <Button variant="text" sx={{fontFamily:"Jokerman",color: "white"}} onClick={AdminButton}>Admin</Button>} */}
                    <Button align="right" color="inherit" sx={{fontFamily: "Lucida Handwriting", fontSize: "15px"}}
                            onClick={(event)=>{navigate('/')}} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        Home</Button>
                </Toolbar>
            </AppBar>
            <Grid container sx={{mt:8, ml:20, maxWidth:1300, mb:20}}>
                <Grid item xs={12}>
                    <Content setBookingData={(val) => {setBookingData(val)}} bookingData={bookingData} token={props.token}/>
                </Grid>
            </Grid>
        </Box>
    );

}
