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

export default function InboxNavbar(props) {
    const navigate = useNavigate();

    function mouseOver(event) {
        event.target.style.color = "black";
    }

    function mouseOut(event) {
        event.target.style.color = "white";
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
                        <p style={{"fontFamily": "Jokerman", "fontSize": "25px"}}>Inbox</p>
                    </Typography>

                    <Button color="inherit" sx={{fontFamily: "Lucida Handwriting", fontSize: "15px", ml:5}} onClick={(event)=>{navigate('/')}} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        Home
                    </Button>

                    
                </Toolbar>
            </AppBar>

        </Box>
    );

}
