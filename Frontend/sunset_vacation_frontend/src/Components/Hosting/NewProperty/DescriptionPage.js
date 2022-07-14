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

  let dosTextFields = props.dosArrayIdx.map((val) => {
      const updateDos = (idx, val) => {
      let tempDos = [...props.dos]
      tempDos[idx] = val;
      props.setDos(tempDos);
      console.log(props.dos);
    }  

    const deleteDos = (val) => {
        let tmpArr = [...props.dosArrayIdx];
        tmpArr.splice(val,1);
        for(let i=val; i<tmpArr.length; i++){
          tmpArr[i] = tmpArr[i]-1;
        }

        props.setDosArrayIdx(tmpArr);
        let tempDos = [...props.dos];
        tempDos.splice(val,1);
        props.setDos(tempDos);
        console.log(props.dos);
        console.log(props.dosArrayIdx);
    }
    const addButton = () => {
      if(val === props.dosArrayIdx.length - 1){
        if(props.dos[val] === ""){
          return (<Button disabled onClick={() => {props.setDosArrayIdx([...props.dosArrayIdx, props.dosArrayIdx.length])}}>Add</Button>);
        }
        else if(typeof(props.dos[val]) === "undefined"){
          return (<Button disabled onClick={() => {props.setDosArrayIdx([...props.dosArrayIdx, props.dosArrayIdx.length])}}>Add</Button>);
        }
        else{
          return (<Button onClick={() => {props.setDosArrayIdx([...props.dosArrayIdx, props.dosArrayIdx.length])}}>Add</Button>);
        }
      }
      else return (<div></div>);
    }

    const deleteButton = () => {
      if(val === props.dosArrayIdx.length - 1 && val > 0){
        return (<Button onClick={() => {deleteDos(val)}}>Delete</Button>);
      }
      else return (<div></div>);
    }
    const add = addButton()
    const del = deleteButton()
    return(
      <div>
        <TextField onChange={(event) => {updateDos(val,event.target.value );}} inputProps={{maxLength: 100,}} sx={{ width: "80%"}}/>
        {add}
        {del}
      </div>
    );
  });




  let dontsTextFields = props.dontsArrayIdx.map((val) => {
    const updateDonts = (idx, val) => {
    let tempDonts = [...props.donts]
    tempDonts[idx] = val;
    props.setDonts(tempDonts);
    console.log(props.donts);
  }  

  const deleteDonts = (val) => {
      let tmpArr = [...props.dontsArrayIdx];
      tmpArr.splice(val,1);
      for(let i=val; i<tmpArr.length; i++){
        tmpArr[i] = tmpArr[i]-1;
      }

      props.setDontsArrayIdx(tmpArr);
      let tempDonts = [...props.donts];
      tempDonts.splice(val,1);
      props.setDonts(tempDonts);
      console.log(props.donts);
      console.log(props.dontsArrayIdx);
  }
  const addButton = () => {
    if(val === props.dontsArrayIdx.length - 1){
      if(props.donts[val] === ""){
        return (<Button disabled onClick={() => {props.setDontsArrayIdx([...props.dontsArrayIdx, props.dontsArrayIdx.length])}}>Add</Button>);
      }
      else if(typeof(props.donts[val]) === "undefined"){
        return (<Button disabled onClick={() => {props.setDontsArrayIdx([...props.dontsArrayIdx, props.dosntArrayIdx.length])}}>Add</Button>);
      }
      else{
        return (<Button onClick={() => {props.setDontsArrayIdx([...props.dontsArrayIdx, props.dontsArrayIdx.length])}}>Add</Button>);
      }
    }
    else return (<div></div>);
  }

  const deleteButton = () => {
    if(val === props.dontsArrayIdx.length - 1 && val > 0){
      return (<Button onClick={() => {deleteDonts(val)}}>Delete</Button>);
    }
    else return (<div></div>);
  }
  const add = addButton()
  const del = deleteButton()
  return(
    <div>
      <TextField  onChange={(event) => {updateDonts(val,event.target.value );}} inputProps={{maxLength: 100,}} sx={{ width: "80%"}}/>
      {add}
      {del}
    </div>
  );
});

  return(
    <Paper elevation={0} style={{maxHeight:520, overflow: 'auto'}}>
    <Grid container justifyContent='flex-start'>
      <Grid item xs={12} justifyContent='flex-start' sx={{ml:5}}>
        <Typography variant='h5' sx={{mt:3}}>Write a short description about your place:</Typography>
      </Grid>
      <Grid item xs={12} sx={{ml:3}}>
        <TextField
          multiline
          rows={8}
          onChange={(event) => {props.setDescription(event.target.value)}}
          // variant='filled'
          sx={{
            width: '95%',
            mt:2
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{ml:5}}>
        <Typography variant='h5' sx={{mt:2}}>Mention do's for your place:</Typography>
      </Grid>
      <Grid item xs={12} sx={{ml:3}}>
        {dosTextFields}
      </Grid>

      <Grid item xs={12} sx={{ml:5}}>
        <Typography variant='h5' sx={{mt:2}}>Mention dont's for your place:</Typography>
      </Grid>
      <Grid item xs={12} sx={{ml:3}}>
        {dontsTextFields}
      </Grid>
    </Grid>
    </Paper>
  );
}

export default function DescriptionPage(props){

    let navigate = useNavigate();

    const [dosArrayIdx, setDosArrayIdx] = React.useState([0]);
    const [dontsArrayIdx, setDontsArrayIdx] = React.useState([0]);
    
    const handleCancel = () => {
      navigate('/hosting');
    }

    let getButton = () => {
      if(props.description === "") {
        return <Button disabled variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button> 
      }
      else return <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button>
    }

    let button = getButton()
    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6} >
              <Item><LeftSideCard text = {"What else guests need to know about your place?"}/></Item>
            </Grid>
            <Grid item xs={6} direction='column'>
              <Item sx={{height:"5%", ml:1, mt:0.5}}>
                <Paper elevation={0}>
                  <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={() => {handleCancel()}}>Cancel</Button>
                </Paper>
              </Item>
              <Item sx={{ height:'80%', mt: 1, ml:1, textAlign: 'start'}}>
                <ViewRender 
                  setDescription = {(val) => {props.setDescription(val)}}
                  dosArrayIdx = {dosArrayIdx}
                  setDosArrayIdx = {(val) => {setDosArrayIdx(val)}}
                  dos = {props.dos}
                  setDos = {(val) => {props.setDos(val)}}
                  dontsArrayIdx = {dontsArrayIdx}
                  setDontsArrayIdx = {(val) => {setDontsArrayIdx(val)}}
                  donts = {props.donts}
                  setDonts = {(val) => {props.setDonts(val)}}
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