import { Button, Card, CardActions, CardContent, Link, Typography } from '@mui/material'
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function BookingConfirm(props){

    let navigate = useNavigate();

    const handleRedirect = () => {
      navigate('/');
    }

    React.useEffect(()=>{
      props.setCheckInDate(new Date());
      let today = new Date();
      today.setDate(today.getDate() + 5);
      let tempDate = new Date(today);
      props.setCheckOutDate(tempDate);
      props.setAdults(1);
      props.setChildren(0);
      props.setInfants(0);
    },[props]);

    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={12} >
              <Item>
                <Paper elevation={0} sx={{height: "100vh", width:'100%'}}>
                    <Card variant='outlined' elevation={5} sx={{maxWidth: 700, ml: 60, mt:30}} >
                        <CardContent>
                            <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
                                You booking has been complete!!!
                            </Typography>
                            <Link color='inherit' href={props.receipt}>View receipt</Link>
                        </CardContent>
                        <CardActions>
                            <Button size="large" onClick={() => {handleRedirect()}} sx={{ml:33}}>Go to home page</Button>
                        </CardActions>
                    </Card>
                </Paper>
              </Item>
            </Grid>
          </Grid>
        </Box>
      );
}