import React,{Component} from "react";
import './mainsection.css';
import '../../App.css';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function MainSection(props){
        let navigate=useNavigate();
   
        return(
            <div className="main-container">         
          <h1>SUNSET VACATIONS</h1>
           <p>Not sure where to go? Perfect</p>
           <div className="main-btns">
           <Button variant="outlined" color='inherit' sx={{fontSize: "20px"}} onClick={()=>{navigate('/search')}}>I'm flexible</Button>
               {/* <button className="btns" onClick={()=>{console.log("button")}}>I'm flexible</button> */}
           </div>
           <div className="main-btns">
           <Button variant="outlined" color='inherit' sx={{fontSize: "18px"}} onClick={()=>{navigate('/qahome')}}>Ask a question</Button>

           </div>
             </div>
        );
    
}