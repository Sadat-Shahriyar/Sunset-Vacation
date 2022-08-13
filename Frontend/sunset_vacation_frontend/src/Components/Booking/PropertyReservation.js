import { Box } from '@mui/system';
import * as React from 'react';
import CheckoutForm from './CheckoutForm';
import ShowNavBar from './ShowNavbar';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import { axios_api } from '../../App';

const stripePromise = loadStripe('pk_test_51LVZhXCVpdZK1dil5MxM7pUu54omB7Oha64kx3Z6CTaxXJ30PlgQqHnEHULRZ9wbGsOtYwQwYIaKc7cFMTn0XCje00jY3fR2Z5');


export default function PropertyReservation(props){
    const [propertyDetails, setPropertyDetails] = React.useState(null);
    const [message, setMessage] = React.useState("");


    const fetchProperty = async(propertyId) => {
        try{
            let response = await axios_api.get(`booking/propertydetails/${propertyId}/`);
            console.log(response)

            if(response.status === 200){
                setPropertyDetails(response.data);
                setMessage(response.data.property.title);
            }
        }
        catch(error){
            alert(error);
        }
        
    }

    React.useEffect(()=>{

        if(props.selectedPropertyForDetails === -1) {
            setMessage("Invalid property id");
        }
        else{
            console.log(props.selectedPropertyForDetails);
            fetchProperty(props.selectedPropertyForDetails);
        }
    },[]);

    return(
        <Box sx={{ flexGrow: 1 }}>
            <ShowNavBar />
            <Elements stripe={stripePromise}>
                <CheckoutForm 
                    token = {props.token}
                    propertyDetails={propertyDetails}
                    checkInDate = {props.checkInDate}
                    checkOutDate = {props.checkOutDate}
                    adults = {props.adults}
                    children = {props.children}
                    setReceipt={(val) => {props.setReceipt(val)}}
                    offers = {props.offers}
                />
            </Elements>
        </Box>
    );
}