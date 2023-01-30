import * as React from 'react';
import { Card, CardContent, Grid, List,Box, Button, Typography, Divider } from '@mui/material';
import Sidebar from './Sidebar';
import QAnavbar from './QAnavbar';
import { useNavigate,useParams } from 'react-router-dom';
import { axios_api } from '../../App';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import ThumbDownOffAlt from '@mui/icons-material/ThumbDownOffAlt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import SelectLink from './SelectLink';
import SearchPost from './SearchPost';
import { useNow } from '@mui/x-date-pickers/internals/hooks/useUtils';

const drawerWidth = 340;




export default function ViewAPost(props){
  let params = useParams();
  let navigate=useNavigate();
  const [questions, setQuestions] = React.useState([]);
  const [expanded, setExpanded] = React.useState(true);
  const [reply,setReply]=React.useState({});
  const [display,setDisplay]=React.useState('none');   
  const [selectedProperty,setSelectedProperty]=React.useState([]);
 

    const fetchQuestions = async() => {
      fetch(`http://localhost:8000/qa/getPost/`+`${params.id}`, {
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
          setQuestions(response.all_questions);        
            
        })
        .catch((err) => {
            alert(err.message);
        })
        
    }


   

    React.useEffect(()=>{
      
      fetchQuestions();
    },[]);

    const handleExpandClick = (event) => {
      setExpanded(!expanded);
      
      
    };
  
      function getDate(d){
        let date = new Date(d);
        let today = new Date();
        
        let dateString = ""
        
        
        if(today.getFullYear() - date.getFullYear() > 0){
          dateString = (today.getFullYear() - date.getFullYear()).toString() + " years ago";
        }
        else if(today.getMonth() - date.getMonth() > 0){
          dateString = (today.getMonth() - date.getMonth()).toString() + " months ago";
        }
        else if(today.getDate() - date.getDate() > 0){
          dateString = (today.getDate() - date.getDate()).toString() + " days ago";
        }
        else if(today.getHours() - date.getHours() >0) {
          dateString = (today.getHours() - date.getHours()).toString() + " hours ago";
        }else if(today.getMinutes() - date.getMinutes() > 0){
          dateString = (today.getMinutes() - date.getMinutes()).toString() + " minute ago";
        }else{
          dateString = "just now";
        }
        return dateString;
      }
  
      function deletePropertyFromSelectedList(property){
        var t=[...selectedProperty]
        var index=t.indexOf(property);
        t.splice(index,1);
        setSelectedProperty(t);
}

function ViewALLProperties(selectedProperty){      
    
  console.log("here--",selectedProperty);
  const goToDetailsPage = (id) => {
    props.setSelectedPropertyForDetails(id);
    navigate('/booking/property/details');
}
   return(
       <Box>
       
           <Grid container columns={12}>
       {selectedProperty.map((property)=>(
           <Grid item xs={3} key={property.propertyID}>
           <Card onClick={() => { goToDetailsPage(property.propertyID) }} sx={{ maxWidth: 200, maxHeight:100, mt:0,mr:2,mb:1,ml:1}}>
           <CardMedia
               component="img"
               height="60"
               image={property.images[0].photo_url}
               alt={property.title}
           //    position="fixed"
              
           />
           
           <CardContent>
               <Typography gutterBottom sx={{fontSize: 10,mt:-1}} component="div">
               {property.title}
               </Typography>
               
           </CardContent>
           
           </Card>
           </Grid>
       ))}
       </Grid>
       </Box>
   )


}
function ViewSelectedProperties(selectedProperty){      
    
   console.log("here--",selectedProperty);
    return(
        <Box>
        
            <Grid container columns={12} sx={{mt:1}}>
        {selectedProperty.map((property)=>(
            <Grid item xs={3} key={property.propertyID}>
            <Card  sx={{ maxWidth: 200, maxHeight:90, mt:0,mr:2,mb:1}}>
           <Button onClick={(event)=>{deletePropertyFromSelectedList(property)}} sx={{ml:"70%"}} variant='text' color='inherit' endIcon={<HighlightOffIcon/>}/>
            <CardMedia
                component="img"
                height="60"
                image={property.images[0].photo_url}
                alt={property.title}
            //    position="fixed"
               sx={{mt:-5}}
            />
            
            <CardContent>
                <Typography gutterBottom sx={{fontSize: 10,mt:-1}} component="div">
                {property.title}
                </Typography>
                
            </CardContent>
            
            </Card>
            </Grid>
        ))}
        </Grid>
        </Box>
    )


}
     
  function buildTilte(a){
   
    let str=a.answerer +'              ' +getDate(a.answer_time);
  
    return str;
  }
      function showComments(answers){
        return (
         <div>
          <Divider/>
          {answers.map((a)=>(
            <div>
              <Card sx={{ minWidth:200 ,m:1,p:0,bgcolor:'antiquewhite'}}>
                <CardHeader
        avatar={
          <Avatar size="small" src={a.image} />
        }
        
       title= {buildTilte(a)}
        subheader={a.answer}
        />
          </Card>
       
        {ViewALLProperties(a.propertyList)}
        {showAnswerReact(a.react,a)}
            </div>
          ))}
         </div>
        )
      }
  
      const insertComment =async (event) =>{
        var propertyList=[]
       selectedProperty.map((p)=>{
          propertyList.push(p['propertyID'])
       })
        var body={
          qid: reply.qid,
          questionair: reply.questionair,
          answer: reply.comment,
          propertyList: propertyList
        }
     
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          'Authorization':  `Bearer ${props.token}` 
        },
          
          body: JSON.stringify(body)
        };
        fetch(`http://localhost:8000/qa/insertComment/` , requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log("updated successsfully")
            fetchQuestions();
            setSelectedProperty([]);
            setReply({});
          });
      }
  
      function comment(question){
       
        return(
         <div>
           <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
        >
          
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="write comment"
            onChange={(event)=>{setReply({'qid':question.questions_id,'comment':event.target.value,'questionair': question.questionair_id})}}
          />
           <IconButton  sx={{ p: '10px',color:'black' }} aria-label="directions">
            <InsertLinkIcon onClick={(event)=>{setDisplay('block')}} />
          </IconButton>
          <IconButton  sx={{ p: '10px',color:'black' }} aria-label="directions">
            <SendIcon  onClick={insertComment} />
          </IconButton>
        
        </Paper>
        {ViewSelectedProperties(selectedProperty)}
         </div>
        )
      }
  
      function showCard(property){
        const goToDetailsPage = (id) => {
          props.setSelectedPropertyForDetails(id);
          navigate('/booking/property/details');
      }
        return(
          <Card onClick={() => { goToDetailsPage(property.propertyID) }}  sx={{ maxWidth: 180, maxHeight:150, mt:2,ml:3}}>
          <CardMedia
              component="img"
              height="100"
              image={property.images[0].photo_url}
              alt={property.title}
              
          />
          <CardContent>
              <Typography gutterBottom sx={{fontSize: 10}} component="div">
              {property.title}
              </Typography>
              
          </CardContent>
          
          </Card>
        )
      }
      const updateQuestionReact =async(q,react)=>{
       console.log(q)
       console.log(react)
       if(q.react === react) react=0;
       q['react']=react;
       
       var body={
        qid:q.questions_id,
        react: react,
       }
       
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json',
          'Authorization':  `Bearer ${props.token}` 
        },
          
          body: JSON.stringify(body)
        };
        fetch(`http://localhost:8000/qa/updateQuestionReact/` , requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log("updated successsfully")
            fetchQuestions();
          });
      }

      const updateAnswerReact =async(q,react)=>{
        
        if(q.react === react) react=0;
                
        var body={
         aid:q.answer_id,
         react: react,
        }
        
         const requestOptions = {
           method: 'PUT',
           headers: { 'Content-Type': 'application/json',
           'Authorization':  `Bearer ${props.token}` 
         },
           
           body: JSON.stringify(body)
         };
         fetch(`http://localhost:8000/qa/updateAnswerReact/` , requestOptions)
           .then(response => response.json())
           .then(data => {
             console.log("updated successsfully")
             fetchQuestions();
           });
       }
  
      function showReact(react,q){
        
        if(react === 0){
          return(
            <Box>
          <IconButton aria-label="add to favorites">
           <ThumbUpOffAltIcon onClick={(event)=>{updateQuestionReact(q,1)}}/>
          </IconButton>{q.likecount}
          <IconButton aria-label="share">
            <ThumbDownOutlinedIcon onClick={(event)=>{updateQuestionReact(q,2)}} />
          </IconButton>{q.dislikecount}
            </Box>
          )
        }else if(react === 1){
         
        return(
          <Box>
          <IconButton aria-label="add to favorites">
           <ThumbUpAltIcon onClick={(event)=>{updateQuestionReact(q,1)}} />
          </IconButton>{q.likecount}
          <IconButton aria-label="share">
            <ThumbDownOffAlt onClick={(event)=>{updateQuestionReact(q,2)}} />
          </IconButton>{q.dislikecount}
            </Box>
        )
        }else if(react ===2){
          return(
            <Box>
            <IconButton aria-label="add to favorites">
            <ThumbUpOffAltIcon onClick={(event)=>{updateQuestionReact(q,1)}} />
            </IconButton>{q.likecount}
            <IconButton aria-label="share">
             <ThumbDownAltIcon onClick={(event)=>{updateQuestionReact(q,2)}} />
            </IconButton>{q.dislikecount}
              </Box>
          )
        }
      }

      function showAnswerReact(react,q){
        
        if(react === 0){
          return(
            <Box sx={{ml:3}}>
          <IconButton  aria-label="add to favorites">
           <ThumbUpOffAltIcon sx={{fontSize:20}}  onClick={(event)=>{updateAnswerReact(q,1)}}/>
          </IconButton>{q.likecount}
          <IconButton aria-label="share">
            <ThumbDownOutlinedIcon sx={{fontSize:20}} onClick={(event)=>{updateAnswerReact(q,2)}} />
          </IconButton>{q.dislikecount}
            </Box>
          )
        }else if(react === 1){
         
        return(
          <Box sx={{ml:3}}>
          <IconButton aria-label="add to favorites">
           <ThumbUpAltIcon sx={{fontSize:20}} onClick={(event)=>{updateAnswerReact(q,1)}} />
          </IconButton>{q.likecount}
          <IconButton aria-label="share">
            <ThumbDownOffAlt sx={{fontSize:20}} onClick={(event)=>{updateAnswerReact(q,2)}} />
          </IconButton>{q.dislikecount}
            </Box>
        )
        }else if(react ===2){
          return(
            <Box sx={{ml:3}}>
            <IconButton aria-label="add to favorites">
            <ThumbUpOffAltIcon sx={{fontSize:20}} onClick={(event)=>{updateAnswerReact(q,1)}} />
            </IconButton>{q.likecount}
            <IconButton aria-label="share">
             <ThumbDownAltIcon sx={{fontSize:20}} onClick={(event)=>{updateAnswerReact(q,2)}} />
            </IconButton>{q.dislikecount}
              </Box>
          )
        }
      }
      function ShowPropertyList(list){
        
        return(
          <Grid container columns={12} sx={{ml:2}}>
            {list.map((property)=>(
              <Grid item xs={4}>
                {showCard(property)}
              </Grid>
              
            ))}
          </Grid>
        )
      }
      
      function showQuestion(q){
        
          return(
            <Card sx={{ width:"100%" }} >
        <CardHeader
        sx={{ fontFamily: 'Lucida Handwriting' }}
          avatar={
            // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            //   R
            // </Avatar>
            <Avatar src={q.question.image}/>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={q.question.name}
          subheader={getDate(q.question.question_date)}
        />
        
        <CardContent>
        <Typography gutterBottom sx={{ fontFamily: 'Lucida Handwriting' }} variant="h6" component="div">
                      {q.question.description}
                  </Typography>
        </CardContent>
       {ShowPropertyList(q.question.propertyList)}
        <CardActions >
         {showReact(q.question.react,q.question)}     
            
            <Button  
             expand={expanded}
             onClick={handleExpandClick}
             aria-expanded={expanded}
             aria-label="show more"
            variant='text' color='inherit' sx={{fontFamily:'Lucida Handwriting',ml:"70%"}} startIcon={<CommentIcon/>}> {q.ansCount} comment</Button>
  
        
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {showComments(q.answers)}
            {comment(q.question)}
            
          </CardContent>
        </Collapse>
        {/* <Divider/> */}
       
      </Card>
          )
      }
  
      function show(props){
        return(
          <Box sx={{width:"100%"}}>
            {questions.map((q)=>(
             <Box sx={{mt:2,boxShadow:3}}> {showQuestion(q)}</Box>
            ))}
          </Box>
        )
      }
      
    
    return(
      <div>
      <Grid container columns={12}>
       <Grid item xs={12}>
       <QAnavbar
       token={props.token}
       />         
       </Grid>
     <Grid container columns={12}>
     <Grid item xs={3} >
      <Sidebar token={props.token}/>
      </Grid>
       <Grid item xs={9} sx={{mt:12}}>
       <Box
         component="main"
         sx={{ position:'relative',flexGrow: 1, p: 3,zIndex:1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
     >  
   
        
         <Grid container sx={{m:1}} >
          <Grid item xs={6}>
          <Typography sx={{ mb:3,fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
   Sunset Vacation 
   </Typography>
          </Grid>
          <Grid item xs={6} sx={{mb:3}}>
          <SearchPost
     setQuestions={setQuestions}
     token={props.token}
   />
          </Grid>
          <Grid item xs={12}>
          {show(props)}
          </Grid>
         </Grid>
         </Box>
        
         </Grid>
     </Grid>
      </Grid>
     
      <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            // minHeight="100vh"
           
        >
        <SelectLink
            display={display}
            setSelectedProperty={(property)=>{setSelectedProperty(property)}}
            selectedProperty={selectedProperty}
            setDisplay={setDisplay}
        />
        </Box>
     </div>
    )
}