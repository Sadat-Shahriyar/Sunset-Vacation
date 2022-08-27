import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {axios_api} from '../../../App.js'
import { Button, Grid ,Link, TextField} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

export default function Content(props) {
  let navigate = useNavigate()
  const [value, setValue] = React.useState(0);
  const [booking, setBooking] = React.useState([])

  const fetchBookings = async(url) => {
    try{
      let response = await axios_api.get(url, {
        headers: {
            'Authorization' : `Bearer ${props.token}`
        }
      })

      if(response.status === 200){
        console.log(response.data);
        setBooking(response.data.allbooking)
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

  React.useEffect(() => {
    let url;
    if(value === 0) {
      url = "booking/getPreviousReservations/"
    }
    if(value === 1) {
      url = "booking/getCurrentReservations/"
    }
    if(value === 2) {
      url = "booking/getNextSevenDaysReservations/"
    }
    if(value === 3) {
      url = "booking/getAllFutureReservations/"
    }
    fetchBookings(url);
  }, [])

  const handleChange = (event, newValue) => {
    let url;
    if(newValue === 0) {
      url = "booking/getPreviousReservations/"
    }
    if(newValue === 1) {
      url = "booking/getCurrentReservations/"
    }
    if(newValue === 2) {
      url = "booking/getNextSevenDaysReservations/"
    }
    if(newValue === 3) {
      url = "booking/getAllFutureReservations/"
    }

    fetchBookings(url);
    console.log(newValue)
    setValue(newValue);
  };

  const handleSelectedProperty = async(val) => {
    console.log(val);
    
    if(val === -1){
      //todo check which url to call
      fetchBookings("booking/getPreviousReservations/");
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
      navigate(`/hosting/booking/details/${bookingId}`);
  }

  let idx = 1;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" sx={{ml:40}}>
          <Tab label="Previous reservations"/>
          <Tab label="Currently hosting" />
          <Tab label="Next 7 days" />
          <Tab label="All Future Reservations" />
        </Tabs>
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
