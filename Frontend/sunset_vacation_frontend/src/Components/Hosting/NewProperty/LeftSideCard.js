import * as React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function LeftSideCard(props) {
    console.log(props.text.length);
    let marginTopVal = '43%';
    if(props.text.length > 33){
      marginTopVal = '40%';
    }
    return (
      <Card sx={{ width: "100%", height: "98vh",background: 'linear-gradient(to right bottom, #99029e, #eb11f2)' }}>
        <CardContent>
          <Typography sx={{ fontSize: 40, mt:marginTopVal }} color="white" gutterBottom>
            {props.text}
          </Typography>
        </CardContent>
      </Card>
    );
  }
