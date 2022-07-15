import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import { autocompleteClasses, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DetailsIcon from '@mui/icons-material/Details';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DescriptionIcon from '@mui/icons-material/Description';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { axios_api } from '../../../App';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
const style = {
  width: '60%',
  bgcolor: 'background.paper',
  marginTop: "10px",
  marginLeft: "auto",
  marginRight: "auto"

};


export default function ShowFaq(props) {
  let navigate = useNavigate();

  var [faqs, setFaqs] = React.useState([]);
  var [propertyTitle, setTitle] = React.useState('')
  var [editFaq, setEditFaq] = React.useState(0);
  var [ques, setQuestion] = React.useState('')
  var [ans, setAnswer] = React.useState('')

  const useLocation = (event) => {
    navigate("/showPropertyDetails/location");
  }
  const useDescription = (event) => {
    navigate('/showPropertyDetails/description');
  }
  const useFaq = (event) => {
    navigate('/showPropertyDetails/faq');
  }
  const useCatagory = (event) => {
    navigate('/showPropertyDetails/catagory');
  }
  const useFacility = (event) => {
    navigate('/showPropertyDetails/facility');
  }
  const useHome = (event) => {
    navigate('/showPropertyDetails');
  }
  React.useEffect(() => {
    fetch(`http://localhost:8000/hosting/getFaqs/` + `${props.property.propertyID}`)
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

        setFaqs(response.faqs)
        setTitle(response.propertyTitle)

      })
      .catch((err) => {
        alert(err.message);
      })
  }, [])
  function changeQuestion(event) {
    setQuestion(event.target.value)

  }
  function changeAnswer(event) {
    setAnswer(event.target.value)

  }


  const handleSubmit = async (event) => {
    if (ques === '' || ans === '') {
      alert("empty value not accepted")
    } else {
      const body = {
        "propertyID_id"  : props.property.propertyID,
        "question" : ques,
       "answer" : ans,
        
      };
      console.log(body)
      
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    fetch(`http://localhost:8000/hosting/insertFaq/`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("insert successsfully")
      });
    }
    navigate('/hosting')


  }
  function DeleteFaq(faq) {
    console.log("delete button pressed")
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faq)
    };
    fetch(`http://localhost:8000/hosting/deleteFaq/` + `${faq.faq_id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("delete successsfully")
      });


  }
  function showPropertyNavbar(props) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "inherit" }}>
          <Toolbar>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "25px", "color": "black" }}>{propertyTitle}
                &nbsp;&nbsp;&nbsp;<IconButton><EditIcon /></IconButton></p>
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar position='static' color='inherit' >
          <Toolbar >
            <Button onClick={useHome} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Images</Button><IconButton><InsertPhotoOutlinedIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useCatagory} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Catagory</Button><IconButton><DetailsIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useLocation} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Location</Button><IconButton><LocationOnIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useFacility} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Facilities & Safety Items</Button><IconButton><DesktopMacIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useDescription} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Description,price & Cancellation policy</Button><IconButton><DescriptionIcon sx={{ color: 'black' }} /></IconButton>
            <Button onClick={useFaq} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "#C4036C" }} >Faq</Button><IconButton><QuestionAnswerIcon sx={{ color: '#C4036C' }} /></IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
  function showAnswer(faq) {
    return (
      <ListItem button divider>
        <IconButton><QuestionAnswerIcon /></IconButton>
        <ListItemText ><p style={{ fontFamily: "Lucida Handwriting" }}>{faq.answer}</p></ListItemText>
        <IconButton value={faq.faq_id} onClick={() => getSelectedFaq(faq)} >
          <EditIcon />
        </IconButton>

      </ListItem>
    )
  }


  function getSelectedFaq(faq) {
    setEditFaq(faq.faq_id)
  }
  function questionAnswerInput(props) {
    return (
      <div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 2, width: '70ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField onChange={changeQuestion} sx={{ marginleft: "35px" }} id="Add new question" label="Add new Question" variant="outlined" />
          <TextField
            id="answer"
            label="answer"
            multiline
            rows={6}
            onChange={changeAnswer}
          />


        </Box>
        <Box>
          <Button variant="outlined" onClick={handleSubmit} color='inherit' sx={{ width: "90px", marginLeft: "18px" }} startIcon={<PublishOutlinedIcon />}>
            Submit
          </Button>
        </Box>
      </div>
    )
  }
  function showFaqs(props) {
    return (
      <div>
        {faqs.map((faq) => (

          <List sx={style} component="nav" aria-label="mailbox folders">
            <Divider />
            <ListItem sx={{ bgcolor: "#F1948A" }} button>
              <IconButton><HelpCenterIcon /></IconButton>
              <ListItemText  ><p style={{ fontFamily: "Lucida Handwriting" }}>{faq.question}</p></ListItemText>
              <IconButton value={faq.faq_id} onClick={() => DeleteFaq(faq)} >
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
            <ListItem button divider>
              <IconButton><QuestionAnswerIcon /></IconButton>
              <ListItemText ><p style={{ fontFamily: "Lucida Handwriting" }}>{faq.answer}</p></ListItemText>
              {/* <IconButton value={faq.faq_id} onClick={()=>getSelectedFaq(faq)} >
                            <EditIcon />
                        </IconButton> */}

            </ListItem>

          </List>

        ))}
      </div>

    )
  }
  function showGrid(props) {
    return (
      <Grid container spacing={2} columns={16} sx={{ margintop: "-20px" }}>
        <Grid item xs={8}>
          <Typography sx={{ marginTop: "30px", textDecoration: "underline", marginLeft: "150px", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
            Previous Questions & Answers
          </Typography>
          {showFaqs(props)}
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ marginTop: "30px", marginLeft: "30px", textDecoration: "underline", fontFamily: "Lucida Handwriting" }} variant="h5" component="h2">
            Create New Questions & Answers
          </Typography>
          {questionAnswerInput(props)}
        </Grid>
      </Grid>
    )
  }
  return (
    <div>

      <ManagementDashboard />

      {showPropertyNavbar(props)}
      {showGrid(props)}

    </div>
  );
}
