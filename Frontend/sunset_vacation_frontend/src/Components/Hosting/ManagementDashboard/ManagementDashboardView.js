import { Grid } from '@mui/material';
import * as React from 'react'
import ManagementDashboard from './ManagementDashboard';
import Content from './ManagementDashboardContent';

export default function ManagementDashboardView(props){
    return(
        <div>
            <ManagementDashboard />
            <Grid container sx={{mt:8, ml:20, maxWidth:1300, mb:20}}>
                <Grid item xs={12}>
                    <Content token={props.token}/>
                </Grid>
            </Grid>
        </div>
    );
}