import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddchartIcon from '@mui/icons-material/Addchart';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid, Paper, TextField } from '@mui/material';
import { axios_api } from '../../App';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const drawerWidth = 240;

function AdminDashBoardNew(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [pageno, setPageno] = React.useState(1);
  const [properties, setProperties] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [subCategories, setSubCategories] = React.useState(null);
  const [newCategory, setNewCategory] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [subcategory, setSubcategory] = React.useState("");
  const [facility, setFacility] = React.useState("");

  const navigate = useNavigate()

  const fetchProperties = async() => {
    try{
        let response = await axios_api.get("http://localhost:8000/hosting/pendingProperties/");
        if(response.status === 200){
            console.log(response.data);
            setProperties(response.data.properties);
        }
        else{
            let error = new Error(response.statusText);
            throw error;
        }
    }
    catch(error){
        alert(error.message);
    }
  }

  const fetchFacilityCategories = async() => {
    try{
        let response = await axios_api.get("http://localhost:8000/hosting/facilityCategories/");
        if(response.status === 200){
            console.log(response.data);
            setCategories(response.data.categories);
        }
        else{
            let error = new Error(response.statusText);
            throw error;
        }
    }
    catch(error){
        alert(error.message);
    }
  }

  const fetchSubCategories = async() => {
    try{
        let response = await axios_api.get("http://localhost:8000/hosting/facilitySubcategories/");
        if(response.status === 200){
            console.log(response.data);
            setSubCategories(response.data.subcategories);
        }
        else{
            let error = new Error(response.statusText);
            throw error;
        }
    }
    catch(error){
        alert(error.message);
    }
  }

  const addCategory = () => {
    const data={
        category: newCategory
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    setNewCategory("");
    fetch(`http://localhost:8000/hosting/addCategory/`, requestOptions)
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
            alert("New category added");
        })
        .catch((err) => {
            console.log(err.message);
        })

    }

    const addFacility = () => {
        const data={
            facility: facility,
            category: category,
            subcategory: subcategory,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        setCategory("");
        setFacility("");
        setSubcategory("");

        fetch(`http://localhost:8000/hosting/addFacility/`, requestOptions)
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
                alert("New facilty added");
            })
            .catch((err) => {
                console.log(err.message);
            })
    }


  React.useEffect(()=>{
    fetchProperties();
    fetchFacilityCategories();
    fetchSubCategories();
  }, []);


  const listPendingProperties = () =>{
    if(properties === null){
        return(<div></div>)
    }
    else{
        return(
            <Grid container>
                {properties.map((property) => {
                    return(
                        <Grid item xs={12} sx={{mt:5}}>
                            <Card onClick={() => {navigate(`/admin/propertydetails/${property.propertyID}`)}} >
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <img src={property.photos[0].photo_url} style={{maxWidth: 350, minWidth:350}}/>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography sx={{fontSize:28, fontFamily:"Jokerman"}}>{property.title}</Typography>
                                            <Typography sx={{fontSize:20}}>{property.address}</Typography>
                                            <Typography sx={{fontSize:20, mt:5}}>{property.description}</Typography>
                                        </Grid>
                                    </Grid>
                                    
                                   
                                    {/* <img src={property.photos[0].photo_url} style={{maxWidth: 350, minWidth:350}}/>
                                    <Typography sx={{fontSize:28, fontFamily:"Jokerman"}}>{property.title}</Typography>
                                    <Typography sx={{fontSize:20}}>{property.description}</Typography> */}
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        );
    }
  }

  const addCategoryOrFacility = () =>{
    return(
        <Grid container>
            <Grid item xs={12} >
                <Card elevation={5}>
                    <CardContent>
                    <Typography variant='h5'>
                        Add new category
                    </Typography>
                    <TextField value={newCategory} variant="outlined" onChange={(event)=>{setNewCategory(event.target.value)}} sx={{mt:3}}/>
                    <Button 
                        variant="contained" 
                        onClick={addCategory}
                        sx={{bgcolor: '#282c34', ml: 4, mt:5 }}
                        endIcon={<CategoryOutlinedIcon sx={{ color: 'white' }}/>}
                    >
                        Add Category
                    </Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sx={{mt:5}}>
                <Card elevation={5}>
                    <CardContent>
                    <Typography variant='h5'>
                        Add new facility
                    </Typography>
                    <FormControl sx={{minWidth:300}}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={(event) => {setCategory(event.target.value)}}
                        >
                            {categories.map((category) => {
                                return(
                                    <MenuItem value={category.catagory}>{category.catagory}</MenuItem>
                                );
                            })}
                            
                        </Select>
                    </FormControl>

                    <FormControl sx={{minWidth:300, ml: 5}}>
                        <InputLabel id="demo-simple-select-label">Subcategory</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subcategory}
                            label="Sub category"
                            onChange={(event) => {setSubcategory(event.target.value)}}
                        >
                            {subCategories.map((sub) => {
                                return(
                                    <MenuItem value={sub.subcatagory}>{sub.subcatagory}</MenuItem>
                                );
                            })}
                            
                        </Select>
                    </FormControl>
                    <TextField
                        id="outlined-basic"
                        label="Facility Name"
                        value={facility}
                        onChange={(event) => {setFacility(event.target.value)}}
                        sx={{ml:5}}
                    />
                    <Button 
                        variant="contained" 
                        onClick={addFacility}
                        sx={{bgcolor: '#282c34', marginTop: 2, marginLeft: 5}} 
                        endIcon={<DesktopMacIcon sx={{ color: 'white' }}/>}
                    >
                        Add Facility
                    </Button>
                            
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
  }

  const getPage = () => {
    if(pageno === 1) {
        return(listPendingProperties());
    }
    else if (pageno === 2){
        return(addCategoryOrFacility());
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"Pending property approval"} disablePadding>
            <ListItemButton onClick={() => {setPageno(1)}}>
                <ListItemIcon>
                <PendingActionsIcon />
                </ListItemIcon>
                <ListItemText primary={"Pending property approval"} />
            </ListItemButton>
        </ListItem>
        <ListItem key={"Add category or facility"} disablePadding>
            <ListItemButton onClick={() => {setPageno(2)}}>
                <ListItemIcon>
                <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={"Add category or facility"} />
            </ListItemButton>
        </ListItem>

        {/* <ListItem key={"Add facility"} disablePadding>
            <ListItemButton onClick={() => {setPageno(3)}}>
                <ListItemIcon>
                <AddchartIcon />
                </ListItemIcon>
                <ListItemText primary={"Add facility"} />
            </ListItemButton>
        </ListItem> */}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'white',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{color:'black' ,fontFamily:'Jokerman', fontSize:36}}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >

          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {getPage()}
      </Box>
    </Box>
  );
}

AdminDashBoardNew.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminDashBoardNew;
