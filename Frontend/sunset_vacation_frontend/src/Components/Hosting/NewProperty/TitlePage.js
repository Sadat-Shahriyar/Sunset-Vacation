import { Button, TextField, Typography } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftSideCard from './LeftSideCard';
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function ViewRender(props){
  let lengthField = `${props.title.length}/100`;
  return(
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h5' sx={{ml:10, mt:22}}>Create your title: </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={4}
          placeholder='Lovely 1 bedroom rental unit with pool'
          inputProps={{maxLength: 100,style: {fontSize: 28}}}
          onChange={(event) => {props.setTitle(event.target.value)}}
          sx={{
            ml:10,
            mt:1,
            width: '75%',
          }}
          value={props.title}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1' sx={{ml:11, mt:1}}>{lengthField}</Typography>
      </Grid>
    </Grid>
  );
}

export default function TitlePage(props){

    let navigate = useNavigate();

    const handleCancel = () => {
      navigate('/hosting');
    }

    let getButton = () => {
      if(props.title === "") {
        return <Button disabled variant='outlined' color='secondary' sx={{ml: '70%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button> 
      }
      else return <Button variant='outlined' color='secondary' sx={{ml: '70%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button>
    }

    let button = getButton()
    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6} >
              <Item><LeftSideCard text = {"Give a nice title for your place"}/></Item>
            </Grid>
            <Grid item xs={6} direction='column'>
              <Item sx={{height:"5%", ml:1, mt:0.5}}>
                <Paper elevation={0}>
                  <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={() => {handleCancel()}}>Cancel</Button>
                </Paper>
              </Item>
              <Item sx={{ height:'80%', mt: 1, ml:1,textAlign: 'start'}}>
                <ViewRender 
                  title = {props.title}
                  setTitle = {(val) => {props.setTitle(val)}}
                />
              </Item>
              <Item sx={{height:'5%', ml:1, mt: 1}}>
                <Paper elevation={0}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Button variant='outlined' color='secondary' sx={{mr:"50%"}} onClick={() => {props.setPageNo(props.pageNo - 1)}}>Back</Button>
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