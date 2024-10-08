import React,{Component} from "react";
import './mainsection.css';
import '../../App.css';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function MainSection(props){
        let navigate=useNavigate();
        function mouseOver(event) {
          event.target.style.color = "black";
      }
  
      function mouseOut(event) {
          event.target.style.color ='white' ;
      }
        return(
            <div className="main-container">         
          <h1>SUNSET VACATIONS</h1>
           <p>Not sure where to go? Perfect</p>
           <div className="main-btns">
           <Button variant="outlined" color='inherit' onMouseOver={mouseOver} onMouseOut={mouseOut} sx={{fontSize: "20px"}} onClick={()=>{navigate('/search')}}>I'm flexible</Button>
               {/* <button className="btns" onClick={()=>{console.log("button")}}>I'm flexible</button> */}
           </div>
           <div className="main-btns">
           <Button variant="outlined" color='inherit' onMouseOver={mouseOver} onMouseOut={mouseOut} sx={{fontSize: "18px",mt:2}} onClick={()=>{navigate('/forumHome')}}>Create a Forum</Button>

           </div>
             </div>
        );
    
}