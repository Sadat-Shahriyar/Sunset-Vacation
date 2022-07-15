import { Button, TextField,IconButton, Typography } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftSideCard from './LeftSideCard';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
    <div>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
              inputProps: {min: 0 }
            }}
            variant="outlined"
            sx={{
              mt:15
            }}
            type='number'
            defaultValue={props.price}
            onChange={(event) => {props.setPrice(event.target.value)}}
          />

          {/* <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel> */}
          {/* <Input
            id="standard-adornment-amount"
            defaultValue={0}
            onChange={() => {}}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            type='number'
          /> */}
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5'>Per night cost</Typography>
        </Grid>


        <Grid item xs={6}>
        <Box
            display="flex" 
            width={300} height={80} 
            bgcolor="white"
            ml={20}
            mt={20}
          >
            <Box m="auto">
              <Typography variant='h6'>Maximum number of days before arrival to cancel reservation: </Typography>
            </Box>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
            display="flex" 
            width={200} height={80} 
            bgcolor="white"
            ml={10}
            mt={20}
          >
            <Box m="auto">
              <Grid container>
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="Decrease guest no" sx={{mr:2}} onClick={()=>{
                    if(props.maxRefund > 0){
                      props.setMaxRefund(props.maxRefund-1)
                    }
                  }}>
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h5' marginTop={0.5}>{props.maxRefund}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="Increase guest no" onClick={()=>{props.setMaxRefund(props.maxRefund+1)}}>
                    <AddCircleOutlineRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
        </Box>
      </Grid>

      </Grid>
    </div>
  );
}


export default function PricePage(props){

    let navigate = useNavigate();
    
    const handleCancel = () => {
      navigate('/hosting');
    }

    let getButton = () => {
      if(props.price <= 0) {
        return <Button disabled variant='outlined' color='secondary' sx={{ml: '70%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button> 
      }
      else return <Button variant='outlined' color='secondary' sx={{ml: '70%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button>
    }

    let button = getButton()
    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6} >
              <Item><LeftSideCard text = {"The fun part - Set you price"}/></Item>
            </Grid>
            <Grid item xs={6} direction='column'>
              <Item sx={{height:"5%", ml:1, mt:0.5}}>
                <Paper elevation={0}>
                  <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={() => {handleCancel()}}>Cancel</Button>
                </Paper>
              </Item>
              <Item sx={{ height:'80%', mt: 1, ml:1}}>
                <ViewRender
                  price = {props.price}
                  setPrice = {(val) => {props.setPrice(val)}}
                  maxRefund = {props.maxRefund}
                  setMaxRefund = {(val) => {props.setMaxRefund(val)}}
                />
              </Item>
              <Item sx={{height:'5%', ml:1, mt: 1}}>
                <Paper elevation={0}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Button variant='outlined' color='secondary' sx={{mr:"50%"}} onClick={()=>{props.setPageNo(props.pageNo - 1)}}>Back</Button>
                    </Grid>
                    <Grid item xs={6}>
                      {button}
                    </Grid>
                  </Grid>
                </Paper>
              </Item>
            </Grid>
          </Grid>
        </Box>
      );
}