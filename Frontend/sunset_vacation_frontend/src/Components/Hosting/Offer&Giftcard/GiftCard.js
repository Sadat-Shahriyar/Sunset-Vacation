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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import { id } from 'date-fns/locale';
import OutlinedInput from '@mui/material/OutlinedInput';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
    }),
);



export default function GiftCard (props) {

    let navigate=useNavigate();
    const [properties, setProperties] = React.useState([]);
    const [property, setProperty] = React.useState();
    const [msg, setMsg] = React.useState('');
    const [expiryDate, setExpiryDate] = React.useState(null);
    //type promotional/offer
    const [type, setType] = React.useState('');
    const [guest, setGuest] = React.useState([]);
    const [next, setNext] = React.useState(0);
    const [allGuest,setAllGuest]=React.useState([]);
    const [RecentlyVisited,setRecentlyVisited]=React.useState([]);
    const [mostFrequentlyVisited,setMostFrequentlyVisited]=React.useState([]);
    const [bestRatingGiver,setBestRatingGiver]=React.useState([]);
    //discountype same or different
    const [discountType,setDiscountType]=React.useState('');
    //discount values
    const [discount,setDiscount]=React.useState([{'type':'same',discount:0},
    {'type':'All guests',discount:0},
    {'type':'Recently visited',discount:0},
    {'type':'Most frequently visited',discount:0},
    {'type':'Best rating giver',discount:0}]);
    const [d,setD]=React.useState('');
    const [checked,setChecked]=React.useState([false,false,false,false]);
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
    function MyFormControlLabel1(props) {
        const radioGroup = useRadioGroup();

        let checked = false;

        if (radioGroup) {
            checked = radioGroup.value === props.value;
        }
        
        setDiscountType(radioGroup.value);
        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    MyFormControlLabel1.propTypes = {
        /**
         * The value of the component.
         */
        value: PropTypes.any,
    };
    function customMsg(event) {
        setMsg(event.target.value);
    }
    const handleChangeGuest = (name,value) => {
        var t = [...guest]
        if (t.includes(name)) {
            let idx = t.indexOf(name);
            t.splice(idx, 1);
        } else {
            t.push(name);
        }
        checked[value]=!checked[value];
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
            var list=res.data.list
            console.log(list)
            var l=list.find(element => element["guest"] === 'All guests');  
            if(l != null) setAllGuest(l.list);
            l=list.find(element => element["guest"] === 'Recently visited');
            if(l != null) setRecentlyVisited(l.list);
            l=list.find(element => element["guest"] === 'Most frequently visted');  
            if(l != null) setMostFrequentlyVisited(l.list); 
            l=list.find(element => element["guest"] === 'Best rating giver'); 
            if(l != null) setBestRatingGiver(l.list);
           
        }
    };
    function deleteFromAllGuest(value){
        var t = [...allGuest]
        if (t.includes(value)) {
            let idx = t.indexOf(value);
            t.splice(idx, 1);
        } else {
            t.push(value);
        }
        setAllGuest(t);
        console.log(t);

    }
    function deleteFromMostFrequentGuest(value){
        var t = [...mostFrequentlyVisited]
        if (t.includes(value)) {
            let idx = t.indexOf(value);
            t.splice(idx, 1);
        } else {
            t.push(value);
        }
        setMostFrequentlyVisited(t);
        console.log(t);
    }
    function deleteFromRatingGuest(value){
        var t = [...bestRatingGiver]
        if (t.includes(value)) {
            let idx = t.indexOf(value);
            t.splice(idx, 1);
        } else {
            t.push(value);
        }
        setBestRatingGiver(t);
        console.log(t);
    }
    function deleteFromRecentGuest(value){
        var t = [...RecentlyVisited]
        if (t.includes(value)) {
            let idx = t.indexOf(value);
            t.splice(idx, 1);
        } else {
            t.push(value);
        }
        setRecentlyVisited(t);
        console.log(t);
    }
    const  handleSubmit = async() =>{
    
        var list=[]
        console.log('-----------------');
        console.log(discount);
        if(discountType === 'same'){
            var guestList=[]
            for(var i=0;i<allGuest.length;i++){
                if(!guestList.includes(allGuest[i].id)){
                    guestList.push(allGuest[i].id);
                }
            }
            for(var i=0;i< RecentlyVisited.length;i++){
                if(!guestList.includes(RecentlyVisited[i].id)){
                    guestList.push(RecentlyVisited[i].id);
                }
                
            }
            for(var i=0;i< mostFrequentlyVisited.length;i++){
                if(!guestList.includes(mostFrequentlyVisited[i].id)){
                    guestList.push(mostFrequentlyVisited[i].id);
                }
                
            }
            for(var i=0;i< bestRatingGiver.length;i++){
                if(!guestList.includes(bestRatingGiver[i].id)){
                    guestList.push(bestRatingGiver[i].id);
                }
               
            }
            var l=discount.find(element => element['type'] === 'same');  
            var dict={'list': guestList,'discount': l.discount };
            if (guestList.length > 0) list.push(dict);
        }else{
            for (var j=0;j<discount.length;j++){
                var l=discount[j]
                console.log(l)
                var guestList=[]
                if(l.type === 'All guests' & l.discount > 0){
                    for(var i=0;i<allGuest.length;i++){
                        guestList.push(allGuest[i].id);
                    }
                    var dict={'list': guestList,'discount': l.discount };
                    if (guestList.length > 0) list.push(dict);
                }else if(l.type === 'Recently visited' & l.discount > 0){
                    for(var i=0;i< RecentlyVisited.length;i++){
                        guestList.push(RecentlyVisited[i].id);
                    }
                    var dict={'list': guestList,'discount': l.discount };
                    if (guestList.length > 0) list.push(dict);
                }else if(l.type === 'Most frequently visited' & l.discount > 0){
                    for(var i=0;i< mostFrequentlyVisited.length;i++){
                        guestList.push(mostFrequentlyVisited[i].id);
                    }
                    var dict={'list': guestList,'discount': l.discount };
                    if (guestList.length > 0) list.push(dict);
                }else if(l.type === 'Best rating giver' & l.discount > 0){
                    for(var i=0;i< bestRatingGiver.length;i++){
                        guestList.push(bestRatingGiver[i].id);
                    }
                    var dict={'list': guestList,'discount': l.discount };
                    if (guestList.length > 0) list.push(dict);
                }
                
            }
        }
        
        const body={
            expiryDate: expiryDate,
            property_id: property,
            offerType: type,
            msg: msg,
            discountList: list,
        };
       
          try{
            let response = await axios_api.post('hosting/insertGiftcard/', body,{
                headers: {
                    "Content-Type": "application/json",
                    'Authorization' : `Bearer ${props.token}`
                }
            });

            console.log(response.data);

            if(response.status === 200){
                
                navigate('/showGiftcard');
            }
            else{
              let err = new Error(response.status + ": " + response.statusText);
              throw err;
            }
        }
        catch(err){
            alert(err.message);
        }
    }
    function handleDiscount  (type,value){
        console.log(discount);
        
        var t=[...discount];
        if (type === 'same'){
            t[0].discount=value;
        }else if(type === 'All guests'){
            t[1].discount=value;
        }else if(type === 'Recently visited'){
            t[2].discount=value;
        }else if(type === 'Most frequently visited'){
            t[3].discount=value;
        }else{
            t[4].discount=value;
        }

        setDiscount(t);
        }
    
    function showAllGuestList(props){
        if(allGuest.length > 0){
        return(
            <Grid item xs={4}>
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
                    key={g.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>               
                   
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.name}</TableCell>
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.lastVisited}</TableCell>
                
                    <TableCell><Tooltip title="Delete">
                        <IconButton value={g.id} onClick={(event)=>{deleteFromAllGuest(g)}} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip></TableCell>
                </TableRow>
            ))}
        </TableBody>
                </Table>
            </TableContainer>
            </Grid>
        )
            }
    }

    function showMostFrequentlyVisitedList(props){
        if(mostFrequentlyVisited.length > 0){
        return(
           <Grid item xs={4}>
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
                    key={g.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>               
                   
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.name}</TableCell>
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.totalVisited}</TableCell>
                
                    <TableCell><Tooltip title="Delete">
                        <IconButton value={g.id} onClick={(event)=>{deleteFromMostFrequentGuest(g)}} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip></TableCell>
                </TableRow>
            ))}
        </TableBody>
                </Table>
            </TableContainer>
           </Grid>
        )
            }
    }
    function showRecentlyVisitedList(props){
        if(RecentlyVisited.length > 0){
        return(
            <Grid item xs={4}>
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
                     key={g.id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>               
                    
                     <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.name}</TableCell>
                     <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.lastVisited}</TableCell>
                 
                     <TableCell><Tooltip title="Delete">
                         <IconButton value={g.id} onClick={(event)=>{deleteFromRecentGuest(g)}} >
                             <DeleteIcon />
                         </IconButton>
                     </Tooltip></TableCell>
                 </TableRow>
             ))}
         </TableBody>
                 </Table>
             </TableContainer>
            </Grid>
         )
             }
    }
    function showRatingGiverList(props){
       if(bestRatingGiver.length >0){
        return(
            <Grid item xs={4}>
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
                     key={g.id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>               
                    
                     <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.name}</TableCell>
                     <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{g.rating}</TableCell>
                 
                     <TableCell><Tooltip title="Delete">
                         <IconButton value={g.id} onClick={(event)=>{deleteFromRatingGuest(g)}} >
                             <DeleteIcon />
                         </IconButton>
                     </Tooltip></TableCell>
                 </TableRow>
             ))}
         </TableBody>
                 </Table>
             </TableContainer>
            </Grid>
         )
       }
       
    }
function showGuestList(props){
    return(
        <div>
            {showAllGuestList(props)}
            {showRatingGiverList(props)}
            {showMostFrequentlyVisitedList(props)}
            {showRecentlyVisitedList(props)}
        </div>
    )
}
    function showGiftCardpage(props){
        return(
           <Paper sx={{width:"80%",ml:'auto',mr:'auto',mt:3,padding:3}} elevation={10}>
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
                                        defaultValue={property}
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
                                <TextField id="outlined-textarea" defaultValue={msg} multiline row={7} onChange={customMsg} variant="outlined" />
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
                                <RadioGroup name="use-radio-group" defaultValue={type}>
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
                                    <FormControlLabel control={<Checkbox onChange={(event)=>{handleChangeGuest(event.target.name,0)}} checked={checked[0]} name="All guests" />} label="All Guests" />
                                    <FormControlLabel control={<Checkbox onChange={(event)=>{handleChangeGuest(event.target.name,1)}} checked={checked[1]} name="Recently visited" />} label="Recently visited" />
                                    <FormControlLabel control={<Checkbox onChange={(event)=>{handleChangeGuest(event.target.name,2)}} checked={checked[2]} name="Most frequently visted" />} label="Most Frequently Visited" />
                                    <FormControlLabel control={<Checkbox onChange={(event)=>{handleChangeGuest(event.target.name,3)}} checked={checked[3]} name="Best rating giver" />} label="Best Rating Giver" />

                                </FormControl>



                            </Grid>
                            <Grid item xs={6}>
                                <Button variant='outlined' color='inherit' onClick={Change} sx={{ mt: 25, ml: -5 }}>Next</Button>
                            </Grid>

                        </Grid>
           </Paper>
            
        )
    }
    function showGiftCard(props) {
        return (
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { width: '40ch' },
            }}
            display='flex'
            noValidate
            mt={0}
            ml={0}
            //p={2}
            autoComplete="off"
        >
                <Grid container spacing={3} columns={12} >

                    <Grid item xs={4} >
                        <Card sx={{ width: "100%",height: "100%", background: 'linear-gradient(to right bottom, pink,#C4036C)' }}>
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
                        {showGiftCardpage(props)}
                    </Grid>
                </Grid>


            </Box>
        )
    }

    
    function sameDiscount(props){
        return(
            <Box>
                 <Typography sx={{ marginTop: "30px", marginLeft: "20px", marginBottom: "20px", fontFamily: "Lucida Handwriting" }} variant="h6" component="h6">
                                    Enter&nbsp;Discount&nbsp;
                </Typography>
                <TextField
                label="Discount"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                onChange={(event)=>{handleDiscount('same',event.target.value)}}
              />
                
            </Box>
        )
    }

    function differentDiscount(props){
          
            return(
                <Box>
                    <Grid container >
                    {guest.map((g)=>(
                        <Grid item xs={4}>
                             <Typography sx={{ marginTop: "30px", marginLeft: "1px", marginBottom: "20px", fontFamily: "Lucida Handwriting" }} variant="h6" component="h6">
                                    {g}
                </Typography>
                <FormControl  sx={{ m: 1 ,maxWidth: '18ch'}}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onChange={(event)=>{handleDiscount(g,event.target.value)}}
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
            label="Amount"
          />
        </FormControl>
                {/* <TextField
                label="Discount"
                defaultValue={d}
                id="outlined-start-adornment"
                sx={{ m: 1, maxWidth: '10ch' }}
                InputProps={{
                  startAdornment: <InputAdornment  position="start">%</InputAdornment>,
                }}
                onChange={(event)=>{handleDiscount(g,event.target.value)}}
              /> */}
                        </Grid>
                    ))}
                    </Grid>
                </Box>
            )
         
    }
    function inputDiscount(props){
            if(discountType === 'same'){
                return <div>{sameDiscount(props)}</div>
            }else if(discountType === 'different'){
                return <div>{differentDiscount(props)}</div>
            }
    }
    function selectDiscount(props) {
        return (
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { width: '40ch' },
                }}
                display='flex'
                noValidate
                mt={0}
                ml={0}
                //p={2}
                autoComplete="off"
            >
                <Grid container spacing={3} columns={12} >

                    <Grid item xs={4} >
                        <Card sx={{ width: "100%", minHeight: "87vh",height:'100%', background: 'linear-gradient(to right bottom, pink,#C4036C)' }}>
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
                    <Paper elevation={10} sx={{width:"80%",ml:'auto',mr:'auto',mt:3,padding:3}}>
                        <Grid container columns={12}>
                        <Grid item xs={12}>
                        <Button variant='outlined' color='inherit' onClick={Change} >Back</Button>
                        <Typography sx={{ marginTop: "30px", marginLeft: "20px", marginBottom: "20px", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
                                    Select&nbsp;Discount&nbsp;Type
                                </Typography>
                                <RadioGroup name="use-radio-group" defaultValue={discountType}>
                                    <MyFormControlLabel1  color='inherit' value='same' label="Same for all guests" control={<Radio sx={{fontFamily:'Lucida Handwriting'}} />} />
                                    <MyFormControlLabel1 sx={{fontFamily:'Lucida Handwriting'}} color='inherit' value="different" label="Different for selected guests" control={<Radio />} />
                                </RadioGroup>
                                <Box>{inputDiscount(props)}</Box>
                                <Button variant='outlined' color='inherit' sx={{ml:"40%",mt:3}} onClick={handleSubmit} >Confirm</Button>

                        </Grid>
                        
                        </Grid>
                        <Grid container columns={12}>
                            <Grid item xs={12}>
                                {showGuestList(props)}
                            </Grid>
                        </Grid>
                        </Paper>
                    </Grid>                  
                </Grid>
            </Box>
        )
    }
    function show(props) {
        if (next === 0) {
            return <div> {showGiftCard(props)}</div>
        } else {
            return <div>{selectDiscount(props)}</div>
        }
    }
    return (
        <div>
            <ManagementDashboard />
            {show(props)}

        </div>
    )
}