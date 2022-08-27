import { Button, Card, CardContent, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axios_api } from '../../../App';
import MyBookingsNavbar from '../../Profile/MyBookings/MyBookingNavbar';

export default function HostingBookingDetails(props){
    let params = useParams();
    let navigate = useNavigate()

    const [bookingData, setBookingData] = React.useState({});
    const [propertyData, setPropertyData] = React.useState({});
    const [paymentData, setPaymentData] = React.useState({});
    const [userData, setUserData] = React.useState({});
    const [ownerData, setOwnerData] = React.useState({});

    const [checkInDate, setCheckInDate] = React.useState("");
    const [checkOutDate, setCheckOutDate] = React.useState("");
    const [paymentTime, setPaymentTime] = React.useState("");

    const [cancelButton, setCancelButton] = React.useState(true);

    const fetchBookingDetails = async() =>{
        try{
            let response = await axios_api.get(`booking/getbookingdetails/${params.booking_id}`, 
                {
                    headers: {
                        'Authorization' : `Bearer ${props.token}`
                    }
                });
            
                if(response.status === 200){
                    let data = response.data;
                    console.log(data);
                    setBookingData(data.BookingData);
                    setPaymentData(data.PaymentData);
                    setPropertyData(data.PropertyData);
                    setUserData(data.UserData);
                    setOwnerData(data.OwnerData);

                    let checkIn = data.BookingData.checkin_date.split("T")[0]
                    setCheckInDate(checkIn);
                    let checkOut = data.BookingData.checkout_date.split("T")[0];
                    setCheckOutDate(checkOut);
                    let payTime = data.PaymentData.paytime.split("T")[0];
                    setPaymentTime(payTime);

                    if(data.BookingData.cancelled === true){
                        setCancelButton(false);
                    }
                }
                else{
                    let err = new Error(response.statusText);
                    throw err;
                }
        }
        catch(error){
            alert(error.message);
        }
    }

    React.useEffect(()=>{
        fetchBookingDetails();
    }, []);


    function mouseOver(event) {
        event.target.style.color = "#C4036C";
    }

    function mouseOut(event) {
        event.target.style.color ='black' ;
    }

    const handleViewPropertyDetails = (val) => {
        navigate(`/hosting/propertydetails/${val}`);
    }

    const handleCancelReservation = async(booking_id) => {
        if(!isNaN(booking_id)){
            try{
                let response = await axios_api.get(`booking/cancelreservation/${booking_id}`, 
                {
                    headers: {
                        'Authorization' : `Bearer ${props.token}`
                    }
                });
    
                if(response.status === 200){
                    alert(response.data.message);
                    console.log(response.data);
                    navigate('/my-bookings');
                }
                else{
                    let err = new Error(response.statusText);
                    throw err;
                }
            }
            catch(error){
                alert(error.message);
            }
        }
        
    }

    const getCancelReservationButton = () => {
        if(cancelButton === true){
            return(<Typography color='inherit'></Typography>)
        }
        else{
            return(<Typography variant='h5' color='error' sx={{mt:5}}>This Reservation has been cancelled</Typography>);
        }
    }

    return(
        <Box sx={{ flexGrow: 1 }}>
            <MyBookingsNavbar
                isLoggedin={props.isLoggedin}
            />
            <Grid container sx={{mt:8, ml:20, maxWidth:1300, mb:20}}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h6"
                                noWrap
                                aria-disabled
                                component="div"
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                                onMouseOver={mouseOver} onMouseOut={mouseOut}
                            >
                                <p 
                                    style={{ "fontFamily": "Lucida Handwriting", "fontSize": "25px"}}
                                >
                                        Booking Information:
                                </p>

                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sx={{mt:5}}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h6"
                                noWrap
                                aria-disabled
                                component="div"
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                                onMouseOver={mouseOver} onMouseOut={mouseOut}
                            >
                                <p 
                                    onClick={() => { { handleViewPropertyDetails(propertyData.propertyID) } }} 
                                    style={{ "fontFamily": "Lucida Handwriting", "fontSize": "25px"}}
                                >
                                        {propertyData.title}
                                </p>

                            </Typography>
                            <Typography 
                                variant='body1'
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                            >
                                {propertyData.address}
                            </Typography>

                            <Typography 
                                variant='body1'
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' }, fontWeight:'bold'}}
                            >
                                Hosted by: {ownerData.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={6} sx={{mt:5}}>
                    <Card sx={{minHeight:274, mr:2}}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                noWrap
                                aria-disabled
                                component="div"
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                                onMouseOver={mouseOver} onMouseOut={mouseOut}
                            >
                                <p 
                                    onClick={() => { { navigate('/'); } }} 
                                    style={{ "fontFamily": "Lucida Handwriting", "fontSize": "25px"}}
                                >
                                        Booked by: {userData.name}
                                </p>

                            </Typography>

                            <Typography
                                variant='body1'
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                            >
                                Check in date: {checkInDate}
                            </Typography>

                            <Typography
                                variant='body1'
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                            >
                                Check out date: {checkOutDate}
                            </Typography>

                            <Typography
                                variant='body1'
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                            >
                                Number of guests: {bookingData.noOfGuests}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs = {6} sx={{mt:5}}>
                    <Card sx={{ml:2}}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                noWrap
                                aria-disabled
                                component="div"
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                                onMouseOver={mouseOver} onMouseOut={mouseOut}
                            >
                                <p 
                                    style={{ "fontFamily": "Lucida Handwriting", "fontSize": "25px"}}
                                >
                                        Payment information:
                                </p>
                            </Typography>

                            <Typography
                                variant='body1'
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                            >
                                Payment method: {paymentData.method}
                            </Typography>

                            <Typography
                                variant='body1'
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                            >
                                Payment date: {paymentTime}
                            </Typography>

                            <Typography
                                variant='body1'
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                            >
                                Receipt url: {<Link color='inherit' href={paymentData.receipt_url}>View receipt</Link>}
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                            >
                                Payment amount: {paymentData.amount + paymentData.discount}
                            </Typography>

                            <Typography
                                variant='body1'
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' } }}
                            >
                                Discount amount: {paymentData.discount}
                            </Typography>

                            <Typography
                                variant='body1'
                                sx={{ ml: 7, display: { xs: 'none', sm: 'block' },fontWeight: 'bold' }}
                            >
                                Total amount: {paymentData.amount}
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    {/* <Button variant='contained' color='error' sx={{mt:5}} onClick={()=>{handleCancelReservation(bookingData.booking_id)}}>Cancel Reservation</Button> */}
                    {getCancelReservationButton()}
                </Grid>
            </Grid>
        </Box>
    );
}