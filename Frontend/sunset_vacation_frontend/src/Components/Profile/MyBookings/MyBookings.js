import { Box } from '@mui/system';
import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { axios_api } from '../../../App';
import BookingList from './BookingList';
import MyBookingsNavbar from './MyBookingNavbar';
import StaticNavBar from '../../Homepage/StaticNavBar';

export default function MyBookings(props){
    let navigate = useNavigate();

    console.log(props.isLoggedin);
    console.log(props.token);

    React.useEffect(()=>{
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
        
        tokenVerifier();
    }, []);

    return(
        <Box sx={{ flexGrow: 1 }}>
             <StaticNavBar
      
      isLoggedin={props.isLoggedin}
      token={props.token}
      />
            <BookingList 
                isLoggedin={props.isLoggedin}
                token={props.token}
            />
        </Box>
    );
}