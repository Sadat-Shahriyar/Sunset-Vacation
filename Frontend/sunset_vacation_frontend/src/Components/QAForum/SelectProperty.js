import * as React from 'react';
import "../../Components/Homepage/mainsection.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {  Card, CardContent, CardMedia, IconButton, Paper } from '@mui/material';
import {Button,TextField,     Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function SelectProperty(props){
    const [properties,setProperties]=React.useState([]);
    const [inputValue,setInputValue]=React.useState("Search property");
    const [label,setLabel]=React.useState([]);
    React.useEffect(() => {
        fetch(`http://localhost:8000/hosting/getallpropertiesforhomepage/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
               
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
                setProperties(response.data);
                //console.log(response.data)
                var t=[]
                response.data.map((property)=>{
                    t.push({label: property.title, id: property.propertyID});
                    //console.log(property.propertyID)
                })
                setLabel(t);
                
                setProperties([]);
                
                
            })
            .catch((err) => {
                alert(err.message);
            })
    }, [])
    function setProperty(property){
        
            var t=[...props.selectedProperty]
            var idx=t.indexOf(property);
            if(idx ===-1){
                t.push(property);
            }else{
                t.splice(idx,1);
            }
           
            
            props.setSelectedProperty(t);
           
           
    }
    function showCard(property){
        if(props.selectedProperty.indexOf(property)=== -1)
        {
            return(
                <Card onClick={(event) => {setProperty(property)}} sx={{ maxWidth: 200, maxHeight:150, mt:2,mr:2}}>
                <CardMedia
                    component="img"
                    height="100"
                    image={property.images[0].photo_url}
                    alt={property.title}
                    
                />
                <CardContent>
                    <Typography gutterBottom sx={{fontSize: 10}} component="div">
                    {property.title}
                    </Typography>
                    
                </CardContent>
                
                </Card>
            )
        }else{
            return(
                <Card  sx={{ maxWidth: 200, maxHeight:180, mt:2,mr:2}}>
                <Button onClick={(event) => {setProperty(property)}} sx={{ml:"70%"}} variant='text' color='inherit' endIcon={<HighlightOffIcon/>}/>
                 <CardMedia
                     component="img"
                     height="120"
                     image={property.images[0].photo_url}
                     alt={property.title}
                 //    position="fixed"
                    sx={{mt:-4}}
                 />
                 
                 <CardContent>
                     <Typography gutterBottom sx={{fontSize: 10}} component="div">
                     {property.title}
                     </Typography>
                     
                 </CardContent>
                 
                 </Card>
            )
        }
    }
    function ViewAllProperties(props){      
        
       
        return(
            <Box>
                <Grid container >{searchBar(props)}</Grid>
                <Grid container columns={12}>
            {properties.map((property)=>(
                <Grid item xs={3} key={property.propertyID}>
               {showCard(property)}
                </Grid>
            ))}
            </Grid>
            <Grid container ><Button sx={{mt:3}} variant='contained' color='inherit' onClick={(event)=>{props.setDisplay('none');setInputValue('');}}>ADD</Button></Grid>
            </Box>
        )
    
    
    }

  
    const getProperty= async(value)=>{
            
        if (value.length > 0){
            setInputValue(value);
            fetch(`http://localhost:8000/qa/getQAproperty/`+`${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            
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
                setProperties(response.propertyList);
                
            })
            .catch((err) => {
                alert(err.message);
            })
        }
    }
    const displayFunc = () => {
        return props.display;
      }
    function showProperty(props){
        return <div>{ViewAllProperties(props)}</div>
      }
    function searchBar(props){
        
    return(
              
        <Grid item xs={12}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={label}
                sx={{ width: 300,mt:3 }}
                onInputChange={(event, newInputValue) => {
                    getProperty(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label={inputValue} />}
             />
        </Grid>             
        )
    }
    return(
        <Box id="overlay1"  sx={{   display: displayFunc(),flexWrap: 'wrap',position:'fixed' }} >     
     
        <Paper elevation={6} sx={{ ":hover": "none", padding: 4,bgcolor:'antiquewhite' ,minHeight:500}}>
        <IconButton sx={{ml:"90%"}} onClick={(event)=>{props.setDisplay('none');}} ><HighlightOffIcon /></IconButton>
          <Typography sx={{ marginTop: "0px", fontFamily: "Lucida Handwriting" }} align='center' variant="h5" component="h5">
            Select Property link 
          </Typography>
          
          <Divider />
            {showProperty(props)}
          </Paper>
          </Box>
    )
}