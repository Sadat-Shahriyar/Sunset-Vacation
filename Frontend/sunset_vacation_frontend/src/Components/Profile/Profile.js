import { Box } from '@mui/system';
import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { axios_api } from '../../App';
import ProfileNavbar from './ProfileNavbar';

export default function Profile(props){
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
            <ProfileNavbar 
                isLoggedin={props.isLoggedin}
            />
            <h1>Profile</h1>
        </Box>
    );
}