import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import EditIocn from '@mui/icons-material/Edit';

import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Icon from '@mui/material/Icon';
import MdPhone from '@mui/icons-material/Phone';
import Chip from '@mui/material/Chip';
export default function ShowPropertyDetails(props) {
    let navigate=useNavigate();
    const [prop,setProp]=React.useState({});
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    //setValue(newValue);
    navigate("/hosting")
  };
    React.useEffect(() => {
      // fetch("http://localhost:8000/hosting/" + `${props.userId}/`, {
      //     method:"GET",
      //     headers: {
      //     'Content-type': 'application/json'
      //     }
      // })
      fetch(`http://localhost:8000/hosting/getProperty/`+`${props.property.propertyID}`)
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
              setProp(response.properties)
              
          })
          .catch((err) => {
              alert(err.message);
          })
  })
   function changeDescription(event){
    props.property.description=event.target.value;
    
   }
   function changeTitle(event){
    
    props.property.title=event.target.value;
    
   }
   const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
      minHeight: 128,
    },
  }));
    function  handleSubmit(event) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(props.property)
        };
        fetch(`http://localhost:8000/hosting/updateProperty/`+`${prop.propertyID}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("updated successsfully")
        });


      }
    function showDetails(props){
        console.log("show details:"+props.property.description)
      //   return (
      //       <div>
      //           <form onSubmit={handleSubmit}>
      //   <label>
      //     title:
      //     <input  type="text" placeholder={props.property.title} onChange={changeTitle} />
      //   </label>
      //   <label>
      //     Description:
      //     <input type="textarea" placeholder={props.property.description} onChange={changeDescription} />
      //   </label>
      //   <input type="submit" value="Submit" />
      // </form>
      //       </div>
      return(
        <div>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <StyledToolbar>
          <IconButton
           
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          <HouseSidingIcon/>
          <p sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px" }}>{props.property.title}<IconButton>
            <EditIcon/></IconButton></p>
          </IconButton>
          
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
          >
            <Button label="Images"/>
          </Typography>
          <IconButton size="large" aria-label="search" color="inherit">
            {/* <SearchIcon /> */}
          </IconButton>
         
        </StyledToolbar>
      </AppBar>
    </Box>
      
     
     
    </div>
      )
        
    }
  return (
   <div>
     <ManagementDashboard/>
    {showDetails(props)}
   </div>
  );
}
