import { Button } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftSideCard from './LeftSideCard';
import { useNavigate } from 'react-router-dom';
import MapComponent from './Map';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function LocationPage(props){
    let navigate = useNavigate();
    const handleCancel = () => {
      navigate('/hosting');
    }

    let getButton = () => {
      if(props.locationHasBeenSet === false) {
        return <Button disabled variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button> 
      }
      else return <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button>
    }

    let button = getButton()
    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6} >
              <Item><LeftSideCard text = {"Where is the location of your property?"}/></Item>
            </Grid>
            <Grid item xs={6} direction='column'>
              <Item sx={{height:"5%", ml:1, mt:0.5}}>
                <Paper elevation={0}>
                  <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={() => {handleCancel()}}>Cancel</Button>
                </Paper>
              </Item>
              <Item sx={{ height:'80%', mt: 1, ml:1}}>
                <Paper elevation={0} >
                  <Paper elevation={0} style={{marginLeft: "15%", marginTop: "5%"}}>
                    <MapComponent
                      latitude = {props.latitude}
                      longitude = {props.longitude}
                      address = {props.address}
                      setLatitude = {(val) => {props.setLatitude(val)}}
                      setLongitude = {(val) => {props.setLongitude(val)}}
                      setAddress = {(val) => {props.setAddress(val)}}
                      setLocationHasBeenSet = {(val) => {props.setLocationHasBeenSet(val)}}
                      locationHasBeenSet = {props.locationHasBeenSet}
                    />
                  </Paper>
                </Paper>
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
