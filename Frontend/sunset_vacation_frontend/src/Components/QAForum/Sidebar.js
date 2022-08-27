import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { useNavigate } from 'react-router-dom';
const drawerWidth = 300;
export default function Sidebar(props) {
  let navigate=useNavigate();
  const [user,setUser]=React.useState('');
  React.useEffect(() => {
    fetch(`http://localhost:8000/message/getUserInfo/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${props.token}`
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
           setUser(response.user);
            
        })
        .catch((err) => {
            alert(err.message);
        })
}, [])
  return (
    
    <Box sx={{zIndex:2,  position:'fixed', width:"300px",height:"100%", minHeight:"87vh", bgcolor: 'background.paper',mt:11.5,boxShadow:3 }}>
    <nav aria-label="main mailbox folders">
     <Button onClick={(event)=>{navigate('/forumMyhome')}} variant='text' color='inherit' sx={{fontSize:18,fontFamily:'Lucida Handwriting',padding:2}} startIcon={ <Avatar src="/broken-image.jpg" />}>{user.name}</Button>
    </nav>
    <Divider />
    <nav aria-label="main mailbox folders">
      <Button onClick={(event)=>{navigate('/forumHome')}} variant='text' color='inherit' sx={{fontSize:18,fontFamily:'Lucida Handwriting',padding:2}} startIcon={<HomeIcon/>}>HOME</Button>
    </nav>
    <Divider />
    <nav aria-label="main mailbox folders">
      <Button onClick={(event)=>{navigate('/createPost')}} variant='text' color='inherit' sx={{fontSize:18,fontFamily:'Lucida Handwriting',padding:2}} startIcon={<AddToPhotosIcon/>}>CREATE POST</Button>
    </nav>
    <Divider />
  </Box>
    
  );
}
