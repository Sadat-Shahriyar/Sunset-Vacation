import * as React from 'react';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';




export default function Offer(props) {
  let navigate = useNavigate();
  const [properties, setProperties] = React.useState([]);
  const [property, setProperty] = React.useState();
  const [startDate, setstartDate] = React.useState(null);
  const [EndDate, setEndDate] = React.useState(null);
  const [amount,setAmount]= React.useState(0);
  React.useEffect(() => {
    fetch(`http://localhost:8000/hosting/propertylist/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
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
        setProperties(response.properties)
        var t=[]
        response.properties.map((property)=>{
          if(property['approved'] === true){
              t.push(property);
          }
      })
      setProperties(t);
        
      })
      .catch((err) => {
        alert(err.message);
      })
  }, [])

function handleSubmit(){
  if(startDate>EndDate){
    alert('startdate should be less then enddate');
  }else{
    let body={
      property_id: property,
      startDate: startDate,
      endDate: EndDate,
      amount: amount
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization':  `Bearer ${props.token}` },
      body: JSON.stringify(body)
    };
    fetch(`http://localhost:8000/hosting/insertOffer/` , requestOptions)
      .then(response => response.json())
      .then(data => {
        navigate('/confirmOffer');
      });
  }
  }
  


  function viewRender(props) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {  width: '40ch' },
        }}
        noValidate
        mt={0}
        ml={0}
        //p={2}
        autoComplete="off"
      >
        <Grid container spacing={3} columns={12} >
          <Grid item xs={4} >
          <Card sx={{ width: "100%", height: "100vh",background: 'linear-gradient(to right bottom, pink,#C4036C)' }}>
        <CardContent>
        <Typography sx={{ marginTop: "30px", marginLeft: "20px", fontFamily: "Lucida Handwriting" }} variant="h1" component="h2">
                  Create
                </Typography>
                <Typography sx={{ marginTop: "30px", marginLeft: "20px", fontFamily: "Lucida Handwriting" }} variant="h1" component="h2">
                  offer
                </Typography>
                <Typography sx={{ marginTop: "30px", marginLeft: "20px", fontFamily: "Lucida Handwriting" }} variant="h1" component="h2">
                  <IconButton>
                    <LocalOfferRoundedIcon sx={{marginLeft: "20px",fontSize: 100}}/>
                  </IconButton>
                </Typography>
        </CardContent>
      </Card>
        </Grid>
        <Grid item xs={8} >
          <Grid container  spacing={10} columns={12} >
            <Grid item xs={4}>
            <Box sx={{ minWidth: 120 }}>
                  <Typography sx={{ marginTop: "30px", marginLeft: "20px", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
                    Select&nbsp;Property
                  </Typography>
                  <FormControl sx={{ m: 2, minWidth: 200 }} >

                    <InputLabel id="demo-simple-select-label">Property</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue="Property"
                      label="Property"

                     onChange={(event)=>{setProperty(event.target.value);}}
                    >

                      {properties.map((property) => (
                        <MenuItem value={property.propertyID}>{property.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box >
                  <Typography sx={{ marginTop: "30px", marginLeft: "20px", marginBottom: "20px", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
                    Select&nbsp;StartDate
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DesktopDatePicker
                      label="start date"
                      sx={{ mt: 5 }}
                      value={startDate}
                      minDate={new Date('2017-01-01')}
                      onChange={(newValue) => {
                        setstartDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />

                  </LocalizationProvider>
                </Box>
                <Box>
                      <Typography sx={{ marginTop: "30px", marginLeft: "20px", marginBottom: "20px", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
                    Enter&nbsp;amount
                  </Typography>
                      <FormControl  sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            
            onChange={(event)=>{setAmount(event.target.value);}}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
                      </Box>
               
            </Grid>
            <Grid item xs={4}>
            <Box sx={{ minWidth: 200,mt: 22.5 }}>
                  <Typography sx={{ marginTop: "30px", marginLeft: "20px", marginBottom: "20px", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
                    Select&nbsp;EndDate
                  </Typography>
                  <LocalizationProvider  dateAdapter={AdapterDateFns}>

                    <DesktopDatePicker
                      label="End date"
                      sx={{ mt: 50,ml:20 }}
                      value={EndDate}
                      minDate={new Date('2017-01-01')}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />

                  </LocalizationProvider>
                </Box>
            </Grid>
            <Grid item xs={8}>
            <Button variant="outlined" color='inherit' sx={{ml:50}} onClick={handleSubmit}>Publish</Button>
            </Grid>
          </Grid>

          </Grid>
          
        </Grid>
       
      </Box>
    )
  }

  return (
    <div>
      <ManagementDashboard />
      {viewRender(props)}
    </div>
  );

  }