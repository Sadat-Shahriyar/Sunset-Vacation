import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Divider, Paper, responsiveFontSizes, TextareaAutosize } from '@mui/material';

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

export default function PropertyDetailsNavbar(props) {
    
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
                    <p onClick={() => { { navigate('/admin'); } }} style={{ "fontFamily": "Jokerman", "fontSize": "25px"
                    // color: "#C4036C" 
                     }}>Admin Dashboard</p>

                </Typography>

            </Toolbar>
            <Divider />


        </Box>
    )
}