import {CardElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useEffect, useState} from "react";
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
import { Card, CardContent, List, ListItem, ListItemText } from "@mui/material";


const theme = createTheme();


export default function CheckoutForm(props){
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [cardholderName, setCardHolderName] = useState('');
    const [giftCards, setGiftCards] = useState(null);
    const [chosenGiftCard, setChosenGiftCard] = useState(null);
    const [chosenGiftCardId, setChosenGiftCardId] = useState(-1);
    const [chosenGiftcardDiscountAmount, setChosenGiftCardDiscountAmount] = useState(0);
    const stripe = useStripe();
    const elements = useElements();// Handle real-time validation errors from the CardElement.
    // const [totalOffer, setTotalOffer] = useState(0);

    // console.log(props.propertyDetails);
    let totalOfferAmount = 0;

    // React.useEffect(()=>{
    //   // if(props.propertyDetails != null)        
    //     for(let i=0; i< props.propertyDetails.offers.length; i++){
    //       let x =  props.propertyDetails.offers[i];
    //       let offerStartDate = new Date(x.startDate);
    //       let offerEndDate = new Date(x.endDate);
    
    //       if( props.checkInDate.getDate() - offerStartDate.getDate() >= 0 && offerEndDate.getDate() - props.checkOutDate.getDate()>= 0){
    //         availableOffers.push(x);
    //       }
    //     }
    // },[props])


    const fetchGiftCardList = async() => {
      if(giftCards === null){
        try{
          let body = {checkoutdate: props.checkOutDate, propertyID: props.propertyDetails.property.propertyID};
          let response = await axios_api.post("booking/getUserGiftCardList/", body,
          {
              headers: {
                  'Authorization' : `Bearer ${props.token}`
              }
          });
  
          if(response.status === 200){
            console.log("giftcards", response.data);
            setGiftCards(response.data);
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

            // console.log(response.data);
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
        let paymentAmount = Math.abs(props.checkOutDate - props.checkInDate)/(1000 * 60 * 60 * 24) * props.propertyDetails.property.perNightCost
        event.preventDefault();
        const card = elements.getElement(CardElement);

        // add these lines
        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        });

        let totalOffer = paymentAmount * totalOfferAmount/100 + paymentAmount * chosenGiftcardDiscountAmount / 100;

        // console.log(paymentMethod);

        saveStripInfo({email:email, payment_method_id: paymentMethod.id, amount: paymentAmount-totalOffer, discount:totalOffer,
                       checkInDate:props.checkInDate.toISOString().split('.')[0] + 'Z', 
                        checkOutDate:props.checkOutDate.toISOString().split('.')[0] + 'Z',
                         noOfGuests:props.adults+props.children,
                          propertyID:props.propertyDetails.property.propertyID,
                        name_on_card: cardholderName, userGiftCardListId: chosenGiftCardId});

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

    let offerIdx = 0;

    if(props.propertyDetails === null){
      return (<div></div>);
    }

    fetchGiftCardList();

    const handleChooseGiftCard = (giftCard, discountAmount) =>{
      if(chosenGiftCardId === -1){
        setChosenGiftCard(giftCard);
        setChosenGiftCardDiscountAmount(discountAmount);
        setChosenGiftCardId(giftCard.giftcard.id);
      }
      else{
        setChosenGiftCard(null);
        setChosenGiftCardDiscountAmount(0);
        setChosenGiftCardId(-1);
      }
      
    }

    const getGiftCards = () => {
      if(giftCards === null) {return(<div></div>);}
      else{
        console.log(giftCards);
        // return(<div></div>);
        return(
          <Grid container  sx={{ml:19, mt:3}}>
            <Grid item xs={12}>
              <Typography variant='h6'>Availale giftcards:</Typography>
            </Grid>
            {giftCards.giftcards.map((giftcard) => {
              let bg = 'white';
              if(giftcard.giftcard.id === chosenGiftCardId){
                bg = "#c7a9be";
              }
              return(
                <Grid item xs={4}>
                  <Card sx={{background: bg}} onClick={() => {handleChooseGiftCard(giftcard, giftcard.giftcardDetails.discount)}}>
                    <CardContent>
                      <Typography sx={{ fontSize: 40 }}>{giftcard.giftcardDetails.discount}% off</Typography>
                      <Typography variant="body1">{giftcard.giftcardDetails.customMsg}</Typography>
                      <Typography variant="body1">Expiry date: {giftcard.giftcardDetails.expiry_date.split("T")[0]}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        );
      }
    }


    return (
        <ThemeProvider theme={theme}>
          <Container component="main">
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
              <Card sx={{width:1000}}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>Check in date: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>{props.checkInDate.getFullYear() + '-' + (props.checkInDate.getMonth() + 1) + '-' + props.checkInDate.getDate()}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>Check out date: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>{props.checkOutDate.getFullYear() + '-' + (props.checkOutDate.getMonth() + 1) + '-' + props.checkOutDate.getDate()}</Typography>
                    </Grid>
                  
                  
                   {/*this div causing prolem in aligment need to fix it */}
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>Per night cost: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>{props.propertyDetails.property.perNightCost}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>Total cost: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>{Math.abs(props.checkOutDate - props.checkInDate)/(1000 * 60 * 60 * 24) * props.propertyDetails.property.perNightCost}</Typography>
                    </Grid>
                    {chosenGiftCardId === -1? null:
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>Gift card amount: </Typography> 
                    </Grid>
                    }

                    {chosenGiftCardId === -1? null:
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>{(Math.abs(props.checkOutDate - props.checkInDate)/(1000 * 60 * 60 * 24) * props.propertyDetails.property.perNightCost * chosenGiftcardDiscountAmount / 100)}</Typography> 
                    </Grid>
                    }
                      {props.propertyDetails.offers.map((off) => {
                        offerIdx++;
                        let offerStartDate = new Date(off.startDate);
                        let offerEndDate = new Date(off.endDate);
                        if( props.checkInDate.getTime() - offerStartDate.getTime() >= 0 && offerEndDate.getTime() - props.checkOutDate.getTime()>= 0){
                          totalOfferAmount = totalOfferAmount + off.amount;
                          return(
                            <>
                            <Grid item xs={6}  sx={{width:500, fontSize:16}}>
                                <Typography variant="body1" sx={{width:500, fontSize:16}}>offer {offerIdx}:</Typography>
                            </Grid>
                            <Grid item xs={6}  sx={{width:500, fontSize:16}}>
                                <Typography variant="body1" sx={{width:500, fontSize:16}}>{off.amount}%</Typography>
                            </Grid>
                            </>
                          );
                        } 
                        else{
                          return(<div></div>);
                        }
                        
                      })}
                    
                    
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>Final amount: </Typography> 
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{width:500, fontSize:16}}>{Math.abs(props.checkOutDate - props.checkInDate)/(1000 * 60 * 60 * 24) * props.propertyDetails.property.perNightCost - (Math.abs(props.checkOutDate - props.checkInDate)/(1000 * 60 * 60 * 24) * props.propertyDetails.property.perNightCost) * totalOfferAmount/100 - (Math.abs(props.checkOutDate - props.checkInDate)/(1000 * 60 * 60 * 24) * props.propertyDetails.property.perNightCost * chosenGiftcardDiscountAmount / 100)}</Typography> 
                    </Grid>

                  
                  </Grid>
                </CardContent>
              </Card>
              {getGiftCards()}
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Card Holder Name"
                  label="Card Holder Name"
                  name="Card Holder Name"
                  autoComplete="Card Holder Name"
                  autoFocus
                  onChange={(event) => { setCardHolderName(event.target.value)}}
                  sx={{
                    width:500
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => { setEmail(event.target.value)}}
                  sx={{
                    width:500
                  }}
                />
                <CardElement id="card-element" onChange={handleChange} sx={{width:500}}/>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width:1000 }}
                >
                  Submit payment
                </Button>
                
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
};
