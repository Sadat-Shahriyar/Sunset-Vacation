import { Button } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftSideCard from './LeftSideCard';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function CategoryPage(props){

    // return(
    //     <div>
    //         <h1>Category</h1>
    //         <Button onClick={()=>{props.setPageNo(props.pageNo + 1)}}>next</Button>
    //     </div>
    // )

    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} >
              <Item><LeftSideCard text = {"What kind of place will you host?"}/></Item>
            </Grid>
            <Grid item xs={6}>
              <Item>xs=4</Item>
            </Grid>
          </Grid>
        </Box>
      );
}