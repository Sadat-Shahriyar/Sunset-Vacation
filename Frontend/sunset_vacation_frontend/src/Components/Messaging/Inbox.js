import * as React from 'react'
import { axios_api } from '../../App';
import InboxNavbar from './InboxNavbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';
import ReplyMessage from './ReplyMessage';

function ViewMessages(props){

    const handleReply = (message) => {
        props.setMessageToReply(message);
        props.setReply(true);
    }

    return (
        <Grid container sx={{maxWidth:1000, ml:40, mt:5}}>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{background:'pink'}}>
                            <TableRow >
                                <TableCell align="center" colSpan={2}>Messages</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.messages.map((message) => {
                                return(
                                    <TableRow
                                        key={message.message_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        
                                    >
                                        <TableCell align="center">{message.sender_name}: {message.message}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => {handleReply(message)}}>Reply</Button>
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

export default function Inbox(props){

    const [messages, setMessages] = React.useState([])
    const [messageToReply, setMessageToReply] = React.useState(null);
    const [reply, setReply] = React.useState(false);
    const fetchMessages = async()=>{
        try{
            let response = await axios_api.get('message/getmessages/', {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization' : `Bearer ${props.token}`
                }
            })

            if(response.status === 200){
                console.log(response.data.messages);
                setMessages(response.data.messages);
            }
        }   
        catch(error){
            alert(error.message);
        }
    }
    React.useEffect(()=>{
        fetchMessages()
    }, [])

    if(reply){
        return(
            <ReplyMessage 
                messageToReply = {messageToReply}
                token = {props.token}
                isLoggedin={props.isLoggedin}
                setMessageToReply={(val) => {setMessageToReply(val)}}
                setReply = {(val) => {setReply(val)}}
            />
        );
    }
    else{
        return(
            <div>
                <InboxNavbar />
                <ViewMessages 
                    messages = {messages}
                    setMessageToReply = {(val) => {setMessageToReply(val)}}
                    setReply = {(val) => {setReply(val)}}
                />
            </div>
        );
    }
    
}