import {CardElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import { axios_api } from "../../App";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from "react-router-dom";


const theme = createTheme();


export default function CheckoutForm(props){
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();// Handle real-time validation errors from the CardElement.
    console.log(props.propertyDetails);
    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } 
        else {
            setError(null);
        }
    }// Handle form submission.

    const saveStripInfo = async(data={}) =>{
        try{
            let response = await axios_api.post('booking/reserve/', data,{
                headers: {
                    "Content-Type": "application/json",
                    'Authorization' : `Bearer ${props.token}`
                }
            });

            console.log(response.data);

            if(response.status === 200){
                alert("Booking complete");
                props.setReceipt(response.data.receipt)
                navigate('/booking/property/confirm');
            }
            else{
              let err = new Error(response.status + ": " + response.statusText);
              throw err;
            }
        }
        catch(err){
            alert(err.message);
        }
    }

    const handleSubmit = async (event) => {
        let paymentAmount = (props.checkOutDate.getDate() - props.checkInDate.getDate()) * props.propertyDetails.property.perNightCost
        event.preventDefault();
        const card = elements.getElement(CardElement);

        // add these lines
        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        });

        console.log(paymentMethod);

        saveStripInfo({email, payment_method_id: paymentMethod.id, amount: paymentAmount, discount:0, checkInDate:props.checkInDate.toISOString().split('.')[0] + 'Z', checkOutDate:props.checkOutDate.toISOString().split('.')[0] + 'Z', noOfGuests:props.adults+props.children, propertyID:props.propertyDetails.property.propertyID});

    };

    // return (
    //     <form onSubmit={handleSubmit} className="stripe-form">
    //         <div className="form-row">
    //             <label htmlFor="email">Email Address</label>
    //             <input className="form-input" id="email" name="name"    type="email" placeholder="jenny.rosen@example.com" required 
    //                     value={email} onChange={(event) => { setEmail(event.target.value)}} />
    //         </div>
    //         <div className="form-row">
    //             <label for="card-element">Credit or debit card</label> 
    //             <CardElement id="card-element" onChange={handleChange}/>
    //             <div className="card-errors" role="alert">{error}</div>
    //         </div>
    //         <button type="submit" className="submit-btn">
    //             Submit Payment
    //         </button>
    //     </form>
    // );

    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                < AttachMoneyIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Complete payment
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  sx={{
                    width:500
                  }}
                />
                <CardElement id="card-element" onChange={handleChange} sx={{width:500}}/>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width:500 }}
                >
                  Submit payment
                </Button>
                
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
};
