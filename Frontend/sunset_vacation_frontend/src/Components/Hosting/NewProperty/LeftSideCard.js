import * as React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function LeftSideCard(props) {
    return (
      <Card sx={{ width: "100%", height: "98vh",background: 'linear-gradient(to right bottom, #99029e, #eb11f2)' }}>
        <CardContent>
          <Typography sx={{ fontSize: 40, mt:'45%' }} color="white" gutterBottom>
            {props.text}
          </Typography>
        </CardContent>
      </Card>
    );
  }
