import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import SearchNav from './SearchNav';
import ViewProperty from './ViewProperty';
import NavBar from './NavBar';

export default function ShowMore(props) {

  const [properties, setProperties] = React.useState([])
  

  React.useEffect(()=>{
    console.log(props)
    setProperties(props.showMore.list)
  }, [])

 
      function showProperties(props){

        return(
          <Grid container>
             {properties.map((property)=>(
                <Grid item xs={2.5} key={property.propertyID}>
               <ViewProperty
                    setSelectedPropertyForDetails={(val)=>{props.setSelectedPropertyForDetails(val)}}
                    property={property}
                  />
              </Grid>
             ))}
          </Grid>
        );
      }
    function NoResultFound(props){
        return(
            <Typography sx={{ marginTop: "30px", marginLeft: "30px",fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
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
      />
    {SearchNav(props)}
    <Typography sx={{ marginTop: "30px", marginLeft: "30px",fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
            View more result for "{props.showMore.title}"
          </Typography>
    {CheckResult(props)}
   </div>
  );
}



