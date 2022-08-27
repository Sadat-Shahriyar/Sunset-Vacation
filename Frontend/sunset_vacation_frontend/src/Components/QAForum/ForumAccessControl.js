import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { axios_api } from '../../App';
import ForumHome from './ForumHome';

export default function ForumAccessControl(props){
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
                    props.setLoginRedirection('/forumHome')
                    navigate("/login");
                }
                
            }
            catch(error){
                props.setLoginRedirection('/forumHome')
                navigate("/login");
            }
        }
        
        tokenVerifier();

    },[navigate, props])
   
    return(
        <div><ForumHome/></div>
    )
    
}