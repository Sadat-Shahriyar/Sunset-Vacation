import * as React from 'react';
import Rating from '@mui/material/Rating';
import { Button, Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
export default function ViewProperty(props) {
    let navigate=useNavigate();
    const goToDetailsPage = (id) => {
        props.setSelectedPropertyForDetails(id);
        navigate('/booking/property/details');
    }
    return (
        <Card onClick={() => { goToDetailsPage(props.property.propertyID) }} sx={{ minWidth: 300, maxHeight: 500, m: 3 }}>
            <CardMedia
                component="img"
                height="250"
                image={props.property.images[0].photo_url}
                alt={props.property.title}
            />
            <CardContent>
                <Typography gutterBottom sx={{ fontFamily: 'Lucida Handwriting' }} variant="h6" component="div">
                    {props.property.title}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Lucida Handwriting' }} color="text.inherit">
                    $ {props.property.perNightCost} per night
                </Typography>
                <Typography variant="body2" >
                    <Rating name="half-rating-read" defaultValue={props.property.rating} precision={0.5} readOnly />
                </Typography>
            </CardContent>
        </Card>
    )
}