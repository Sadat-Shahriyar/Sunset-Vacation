import * as React from 'react';
import Box from '@mui/material/Box';
import MainSection from './MainSection';
import NavBar from './NavBar';



export default function Homepage(props) {  
  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <NavBar
      setHomepagesearch={(val)=>{props.setHomepagesearch(val)}}
      isLoggedin={props.isLoggedin}
      setflags={(val)=>{props.setflags(val)}}
      />
      <MainSection/>
     
    </Box>
  );
}



