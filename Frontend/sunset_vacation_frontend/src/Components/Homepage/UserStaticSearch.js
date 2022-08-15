import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import SearchNav from './SearchNav';
import NavBar from './NavBar';
import ViewProperty from './ViewProperty';

export default function UserStaticSearch(props) {

 
  React.useEffect(()=>{
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
       },
      body: JSON.stringify(props.userStaticSearch)
    };
   
    fetch(`http://localhost:8000/hosting/getUserStaticSearch/` , requestOptions)
    .then((response) => {
      if(response.ok) return response;
      else{
        let err = new Error(response.status + ": " + response.statusText);
        throw err;
      }
    })
    .then(response => response.json())
    .then(data => {
      props.setSearchResults(data.properties)
      console.log("response data: ",data);
    });
  }, [])

  
  
      function showProperties(props){

        return(
          <Box position="static" sx={{ flexGrow: 1 ,m:10,mt:2}}>
          <Grid container spacing={3}>
             {props.searchresults.map((property)=>(
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
            <Typography sx={{ marginTop: "30px", marginLeft: "110px",fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
           No result found
          </Typography>
        )
    }
  function CheckResult(props){
    
    
    if(props.searchresults.length > 0){
        return <div>{showProperties(props)}</div>
    }else{
        return <div>{NoResultFound(props)}</div>
    }
    
  }
  return (
   <div>
     <NavBar
      setHomepagesearch={(val)=>{props.setHomepagesearch(val)}}
      isLoggedin={props.isLoggedin}
      setflags={(val)=>{props.setflags(val)}}
      />
    {SearchNav(props)}
    <Typography sx={{ marginTop: "30px", marginLeft: "110px",fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
            Search result ...
          </Typography>
    {CheckResult(props)}
   </div>
  );
}



