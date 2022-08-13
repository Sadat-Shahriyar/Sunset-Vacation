import { Card, CardContent, Grid, List, ListItem, Typography } from '@mui/material';
import * as React from 'react';
import { axios_api } from '../../App';
import QAnavbar from './QAnavbar';



export default function QaHome(props){

    const [questions, setQuestions] = React.useState([]);

    const fetchQuestions = async() => {
      try{
        let response = await axios_api.get('qa/getAllQuestions/');
        
        console.log(response.data);
        if(response.status === 200){
          setQuestions(response.data.all_questions);
        }
        else{
          let err = new Error(response.statusText);
          throw err;
        }
      }
      catch(error){
        alert(error.message);
      }
    }


    const ViewListOfQuestions = () => {
      let idx = 1;
      if(questions === null){
        return(<div></div>);
      }
      console.log(questions)
      return(
        <List sx={{mt:5}}>
          {questions.map((question) => {
            
            let date = new Date(question.question.question_date);
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

            // dateString = date.getFullYear().toString() + "-" + date.getMonth().toString() + "-" + date.getDate().toString() ; 

            return(
              <ListItem disablePadding id={idx++}>
                <Card sx={{ minWidth: 1000, ml:40, mt:2 }}>
                  <CardContent>
                    {/* <Typography variant="h5" component="div">
                      {question.question.question}
                    </Typography> */}
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography variant='body' sx={{mt:100}}>{question.ansCount} answers</Typography>
                      </Grid>
                      <Grid item xs={8}>

                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="h5" component="div">
                              {question.question.question}
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <Typography variant="body1" component="div" sx={{mt:3}}>
                              {question.question.description.substring(0, 30)} ...
                            </Typography>
                          </Grid>

                          {question.question.tag_ids.split("-").map((tag) => {
                            return(
                              <Grid item xs={2}>
                                <Typography variant="body1" component="div" sx={{mt:1}}>
                                  {tag}
                                </Typography>
                              </Grid>
                            );
                          })}

                          <Grid item xs={12}>
                            <Typography variant='body' sx={{ml:40}}>{dateString}</Typography>
                          </Grid>
                        </Grid>

                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </ListItem>
            );
          })}
        </List>
      );
    }

    React.useEffect(()=>{
      fetchQuestions();
    },[]);

    return (
        <div>
          <QAnavbar/>
          <ViewListOfQuestions />
        </div>
    )
}