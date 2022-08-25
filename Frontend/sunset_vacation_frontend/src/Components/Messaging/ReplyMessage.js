import {Button, Grid, TextField} from '@mui/material';
import * as React from 'react'
import {axios_api} from '../../App';
import InboxNavbar from './InboxNavbar';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";


export default function ReplyMessage(props) {
    const [message, setMessage] = React.useState("");
    let userId = props.messageToReply.sender_id;
    let friendId = props.messageToReply.receive_id;
    const [messageThread, setMessageThread] = React.useState([]);

    const fetchMessages = async () => {
        console.log(props.messageToReply);
        try {
            let response = await axios_api.get("users/verify/",
                {
                    headers: {
                        'Authorization': `Bearer ${props.token}`
                    }
                })

            console.log(response.data.id);
            if (userId !== response.data.id) {
                friendId = userId;
                userId = response.data.id;
            }
            // console.log(userId);
            // console.log(friendId);

            let messageResponse = await axios_api.get('message/getMessages/'+friendId,  {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${props.token}`
                }
            })

            if (messageResponse.status === 200) {
                setMessageThread(messageResponse.data.messages)
                console.log(messageResponse.data.messages)
                // props.setReply(false);
                // props.navigate('/inbox');
            }

        } catch (error) {
            alert(error.message);
        }
    }

    React.useEffect(() => {
        fetchMessages()
    }, [])

    function MainView(props) {

        const handleSubmit = async () => {
            console.log(props.message);
            try {
                let response = await axios_api.get("users/verify/",
                    {
                        headers: {
                            'Authorization': `Bearer ${props.token}`
                        }
                    })

                console.log(response);
                console.log("hello")
                console.log(props.isLoggedin)
                if (props.isLoggedin && response.data.valid) {
                    console.log("hello2")
                    let body = {
                        receiver_id: props.messageToReply.sender_id,
                        message: props.message
                    }

                    let messageResponse = await axios_api.post('message/sendmessage/', body, {
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${props.token}`
                        }
                    })

                    if (messageResponse.status === 200) {
                        props.setReply(false);
                        alert("The message has been sent");
                        // props.navigate('/inbox');
                    }
                }

                console.log("hell3")
            } catch (error) {
                alert(error.message);
            }
        }


        return (
            <Grid container sx={{maxWidth: 1300,  ml:20, mt:5}}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    {/*<TextField variant='standard' value={props.message} onChange={(event) => {*/}
                    {/*    props.setMessage(event.target.value)*/}
                    {/*}}/>*/}
                    <Card >
                        <CardContent>
                            <Typography sx={{ paddingX:1, fontWeight:"bold", fontFamily: "Lucida Handwriting", fontSize:15}}>
                                Umama
                            </Typography>

                            <Typography variant="body2" sx={{ padding:1, fontFamily: "Lucida Handwriting", fontSize:13}}>
                                What do you want to know about? You can also frequestly asked section. What do you want to know about? You can also frequestly asked section.
                            </Typography>
                            <Typography variant="subtitle" sx={{ padding:1, fontFamily: "Lucida Handwriting", fontSize:10, mb: 1.5}}  color="text.secondary">
                                What do you want to know about
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    {/*<Button onClick={() => {*/}
                    {/*    handleSubmit()*/}
                    {/*}}>Send reply</Button>*/}
                </Grid>
            </Grid>
        );
    }

    return (
        <div>
            <InboxNavbar/>
            <MainView
                message={message}
                setMessage={(val) => {
                    setMessage(val)
                }}
                token={props.token}
                messageToReply={props.messageToReply}
                isLoggedin={props.isLoggedin}
                setReply={(val) => {
                    props.setReply(val)
                }}
                setMessageToReply={(val) => {
                    props.setMessageToReply(val)
                }}
            />
        </div>
    );
}