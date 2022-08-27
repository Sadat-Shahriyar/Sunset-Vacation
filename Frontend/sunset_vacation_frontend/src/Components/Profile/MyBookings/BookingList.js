import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { axios_api } from '../../../App';
import { Button, Grid, Link, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

export default function BookingList(props) {

    const navigate = useNavigate();

    const [booking, setBooking] = React.useState([]);
    const [propertyNames, setPropertyNames] = React.useState([]);
    const [selectedProperty, setSelectedProperty] = React.useState(-1);

    const fetchAllBooking = async() => {
        try{
            let response = await axios_api.get('booking/getbookinglist', 
            {
                headers: {
                    'Authorization' : `Bearer ${props.token}`
                }
            });

            if(response.status === 200){
                console.log(response.data);
                setBooking(response.data.bookings);
                setPropertyNames(response.data.properties);
            }
            else{
                let error = new Error(response.statusText);
                throw error;
            }
        }
        catch(error){
            alert(error.message);
        }
    }

    const handleSelectedProperty = async(val) => {
        setSelectedProperty(val);
        console.log(val);
        
        if(val === -1){
            fetchAllBooking();
        }
        else{
            try{
                let response = await axios_api.get(`booking/getbookinglistusingpropertyid/${val}`, 
                {
                    headers: {
                        'Authorization' : `Bearer ${props.token}`
                    }
                });
    
                if(response.status === 200){
                    console.log(response.data);
                    setBooking(response.data.bookings);
                    setPropertyNames(response.data.properties);
                }
                else{
                    let error = new Error(response.statusText);
                    throw error;
                }
            }
            catch(error){
                alert(error.message);
            }
        }
        
    }

    const handleViewDetails = (bookingId) => {
        navigate(`/booking/details/${bookingId}`);
    }

    

    React.useEffect(()=>{
        fetchAllBooking();
    }, [])

    let idx = 1;
    return (
        <Grid container sx={{mt:8, ml:20, maxWidth:1300, mb:20}}>
            <Grid item xs={12}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 1290 }}>
                    <InputLabel id="demo-simple-select-standard-label">Select property</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedProperty}
                    onChange={(event) =>{handleSelectedProperty(event.target.value)}}
                    label="Select property"
                    >
                        <MenuItem value={-1}>All</MenuItem>
                        {propertyNames.map((name)=>{
                            return(
                                <MenuItem value={name.id}>{name.title}</MenuItem>
                            );
                        })}
                        {/* <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sx={{mt:5}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow  sx={{background: 'black'}}>
                            <TableCell sx={{color: 'white'}}>Serial</TableCell>
                            <TableCell sx={{color: 'white'}}>Property Name</TableCell>
                            <TableCell sx={{color: 'white'}}>Check in date</TableCell>
                            <TableCell sx={{color: 'white'}}>Check out date</TableCell>
                            <TableCell sx={{color: 'white'}}>No of guests</TableCell>
                            <TableCell sx={{color: 'white'}}>Payment</TableCell>
                            <TableCell sx={{color: 'white'}}>Cancellation status</TableCell>
                            <TableCell sx={{color: 'white'}}>Receipt</TableCell>
                            <TableCell sx={{color: 'white'}}>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {booking.map((val) => {
                            let checkInDate = val.checkin_date.split("T")[0]
                            let checkOutDate = val.checkout_date.split("T")[0]
                            
                            return(
                                <TableRow
                                    key={val.booking_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {idx++}
                                    </TableCell>
                                    <TableCell >{val.property.title}</TableCell>
                                    <TableCell >{checkInDate}</TableCell>
                                    <TableCell >{checkOutDate}</TableCell>
                                    <TableCell >{val.property.noOfGuests}</TableCell>
                                    <TableCell >{val.payment.amount}</TableCell>
                                    <TableCell >{val.cancelled === true ? "Cancelled":"Not cancelled"}</TableCell>
                                    <TableCell ><Link color='inherit' href={val.payment.receipt_url}>View receipt</Link></TableCell>
                                    <TableCell >
                                        <Button color='inherit' variant='standard' onClick={()=>{handleViewDetails(val.booking_id)}}>
                                            View details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                            
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
