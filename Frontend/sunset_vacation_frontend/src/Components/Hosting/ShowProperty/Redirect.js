import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ShowFacility from './ShowFacility';
import ShowFaq from './ShowFaq';
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
       }
      },[])
    return(
        <div>
        
        </div>
    )
}