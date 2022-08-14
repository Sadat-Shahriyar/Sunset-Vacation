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
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Navigate, useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, responsiveFontSizes } from '@mui/material';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import MainSection from './MainSection';
import { axios_api } from '../../App';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    //minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


export default function Homepage(props) {

  
  const [startDate, setstartDate] = React.useState(null);
  const [EndDate, setEndDate] = React.useState(null);
  const [guestno,setGuestNo]=React.useState(0);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [countryList,setCountryList]=React.useState([]);
  const [country,setCountry]=React.useState('');
  const [areaList,setAreaList]=React.useState([]);
  const [area,setArea]=React.useState('');
  React.useEffect(()=>{
    const fethProperties = async() => {
      try{
        let res = await axios_api.get("hosting/getCountryList/");

        if(res.status === 200){
          setCountryList(res.data.countryList)
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
  
  
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const openLocation = Boolean(anchorEl4);
  const handleClick1 = (event) => {    
      setAnchorEl1(event.currentTarget);   
  };
  const handleClose1 = async(event) => {
    setAnchorEl1(null);
    setAnchorEl4(event.currentTarget);
  };
  const handleClick2 = (event) => {    
    setAnchorEl2(event.currentTarget);   
};
const handleClose2 = () => {
  setAnchorEl2(null);
};
const handleClick3 = (event) => {  
  setAnchorEl3(event.currentTarget);   
};
const handleClose3 = () => {
setAnchorEl3(null);
};
const handleCloseLocation = () => {
  setAnchorEl4(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  
  
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

  const searchLocation =async (country)=>{
    setCountry(country);
    try{
      let res = await axios_api.get(`hosting/getlocationsInCountry/${country}/`);

      if(res.status === 200){
        setAreaList(res.data.areaList);
      }
      else{
        alert(res.status+": " + res.statusText);
      }
    }
    catch(err){
      alert(err);
    }
  }

  

  function showCountryList(props){
    return(
      <Grid container  spacing={2}>
        {countryList.map((country)=>(
          <Grid item xs={4}>
            <Button variant='outlined' color='inherit' onClick={(event)=>{searchLocation(country)}}>{country}</Button>
            </Grid>
        ))}
      </Grid>
    )
  }
  function showAreaList(props){
    return(
      <Grid container  spacing={2}>
        {areaList.map((area)=>(
          <Grid item xs={6}>
            <Button variant='outlined' color='inherit' onClick={(event)=>{setArea(area)}}>{area}</Button>
            </Grid>
        ))}
      </Grid>
    )
  }
 
  const handleSearch = async(event)=>{
      if(startDate == null & EndDate== null & guestno ==0 & area == ''){
        alert('enter some input for search');
      }else{      
       if((startDate != null & EndDate == null) || (startDate == null & EndDate !=null)){
          alert('enter both date');
      }else if(startDate > EndDate){
        alert('check-in Date should be less than check-out Date');
      }else{
        var search={
          location: area,
          startDate: startDate,
          EndDate: EndDate,
          guest: guestno
        }
        props.setHomepagesearch(search);
        navigate('/homepagesearchresult');
      }
    }
      
  }
 
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
      <AppBar position="static" 
     // color='inherit'
     sx={{bgcolor: "#C4036C"}}
      >
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
           <Tabs  textColor="inherit" size="25px"
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
          
    
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              
            />
          </Search> */}
          <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
          ml: 25
        },
      }}
    >
      
      <ButtonGroup variant="text"  sx={{borderRadius: 10,bgcolor: "white",padding:1}} >
      <div>
      <Button
        id="demo-customized-button"
        aria-controls={open1 ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        //variant="inherit"
        disableElevation
        onClick={handleClick1}
        sx={{color: "black"}}
      >
        Anywhere
      </Button>
      <StyledMenu
       id="demo-customized-menu"
       MenuListProps={{
         'aria-labelledby': 'demo-customized-button',
       }}
        anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
        
      >
        <MenuItem onClick={handleClose1} disableRipple>
          <Grid container>
          {showCountryList(props)}
          </Grid>
        </MenuItem>
       
      </StyledMenu>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl4}
        open={openLocation}
        onClose={handleCloseLocation}

      >
        <MenuItem onClick={handleCloseLocation} sx={{m:1}}disableRipple>
         {showAreaList(props)}
        </MenuItem>
        
      </StyledMenu>
      </div>
      <div>
      <Button
        id="demo-customized-button"
        aria-controls={open2 ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        //variant="inherit"
        disableElevation
        onClick={handleClick2}
        sx={{color: "black"}}
      >
        Anyweek
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
      >
        <MenuItem >
       
       <LocalizationProvider dateAdapter={AdapterDateFns}>
       <Grid container spacing={3}>
        <Grid item={6}>
        <DesktopDatePicker
                      label="check-in date"
                      sx={{ mt: 5 }}
                      value={startDate}
                      minDate={new Date('2017-01-01')}
                      onChange={(newValue) => {
                        setstartDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />

        
        </Grid>
        <Grid item={6}>
        <DesktopDatePicker
                      label="check-out date"
                      sx={{ mt: 50,ml:20 }}
                      value={EndDate}
                      minDate={new Date('2017-01-01')}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />

        
        </Grid>
       </Grid>
       
        </LocalizationProvider>
       
        </MenuItem>
        
      </StyledMenu>
      </div>
      <div>
      <Button
        id="demo-customized-button"
        aria-controls={open3 ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open3 ? 'true' : undefined}
        //variant="inherit"
        disableElevation
        onClick={handleClick3}
        sx={{color: "black"}}
      >
        Add guests
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
         anchorEl={anchorEl3}
         open={open3}
         onClose={handleClose3}
         sx={{mt:1}}
      >
        <MenuItem 
        //onClick={handleClose3} 
        disableRipple>
      
       
              <Grid container gridAutoColumns={12}  spacing={2} >
                
                <Grid item xs={4}>
                  <IconButton color="primary"  >
                    <RemoveCircleOutlineRoundedIcon sx={{fontSize:100}} onClick={(event)=>{if(guestno != 0) setGuestNo(guestno-1)}}/>
                  </IconButton>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ml:2}} variant='h6' >{guestno}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <IconButton color="primary"  >
                    <AddCircleOutlineRoundedIcon onClick={(event)=>{setGuestNo(guestno+1)}} />
                  </IconButton>
                </Grid>
              </Grid>
         
       
    
        </MenuItem>
        
      </StyledMenu>
      </div>
      <div>
      <Button>
        <SearchIcon onClick={handleSearch}/>
      </Button>
      
      </div>
      </ButtonGroup>
    </Box>
          
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 6 new mails" color="inherit">
              <Badge badgeContent={6} color="error">
                <MailIcon />
                
               
              </Badge>
            </IconButton> */}

            {/*{props.isAdmin && <Button variant="text" sx={{fontFamily:"Jokerman",color: "white"}} onClick={AdminButton}>Admin</Button>}*/}

                      <Button variant="text" sx={{fontFamily:"Jokerman",color: "white"}} onClick={()=>{{navigate('/search');}}}>search</Button>

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
              // onClick={handleProfileMenuOpen}
              color="inherit"
              onClick={()=>{
                props.setLoginRedirection('/')
                navigate("/login");
              }}

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
      <MainSection/>
     
    </Box>
  );
}



