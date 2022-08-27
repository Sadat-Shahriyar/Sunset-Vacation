import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Paper,InputBase,IconButton } from '@mui/material';


export default function SearchPost(props){
    const [keyword,setKeyword]=React.useState('search');
    const Search =async (event) =>{
        fetch(`http://localhost:8000/qa/getSearchPost/`+`${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${props.token}`             
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response
                }
                else {
                    let err = new Error(response.status + ": " + response.text);
                    throw err;
                }
            })
            .then((response) => response.json())
            .then((response) => {                
              props.setQuestions(response.all_questions);
     
            })
            .catch((err) => {
                alert(err.message);
            })
    }
  
    return(
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
        >
          
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={keyword}
            onChange={(event)=>{setKeyword(event.target.value)}}
          />
           <IconButton  sx={{ p: '10px',color:'black' }} aria-label="directions">
            <SearchIcon onClick={Search} />
          </IconButton>
          
        
        </Paper>
    )
}