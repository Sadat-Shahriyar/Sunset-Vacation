import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import {OpenStreetMapProvider, GeoSearchControl, SearchControl} from 'leaflet-geosearch'
import L from 'leaflet'
// import '../../../../App.css'
import '../../App.css';
import 'leaflet-geosearch/dist/geosearch.css'
import { parse } from 'date-fns';

// let center = {lat:23.8103, lng:90.4125}

export default function LocationMap(props){
    const [position, setPosition] = useState([23.8103, 90.4125])
    const [center, setCenter] = useState({lat:23.8103, lng:90.4125})
    const [title, setTitle] = useState("")
    // useEffect(() => {
    //     console.log("hellooooooo",props.latlng);
    //     if(props.latlng !== null){
    //         let center2 = {
    //             lat: props.latlng.lat,
    //             lng: props.latlng.lng
    //         }
            
    //         setCenter(center2)
    //         setPosition([props.latlng.lat,props.latlng.lng]);
    //         setTitle(props.title);
    //     }
        
        
    // }, [])
    console.log("hereeeeee", props.latlng)
    return(
        // <MapContainer center={props.latlng !== null ? {lat: props.latlng.lat, lng:props.latlng.lng}:center} zoom={13} scrollWheelZoom={false}>
        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>

            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
    );
}








// function SetViewOnClick({ animateRef, latlng }) {
//     console.log(latlng);

//     const map = useMapEvent('click', (e) => {
//     // console.log(e.latlng)
//       map.setView(e.latlng, map.getZoom(), {
//         animate: animateRef.current || false,
//       })
//     })

  
//     return null
//   }
  
//  export default function LocationMap(props) {
//     const animateRef = useRef(true)

//     // console.log(props.latitude);
//     // console.log(props.longitude);
    
//     const latLong = {lat: parseFloat(props.latitude), lng: parseFloat(props.longitude)}
//     const position = [ parseFloat(props.latitude),  parseFloat(props.longitude)]

//     console.log(position)
//     return (
//       <>
//         <p>
//           <label>
//             <input
//               type="checkbox"
//               onChange={() => {
//                 animateRef.current = !animateRef.current
//               }}
//             />
//             Animate panning
//           </label>
//         </p>
//         <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <SetViewOnClick animateRef={animateRef} latlng={latLong}/>
//         </MapContainer>
//       </>
//     );
//   }
  


















// function FlyMapTo(props) {
//     const map = useMap();
  
//     useEffect(() => {
//       map.flyTo(props.center, props.zoom);
//     });
  
//     return null;
//   }


// export default function LocationMap(props){
//     const [position, setPosition] = useState([51.505, -0.09]);
//     const [title, setTitle] = useState("")
//     // useEffect(() => {
//     //     var lat = parseFloat(props.latitude);
//     //     var lon = parseFloat(props.longitude);
//     //     setPosition([lat,lon]);
//     //     setTitle(props.title);
//     // }, [])
//     return (
//         <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
//             <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
            
//             {/* <FlyMapTo center={position} zoom={13} /> */}
//         </MapContainer>
//     )
// }