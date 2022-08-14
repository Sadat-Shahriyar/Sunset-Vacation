import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Navigate, useNavigate } from 'react-router-dom';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import './../../../App.css';
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ListItemText from "@mui/material/ListItemText";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
export default function Notification(props) {
    let navigate = useNavigate();

    const [notifications, setNotifications] = React.useState([])

    React.useEffect(() => {
        fetch(`http://localhost:8000/hosting/notification/`, {
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
                console.log(response.notifications)
                setNotifications(prevState => response.notifications)
                console.log(notifications)
            })
            .catch((err) => {
                // alert(err.message);
                console.log(err);
            })
    }, []);

    function showNotification(item){
        props.setNotification(item);
        navigate('/showNotification');
    }

    function getSelectedProperty(property) {
        props.setProperty(property)
        navigate('/showPropertyDetails/');
    }
    function  DeleteProperty(property) {
        console.log(property.propertyID)
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}` },
            body: JSON.stringify(props.property)
        };
        fetch(`http://localhost:8000/hosting/deleteProperty/` + `${property.propertyID}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("delete successsfully")
                props.setflags("propertylist");
                navigate('/showProperty/Redirect');
            });
    }
    function  deleteNotification(notification) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}` },
            body: JSON.stringify()
        };
        fetch(`http://localhost:8000/hosting/deleteNotification/` + `${notification.id}`, requestOptions)
            .then(response => response.json())
            .then(response => {
                setNotifications(response.notifications)
            });
    }


    return (
        <div>
            {<ManagementDashboard />}

            <Typography sx={{marginTop:"50px", fontFamily:"Lucida Handwriting"}} align='center' variant="h5" component="h2">
                All Notifications
            </Typography>;
            {/*<div><pre>{JSON.stringify(booking, null, 2) }</pre></div>*/}
            {notifications.map((item,index)=>{
                return( <div>
                    <List  sx={{  width: '60%', bgcolor: 'background.paper', marginTop: "10px", marginLeft: "auto", marginRight: "auto"}} component="nav" aria-label="mailbox folders">
                        <Divider />
                        <ListItem sx={{ bgcolor: "#F1948A"}}>
                            <IconButton onClick={()=> showNotification(item)}><CollectionsBookmarkIcon /></IconButton>
                            {/*change here propertyId*/}
                            <ListItemText  ><p style={{ fontFamily: "Lucida Handwriting" }}>{item.title}</p></ListItemText>
                            <IconButton onClick={()=>{deleteNotification(item)}}><DeleteIcon/></IconButton>
                        </ListItem>
                    </List>
                </div>
                )})}
            {/*{tableListing(properties)}*/}
        </div>
    );
}