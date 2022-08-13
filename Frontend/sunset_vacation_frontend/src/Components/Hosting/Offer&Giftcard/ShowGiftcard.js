import * as React from 'react';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Navigate, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import './../../../App.css';
export default function ShowGiftcard(props){
    let navigate=useNavigate();
    const [giftcards,setGiftcards]=React.useState([]);
    React.useEffect(() => {       
        fetch(`http://localhost:8000/hosting/getGiftcardList/`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Authorization' : `Bearer ${props.token}`
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
                setGiftcards(response.giftcards)
                console.log(response.giftcards)
            })
            .catch((err) => {
                alert(err.message);
            })
    }, []);

    const deleteGiftcard= async(card)=>{
        
        const giftcard={
            giftcard_id: card['giftcard_id'],
            type: card['type'],
            discount: card['discount'],
            expiry_date: card['expiry_date'],
            propertyID_id: card['propertyID_id'],
            customMsg: card['customMsg']
        };
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Authorization':  `Bearer ${props.token}` },
            body: JSON.stringify(giftcard)
          };
          fetch(`http://localhost:8000/hosting/deleteGiftcard/` + `${giftcard.giftcard_id}`, requestOptions)
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
           
            props.setflags("giftcard");
                navigate('/showProperty/Redirect');
        })
        .catch((err) => {
            alert(err.message);
        })
            
    }
    function tableData(properties){
        return(
            <TableBody>
            {giftcards.map((card) => (
                <TableRow
                    key={card.giftcard_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    <Button  sx={{color: "black",fontFamily: "Lucida Handwriting", fontSize: "15px"}} variant="text" value={card.giftcard_id} >{card.giftcard_id}</Button>

                    </TableCell>
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="center">{card.title}</TableCell>
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="center">{card.discount}%</TableCell>
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="center">{card.expiry_date}</TableCell>
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="center">{card.type}</TableCell>
                    {/* <TableCell>
                    <Button variant="outlined" onClick={(event)=>{showGuestist()}} color='inherit' sx={{ width: "90px", marginLeft: "18px" }}>Show Guestlist</Button>

                    </TableCell> */}
                    <TableCell><Tooltip title="Delete">
                        <IconButton value={card.giftcard_id} onClick={(event)=>deleteGiftcard(card)} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip></TableCell>
                </TableRow>
            ))}
        </TableBody>
        )
    }
    function tableListing(properties) {
        return (
            <TableContainer component={Paper} sx={{ width: "60%", marginTop: "20px", marginLeft: "auto", marginRight: "auto" }} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{bgcolor:"#AED6F1 "}}>
                        <TableRow>
                            <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }}>Giftcard ID</TableCell>
                            <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">PropertyTitle</TableCell>
              <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">Discount&nbsp;</TableCell>
      <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">ExpiryDate&nbsp;</TableCell>
      <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">Type&nbsp;</TableCell>
      {/* <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">GuestList&nbsp;</TableCell> */}

                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                   {tableData(giftcards)}
                </Table>
            </TableContainer>
        )
    }
    return (
        <div>
            <ManagementDashboard/>
            <Typography sx={{marginTop:"50px", fontFamily:"Lucida Handwriting"}}align='center' variant="h5" component="h2">
 Your Listings
</Typography>;

            {tableListing(giftcards)}
        </div>
    )
}