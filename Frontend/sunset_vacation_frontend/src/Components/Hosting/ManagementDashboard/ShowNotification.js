import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Navigate, useNavigate} from 'react-router-dom';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import {Typography} from '@mui/material';
import './../../../App.css';
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ListItemText from "@mui/material/ListItemText";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function ShowNotification(props) {
    let navigate = useNavigate();

    const [notification, setNotification] = React.useState({})

    React.useEffect(() => {
        // change here propertyId
        fetch('http://localhost:8000/hosting/notification/' + props.notification.propertyID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response
                } else {
                    let err = new Error(response.status + ": " + response.text);
                    throw err;
                }
            })
            .then((response) => response.json())
            .then((response) => {
                setNotification(prevState => response.notification)
            })
            .catch((err) => {
                // alert(err.message);
                console.log(err);
            })
    }, []);


    return (
        <div>
            {<ManagementDashboard/>}

            <Typography sx={{marginTop: "50px", fontFamily: "Lucida Handwriting"}} align='center' variant="h5"
                        component="h2">
                Notification
            </Typography>
            <Card sx={{
                width: '35%',
                height: '70%',
                bgcolor: "#F1948A",
                marginTop: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingTop: "20px",
                paddingLeft: "auto",
                paddingRight: "auto"
            }}>
                <CardContent sx={{marginTop: "15px", marginBottom: "15px"}}>
                    <Typography sx={{ fontSize: 14 , fontFamily: "Lucida Handwriting"}} color="text.secondary" gutterBottom>
                        notification sent {props.notification.time}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{paddingTop:"20px", fontFamily: "Lucida Handwriting"}}>
                        {props.notification.title}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{paddingTop:"30px", fontFamily: "Lucida Handwriting"}}>
                       {props.notification.text}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{paddingTop:"30px", fontFamily: "Lucida Handwriting"}}>
                       {props.notification.link}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}