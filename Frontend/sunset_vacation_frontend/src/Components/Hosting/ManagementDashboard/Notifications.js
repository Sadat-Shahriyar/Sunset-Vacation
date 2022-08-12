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
export default function Reservation(props) {
    let navigate = useNavigate();

    const [bookings, setBookings] = React.useState([])

    React.useEffect(() => {
        fetch(`http://localhost:8000/hosting/booking/`, {
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
                console.log(response.bookings)
                setBookings(prevState => response.bookings)
                console.log(bookings)
            })
            .catch((err) => {
                // alert(err.message);
                console.log(err);
            })
    }, []);

    function showBooking(item){
        props.setBooking(item);
        navigate('/showReservation');
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



    return (
        <div>
            {<ManagementDashboard />}

            <Typography sx={{marginTop:"50px", fontFamily:"Lucida Handwriting"}}align='center' variant="h5" component="h2">
                All Reservations
            </Typography>;
            {/*<div><pre>{JSON.stringify(booking, null, 2) }</pre></div>*/}
            {bookings.map((item,index)=>{
                return( <div>
                    <List  sx={{  width: '60%', bgcolor: 'background.paper', marginTop: "10px", marginLeft: "auto", marginRight: "auto"}} component="nav" aria-label="mailbox folders">
                        <Divider />
                        <ListItem sx={{ bgcolor: "#F1948A"}} button onClick={()=> showBooking(item)}>
                            <IconButton><CollectionsBookmarkIcon /></IconButton>
                            {/*change here propertyId*/}
                            <ListItemText  ><p style={{ fontFamily: "Lucida Handwriting" }}>Booking No {item.propertyID}</p></ListItemText>
                        </ListItem>
                    </List>
                </div>
                )})}
            {/*{tableListing(properties)}*/}
        </div>
    );
}