import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Navigate, useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { axios_api } from '../../App';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


function ViewAllProperties(props){
  console.log(props.properties);
  let propertyData = [];
  if(props.properties.data != undefined)
    propertyData = props.properties.data;

  let properties = propertyData.map((property) => {
    return(
      <Grid item xs={3} key={property.propertyID}>
        <Card sx={{ maxWidth: 345, maxHeight:500, m:3}}>
        <CardMedia
          component="img"
          height="140"
          image={property.images[0].photo_url}
          alt={property.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {property.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.description}
          </Typography>
        </CardContent>
        </Card>
      </Grid>
    );
  })
  // let properties = "hello"
  return(
    <Grid container>
      {properties}
    </Grid>
  );
}


export default function Homepage(props) {

  const [properties, setProperties] = React.useState([])
  const [value, setValue] = React.useState(0);
  const [selectedProperty, setSelectedProperty] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(()=>{
    const fethProperties = async() => {
      try{
        let res = await axios_api.get("hosting/getallpropertiesforhomepage/");

        if(res.status === 200){
          setProperties(res.data);
        }
        else{
          alert(res.status+": " + res.statusText);
        }
      }
      catch(err){
        alert(err);
      }
    }

    fethProperties();
  }, [])
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const becomeAHostButton = (event) => {
    navigate("/hosting");
  }
  const AdminButton = (event) => {
    navigate("/admin");
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 19 new notifications"
          color="inherit"
        >
          <Badge badgeContent={19} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor: "#C4036C"}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
           <Tabs value={value} onChange={handleChange} textColor="inherit" size="25px"
        aria-label="icon tabs example">
      <Tab icon={< WbTwilightIcon />} aria-label="phone" />
      
    </Tabs>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <p style={{"fontFamily": "Jokerman","fontSize":"25px"}}>SUNSET VACATION</p>
           
          </Typography>
          <Tabs  textColor='inherit' value={value} onChange={handleChange}  aria-label="icon label tabs example">
            <Tab/>
            <Tab/>
            <Tab/>
      <Tab icon={<DateRangeIcon />}  label="RECENTS" />
      <Tab icon={<FavoriteIcon />} label="FAVORITES" />
      <Tab icon={<PersonPinIcon />} label="NEARBY" />
    </Tabs>
    
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              
            />
          </Search> */}
          
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 6 new mails" color="inherit">
              <Badge badgeContent={6} color="error">
                <MailIcon />
                
               
              </Badge>
            </IconButton> */}
            <Button variant="text" sx={{fontFamily:"Jokerman",color: "white"}} onClick={AdminButton}>Admin</Button>
            <Button variant="text" sx={{fontFamily:"Jokerman",color: "white"}} onClick={becomeAHostButton}>Become a host</Button>
            {/* <IconButton
              size="large"
              aria-label="show 19 new notifications"
              color="inherit"
              onClick={()=>{navigate("/login");}}
            >
              <Badge badgeContent={19} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              //onClick={()=>{navigate("/login");}}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu}
      {renderMenu} */}
      <ViewAllProperties 
        properties={properties}
      />
    </Box>
  );
}



