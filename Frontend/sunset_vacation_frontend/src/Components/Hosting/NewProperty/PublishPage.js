import { Button, CardMedia } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftSideCard from './LeftSideCard';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function PublishPage(props){

    let navigate = useNavigate();

    const handleCancel = () => {
      navigate('/hosting');
    }

    let getButton = () => {
      return <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={()=>{props.handlePublish()}}>Publish</Button>
    }

    let button = getButton()
    let photoUrl = URL.createObjectURL(props.images[0]);
    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6} >
              <Item><LeftSideCard text = {"Check you property details before publishing"}/></Item>
            </Grid>
            <Grid item xs={6} direction='column'>
              <Item sx={{height:"5%", ml:1, mt:0.5}}>
                <Paper elevation={0}>
                  <Button variant='outlined' color='secondary' sx={{ml: '85%'}} onClick={() => {handleCancel()}}>Cancel</Button>
                </Paper>
              </Item>
              <Item sx={{ height:'80%', mt: 1, ml:1}}>
                <Card sx={{maxWidth: 500, ml: 15, mt: 15}}>
                  <CardMedia 
                    component="img"
                    height="140"
                    image={photoUrl}
                    alt="property image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {props.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {props.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
                      {props.description}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {`${props.catagory} with $${props.price} per night cost`}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {`${props.guestNo}-Guests, ${props.bed}-Beds ${props.bedrooms}-Bedrooms, ${props.bathrooms}-Bathrooms`}
                    </Typography>
                  </CardContent>
                </Card>
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