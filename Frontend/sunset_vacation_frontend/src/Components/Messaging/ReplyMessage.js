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
import StaticNavBar from '../Homepage/StaticNavBar';

export default function ReplyMessage(props) {
    const [message, setMessage] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [friendId, setFriendId] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [friendName, setFriendName] = React.useState("");
    const [messageThread, setMessageThread] = React.useState([]);

    const fetchMessages = async () => {
        try {
            console.log(props.messageToReply);
            let response = await axios_api.get("users/verify/",
                {
                    headers: {
                        'Authorization': `Bearer ${props.token}`
                    }
                })
            let localFriendId = "";
            if (props.messageToReply.sender_id !== response.data.id) {
                setFriendId(props.messageToReply.sender_id);
                setUserId(props.messageToReply.receiver_id);
                localFriendId = props.messageToReply.sender_id;
            } else {
                setFriendId(props.messageToReply.receiver_id);
                setUserId(props.messageToReply.sender_id);
                localFriendId = props.messageToReply.receiver_id;
            }
            console.log("userId: " + userId);
            console.log("friendId: " + friendId);
            console.log("localfriendId: " + localFriendId);

            let messageResponse = await axios_api.get('message/getMessages/' + localFriendId, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${props.token}`
                }
            })

            if (messageResponse.status === 200) {
                console.log(messageResponse.data);
                setFriendName(messageResponse.data.friendName);
                setUserName(messageResponse.data.userName + "(You)");
                setMessageThread(messageResponse.data.messages);
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

    const [replyMessage, setReplyMessage] = React.useState("");

    function changeReplyMessage(event) {
        setReplyMessage(event.target.value);
    }

    const handleSubmit = async () => {
        try {
            console.log("hnadle submit friend id: " + friendId);
            console.log("hadle submit reply message: " + replyMessage);
            if (replyMessage.length < 1) {
                alert("The message length 0");
                return;
            }
            if (replyMessage.length > 200) {
                alert("The message length exceeded max length 200");
                return;
            }
            let body = {
                receiver_id: friendId,
                message: replyMessage
            }

            let messageResponse = await axios_api.post('message/sendMessage/', body, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${props.token}`
                }
            })
            setReplyMessage("");
            fetchMessages();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <InboxNavbar reply={props.reply} setReply={(val) => {
                props.setReply(val)
            }}/>
              {/* <StaticNavBar
      
      isLoggedin={props.isLoggedin}
      token={props.token}
      /> */}
            <Grid container sx={{maxWidth: 1400, ml: 10, mt: 5}}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={6}>
                    <div style={{
                        minWidth: 900,
                        maxHeight: 450,
                        minHeight: 450,
                        overflow: "hidden",
                        overflowY: 'scroll'
                    }}>
                        {messageThread.map((message, index) => {
                            return (
                                <Card sx={{
                                    minWidth: 900,
                                    mb: 1,
                                    backgroundColor: message.sender_id === userId ? 'pink' : 'white'
                                }} key={index}>
                                    <CardContent>
                                        <Typography sx={{
                                            paddingX: 1,
                                            fontWeight: "bold",
                                            fontFamily: "Lucida Handwriting",
                                            fontSize: 16
                                        }}>
                                            {message.sender_id === userId ? userName : friendName}
                                            <Typography variant="subtitle" sx={{
                                                padding: 1,
                                                fontFamily: "Lucida Handwriting",
                                                fontSize: 10,
                                                mb: 1.5
                                            }} color="text.secondary">
                                                {message.time}
                                            </Typography>
                                        </Typography>

                                        <Typography variant="body2"
                                                    sx={{padding: 1, fontFamily: "Lucida Handwriting", fontSize: 13}}>
                                            {message.message}
                                        </Typography>

                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <TextField
                            sx={{minWidth: 770, mt: 2, mr: 2}}
                            id="outlined-textarea"
                            multiline
                            rows={2}
                            placeholder="Send Reply"
                            onChange={changeReplyMessage}
                            value={replyMessage}
                        />
                        <Button variant="contained" sx={{minWidth: 100, mt: 1}} onClick={handleSubmit}>Send</Button>
                    </div>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
        </div>
    );
}