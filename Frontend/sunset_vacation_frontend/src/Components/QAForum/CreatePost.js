import * as React from 'react';
import {Button,TextField, Box,  Grid, List, ListItem, Typography, IconButton } from '@mui/material';
import Sidebar from './Sidebar';
import QAnavbar from './QAnavbar';
import { useNavigate } from 'react-router-dom';
import {  Card, CardActions, CardContent, CardMedia, Paper } from '@mui/material';
import SelectProperty from './SelectProperty';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function CreatePost(props){
    const drawerWidth = 340;
    let navigate=useNavigate();
    var [description, setDescription] = React.useState('');
    const [p,setP]=React.useState(0);
    const [display,setDisplay]=React.useState('none');
   
    const [selectedProperty,setSelectedProperty]=React.useState([]);
   
    function deletePropertyFromSelectedList(property){
            var t=[...selectedProperty]
            var index=t.indexOf(property);
            t.splice(index,1);
            setSelectedProperty(t);
    }
    
    function ViewSelectedProperties(props){      
        
       console.log("here--",selectedProperty);
        return(
            <Box>
            
                <Grid container columns={12}>
            {selectedProperty.map((property)=>(
                <Grid item xs={3} key={property.propertyID}>
                <Card  sx={{ maxWidth: 200, maxHeight:150, mt:2,mr:2}}>
               <Button onClick={(event)=>{deletePropertyFromSelectedList(property)}} sx={{ml:"70%"}} variant='text' color='inherit' endIcon={<HighlightOffIcon/>}/>
                <CardMedia
                    component="img"
                    height="100"
                    image={property.images[0].photo_url}
                    alt={property.title}
                //    position="fixed"
                   sx={{mt:-5}}
                />
                
                <CardContent>
                    <Typography gutterBottom sx={{fontSize: 10}} component="div">
                    {property.title}
                    </Typography>
                    
                </CardContent>
                
                </Card>
                </Grid>
            ))}
            </Grid>
            </Box>
        )
    
    
    }
   
   function handlePost(event){
    const body={
        properties: selectedProperty,
        description: description
        
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization':  `Bearer ${props.token}` },
        body: JSON.stringify(body)
      };
      fetch(`http://localhost:8000/qa/insertQuestion/` , requestOptions)
        .then(response => response.json())
        .then(data => {
          navigate('/forumMyhome');
        });

   }
    function createUI(props){
        
        return(
            <Box sx={{padding:5}}>
                <Typography sx={{fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
                CREATE POST
            </Typography>
                <TextField
                    //id="outlined-name"
                    label="Description"
                    variant="standard"
                    multiline
                    fullWidth
                    sx={{mt:1}}
                    rows={4}
                    placeholder="Write ...."
                    onChange={(event) => {setDescription(event.target.value) }}
                    />
                  <div>
                  <Button variant="outlined" onClick={(event)=>{setDisplay('block')}} color='inherit' sx={{mt:4,fontFamily:'Lucida Handwriting'}} >
                    Add propertyLink
                </Button>
                  </div>
                  <div>
                    {ViewSelectedProperties(props)}
                  </div>
                  <div>
                  <Button onClick={handlePost} variant="contained"  color='inherit' sx={{mt:4,fontFamily:'Lucida Handwriting'}} >
                    POST
                </Button>
                  </div>
               

            </Box>
        )
    }

        return(
            
        <div>
            <Grid container columns={12}>
            <Grid item xs={12}>
            <QAnavbar
            token={props.token}
            />         
            </Grid>
        <Grid container columns={12} spacing={0}>
        <Grid item xs={3} >
            <Sidebar token={props.token}/>
            </Grid>
            <Grid item xs={9} sx={{mt:12}}>
            <Box
            component="main"
            sx={{ position:'relative',flexGrow: 1, p: 3,zIndex:1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            {createUI(props)}
            </Box>
            </Grid>
        </Grid>
            </Grid>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            // minHeight="100vh"
            
        >
        <SelectProperty
        
            display={display}
            setSelectedProperty={(property)=>{setSelectedProperty(property)}}
            selectedProperty={selectedProperty}
            setDisplay={setDisplay}
        />
        </Box>
        </div>
    
        )
}