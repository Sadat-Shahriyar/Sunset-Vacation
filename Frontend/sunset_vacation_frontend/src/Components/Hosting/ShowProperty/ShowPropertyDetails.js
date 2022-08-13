import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import {Button, IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';
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
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from "@mui/material/Grid";
import axios from "axios";

export default function ShowPropertyDetails(props) {
    const [prop, setProp] = React.useState({});
    const [title, setTitle] = React.useState('new title');
    const [edit, setEdit] = React.useState(false);
    const [photos, setPhotos] = React.useState([]);

    React.useEffect(() => {
        fetch(`http://localhost:8000/hosting/getProperty/` + `${props.property.propertyID}`,{
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Authorization' : `Bearer ${props.token}`
            }
        }).then((response) => {
                if (response.ok) {
                    return response
                } else {
                    let err = new Error(response.status + ": " + response.text);
                    throw err;
                }
            })
            .then((response) => response.json())
            .then((response) => {
                setProp(response.property)
            })
            .catch((err) => {
                alert(err.message);
            })
        fetch(`http://localhost:8000/hosting/getPropertyPhoto/` + `${props.property.propertyID}`,{
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Authorization' : `Bearer ${props.token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response
                } else {
                    let err = new Error(response.status + ": " + response.text);
                    throw err;
                }
            })
            .then((response) => response.json())
            .then((response) => {
                setPhotos(response.photos)
            })
            .catch((err) => {
                alert(err.message);
            })
    })

    let navigate = useNavigate();


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


    function editClicked(event) {
        console.log("edit value ", edit)
        setEdit(!edit);
        console.log("edit value change ", edit)
    }

    function deleteImage(id){
        console.log(id);

        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        };
        fetch(`http://localhost:8000/hosting/photos/` + id, requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate('/showPropertyDetails')
            });
    }
    function fileUpload(event){
        console.log(event.target.files[0]);
        const sendObject = new FormData();
        sendObject.append("image", event.target.files[0]);
        sendObject.append("property_id", props.property.propertyID);
        axios.post(`http://localhost:8000/hosting/updatephotouploadhelper/`, sendObject)
            .then(response => response)
            .then(data => {
                navigate('/showPropertyDetails')
            });
    }

    function handleSubmit(event) {
        prop.title = title;

        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(prop)
        };
        fetch(`http://localhost:8000/hosting/updateProperty/` + `${props.property.propertyID}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                props.setProperty(props.property)
                navigate('/showPropertyDetails')
            });

    }

    function showPropertyNavbar(props) {
        return (
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" sx={{bgcolor: "inherit"}}>
                    <Toolbar>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{display: {xs: 'none', sm: 'block'}}}
                        >
                            <p style={{
                                "fontFamily": "Lucida Handwriting",
                                "fontSize": "25px",
                                "color": "black"
                            }}>{prop.title}
                                &nbsp;&nbsp;&nbsp;<IconButton><EditIcon onClick={editClicked}/></IconButton></p>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <AppBar position='static' color='inherit'>
                    <Toolbar>
                        <Button onClick={useHome} color="inherit" sx={{
                            fontFamily: "Lucida Handwriting",
                            fontSize: "15px",
                            color: "#C4036C"
                        }}>Images</Button><IconButton><InsertPhotoOutlinedIcon sx={{color: '#C4036C'}}/></IconButton>
                        <Button onClick={useCatagory} color="inherit" sx={{
                            fontFamily: "Lucida Handwriting",
                            fontSize: "15px",
                            color: "black"
                        }}>Catagory</Button><IconButton><DetailsIcon sx={{color: 'black'}}/></IconButton>
                        <Button onClick={useLocation} color="inherit" sx={{
                            fontFamily: "Lucida Handwriting",
                            fontSize: "15px",
                            color: "black"
                        }}>Location</Button><IconButton><LocationOnIcon sx={{color: 'black'}}/></IconButton>
                        <Button onClick={useFacility} color="inherit"
                                sx={{fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black"}}>Facilities &
                            Safety Items</Button><IconButton><DesktopMacIcon sx={{color: 'black'}}/></IconButton>
                        <Button onClick={useDescription} color="inherit"
                                sx={{fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black"}}>Description,price
                            & Cancellation policy</Button><IconButton><DescriptionIcon
                        sx={{color: 'black'}}/></IconButton>
                        <Button onClick={useFaq} color="inherit" sx={{
                            fontFamily: "Lucida Handwriting",
                            fontSize: "15px",
                            color: "black"
                        }}>Faq</Button><IconButton><QuestionAnswerIcon sx={{color: 'black'}}/></IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }


    function showDetails(props) {
        return (
            <Box m={2} p={2}>
                <Grid container>
                    <Grid item xs={6}>
                <ImageList sx={{width: 700, overflow: 'hidden'}} cols={4} rowHeight={164}>
                    {photos.map((photo) => (
                        <ImageListItem key={photo.id}>
                            <img
                                src={`${photo.photo_url}?w=164&h=164&fit=crop&auto=format`}
                                alt={photo.photo_url}
                                loading="lazy"
                            />
                        <ImageListItemBar
                        sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        }}
                        position="top"
                        actionIcon={
                        <IconButton
                            sx={{color: 'white'}}
                            disabled={!edit}
                        ><DeleteIcon onClick={()=>{deleteImage(photo.id)}}/>
                        </IconButton>
                        }
                        actionPosition="left"
                        />
                        </ImageListItem>
                        ))}
                </ImageList>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{display: {xs: 'block'}, ml:14}}
                        >
                            <p style={{
                                "fontFamily": "Lucida Handwriting",
                                "fontSize": "50px",
                                "color": "black"
                            }}>Images
                                &nbsp;&nbsp;&nbsp;</p>
                        </Typography>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ml:16, bgcolor:'#282c34'}}
                            disabled={!edit}
                        >
                            Upload File
                            <input
                                type="file"
                                hidden
                                onChange={fileUpload}
                            />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <div>

            <ManagementDashboard/>

            {showPropertyNavbar(props)}
            {showDetails(props)}

        </div>
    );
}
