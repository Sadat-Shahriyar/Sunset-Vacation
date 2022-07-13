import { Button, IconButton, Typography } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftSideCard from './LeftSideCard';
import { axios_api } from '../../../App';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function ViewRender(props){
  return(
    <Grid container>
      <Grid item xs={6}>
        <Box
            display="flex" 
            width={200} height={80} 
            bgcolor="white"
            ml={20}
            mt={10}
          >
            <Box m="auto">
              <Typography variant='h5'>Guest no:</Typography>
            </Box>
        </Box>
      </Grid>
      
      <Grid item xs={6}>
        <Box
            display="flex" 
            width={200} height={80} 
            bgcolor="white"
            ml={10}
            mt={10}
          >
            <Box m="auto">
              <Grid container>
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="Decrease guest no" sx={{mr:2}} onClick={()=>{props.setGuestNo(props.guestNo-1)}}>
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h5' marginTop={0.5}>{props.guestNo}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="Increase guest no" onClick={()=>{props.setGuestNo(props.guestNo+1)}}>
                    <AddCircleOutlineRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
            display="flex" 
            width={200} height={80} 
            bgcolor="white"
            ml={20}
            mt={5}
          >
            <Box m="auto">
              <Typography variant='h5'>Beds:</Typography>
            </Box>
        </Box>
      </Grid>
      
      <Grid item xs={6}>
        <Box
            display="flex" 
            width={200} height={80} 
            bgcolor="white"
            ml={10}
            mt={5}
          >
            <Box m="auto">
              <Grid container>
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="Decrease bed no" sx={{mr:2}} onClick={() => {props.setBeds(props.bed-1)}}>
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h5' marginTop={0.5}>{props.bed}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="Increase bed no" onClick={() => {props.setBeds(props.bed+1)}}>
                    <AddCircleOutlineRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
            display="flex" 
            width={200} height={80} 
            bgcolor="white"
            ml={20}
            mt={5}
          >
            <Box m="auto">
              <Typography variant='h5'>Bedrooms:</Typography>
            </Box>
        </Box>
      </Grid>
      
      <Grid item xs={6}>
        <Box
            display="flex" 
            width={200} height={80} 
            bgcolor="white"
            ml={10}
            mt={5}
          >
            <Box m="auto">
              <Grid container>
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="Decrease bedrooms" sx={{mr:2}} onClick={() => {props.setBedrooms(props.bedrooms-1)}}>
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h5' marginTop={0.5}>{props.bedrooms}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="increase bedrooms" onClick={() => {props.setBedrooms(props.bedrooms+1)}}>
                    <AddCircleOutlineRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
        </Box>
      </Grid>


      <Grid item xs={6}>
        <Box
            display="flex" 
            width={200} height={80} 
            bgcolor="white"
            ml={20}
            mt={5}
          >
            <Box m="auto">
              <Typography variant='h5'>Bathrooms:</Typography>
            </Box>
        </Box>
      </Grid>
      
      <Grid item xs={6}>
        <Box
            display="flex" 
            width={200} height={80} 
            bgcolor="white"
            ml={10}
            mt={5}
          >
            <Box m="auto">
              <Grid container>
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="decrease bathrooms" sx={{mr:2}} onClick={() => {props.setBathrooms(props.bathrooms-1)}}>
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h5' marginTop={0.5}>{props.bathrooms}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="increase bathrooms" onClick={() => {props.setBathrooms(props.bathrooms+1)}}>
                    <AddCircleOutlineRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
        </Box>
      </Grid>
    </Grid>
  );
}


export default function GuestNoPage(props){

    let navigate = useNavigate();
    const [categories, setCategories] = React.useState(["An entire place", "A private room", "A shared room"]);

    const handleCancel = () => {
      navigate('/hosting');
    }

    let getButton = () => {
      if(props.guestNo > 0 && props.bed > 0 && props.bedrooms > 0 && props.bathrooms > 0) {
        return <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button> 
      }
      else return <Button disabled variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button>
    }

    let button = getButton()
    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6} >
              <Item><LeftSideCard text = {"How many guests would you like to welcome?"}/></Item>
            </Grid>
            <Grid item xs={6} direction='column'>
              <Item sx={{height:"5%", ml:1, mt:0.5}}>
                <Paper elevation={0}>
                  <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={() => {handleCancel()}}>Cancel</Button>
                </Paper>
              </Item>
              <Item sx={{ height:'80%', mt: 1, ml:1}}>
                <ViewRender 
                  guestNo = {props.guestNo}
                  bed = {props.bed}
                  bedrooms = {props.bedrooms}
                  bathrooms = {props.bathrooms}
                  setGuestNo = {(val) => {props.setGuestNo(val)}}
                  setBeds = {(val) => {props.setBeds(val)}}
                  setBedrooms = {(val) => {props.setBedrooms(val)}}
                  setBathrooms = {(val) => {props.setBathrooms(val)}}
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