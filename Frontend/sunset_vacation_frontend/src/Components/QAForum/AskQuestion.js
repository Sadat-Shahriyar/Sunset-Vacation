import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import QAnavbar from './QAnavbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import {  Card, CardActions, CardContent, CardMedia, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AskQuestion(props){
    
    let navigate=useNavigate();
    const [properties,setProperties]=React.useState([]);
    var [ques, setQuestion] = React.useState('')
    var [description, setDescription] = React.useState('');
    const [p,setP]=React.useState(0);
    const [label,setLabel]=React.useState([]);
    const [selectedProperty,setSelectedProperty]=React.useState({});
    const [tag,setTag]=React.useState([]);
    const [t,setT]=React.useState();

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
                console.log(response.data)
                selectLabel(props);
                
            })
            .catch((err) => {
                alert(err.message);
            })
    }, [])

    function changeQuestion(event) {
        setQuestion(event.target.value)
    
      }
      function changeDescription(event) {
        setDescription(event.target.value)
    
      }
      function addTags(event){
        var temp=[...tag]
        temp.push(t);
        setTag(temp);
      }
      function handleSubmit(event){

      }
      function selectLabel(props){
            var t=[]
            properties.map((property)=>{
                t.push({label: property.title, id: property.propertyID});
            })
            setLabel(t);
            console.log('label     --------',t);
      }
      const getProperty= async(value)=>{
        
        if (value.length > 0){
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
      function showTags(props){
        return(
          <Grid container >
            {tag.map((t)=>(
              <Grid item xs={3}>
                <Button variant='contained' color='inherit' endIcon={<DeleteIcon/>}>{t}</Button>
              </Grid>
            ))}
          </Grid>
        )
      }

      function searchBar(props){
        console.log(label,' searchbar--------')
            return(
              
                   <Grid item xs={12}>
                   <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={label}
      sx={{ width: 300,m: 3 }}
      onInputChange={(event, newInputValue) => {
            getProperty(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="Search property" />}
    />
                   </Grid>

             
            )
      }
      function ViewAllProperties(props){      
      
        const goToDetailsPage = (id) => {
          props.setSelectedPropertyForDetails(id);
         navigate("/booking/property/details");
        }
        return(
            <Box>
                  <Grid container >{searchBar(props)}</Grid>
                <Grid container columns={12}>
               {properties.map((property)=>(
                  <Grid item xs={3} key={property.propertyID}>
                  <Card onClick={() => {setSelectedProperty(property.propertyID)}} sx={{ maxWidth: 200, maxHeight:150, m:1}}>
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
                </Grid>
               ))}
            </Grid>
            </Box>
        )
      
       
      }
      
    function questionAnswerInput(props) {
        return (
          <div>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 2, width: '70ch' },
                
              }}
              noValidate
              autoComplete="off"
              
            >
              <TextField onChange={changeQuestion} sx={{ marginleft: "35px" }} id="Add new question" label="Add new Question" variant="outlined" />
              <TextField
                id="answer"
                label="answer"
                multiline
                rows={6}
                sx={{ marginleft: "35px" }}
                onChange={changeDescription}
              />
    
    
            </Box>
           
              <Button variant="outlined" onClick={(event)=>{setP(1);}} color='inherit' sx={{ width: "150px", marginLeft: "18px" }} >
                Add propertyLink
              </Button>
              <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={label}
      sx={{ width: 300,m: 3 }}
      onInputChange={(event, newInputValue) => {
        setT(newInputValue);
  }}
      renderInput={(params) => <TextField {...params} label="add tags" />}
    />
     <Button variant="outlined" onClick={addTags}  color='inherit' sx={{ width: "150px", marginLeft: "18px" }} >
                Add Tag
              </Button>
        <div>
        {showTags(props)}
        </div>
           
          </div>
        )
      }
      function showProperty(props){
        if(p === 1){
            return <div>{ViewAllProperties(props)}</div>
        }
      }
      function showPage(props){
        return(
            <Grid container spacing={2} columns={16} sx={{ margintop: "-20px" }}>
       
        <Grid sx={{m:'auto'}} item xs={10} >
          <Typography sx={{ marginTop: "30px", marginLeft: "30px", textDecoration: "underline", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
            Ask a Question
          </Typography>
          {questionAnswerInput(props)}
        </Grid>
        <Grid item xs={6}>
            {showProperty(props)}
        </Grid>
      </Grid>
        )
      }
    return (
        <div>
           <QAnavbar/>
           {showPage(props)}
        </div>
    )
}