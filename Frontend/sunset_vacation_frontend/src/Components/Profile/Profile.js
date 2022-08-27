import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { axios_api } from '../../App';
import ProfileNavbar from './ProfileNavbar';

export default function Profile(props){
    let navigate = useNavigate();

    const [userData, setUserData] = React.useState({});

    console.log(props.isLoggedin);
    console.log(props.token);

    const tokenVerifier = async() => {
        try{
            let response = await axios_api.get("users/verify/", 
            {
                headers: {
                    'Authorization' : `Bearer ${props.token}`
                }
            })


            if(props.isLoggedin && response.data.valid){
                console.log(response)
            }
            else{
                alert("Unauthorized");
                props.setLoginRedirection('/profile')
                navigate("/login");
            }
            
        }
        catch(error){
            props.setLoginRedirection('/profile')
            navigate("/login");
        }
    }

    const fetchUserData = async() => {
        try{
            let response = await axios_api.get("users/getProfileInfo/", 
            {
                headers: {
                    'Authorization' : `Bearer ${props.token}`
                }
            })

            console.log(response.data);

            if(response.status === 200){
                setUserData(response.data);
            }
            else{
                let error = new Error(response.statusText);
                throw error;
            }
        }
        catch(error){
            alert(error.message);
        }
    }

    const fetchUserGiftCardList = async() => {
        try{
            let response = await axios_api.get("users/getGiftCardList/", 
            {
                headers: {
                    'Authorization' : `Bearer ${props.token}`
                }
            })

            console.log(response.data);

        }
        catch(error){
            alert(error.message);
        }
    }


    React.useEffect(()=>{
        tokenVerifier();
        fetchUserData();
        fetchUserGiftCardList();
    }, []);

    return(
        <Box sx={{ flexGrow: 1 }}>
            <ProfileNavbar 
                isLoggedin={props.isLoggedin}
            />
            <Grid container sx={{mt:10, ml:17, maxWidth:1300, mb:30}}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={4}>
                                    <img src={userData.photo} style={{maxWidth: 350, minWidth:350}}/>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='h6' sx={{fontFamily:"Lucida Handwriting", fontSize:50}}>
                                        {userData.name}
                                    </Typography>
                                    <Typography variant='body1'>
                                        Email: {userData.email}
                                    </Typography>
                                    <Typography variant='body1'>
                                        Phone: {userData.phone_no}
                                    </Typography>
                                    <Typography variant='body1'>
                                        City: {userData.city}
                                    </Typography>
                                    <Typography variant='body1'>
                                        Country: {userData.country}
                                    </Typography>
                                    <Typography variant='body1'>
                                        Address: {userData.address}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}