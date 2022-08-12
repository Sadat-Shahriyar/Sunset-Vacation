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
import { axios_api } from '../../../App';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';


const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
    }),
);



export default function (props) {
    const [properties, setProperties] = React.useState([]);
    const [property, setProperty] = React.useState();
    const [msg, setMsg] = React.useState('');
    const [expiryDate, setExpiryDate] = React.useState(null);
    const [type, setType] = React.useState('');
    const [guest, setGuest] = React.useState([]);
    const [next, setNext] = React.useState(0);
    const [allGuest,setAllGuest]=React.useState([]);
    const [RecentlyVisited,setRecentlyVisited]=React.useState([]);
    const [mostFrequentlyVisited,setMostFrequentlyVisited]=React.useState([]);
    const [bestRatingGiver,setBestRatingGiver]=React.useState([]);
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
            })
            .catch((err) => {
                alert(err.message);
            })
    }, [])

    function MyFormControlLabel(props) {
        const radioGroup = useRadioGroup();

        let checked = false;

        if (radioGroup) {
            checked = radioGroup.value === props.value;
        }
        setType(radioGroup.value);
        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    MyFormControlLabel.propTypes = {
        /**
         * The value of the component.
         */
        value: PropTypes.any,
    };
    function customMsg(value) {
        setMsg(value);
    }
    const handleChangeGuest = (event) => {
        var t = [...guest]
        if (t.includes(event.target.name)) {
            let idx = t.indexOf(event.target.name);
            t.splice(idx, 1);
        } else {
            t.push(event.target.name);
        }
        setGuest(t);
        console.log(t);

    };
    const Change = async() => {
        setNext(1 - next);
        let body={
            guest: guest,
            property: property
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
             },
            body: body
          };
        let res = await axios_api.post("hosting/getGuestList/",requestOptions , {
            headers: {
                'Content-Type': 'application/json',
            },
          })       
        if(res.status === 200){
            console.log(res.data.list)
            list=res.data.list
            var l=list.find(element => element["guest"] === 'All guests');  
            setAllGuest(l.list);
            l=list.find(element => element["guest"] === 'Recently visited');
            setRecentlyVisited(l.list);
            l=list.find(element => element["guest"] === 'Most frequently visted');  
            setMostFrequentlyVisited(l.list); 
            l=list.find(element => element["guest"] === 'Best rating giver'); 
            setBestRatingGiver(l.list);
        }
    };

    function showAllGuestList(props){
        return(
            <Box>
                 <Typography sx={{ marginTop: "30px",textDecoration:"underline", marginLeft: "30px",fontFamily: "Lucida Handwriting" }} variant="h6" component="h6">
     All guest
    </Typography>
                <TableContainer component={Paper} sx={{ width: "90%", marginTop: "20px", marginLeft: "auto", marginRight: "auto" }} >
                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableHead sx={{bgcolor:"#AED6F1 "}}>
                        <TableRow>
                            <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }}>Guest</TableCell>
                            <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">last visited</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
            {allGuest.map((g) => (
                <TableRow
                    key={offer.offer_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>               
                   
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.name}</TableCell>
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.lastVisited}</TableCell>
                
                    <TableCell><Tooltip title="Delete">
                        <IconButton value={g.id} onClick={(event)=>{deleteFromAllGuest(value)}} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip></TableCell>
                </TableRow>
            ))}
        </TableBody>
                </Table>
            </TableContainer>
            </Box>
        )
    }

    function showMostFrequentlyVisitedList(props){
        return(
           <Box>
            <Typography sx={{ marginTop: "30px",textDecoration:"underline", marginLeft: "30px",fontFamily: "Lucida Handwriting" }} variant="h6" component="h6">
     Most frequently Visited
    </Typography>
             <TableContainer component={Paper} sx={{ width: "90%", marginTop: "20px", marginLeft: "auto", marginRight: "auto" }} >
                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableHead sx={{bgcolor:"#AED6F1 "}}>
                        <TableRow>
                            <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }}>Guest</TableCell>
                            <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">total visted</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
            {mostFrequentlyVisited.map((g) => (
                <TableRow
                    key={offer.offer_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>               
                   
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.name}</TableCell>
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.totalVisited}</TableCell>
                
                    <TableCell><Tooltip title="Delete">
                        <IconButton value={g.id} onClick={(event)=>{deleteFromMostFrequentGuest(value)}} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip></TableCell>
                </TableRow>
            ))}
        </TableBody>
                </Table>
            </TableContainer>
           </Box>
        )
    }
    function showRecentlyVisitedList(props){
        return(
            <Box>
             <Typography sx={{ marginTop: "30px",textDecoration:"underline", marginLeft: "30px",fontFamily: "Lucida Handwriting" }} variant="h6" component="h6">
     Recently Visited
     </Typography>
              <TableContainer component={Paper} sx={{ width: "90%", marginTop: "20px", marginLeft: "auto", marginRight: "auto" }} >
                 <Table sx={{ minWidth: 200 }} aria-label="simple table">
                     <TableHead sx={{bgcolor:"#AED6F1 "}}>
                         <TableRow>
                             <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }}>Guest</TableCell>
                             <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">last visited</TableCell>
                             <TableCell align="right"></TableCell>
                         </TableRow>
                     </TableHead>
                     <TableBody>
             {RecentlyVisited.map((g) => (
                 <TableRow
                     key={offer.offer_id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>               
                    
                     <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.name}</TableCell>
                     <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.lastVisited}</TableCell>
                 
                     <TableCell><Tooltip title="Delete">
                         <IconButton value={g.id} onClick={(event)=>{deleteFromRecentGuest(value)}} >
                             <DeleteIcon />
                         </IconButton>
                     </Tooltip></TableCell>
                 </TableRow>
             ))}
         </TableBody>
                 </Table>
             </TableContainer>
            </Box>
         )
    }
    function showRatingGiverList(props){
        return(
            <Box>
             <Typography sx={{ marginTop: "30px",textDecoration:"underline", marginLeft: "30px",fontFamily: "Lucida Handwriting" }} variant="h6" component="h6">
     Best rating givers
     </Typography>
              <TableContainer component={Paper} sx={{ width: "90%", marginTop: "20px", marginLeft: "auto", marginRight: "auto" }} >
                 <Table sx={{ minWidth: 200 }} aria-label="simple table">
                     <TableHead sx={{bgcolor:"#AED6F1 "}}>
                         <TableRow>
                             <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }}>Guest</TableCell>
                             <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">given rating</TableCell>
                             <TableCell align="right"></TableCell>
                         </TableRow>
                     </TableHead>
                     <TableBody>
             {bestRatingGiver.map((g) => (
                 <TableRow
                     key={offer.offer_id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>               
                    
                     <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.name}</TableCell>
                     <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.rating}</TableCell>
                 
                     <TableCell><Tooltip title="Delete">
                         <IconButton value={g.id} onClick={(event)=>{deleteFromRatingGuest(value)}} >
                             <DeleteIcon />
                         </IconButton>
                     </Tooltip></TableCell>
                 </TableRow>
             ))}
         </TableBody>
                 </Table>
             </TableContainer>
            </Box>
         )
    }
    function showGiftCard(props) {
        return (
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { width: '40ch' },
                }}
                noValidate
                mt={0}
                ml={0}
                //p={2}
                autoComplete="off"
            >
                <Grid container spacing={3} columns={12} >

                    <Grid item xs={4} >
                        <Card sx={{ width: "100%", height: "100vh", background: 'linear-gradient(to right bottom, pink,#C4036C)' }}>
                            <CardContent>
                                <Typography sx={{ marginTop: "30px", marginLeft: "20px", fontFamily: "Lucida Handwriting" }} variant="h1" component="h2">
                                    Create
                                </Typography>
                                <Typography sx={{ marginTop: "30px", marginLeft: "20px", fontFamily: "Lucida Handwriting" }} variant="h1" component="h2">
                                    Gift <CardGiftcardRoundedIcon sx={{ marginLeft: "20px", fontSize: 100 }} />
                                </Typography>
                                <Typography sx={{ marginTop: "30px", marginLeft: "20px", fontFamily: "Lucida Handwriting" }} variant="h1" component="h2">
                                    Card
                                </Typography>


                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={8}>
                        <Grid container >
                            <Grid item xs={6}>
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

                                        onChange={(event) => { setProperty(event.target.value); }}>

                                        {properties.map((property) => (
                                            <MenuItem value={property.propertyID}>{property.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ marginTop: "30px", marginLeft: "20px", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
                                    Add&nbsp;Custom&nbsp;Message
                                </Typography>
                                <TextField id="outlined-textarea" multiline row={7} onChange={customMsg} variant="outlined" />
                            </Grid>
                        </Grid>


                        <Grid container>
                            <Grid item xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <Typography sx={{ marginTop: "30px", marginLeft: "20px", marginBottom: "20px", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
                                        Select&nbsp;Expiry&nbsp;Date
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                                        <DesktopDatePicker
                                            label="Expiry date"
                                            sx={{ mt: 5 }}
                                            value={expiryDate}
                                            minDate={new Date('2017-01-01')}
                                            onChange={(newValue) => {
                                                setExpiryDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />

                                    </LocalizationProvider>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ marginTop: "30px", marginLeft: "20px", marginBottom: "20px", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
                                    Select&nbsp;Purpose
                                </Typography>
                                <RadioGroup name="use-radio-group">
                                    <MyFormControlLabel color='inherit' value="promotional" label="Promotional" control={<Radio />} />
                                    <MyFormControlLabel color='inherit' value="offer" label="Offer" control={<Radio />} />
                                </RadioGroup>
                            </Grid>
                        </Grid>


                        <Grid container>

                            <Grid item xs={6}>
                                <Typography sx={{ marginTop: "30px", marginLeft: "20px", marginBottom: "20px", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
                                    Select&nbsp;Guests
                                </Typography>

                                <FormControl sx={{ m: 1, fontFamily: 'candara' }} component="fieldset" variant="standard">
                                    <FormControlLabel control={<Checkbox onChange={handleChangeGuest} name="All guests" />} label="All Guests" />
                                    <FormControlLabel control={<Checkbox onChange={handleChangeGuest} name="Recently visited" />} label="Recently visited" />
                                    <FormControlLabel control={<Checkbox onChange={handleChangeGuest} name="Most frequently visted" />} label="Most Frequently Visited" />
                                    <FormControlLabel control={<Checkbox onChange={handleChangeGuest} name="Best rating giver" />} label="Best Rating Giver" />

                                </FormControl>



                            </Grid>
                            <Grid item xs={6}>
                                <Button variant='outlined' color='inherit' onClick={Change} sx={{ mt: 25, ml: -5 }}>Next</Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>


            </Box>
        )
    }
    function Discount(props) {
        return (
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { width: '40ch' },
                }}
                noValidate
                mt={0}
                ml={0}
                //p={2}
                autoComplete="off"
            >
                <Grid container spacing={3} columns={12} >

                    <Grid item xs={4} >
                        <Card sx={{ width: "100%", height: "100vh", background: 'linear-gradient(to right bottom, pink,#C4036C)' }}>
                            <CardContent>
                                <Typography sx={{ marginTop: "30px", marginLeft: "20px", fontFamily: "Lucida Handwriting" }} variant="h1" component="h2">
                                    Create
                                </Typography>
                                <Typography sx={{ marginTop: "30px", marginLeft: "20px", fontFamily: "Lucida Handwriting" }} variant="h1" component="h2">
                                    Gift <CardGiftcardRoundedIcon sx={{ marginLeft: "20px", fontSize: 100 }} />
                                </Typography>
                                <Typography sx={{ marginTop: "30px", marginLeft: "20px", fontFamily: "Lucida Handwriting" }} variant="h1" component="h2">
                                    Card
                                </Typography>


                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={8}>

                    </Grid>
                </Grid>
            </Box>
        )
    }
    function show(props) {
        if (next === 0) {
            return <div> {showGiftCard(props)}</div>
        } else {
            return <div>{Discount(props)}</div>
        }
    }
    return (
        <div>
            <ManagementDashboard />
            {show(props)}

        </div>
    )
}