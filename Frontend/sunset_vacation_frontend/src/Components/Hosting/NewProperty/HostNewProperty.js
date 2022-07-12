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

    let navigate = useNavigate();
    React.useEffect(() => {
        if (!props.isLoggedin){
             navigate("/login")   
        }
    },[])

    const handlePage = () => {
        if(pageNo == 1){
            return (<CategoryPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}}/>);
        }
        else if(pageNo == 2){
            return (<EntirePrivateOrSharePage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} />);
        }

        else if(pageNo == 3){
            return (<LocationPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}}/>);
        }
        else if(pageNo == 4){
            return (<GuestNoPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}}/>);
        }
        else if(pageNo == 5){
            return (<FacilitiesPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} />);
        }
        else if(pageNo == 6) {
            return (<SafetyItemsPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}} />);
        }
        else if(pageNo == 7){
            return (<PhotosPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}}/>);
        }
        else if(pageNo == 8){
            return (<DescriptionPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}}/>);
        }
        else if(pageNo == 9){
            return (<TitlePage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}}/>);
        }
        else if(pageNo == 10){
            return (<PricePage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}}/>);
        }
        else if(pageNo == 11) {
            return (<PublishPage pageNo={pageNo} setPageNo={(val) => {setPageNo(val)}}/>);
        }
    }

    let page = handlePage();
    return (
        <div>
            {page}
        </div>
    );
}