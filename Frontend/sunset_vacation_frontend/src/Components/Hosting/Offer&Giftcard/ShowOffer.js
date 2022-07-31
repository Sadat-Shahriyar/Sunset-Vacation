import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Navigate, useNavigate } from 'react-router-dom';
import ManagementDashboard from '../ManagementDashboard/ManagementDashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import './../../../App.css';
export default function ShowPropertyList(props) {
    let navigate = useNavigate();

    const [offers, setOffers] = React.useState([])

    React.useEffect(() => {
       
        fetch(`http://localhost:8000/hosting/getOfferList/`+  `${props.property.propertyID}`, {
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
                setOffers(response.offers)
                console.log(response)
            })
            .catch((err) => {
                alert(err.message);
            })
    }, []);

    function getSelectedOffer(property) {
        
    }
    function  DeleteOffer(property) {
        // console.log(property.propertyID)
        // const requestOptions = {
        //     method: 'DELETE',
        //     headers: { 'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${props.token}` },
        //     body: JSON.stringify(props.property)
        // };
        // fetch(`http://localhost:8000/hosting/deleteProperty/` + `${property.propertyID}`, requestOptions)
        // .then(response => response.json())
        // .then(data => {
        //     console.log("delete successsfully")
        //     props.setflags("propertylist");
        //     navigate('/showProperty/Redirect');
        // });


      }
    function tableData(properties){
        return(
            <TableBody>
            {offers.map((offer) => (
                <TableRow
                    key={offer.offer_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    <Button  sx={{color: "black",fontFamily: "Lucida Handwriting", fontSize: "15px"}} variant="text" value={offer.offer_id} onClick={() => { getSelectedOffer(offer) }}>{offer.propertyID_id}</Button>

                    </TableCell>
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{offer.startDate}</TableCell>
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{offer.endtDate}</TableCell>
                    <TableCell  sx={{fontFamily:"Lucida Handwriting", fontSize:"15px"}}align="right">{offer.amount}</TableCell>

                    <TableCell><Tooltip title="Delete">
                        <IconButton value={offer.offer_id} onClick={()=>DeleteOffer(offer)} >
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
                            <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }}>PropertyTitle</TableCell>
                            <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">Start Date</TableCell>
              <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">End Date&nbsp;</TableCell>
      <TableCell sx={{ fontFamily: "Lucida Handwriting", fontSize: "20px" }} align="right">Amount&nbsp;</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                   {tableData(offers)}
                </Table>
            </TableContainer>
        )
    }

    

    return (
        <div>
            {<ManagementDashboard />}

            <Typography sx={{marginTop:"50px", fontFamily:"Lucida Handwriting"}}align='center' variant="h5" component="h2">
 Your Listings
</Typography>;

            {tableListing(offers)}
        </div>
    );
}