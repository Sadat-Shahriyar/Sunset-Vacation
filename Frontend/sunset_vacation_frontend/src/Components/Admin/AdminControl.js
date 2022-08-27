import * as React from 'react'
import AdminDashboard from './AdminDashboard';
import AdminDashBoardNew from './AdminDashBoardNew';
import AdminLogin from './AdminLogin';

export default function AdminControl(props){
    const [loggedIn, setLoggedIn] = React.useState(false);

    if(props.isLoggedin === null){
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
    else{
        if(props.isLoggedin === false){
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
                <AdminDashBoardNew setSelectedPropertyForDetails={(val)=>{props.setSelectedPropertyForDetails(val)}} setProperty={(p)=>{props.setProperty(p)}}/>
            );
        }
    }
    
}