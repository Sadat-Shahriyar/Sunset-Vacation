import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import { BASE_URL } from '../../Utils';
import { axios_api } from '../../App';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Sunset Vacation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup(props) {
  let navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (props.isLoggedin){
         navigate("/")   
    }
  },[])

  const gotoLoginPage = () => {
    navigate("/login");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name'),
      Address: data.get('Address'),
      PhoneNo: data.get('Phone no'),
      country: data.get('Country'),
      city: data.get('City'),      
    });

    try{
      let body = {
        email: data.get('email'),
        password: data.get('password'),
        name: data.get('name'),
        Address: data.get('Address'),
        PhoneNo: data.get('Phone no'),
        country: data.get('Country'),
        city: data.get('City'),      
      };
      let response = await axios_api.post("users/signup/", body);

      console.log(response)
      if(response.status === 201){
        props.setUser(response.data);
        props.setToken(response.data.token);
        props.setLoggedIn(true);
        navigate("/")
      }
      else{
        props.setUser({});
        props.setToken("");
        props.setLoggedIn(false);
        alert("Invalid email or password");
      }
      console.log(response.data);
    }
    catch(err){
      console.log(err);
      alert(err)
    }
    

  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="Address"
                label="Address"
                name="Address"
                autoComplete="Address"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="Phone no"
                label="Phone no"
                name="Phone no"
                autoComplete="Phone no"
              />
              <TextField
                margin="normal"
                required
                id="Country"
                label="Country"
                name="Country"
                autoComplete="Country"
                sx={{
                  width: 270,
                }}
              />
              {/* <CountrySelector /> */}
              <TextField
                margin="normal"
                required
                id="City"
                label="City"
                name="City"
                autoComplete="City"
                sx={{
                  width: 270,
                  ml: 3.5
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item sx={{ml: 17}}>
                  <Button onClick={()=>{gotoLoginPage()}} variant="text">Already have an account? Sign in</Button>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}