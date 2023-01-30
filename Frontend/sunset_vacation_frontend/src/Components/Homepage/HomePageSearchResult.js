import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchNav from './SearchNav';
import {  Grid } from '@mui/material';
import ViewProperty from './ViewProperty';
import NavBar from './NavBar';

export default function HomePageSearchResult(props) {

  const [properties, setProperties] = React.useState([])
  

  React.useEffect(()=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
         },
        body: JSON.stringify(props.homepagesearch)
      };
     
      fetch(`http://localhost:8000/hosting/getHomepagesearchResult/` , requestOptions)
      .then((response) => {
        if(response.ok) return response;
        else{
          let err = new Error(response.status + ": " + response.statusText);
          throw err;
        }
      })
      .then(response => response.json())
      .then(data => {
        setProperties(data.propertyList)
      });
  }, [])

 
  
      function showProperties(props){
        
        return(
          <Box position="static" sx={{ flexGrow: 1 ,m:10,mt:2}}>
          <Grid container >
             {properties.map((property)=>(
                <Grid item xs={3} key={property.propertyID}>
                  <ViewProperty
                    setSelectedPropertyForDetails={(val)=>{props.setSelectedPropertyForDetails(val)}}
                    property={property}
                  />
              </Grid>
             ))}
          </Grid>
          </Box>
        );
      }
    function NoResultFound(props){
        return(
            <Typography sx={{ marginTop: "30px", marginLeft: "5%",fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
           No result found
          </Typography>
        )
    }
  function CheckResult(props){
    console.log("length:",properties.length)
    if(properties.length > 0){
        return <div>{showProperties(props)}</div>
    }else{
        return <div>{NoResultFound(props)}</div>
    }
    
  }
  return (
   <Box >
      <NavBar
      setHomepagesearch={(val)=>{props.setHomepagesearch(val)}}
      isLoggedin={props.isLoggedin}
      setflags={(val)=>{props.setflags(val)}}
      />
    {SearchNav(props)}
    <Typography sx={{ marginTop: "30px", marginLeft: "5%",fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
            Search result  
          </Typography>
    {CheckResult(props)}
    </Box>
  );
}



