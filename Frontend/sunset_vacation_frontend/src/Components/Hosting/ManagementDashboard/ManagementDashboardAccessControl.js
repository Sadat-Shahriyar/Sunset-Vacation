import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ManagementDashboard from './ManagementDashboard';

export default function ManagementDashboardAccessControl(props){
    let navigate = useNavigate();

    console.log(props.isLoggedin);
    console.log(props.token);
    React.useEffect(() => {
        if (!props.isLoggedin){
             navigate("/login")   
        }
    },[])
   
    return (<ManagementDashboard isLoggedin={props.isLoggedin} />);
    
}