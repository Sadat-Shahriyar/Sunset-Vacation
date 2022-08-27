import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import SearchNav from './SearchNav';
import NavBar from './NavBar';
import ViewProperty from './ViewProperty';
export default function SearchResult(props) {

  const [properties, setProperties] = React.useState([])
  

  React.useEffect(()=>{
    fetch(`http://localhost:8000/hosting/getSearchResult/` + `${props.selectedFac}`)
            .then((response) => {
                if (response.ok) {
                    return response
                } else {
                    let err = new Error(response.status + ": " + response.text);
                    throw err;
                }
            })
            .then((response) => response.json())
            .then((response) => {
              //props.setSearchResults(response.properties)
              setProperties(response.properties)
                console.log(response.properties)
            })
            .catch((err) => {
                alert(err.message);
            })
  }, [])
    
      function showProperties(props){

        return(
          <Box position="static" sx={{ flexGrow: 1 ,m:10,mt:2}}>
          <Grid container>
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
            <Typography sx={{ marginTop: "30px", marginLeft: "110px",fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
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
   <div>
      <NavBar
      setHomepagesearch={(val)=>{props.setHomepagesearch(val)}}
      isLoggedin={props.isLoggedin}
      setflags={(val)=>{props.setflags(val)}}
      token={props.token}
      />
    {SearchNav(props)}
    <Typography sx={{ marginTop: "30px", marginLeft: "110px",fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
            Search result for "{props.selectedFac}"
          </Typography>
    {CheckResult(props)}
   </div>
  );
}



