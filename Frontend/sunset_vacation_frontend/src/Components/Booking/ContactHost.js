import { Box } from '@mui/system';
import * as React from 'react';
import ShowNavBar from './ShowNavbar';
import { axios_api } from '../../App';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function MainView(props){
    
    console.log(props);

    const handleSubmit = async() => {
        // console.log(props.message);
        try{
            let response = await axios_api.get("users/verify/", 
            {
                headers: {
                    'Authorization' : `Bearer ${props.token}`
                }
            })

            console.log(response);
            console.log("hello")
            console.log(props.isLoggedin)
            if(props.isLoggedin && response.data.valid){
                console.log("hello2")
                let body = {receiver_id:props.propertyDetails.property.owner_id, 
                    message: props.message}

                let messageResponse = await axios_api.post('message/sendMessage/', body,{
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization' : `Bearer ${props.token}`
                    }
                })

                if(messageResponse.status === 200){
                    alert("The message has been sent");
                    props.navigate('/booking/property/details');
                }
            }

            console.log("hell3")
        }
        catch(error){
            alert(error.message);
        }
    }

    if(props.propertyDetails === null){
        return (<div></div>);
    }
    return(
        <Grid container sx={{ml:20, maxWidth:1300}}>
            <Grid item xs={12}>
                <Typography variant='h6' sx={{mt:10, mb:5}}>Frequently asked questions</Typography>
            </Grid>
            {
                props.propertyDetails.faqs.map((faq) => {
                     return(
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h6'>
                                        Question: {faq.question}
                                    </Typography>
                                    <Typography variant='body1'>
                                        Answer: {faq.answer}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })
            }
            
            <Grid item xs={12}>
                <Typography variant='h6' sx={{mt:5}}>Still have any more query?</Typography>
            </Grid>
            <Grid item xs={10}>
                <TextField value={props.message} id="message-host" label="Message host" sx={{mt:5, minWidth:1000, maxWidth:1000}} onChange={(event) => {props.setMessage(event.target.value)}} />
            </Grid>

            <Grid item xs={2}>
                <Button color='inherit' sx={{mt:6}} size='large'  variant='contained' onClick={() => {handleSubmit()}}>Send message</Button>
            </Grid>
        </Grid>
    );
}



export default function ContactHost(props){
    const [propertyDetails, setPropertyDetails] = React.useState(null);
    const [message, setMessage] = React.useState("");

    const navigate = useNavigate();

    const fetchProperty = async(propertyId) => {
        try{
            let response = await axios_api.get(`booking/propertydetails/${propertyId}/`);
            console.log(response)

            if(response.status === 200){
                setPropertyDetails(response.data);
            }
        }
        catch(error){
            alert(error);
        }
        
    }

    React.useEffect(()=>{

        if(props.selectedPropertyForDetails === -1) {
            
        }
        else{
            console.log(props.selectedPropertyForDetails);
            fetchProperty(props.selectedPropertyForDetails);
        }
    },[]);


    
    return(
        <Box sx={{ flexGrow: 1 }}>
            <ShowNavBar />
            <MainView 
                propertyDetails = {propertyDetails}
                message = {message}
                setMessage = {(val) => {setMessage(val)}}
                token = {props.token}
                isLoggedin={props.isLoggedin}
                setLoginRedirection={(val) => {props.setLoginRedirection(val)}}
                navigate = {(val) => {navigate(val)}}
            />
        </Box>
    );
}