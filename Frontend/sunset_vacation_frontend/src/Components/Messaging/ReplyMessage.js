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
    const [userId, setUserId] =  React.useState("");
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
            }else{
                setFriendId(props.messageToReply.receiver_id);
                setUserId(props.messageToReply.sender_id);
                localFriendId = props.messageToReply.receiver_id;
            }
            console.log("userId: "+userId);
            console.log("friendId: "+friendId);
            console.log("localfriendId: "+localFriendId);

            let messageResponse = await axios_api.get('message/getMessages/'+localFriendId,  {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${props.token}`
                }
            })

            if (messageResponse.status === 200) {
                console.log(messageResponse.data);
                setFriendName(messageResponse.data.friendName);
                setUserName(messageResponse.data.userName+"(You)");
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

    function MainView(props) {
        const handleSubmit2 = async() =>{

        }

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
            <Grid container sx={{maxWidth: 1400,  ml:10, mt:5}}>
                <Grid item xs={2}></Grid>
                <Grid item xs={6}>
                    {/*<TextField variant='standard' value={props.message} onChange={(event) => {*/}
                    {/*    props.setMessage(event.target.value)*/}
                    {/*}}/>*/}
                    <div style={{minWidth: 900, maxHeight: 450, minHeight:450, overflow: "hidden", overflowY: 'scroll'}}>
                    {messageThread.map((message,index)=>{
                        return(
                            <Card sx={{minWidth: 900, mb:1, backgroundColor:message.sender_id === userId? 'pink': 'white'}} key={index}>
                        <CardContent>
                            <Typography sx={{ paddingX:1, fontWeight:"bold", fontFamily: "Lucida Handwriting", fontSize:16}}>
                                { message.sender_id === userId ? userName : friendName}
                                <Typography variant="subtitle" sx={{ padding:1, fontFamily: "Lucida Handwriting", fontSize:10, mb: 1.5}}  color="text.secondary">
                                    {message.time}
                                </Typography>
                            </Typography>

                            <Typography variant="body2" sx={{ padding:1, fontFamily: "Lucida Handwriting", fontSize:13}}>
                                {message.message}
                            </Typography>

                        </CardContent>
                    </Card>
                    )})}
                </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    <TextField
                        sx={{minWidth: 770, mt:2, mr:2}}
                        id="outlined-textarea"
                        rows={2}
                        placeholder="Send Reply"
                        onChange={handleSubmit2}/>
                        <Button variant="contained" sx={{minWidth: 100, mt:1}}>Send </Button>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    {/*<Button onClick={() => {*/}
                    {/*    handleSubmit()*/}
                    {/*}}>Send reply</Button>*/}
                </Grid>
            </Grid>
        );
    }

    return (
        <div>
            <InboxNavbar reply={props.reply} setReply = {(val) => {props.setReply(val)}}/>
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