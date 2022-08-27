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
  const [image,setImage]=React.useState("/broken-image.jpg");
  const User =async ()=>{
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
         console.log(response.user);
           setUser(response.user);
           
           if (response.user.photo != null) {
            setImage(response.user.photo);
           }
           
        })
        .catch((err) => {
            alert(err.message);
        })
  }
  React.useEffect(() => {
    User();
}, [])
  return (
    
    <Box sx={{zIndex:2,  position:'fixed', width:"300px",height:"100%", minHeight:"87vh", bgcolor: 'background.paper',mt:11.5,boxShadow:3 }}>
    <nav aria-label="main mailbox folders">
     <Button onClick={(event)=>{navigate('/forumMyhome')}} variant='text' color='inherit' sx={{fontSize:18,fontFamily:'Lucida Handwriting',padding:2}} startIcon={ <Avatar src={image} />}>{user.name}</Button>
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
