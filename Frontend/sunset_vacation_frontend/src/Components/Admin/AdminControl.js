import * as React from 'react'
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

export default function AdminControl(props){
    const [loggedIn, setLoggedIn] = React.useState(false);

    if(loggedIn === false){
        return(
            <AdminLogin 
                setLoggedIn={(val)=>{setLoggedIn(val)}}
                setGlobalLoggedIn = {(val) => {props.setLoggedIn(val)}}
                setToken = {(val) => {props.setToken(val)}}
            />
        );
    }

    else{
        return(
            <AdminDashboard setSelectedPropertyForDetails={(val)=>{props.setSelectedPropertyForDetails(val)}} setProperty={(p)=>{props.setProperty(p)}}/>
        );
    }
}