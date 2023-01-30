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
import {fontWeight} from "@mui/system";
function ViewMessages(props){

    // const [reply, setReply] = React.useState(false);
    const fetchMessages = async()=>{
        try{
            let response = await axios_api.get('message/getMessages/', {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization' : `Bearer ${props.token}`
                }
            })

            if(response.status === 200){
                console.log(response.data.messages);
                props.setMessages(response.data.messages);
            }
        }
        catch(error){
            alert(error.message);
        }
    }
    React.useEffect(()=>{
        fetchMessages()
    }, [])

    const handleReply = async(message)=>{

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}` },
        };

        fetch('http://localhost:8000/message/markMessage/'+message.msg_id, requestOptions)
            .then(response => response.json())
            .then(response => {
                props.setMessageToReply(message);
                props.setReply(true);
            }).catch((err) => {
            console.log(err);
          });
    }

    // const handleReply = (message) => {
    //     props.setMessageToReply(message);
    //     props.setReply(true);
    // }

    return (
        <Grid container sx={{maxWidth:900, ml:40, mt:5}}>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650,  }} aria-label="simple table">
                        <TableHead sx={{background:'lightBlue', }}>
                            <TableRow >
                                <TableCell align="center" colSpan={2} sx={{fontFamily: "Lucida Handwriting"}}>Messages</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.messages.map((message) => {
                                return(
                                    <TableRow
                                        key={message.msg_id}
                                        hover
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, paddingRight:5,}}
                                        onClick={() => {handleReply(message)}}
                                    >
                                        <TableCell sx={{width:'25%', paddingLeft:5,fontWeight:"bold", fontFamily: "Lucida Handwriting", fontSize:15,}}>{message.name}</TableCell>
                                        <TableCell align="left"  sx={{ paddingLeft:2, fontFamily: "Lucida Handwriting", fontSize:13, fontWeight: message.marked  ? "light": "bold"}} >{message.sender_name} {message.message}</TableCell>
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

    if(props.reply){
        return(
            <ReplyMessage
                messageToReply = {messageToReply}
                token = {props.token}
                isLoggedin={props.isLoggedin}
                setMessageToReply={(val) => {setMessageToReply(val)}}
                reply={props.reply}
                setReply = {(val) => {props.setReply(val)}}
            />
        );
    }
    else{
        return(
            <div>
                <InboxNavbar reply={props.reply} setReply = {(val) => {props.setReply(val)}}/>
                <ViewMessages
                    messages = {messages}
                    token = {props.token}
                    setMessageToReply = {(val) => {setMessageToReply(val)}}
                    setReply = {(val) => {props.setReply(val)}}
                    setMessages = {(val)=>{setMessages(val)}}
                />
            </div>
        );
    }

}