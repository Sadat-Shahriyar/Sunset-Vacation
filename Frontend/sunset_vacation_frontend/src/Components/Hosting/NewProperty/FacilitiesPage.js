import { Button, Typography } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftSideCard from './LeftSideCard';
import { axios_api } from '../../../App';
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function ViewRender(props){
    console.log(props.selectedAmenityList);
    console.log(props.selectedGuestsFavouriteItemList);
    console.log(props.selectedSafetyItemList);

    let amenities = props.amenities.map((amenity) => {
        let bg = "white";
        let idx = props.selectedAmenityList.indexOf(amenity[0]);
        if(idx > -1){
          bg="yellow"
        }
        return(
          <Grid item xs={4}>
            <Paper elevation={3} style={{marginLeft:1, background: bg}}>
              <Box
                display="flex" 
                width={200} height={80} 
                ml={2}
                mt={2}
              >
                  <Box m="auto">
                    {/* <Typography variant='body1'>{amenity[0]}</Typography> */}
                    <Button variant='text' sx={{color: 'black'}} onClick={() => {props.setSelectedAmenityList(amenity[0])}}>{amenity[0]}</Button>
                  </Box>
              </Box>
            </Paper>
          </Grid>
        );
    });

    let guestsFavourite = props.guestsFavourite.map((fav) => {
        let bg = "white";
        let idx = props.selectedGuestsFavouriteItemList.indexOf(fav[0]);
        if(idx > -1){
          bg="yellow"
        }
      return(
        <Grid item xs={4}>
          <Paper elevation={3} style={{marginLeft:1, background: bg}}>
            <Box
              display="flex" 
              width={200} height={80} 
              ml={2}
              mt={2}
            >
                <Box m="auto">
                  {/* <Typography variant='body1'>{fav[0]}</Typography> */}
                  <Button variant='text' sx={{color: 'black'}} onClick={() => {props.setSelectedGuestsFavouriteItemList(fav[0])}}>{fav[0]}</Button>
                </Box>
            </Box>
          </Paper>
        </Grid>
      );
    });

    let safetyItems = props.safetyItems.map((sItem) => {
        let bg = "white";
        let idx = props.selectedSafetyItemList.indexOf(sItem[0]);
        if(idx > -1){
          bg="yellow"
        }
        
      return(
        <Grid item xs={4}>
          <Paper elevation={3} style={{marginLeft:1, background: bg}}>
            <Box
              display="flex" 
              width={200} height={80} 
              ml={2}
              mt={2}
            >
                <Box m="auto">
                  {/* <Typography variant='body1'>{sItem[0]}</Typography> */}
                  <Button 
                  variant='text' 
                  sx={{color: 'black'}} 
                  onClick={() => {console.log(sItem[0]);props.setSelectedSafetyItemList(sItem[0])}}
                  >
                    {sItem[0]}
                  </Button>
                </Box>
            </Box>
          </Paper>
          
        </Grid>
      );
    });

    return(
      <Paper elevation={0} style={{maxHeight: 520, overflow: 'auto'}}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h5' marginTop={5}>Amenities: </Typography>
          </Grid>

          {amenities}

          <Grid item xs={12}>
            <Typography variant='h5' marginTop={5}>Guests favourite: </Typography>
          </Grid>

          {guestsFavourite}

          <Grid item xs={12}>
            <Typography variant='h5' marginTop={5}>Safety items: </Typography>
          </Grid>

          {safetyItems}
        </Grid>
      </Paper>
    );
}


export default function FacilitiesPage(props){

    let navigate = useNavigate();

    const [amenities, setAmenities] = React.useState([]);
    const [guestsFavourites, setGuestsFavourites] = React.useState([]);
    const [safetyItems, setSafetyItems] = React.useState([]);
    
    React.useEffect(() => {

      const fetchFacilityList = async() => {
        try{
          let response = await axios_api.get("hosting/getfacilities/", 
          {
              headers: {
                  'Authorization' : `Bearer ${props.token}`
              }
          });

          console.log(response);
          if(response.data.success){
            setAmenities(response.data.amenities);
            setGuestsFavourites(response.data.guestsFavourite);
            setSafetyItems(response.data.safetyItems);
          }
          else{
            alert(response.data.error);
          }
        }
        catch(err){
          alert(err);
        }
          
      }

      fetchFacilityList();
    }, [props.token])

    const handleCancel = () => {
      navigate('/hosting');
    }

    let getButton = () => {
      if(props.selectedAmenityList.length === 0 && props.selectedGuestsFavouriteItemList.length === 0 && props.selectedSafetyItemList.length === 0) {
        return <Button disabled variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button> 
      }
      else return <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button>
    }

    let button = getButton()
    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6} >
              <Item><LeftSideCard text = {"Do you offer any of these facilities?"}/></Item>
            </Grid>
            <Grid item xs={6} direction='column'>
              <Item sx={{height:"5%", ml:1, mt:0.5}}>
                <Paper elevation={0}>
                  <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={() => {handleCancel()}}>Cancel</Button>
                </Paper>
              </Item>
              <Item sx={{ height:'80%', mt: 1, ml:1}}>
                <ViewRender 
                  amenities = {amenities}
                  guestsFavourite = {guestsFavourites}
                  safetyItems = {safetyItems}
                  selectedAmenityList = {props.selectedAmenityList}
                  selectedGuestsFavouriteItemList = {props.selectedGuestsFavouriteItemList}
                  selectedSafetyItemList = {props.selectedSafetyItemList}
                  setSelectedAmenityList = {(val) => {props.setSelectedAmenityList(val)}}
                  setSelectedGuestsFavouriteItemList = {(val) => {props.setSelectedGuestsFavouriteItemList(val)}}
                  setSelectedSafetyItemList = {(val) => {props.setSelectedSafetyItemList(val)}}
                />
              </Item>
              <Item sx={{height:'5%', ml:1, mt: 1}}>
                <Paper elevation={0}>
                  {button}
                </Paper>
              </Item>
            </Grid>
          </Grid>
        </Box>
      );
}