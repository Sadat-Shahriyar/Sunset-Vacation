import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Navigate, useNavigate } from 'react-router-dom';
import ViewProperty from './ViewProperty';
import { Button, Grid } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import SearchNav from './SearchNav';
import NavBar from './NavBar';



export default function SearchPage(props) {

  const [recommendations,setRecommendations]=React.useState([]); 

  React.useEffect(()=>{
   
    fetch(`http://localhost:8000/hosting/recommandations/` )
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
      setRecommendations(response.receommendations)
      
    })
    .catch((err) => {
      alert(err.message);
    })
  }, [])

  
  const navigate = useNavigate();

  function ViewAllProperties(propertyData){
      
    let properties = propertyData.map((property) => {
      return(
        <Grid item xs={3} key={property.propertyID}>
         <ViewProperty
                    setSelectedPropertyForDetails={(val)=>{props.setSelectedPropertyForDetails(val)}}
                    property={property}
                  />
        </Grid>
      );
    })
   
    return(
      <Grid container>
        {properties}
      </Grid>
    );
  }
  
  
  function handleShowMore(description,list){
      var dict={'title': description, 'list': list}
      console.log(dict)
      props.setShowMore(dict);

       navigate('/showmore');
  }
  function show4property(list){
    if(list.length >4){
      return <div>{ViewAllProperties(list.slice(0,4))}</div>
    }else{
      return <div>{ViewAllProperties(list)}</div>
    }
  }
  function showMore(description,list){
    if(list.length >4){
      return <Button variant='outlined' color='inherit' sx={{fontSize: 15,fontFamily:'Lucida Handwriting',ml:10}} endIcon={<ArrowCircleRightIcon   />} onClick={(event)=>{handleShowMore(description,list)}}>show more</Button>
    }else{
        return <div></div>
    }
  }
  function showList(description,list){
    return(
     <div>
      <Grid container spacing={4}>
      <Grid item xs={16}>
       <Typography sx={{ marginTop: "30px", marginLeft: "30px",fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
     {description}
    </Typography>
    {show4property(list)}
    {showMore(description,list)}
       </Grid>
       {/* <Grid item xs={1}> */}
        {/* {showMore(description,list)} */}
       {/* </Grid> */}
      </Grid>
     </div>
    );
  }
function showProperties(props){
  return(
    <Box position="static" sx={{ flexGrow: 1 ,m:10,mt:-7}}>
      {recommendations.map((r)=>(
        <div>{showList(r.description,r.list)}</div>
      ))}
    </Box>
  )
}
      
  
  return (
   <div >
      <NavBar
      setHomepagesearch={(val)=>{props.setHomepagesearch(val)}}
      isLoggedin={props.isLoggedin}
      setflags={(val)=>{props.setflags(val)}}
      />
     {SearchNav(props)} 
    {showProperties(props)}
   </div>
  );
}



