import * as React from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ViewGiftCard(props){
    React.useEffect(()=>{
        fetch(`http://localhost:8000/message/getGiftCards/`, {
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
                
            })
            .catch((err) => {
                alert(err.message);
            })
    },[])

    function viewGiftcard(card){
        return(
            <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{fontFamily:'Lucida Handwriting',fontSize:20}}
        title="A Giftcard for you"
      />
      <CardMedia
                component="img"
                height="250"
                image={card.property.images[0].photo_url}
                alt={card.property.title}
            />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {card.amount}% discount!!! 
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {card.customMsg} 
        </Typography>
      </CardContent>
      </Card>
        )
    }
   return (
    <div>

    </div>
   )
          
}
