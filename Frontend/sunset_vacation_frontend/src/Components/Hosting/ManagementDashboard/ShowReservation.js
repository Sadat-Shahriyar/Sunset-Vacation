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

export default function ShowReservation(props) {
    let navigate = useNavigate();

    const [booking, setBooking] = React.useState({})

    React.useEffect(() => {
        // change here propertyId
        fetch('http://localhost:8000/hosting/booking/' + props.booking.propertyID, {
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
                console.log(response.booking)
                setBooking(prevState => response.booking)
                console.log(booking)
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
                Booking No {props.booking.propertyID}
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
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        hello
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        hello
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}