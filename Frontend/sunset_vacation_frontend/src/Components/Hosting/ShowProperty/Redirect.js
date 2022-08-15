import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Redirect(props){
    
    let navigate=useNavigate();
    React.useEffect(() => {
       let flag=props.flags;
       if (flag === "fac"){
        navigate('/showPropertyDetails/facility');
       }else if(flag === "faq"){
        navigate('/showPropertyDetails/faq');
       }else if(flag === "propertylist"){
        navigate('/showProperties');
       }else if(flag === "search"){
        navigate('/searchResult');
       }else if(flag === "filter"){
        navigate('/search');
       }else if(flag === "giftcard"){
        
        navigate('/showGiftcard');
       }else if(flag === "offer"){
        navigate('/showOffers');
       }else if(flag === 'homepagesearchresult'){
        navigate('/homepagesearchresult');
       }
      },[])
    return(
        <div>
        
        </div>
    )
}