import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { axios_api } from '../../../App';
import ManagementDashboard from './ManagementDashboard';

export default function ManagementDashboardAccessControl(props){
    let navigate = useNavigate();

    console.log(props.isLoggedin);
    console.log(props.token);
    
    React.useEffect(() => {
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
                    props.setLoginRedirection('/hosting')
                    navigate("/login");
                }
                
            }
            catch(error){
                props.setLoginRedirection('/hosting')
                navigate("/login");
            }
        }
        
        tokenVerifier();

    },[navigate, props])
   
    return (<ManagementDashboard isLoggedin={props.isLoggedin} />);
    
}