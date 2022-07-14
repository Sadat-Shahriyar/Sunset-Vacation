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

    const [selectedAmenityList, setSelectedAmenityList] = React.useState([]);
    const [selectedGuestsFavouriteItemList, setSelectedGuestsFavouriteItemList] = React.useState([]);
    const [selectedSafetyItemList, setSelectedSafetyItemList] = React.useState([]);

    const [description, setDescription] = React.useState("");
    const [dos, setDos] = React.useState([]);
    const [donts, setDonts] = React.useState([]);

    const [title, setTitle] = React.useState("");

    const [images, setImages] = React.useState([]);

    const [price, setPrice] = React.useState(0);
    const [maxRefund, setMaxRefund] = React.useState(5);

    let navigate = useNavigate();
    React.useEffect(() => {
        if (!props.isLoggedin){
             navigate("/login")   
        }
    },[navigate, props.isLoggedin])

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

    const handleSetSelectedAmenityList = (val) => {
        let amenities = [...selectedAmenityList];
        let idx = amenities.indexOf(val);
        if(idx === -1){
            amenities.push(val);
            setSelectedAmenityList(amenities);
        }
        else{
            amenities.splice(idx, 1);
            setSelectedAmenityList(amenities);
        }
    }

    const handleSelectedGuestsFavouriteItemList = (val) => {
        let favs = [...selectedGuestsFavouriteItemList];
        let idx = favs.indexOf(val);
        if(idx === -1){
            favs.push(val);
            setSelectedGuestsFavouriteItemList(favs);
        }
        else{
            favs.splice(idx,1);
            setSelectedGuestsFavouriteItemList(favs);
        }
    }

    const handleSetSelectedSafetyItemList = (val) => {
        let safetyItem = [...selectedSafetyItemList];
        let idx = safetyItem.indexOf(val);
        if(idx === -1){
            safetyItem.push(val);
            setSelectedSafetyItemList(safetyItem);
        }
        else{
            safetyItem.splice(idx, 1);
            setSelectedSafetyItemList(safetyItem);
        }
    }

    const handleSetImages = (val) => {
        let temp = [...images, ...val];
        setImages(temp);
        // console.log(images[2].name);
    }

    const hadleDeleteImage = (name) => {
        let temp = images.filter((image) => image.name !== name);
        console.log(temp);
        setImages(temp);
    }

    const handlePage = () => {
        if(pageNo === 1){
            return (
                <CategoryPage 
                    pageNo={pageNo} 
                    setPageNo={(val) => {setPageNo(val)}} 
                    token = {props.token} 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={(val) => {handleSelectedCategory(val)}}
                />
            );
        }
        else if(pageNo === 2){
            return (
                <EntirePrivateOrSharePage
                     pageNo={pageNo} 
                    setPageNo={(val) => {setPageNo(val)}}
                     token = {props.token} 
                     entirePrivateOrShared={entirePrivateOrShared} 
                     setEntirePrivateOrShared={(val) => {handleEntirePrivateOrShared(val)}}
                />
            );
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
            return (
                <FacilitiesPage 
                    pageNo={pageNo} 
                    setPageNo={(val) => {setPageNo(val)}}
                    token = {props.token}
                    selectedAmenityList = {selectedAmenityList}
                    selectedGuestsFavouriteItemList = {selectedGuestsFavouriteItemList}
                    selectedSafetyItemList = {selectedSafetyItemList}
                    setSelectedAmenityList = {(val) => {handleSetSelectedAmenityList(val)}}
                    setSelectedGuestsFavouriteItemList = {(val) => {handleSelectedGuestsFavouriteItemList(val)}}
                    setSelectedSafetyItemList = {(val) => {handleSetSelectedSafetyItemList(val)}}
                />
            );
        }
        
        else if(pageNo === 6){
            return (
                <PhotosPage 
                    pageNo={pageNo}
                    setPageNo={(val) => {setPageNo(val)}} 
                    token = {props.token}
                    images = {images}
                    setImages = {(val) => {handleSetImages(val)}}
                    hadleDeleteImage = {(name) => {hadleDeleteImage(name)}}
                />
            );
        }
        else if(pageNo === 7){
            return (
                <DescriptionPage
                     pageNo={pageNo} 
                     setPageNo={(val) => {setPageNo(val)}} 
                     token = {props.token}
                     description = {description}
                     setDescription = {(val) => {setDescription(val)}}
                     dos = {dos}
                     setDos = {(val) => {setDos(val)}}
                     donts = {donts}
                     setDonts = {(val) => {setDonts(val)}}
                />
            );
        }
        else if(pageNo === 8){
            return (
                <TitlePage 
                    pageNo={pageNo} 
                    setPageNo={(val) => {setPageNo(val)}} 
                    token = {props.token}
                    title={title}
                    setTitle = {(val) => {setTitle(val)}}
                />
            );
        }
        else if(pageNo === 9){
            return (
                <PricePage 
                    pageNo={pageNo} 
                    setPageNo={(val) => {setPageNo(val)}}
                    token = {props.token}
                    price = {price}
                    setPrice = {(val) => {setPrice(val)}}
                    maxRefund = {maxRefund}
                    setMaxRefund = {(val) => {setMaxRefund(val)}}
                />
            );
        }
        else if(pageNo === 10) {
            return (
                <PublishPage 
                    pageNo={pageNo} 
                    setPageNo={(val) => {setPageNo(val)}} 
                    token = {props.token}
                    images = {images}
                    title = {title}
                    guestNo = {guestNo}
                    bed = {bed}
                    bedrooms = {bedrooms}
                    bathrooms = {bathrooms}
                    description = {description}
                    price = {price}
                    catagory = {selectedCategory}
                    address = {address}
                />
            );
        }
    }

    let page = handlePage();
    return (
        <div>
            {page}
        </div>
    );
}