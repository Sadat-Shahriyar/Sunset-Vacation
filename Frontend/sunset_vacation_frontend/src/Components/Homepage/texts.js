import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { axios_api } from '../../App';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Divider, Paper, responsiveFontSizes } from '@mui/material';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Menu from '@mui/material/Menu';
const StyledMenu = styled((props) => (
    <Menu
        elevation={3}
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
        minWidth: 180,
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
            // '&:active': {
            //   backgroundColor: alpha(
            //     theme.palette.primary.main,
            //     theme.palette.action.selectedOpacity,
            //   ),
            // },
        },
    },
}));

export default function NavBar(props) {
    let navigate = useNavigate();
    React.useEffect(() => {
        const fetchProperties = async () => {
            try {
                let res = await axios_api.get("hosting/getCountryList/");

                if (res.status === 200) {
                    setCountryList(res.data.countryList)
                    
                }
                else {
                    alert(res.status + ": " + res.statusText);
                }
            }
            catch (err) {
                alert(err);
            }
        }

        fetchProperties();
    }, [])

    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);
    const [anchorEl4, setAnchorEl4] = React.useState(null);
    const [countryList, setCountryList] = React.useState([]);
    const [startDate, setstartDate] = React.useState(null);
    const [EndDate, setEndDate] = React.useState(null);
    const [guestno, setGuestNo] = React.useState(0);
    const [guest,setGuest]=React.useState('ADD Guest');
    const [country, setCountry] = React.useState('ANYWHERE');
    const [anyweek,setAnyWeek]=React.useState('ANYWEEK')
    const [areaList, setAreaList] = React.useState([]);
    const [area, setArea] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    

    const open1 = Boolean(anchorEl1);
    const open2 = Boolean(anchorEl2);
    const open3 = Boolean(anchorEl3);
    const openLocation = Boolean(anchorEl4);
    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = async (event) => {
        //setAnchorEl1(null);
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
        setAnchorEl1(null);
        setAnchorEl4(null);
    };
    
  
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const becomeAHostButton = (event) => {
        navigate("/hosting");
    }

    const isMenuOpen = Boolean(anchorEl);
  
  

  

  const handleMenuClose = () => {
    setAnchorEl(null);
   
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

  

    function showCountry(c){
        let bg='';
        if (country === c){
            bg='#EAA49B';
        }
        
        return(
            <Button variant='text' color='inherit' sx={{ minWidth:200,  fontFamily: 'Lucida Handwriting', bgcolor: bg }} onClick={(event) => { searchLocation(c) }}>
                        {c}
                    </Button>
        )
    }
    function showCountryList(props) {
        
        
        return (
            <Box>
                {countryList.map((country) => (
                    <Grid item xs={4}>
                       {showCountry(country)}
                    </Grid>
                ))}
            </Box>


        )
    }
    function showAreaList(props) {
        return (
            <MenuItem>
                {areaList.map((area) => (
                    <Grid item xs={4}>
                        <Button variant='text' color='inherit' sx={{ fontFamily: 'Lucida Handwriting', padding: 1 }} onClick={(event) => { setArea(area);setCountry(area+','+country) }}>{area}</Button>
                    </Grid>
                ))}
            </MenuItem>
        )
    }
    const searchLocation = async (country) => {
        setCountry(country);
        try {
            let res = await axios_api.get(`hosting/getlocationsInCountry/${country}/`);

            if (res.status === 200) {
                setAreaList(res.data.areaList);
            }
            else {
                alert(res.status + ": " + res.statusText);
            }
        }
        catch (err) {
            alert(err);
        }
    }
    const handleSearch = async (event) => {

        if (startDate == null & EndDate == null & guestno == 0 & area == '') {
            alert('enter some input for search');
        } else {
            if ((startDate != null & EndDate == null) || (startDate == null & EndDate != null)) {
                alert('enter both date');
            } else if (startDate > EndDate) {
                alert('check-in Date should be less than check-out Date');
            } else {
                var search = {
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
    return (
        <Box >

            <Toolbar>

                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ ml: 10, display: { xs: 'none', sm: 'block' } }}
                >
                    <p onClick={() => { { navigate('/'); } }} style={{ "fontFamily": "Jokerman", "fontSize": "25px", color: "#C4036C" }}>SUNSET VACATION</p>

                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            ml: 30,
                        },
                    }}
                >
                    <ButtonGroup color='inherit' variant='text' size="large" aria-label="large button group">


                        <Button
                            id="demo-customized-button"
                            aria-controls={open1 ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open1 ? 'true' : undefined}
                            //variant="inherit"
                            enableElevation
                            onClick={handleClick1}
                            sx={{ color: "black",fontFamily:'Lucida Handwriting' }}
                        >
                            {country}
                        </Button>
                        {/* <Divider orientation="vertical" flexItem /> */}
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl1}
                            open={open1}
                            //onClose={handleClose1}

                        >
                            {/* <MenuItem onClick={handleClose1} disableRipple> */}
                            {/* <Grid onClick={handleClose1} container> */}
                            <Grid onClick={handleClose1} container columns={16}>
                                {showCountryList(props)}
                            </Grid>
                            {/* </MenuItem> */}

                        </StyledMenu>

                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl4}
                            open={openLocation}
                            onClose={handleCloseLocation}
                            onClick={handleCloseLocation}
                        >
                          
                                {showAreaList(props)}
                         
                        </StyledMenu>
                       
                       
                            <Button
                                id="demo-customized-button"
                                aria-controls={open2 ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open2 ? 'true' : undefined}
                                //variant="inherit"
                                disableElevation
                                onClick={handleClick2}
                                sx={{ color: "black",fontFamily:'Lucida Handwriting' }}
                            >
                                {anyweek}
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
                            

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Grid container spacing={6}>
                                        <Grid item={6}>
                                            <DesktopDatePicker
                                                label="check-in date"
                                                sx={{ mt: 5, ml: -5 }}
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
                                                sx={{ mt: 50, ml: 0 }}
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

                                {/* </MenuItem> */}

                            </StyledMenu>
                        
                            <Button
                                id="demo-customized-button"
                                aria-controls={open3 ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open3 ? 'true' : undefined}
                                //variant="inherit"
                                disableElevation
                                onClick={handleClick3}
                                sx={{ color: "black",fontFamily:'Lucida Handwriting' }}
                            >
                                {guest}
                            </Button>

                            <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl3}
                                open={open3}
                                onClose={handleClose3}
                                sx={{ mt: 1 }}
                            >
                                {/* <MenuItem 
        //onClick={handleClose3} 
        disableRipple disableTouchRipple> */}


                                <Grid container gridAutoColumns={12} spacing={2} >

                                    <Grid item xs={4}>


                                        <IconButton color="inherit"  >
                                            <RemoveCircleOutlineRoundedIcon onClick={(event) => { if (guestno != 0) setGuestNo(guestno - 1);setGuest('guest no '+(guestno-1).toString()) }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={{ ml: 2, mt: 0.5 }} variant='h6' >{guestno}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <IconButton color="inherit"  >
                                            <AddCircleOutlineRoundedIcon color='inherit' onClick={(event) => { setGuestNo(guestno + 1);setGuest('guest no '+((guestno+1).toString())) }} />
                                        </IconButton>
                                    </Grid>
                                </Grid>



                                {/* </MenuItem> */}

                            </StyledMenu>
                       



                            <Button>
                                <SearchIcon sx={{ color: 'black' }} onClick={handleSearch} />
                            </Button>

                       
                    </ButtonGroup>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                    <Button variant="outlined" color='inherit' sx={{ fontFamily: "Jokerman", color: "#C4036C" }} onClick={becomeAHostButton}>Become a host</Button>
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
              <AccountCircle />
            </IconButton>
          </Box>
            </Toolbar>
        
      {renderMenu}
            <Divider />


        </Box>
        
    )
}