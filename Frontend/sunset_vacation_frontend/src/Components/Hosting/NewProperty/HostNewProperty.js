import * as React from 'react'
import { useNavigate } from 'react-router-dom';

export default function HostNewProperty(props){
    let navigate = useNavigate();
    React.useEffect(() => {
        if (!props.isLoggedin){
             navigate("/login")   
        }
    },[])
    
    return (
        <h1> New property </h1>
    );
}