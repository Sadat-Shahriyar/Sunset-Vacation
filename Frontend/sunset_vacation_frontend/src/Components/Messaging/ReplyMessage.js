import { Button, Grid, TextField } from '@mui/material';
import * as React from 'react'
import { axios_api } from '../../App';
import InboxNavbar from './InboxNavbar';

function MainView(props){

    const handleSubmit = async() => {
        console.log(props.message);
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
                let body = {receiver_id:props.messageToReply.sender_id, 
                    message: props.message}

                let messageResponse = await axios_api.post('message/sendmessage/', body,{
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization' : `Bearer ${props.token}`
                    }
                })

                if(messageResponse.status === 200){
                    props.setReply(false);
                    alert("The message has been sent");
                    // props.navigate('/inbox');
                }
            }

            console.log("hell3")
        }
        catch(error){
            alert(error.message);
        }
    }

    return(
        <Grid container sx={{maxWidth:1300, ml: 20}}>
            <Grid item xs={8}>
                <TextField variant='standard' value={props.message} onChange={(event) => {props.setMessage(event.target.value)}} />
            </Grid>
            <Grid item xs={4}>
                <Button onClick={() => {handleSubmit()}}>Send reply</Button>
            </Grid>
        </Grid>
    );
}

export default function ReplyMessage(props){
    const [message, setMessage] = React.useState("");
    return(
        <div>
            <InboxNavbar />
            <MainView 
                message = {message}
                setMessage = {(val) => {setMessage(val)}}
                token = {props.token}
                messageToReply = {props.messageToReply}
                isLoggedin={props.isLoggedin}
                setReply = {(val) => {props.setReply(val)}}
                setMessageToReply={(val) => {props.setMessageToReply(val)}}
            />
        </div>
    );
}