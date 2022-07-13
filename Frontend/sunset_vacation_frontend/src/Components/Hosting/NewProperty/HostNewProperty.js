import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import CategoryPage from './CategoryPage';
import DescriptionPage from './DescriptionPage';
import EntirePrivateOrSharePage from './EntirePrivateOrSharedPage';
import FacilitiesPage from './FacilitiesPage';
import GuestNoPage from './GuestNoPage';
import LocationPage from './LocationPage';
import PhotosPage from './PhotosPage';
import PricePage from './PricePage';
import PublishPage from './PublishPage';
import SafetyItemsPage from './SafetyItems';
import TitlePage from './TitlePage';

export default function HostNewProperty(props){

    const [pageNo, setPageNo] = React.useState(1);
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [entirePrivateOrShared, setEntirePrivateOrShared] = React.useState("");
    const [latitude, setLatitude] = React.useState(23.8103);
    const [longitude, setLongitude] = React.useState(90.4125);
    const [address, setAddress] = React.useState("Dhaka Division, Bangladesh");
    const [locationHasBeenSet, setLocationHasBeenSet] = React.useState(false);

    const [guestNo, setGuestNo] = React.useState(0);
    const [bed, setBeds] = React.useState(0);
    const [bedrooms, setBedrooms] = React.useState(0);
    const [bathrooms, setBathrooms] = React.useState(0);

    let navigate = useNavigate();
    React.useEffect(() => {
        if (!props.isLoggedin){
             navigate("/login")   
        }
    },[])

    const handleSelectedCategory = (val) => {
        if(selectedCategory === val){
            setSelectedCategory("");
        }
        else{
            setSelectedCategory(val);
        }
    }

    const handleEntirePrivateOrShared = (val) => {
        if(entirePrivateOrShared === val){
            setEntirePrivateOrShared("");
        }
        else{
            setEntirePrivateOrShared(val);
        }
    }

    const handleSetGuestNo = (val) => {
        if(guestNo >= 0 && val >= 0){
            setGuestNo(val);
        }
    }

    const handleSetBeds = (val) => {
        if(bed >= 0 && val >= 0){
            setBeds(val);
        }
    }

    const handleSetBedrooms = (val) => {
        if(bedrooms >= 0 && val >=0){
            setBedrooms(val);
        }
    }
    const handleSetBathRomms = (val) => {
        if(bathrooms >= 0 && val >= 0){
            setBathrooms(val);
        }
    }

    const handlePage = () => {
        if(pageNo === 1){
            return (<CategoryPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} token = {props.token} selectedCategory={selectedCategory} setSelectedCategory={(val) => {handleSelectedCategory(val)}}/>);
        }
        else if(pageNo === 2){
            return (<EntirePrivateOrSharePage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} token = {props.token} entirePrivateOrShared={entirePrivateOrShared} setEntirePrivateOrShared={(val) => {handleEntirePrivateOrShared(val)}}/>);
        }

        else if(pageNo === 3){
            return (
            <LocationPage 
                pageNo={pageNo} 
                setPageNo={(val) => {setPageNo(val)}} 
                token = {props.token}
                latitude = {latitude}
                longitude = {longitude}
                address = {address}
                setLatitude = {(val) => {setLatitude(val)}}
                setLongitude = {(val) => {setLongitude(val)}}
                setAddress = {(val) => {setAddress(val)}}
                locationHasBeenSet = {locationHasBeenSet}
                setLocationHasBeenSet = {(val) => {setLocationHasBeenSet(val)}}
                />
            );
        }
        else if(pageNo === 4){
            return (
                <GuestNoPage 
                    pageNo={pageNo} 
                    setPageNo={(val) => {setPageNo(val)}} 
                    token = {props.token}
                    guestNo = {guestNo}
                    setGuestNo = {(val) => {handleSetGuestNo(val)}}
                    bed = {bed}
                    setBeds = {(val) => {handleSetBeds(val)}}
                    bedrooms = {bedrooms}
                    setBedrooms = {(val) => {handleSetBedrooms(val)}}
                    bathrooms = {bathrooms}
                    setBathrooms = {(val) => {handleSetBathRomms(val)}}
                />
            );
        }
        else if(pageNo === 5){
            return (<FacilitiesPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} token = {props.token}/>);
        }
        else if(pageNo === 6) {
            return (<SafetyItemsPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} token = {props.token}/>);
        }
        else if(pageNo === 7){
            return (<PhotosPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} token = {props.token}/>);
        }
        else if(pageNo === 8){
            return (<DescriptionPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} token = {props.token}/>);
        }
        else if(pageNo === 9){
            return (<TitlePage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} token = {props.token}/>);
        }
        else if(pageNo === 10){
            return (<PricePage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} token = {props.token}/>);
        }
        else if(pageNo === 11) {
            return (<PublishPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} token = {props.token}/>);
        }
    }

    let page = handlePage();
    return (
        <div>
            {page}
        </div>
    );
}