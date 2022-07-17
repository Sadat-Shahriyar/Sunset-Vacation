import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import { Button, IconButton } from '@mui/material';
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
import { axios_api } from '../../../App';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
export default function Editfacility(props) {
    let navigate = useNavigate();


    //const [description,setdescription]=React.useState('');
    const [facility, setFacility] = React.useState([])


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

        fetch(`http://localhost:8000/hosting/getPropertyFacilityDetails/` + `${props.selectedFacility}`,
            {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${props.token}`,

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
                setFacility(response.facility);

            })
            .catch((err) => {
                alert(err.message);
            })
    }, [])

    function changeDescription(f, value) {
        f["description"] = value;
        console.log(facility);
    }
    function handleSubmit(event) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization' : `Bearer ${props.token}`
        },
            body: JSON.stringify(facility[0])
        };
        fetch(`http://localhost:8000/hosting/updatePropertyFacility/` + `${props.selectedFacility}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("updated successsfully")
            });
            navigate('/showPropertyDetails/facility')

    }
    function editFacility(props) {
        return (
            <div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '40ch' },
                    }}
                    noValidate
                    m={2}
                    p={2}
                    autoComplete="off"
                >
                    
                        {facility.map((f) => (
                            <Grid container>
                              <Grid item xs={1}/>
                            <Grid item sx={{ ml: '30%' }} xs={5}>
                                <label><p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "15px", "color": "black" }}>{f.facility_name}</p></label>
                                <TextField
                                    id="outlined-name"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    placeholder={f.description}
                                    onChange={(event) => { changeDescription(f, event.target.value) }}
                                />

                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item sx={{ ml: '39%' }} xs={5}>
                                <Button variant="outlined"  color="inherit" onClick={handleSubmit} sx={{  marginTop:2}}>Update</Button>

                            </Grid>
                            </Grid>
                        ))}

                 
                </Box>
            </div>
        )
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
                            <p style={{ "fontFamily": "Lucida Handwriting", "fontSize": "25px", "color": "black" }}>{props.property.title}
                                &nbsp;&nbsp;&nbsp;</p>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <AppBar position='static' color='inherit' >
                    <Toolbar>
                        <Button onClick={useHome} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Images</Button><IconButton><InsertPhotoOutlinedIcon sx={{ color: 'black' }} /></IconButton>
                        <Button onClick={useCatagory} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Catagory</Button><IconButton><DetailsIcon sx={{ color: 'black' }} /></IconButton>
                        <Button onClick={useLocation} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Location</Button><IconButton><LocationOnIcon sx={{ color: 'black' }} /></IconButton>
                        <Button onClick={useFacility} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Facilities & Safety Items</Button><IconButton><DesktopMacIcon sx={{ color: 'black' }} /></IconButton>
                        <Button onClick={useDescription} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Description,price & Cancellation policy</Button><IconButton><DescriptionIcon sx={{ color: 'black' }} /></IconButton>
                        <Button onClick={useFaq} color="inherit" sx={{ fontFamily: "Lucida Handwriting", fontSize: "15px", color: "black" }} >Faq</Button><IconButton><QuestionAnswerIcon sx={{ color: 'black' }} /></IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }

    return (
        <div>

            <ManagementDashboard />

            {showPropertyNavbar(props)}
            {editFacility(props)}

        </div>
    );
}
