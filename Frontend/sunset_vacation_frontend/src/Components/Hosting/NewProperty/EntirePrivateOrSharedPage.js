import { Button } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftSideCard from './LeftSideCard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function ShowCategoryList(props){

    let listItems = props.categories.map((category) => {
      let bg = 'white';
      if(category === props.entirePrivateOrShared){
        bg = 'yellow';
      }
      return(
        <ListItem disablePadding sx={{mt:1}}>
          <Paper style={{width: "100%", marginLeft: 5, marginRight: 5}}>
            <ListItemButton sx={{ textAlign: 'center', background: bg}} onClick={() => {props.setEntirePrivateOrShared(category)}}>
              <ListItemText primary={category}  />
            </ListItemButton>
          </Paper>
        </ListItem>
      );
    })

    return (
      <Paper elevation={0} style={{maxHeight: 520, overflow: 'auto'}}>
        <List>
          {listItems}
        </List>
      </Paper>
    );
}


export default function EntirePrivateOrSharePage(props){

    let navigate = useNavigate();
    const [categories, setCategories] = React.useState(["An entire place", "A private room", "A shared room"]);

    const handleCancel = () => {
      navigate('/hosting');
    }

    let getButton = () => {
      if(props.entirePrivateOrShared === "") {
        return <Button disabled variant='outlined' color='secondary' sx={{ml: '70%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button> 
      }
      else return <Button variant='outlined' color='secondary' sx={{ml: '70%'}} onClick={()=>{props.setPageNo(props.pageNo + 1)}}>Next</Button>
    }

    let button = getButton()
    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6} >
              <Item><LeftSideCard text = {"Which of these best describe your place?"}/></Item>
            </Grid>
            <Grid item xs={6} direction='column'>
              <Item sx={{height:"5%", ml:1, mt:0.5}}>
                <Paper elevation={0}>
                  <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={() => {handleCancel()}}>Cancel</Button>
                </Paper>
              </Item>
              <Item sx={{ height:'80%', mt: 1, ml:1}}>
                <ShowCategoryList 
                  categories = {categories} 
                  entirePrivateOrShared={props.entirePrivateOrShared}
                  setEntirePrivateOrShared = {(val) => {props.setEntirePrivateOrShared(val)}}
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