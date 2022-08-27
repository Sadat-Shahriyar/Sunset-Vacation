import * as React from 'react';
import { Card, CardContent, Grid, List,Box, Button, Typography, Divider } from '@mui/material';
import { axios_api } from '../../App';
import { styled } from '@mui/material/styles';
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
import { useNavigate } from 'react-router-dom';
import ThumbDownOffAlt from '@mui/icons-material/ThumbDownOffAlt';
const drawerWidth = 340;


export default function ViewAllPost(props){
   
   
  let navigate=useNavigate();
 
  const [questions, setQuestions] = React.useState([]);
  const [expanded, setExpanded] = React.useState([]);
  const [reply,setReply]=React.useState({'qid':-1,'comment':''});
 
  React.useEffect(()=>{
    const set= async()=>{
        alert('ok');
    setQuestions(props.questions);
    setExpanded(props.expanded);
    }
    set();
  },[]);
  const handleExpandClick = (id) => {
    var t=[...expanded];
    t[id]=!t[id];
    setExpanded(t);
    
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
      else{
        dateString = (today.getHours() - date.getHours()).toString() + " hours ago";
      }
      return dateString;
    }


   

    function showComments(answers){
      return (
       <div>

       </div>
      )
    }

    const insertComment =async (event) =>{
      var body={
        qid: reply.qid,
        answer: reply.comment
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
          props.setflags("forumMyhome");
          navigate('/showProperty/Redirect');
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
          //placeholder="Search Google Maps"
          //inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(event)=>{setReply({'qid':question,'comment':event.target.value})}}
        />
        
        <IconButton  sx={{ p: '10px',color:'black' }} aria-label="directions">
          <SendIcon onClick={insertComment} />
        </IconButton>
      </Paper>
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
          props.setflags("forumMyhome");
          navigate('/showProperty/Redirect');
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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
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
           expand={expanded[q.question.index]}
           onClick={(event)=>{handleExpandClick(q.question.index)}}
           aria-expanded={expanded[q.question.index]}
           aria-label="show more"
          variant='text' color='inherit' sx={{fontFamily:'Lucida Handwriting',ml:"70%"}} startIcon={<CommentIcon/>}> {q.ansCount} comment</Button>

      
      </CardActions>
      <Collapse in={expanded[q.question.index]} timeout="auto" unmountOnExit>
        <CardContent>
          {showComments(q.answer)}
          {comment(q.question.questions_id)}
          
        </CardContent>
      </Collapse>
      <Divider/>
     
    </Card>
        )
    }

    function show(props){
      return(
        <Box sx={{width:"100%",boxShadow:4}}>
          {questions.map((q)=>(
           <Box> {showQuestion(q)}</Box>
          ))}
        </Box>
      )
    }
    
    return(
      <div>
         <Box
         component="main"
         sx={{ position:'relative',flexGrow: 1, p: 3,zIndex:1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
     >
         {show(props)}
        </Box>
     </div>
    )
}