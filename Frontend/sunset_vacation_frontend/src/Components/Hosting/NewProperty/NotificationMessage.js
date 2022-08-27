import * as React from 'react';
import StaticNavBar from '../../Homepage/StaticNavBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Box,Typography,Divider} from '@mui/material';
import { useParams } from 'react-router-dom';
export default function NotificationMessage(props){
    let params=useParams();
    const [notification,setNotification]=React.useState({});
    const fetchNotification=async()=>{
        

            fetch(`http://localhost:8000/message/getANotification/`+`${params.id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                }
            })
                .then((response) => {
                    if (response.ok) {
                        return response
                    }
                    else {
                        let err = new Error(response.status + ": " + response.text);
                        throw err;
                    }
                })
                .then((response) => response.json())
                .then((response) => {
                  setNotification(response.notification)
                })
                .catch((err) => {
                    alert(err.message);
                })
    }
    React.useEffect(() => {      
        fetchNotification();
    }, [])
    return(
        <div>
            <StaticNavBar
                isLoggedin={props.isLoggedin}
                token={props.token}
            />
             <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {  width: '40ch' },
          boxShadow: 3
        }}
        noValidate
        mt={10}
        ml="25%"
        //p={2}
        autoComplete="off"
        width="50%"
        
      >
         <Card>
         <CardContent>
         <Typography sx={{m:1,ml:"10%",fontFamily:'Lucida Handwriting',fontSize:15}}>
            Notification from admin
              </Typography> 
              <Divider/>
            <Typography sx={{m:1,ml:"10%",fontFamily:'Lucida Handwriting',fontSize:18}}>
            {notification.title}
              </Typography> 
              <Divider/>
              <Typography sx={{m:1,ml:"10%",fontFamily:'Lucida Handwriting',fontSize:20}} >
             {notification.text}
              </Typography>

              
            
            </CardContent>    
         </Card>
      </Box>
        </div>
    )
}