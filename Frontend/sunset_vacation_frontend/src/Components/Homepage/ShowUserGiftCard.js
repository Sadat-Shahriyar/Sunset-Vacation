import * as React from 'react';
import StaticNavBar from './StaticNavBar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ShowUserGiftCard(props){
    let navigate=useNavigate();
    const [giftcards,setGiftcards]=React.useState([]);
    React.useEffect(() => {        
        
       if(props.isLoggedin === true & props.token != null){
        
        fetch(`http://localhost:8000/message/getGiftcards/`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Authorization' : `Bearer ${props.token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response
                }
                else {
                    let err = new Error(response.status + ": " + response.text);
                    throw err;
                }
            })
            .then((response) => response.json())
            .then((response) => {
                setGiftcards(response.giftcards)
                console.log(response.giftcards)
            })
            .catch((err) => {
                alert(err.message);
            })
       }
        

    }, [])

    function showCard(card){
        const goToDetailsPage = (id) => {
            props.setSelectedPropertyForDetails(id);
            navigate('/booking/property/details');
        }
        return(
            <Card onClick={() => { goToDetailsPage(card.propertyID) }} sx={{ maxWidth: 300 ,boxShadow:2}}>          
            <CardMedia
              component="img"
              height="200"
              image={card.images[0].photo_url}
              alt="image"
            />
            <CardContent>
            <Typography sx={{m:1,ml:"10%",fontFamily:'Lucida Handwriting',fontSize:20}}>
                {card.discount} % discount !!!!
              </Typography> 
              <Divider/>
              <Typography sx={{m:1,fontFamily:'Lucida Handwriting',fontSize:13,textDecoration:'bold'}} >
               card ID # {card.id}
              </Typography>

              <Typography sx={{m:1,fontFamily:'Lucida Handwriting',fontSize:13}} >
                {card.customMsg}
              </Typography>
            
              <Typography sx={{m:1,fontFamily:'Lucida Handwriting',fontSize:13}} >
               type&nbsp;&nbsp;:&nbsp;&nbsp; {card.type}
              </Typography>
             
              <Typography sx={{m:1,fontFamily:'Lucida Handwriting',fontSize:13}} >
              Valid till &nbsp;&nbsp;:&nbsp;&nbsp;  {card.expiryDate}
              </Typography>
            </CardContent>         
             
          </Card>
        )
    }
    function showAllCards(props){
        return(
            <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width :"80%",
              '& > :not(style)': {
                m: 1,
                // width: 128,
                // height: 128,
                ml:"10%",
                mt:4
              },
            }}
          >
           <Grid container>
           {giftcards.map((card)=>(                  
                    <Grid item xs={4}>
                    {showCard(card)}
                    </Grid>                 
                    
                ))}
           </Grid>
           
          </Box>
        )
    }
    return(
        <div>
            <StaticNavBar
      
      isLoggedin={props.isLoggedin}
      token={props.token}
      />
      {showAllCards(props)}
     
        </div>
    )
}