import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import {OpenStreetMapProvider, GeoSearchControl, SearchControl} from 'leaflet-geosearch'
import L from 'leaflet'
// import '../../../../App.css'
import '../../../App.css';
import 'leaflet-geosearch/dist/geosearch.css'

const center = {
  lat: 23.8103,
  lng: 90.4125,
}

function DraggableMarker() {
  const [draggable, setDraggable] = useState(true)
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng());
          // console.log(position);
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}

const SearchField = (props) => {
  const provider = new OpenStreetMapProvider()

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'button',
    showMarker: true, // optional: true|false  - default true
    // showPopup: false, // optional: true|false  - default false
    marker: {
        // optional: L.Marker    - default L.Icon.Default
        icon: new L.Icon.Default(),
        draggable: true,
    },
    // popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
    // resultFormat: ({ result }) => result.label, // optional: function    - default returns result label
    maxMarkers: 1, // optional: number      - default 1
    // retainZoomLevel: false, // optional: true|false  - default false
    // animateZoom: true, // optional: true|false  - default true
    // autoClose: true, // optional: true|false  - default false
    // searchLabel: 'Enter address', // optional: string      - default 'Enter address'
    keepResult: true, // optional: true|false  - default false
    // updateMap: true, // optional: true|false  - default true
  });

  const map = useMap();

  map.on('geosearch/showlocation',  (e) => {
      props.setShowInitMarker(false);
      props.setLatitude(e.location.x);
      props.setLongitude(e.location.y);
      props.setAddress(e.location.label);
      // console.log(e.location);
      props.setLocationHasBeenSet(true);
    });
  map.on('geosearch/marker/dragend',  (e) => {
      props.setShowInitMarker(false);
      props.setLatitude(e.location.lat);
      props.setLongitude(e.location.lng);
      // console.log(e.location);
      props.setLocationHasBeenSet(true);
    });

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

function MapComponent(props) {
    const [search, setSearch] = useState(true)
    const [showInitMarker, setShowInitMarker] = useState(true);
    const getMarker = () => {
      if(showInitMarker){
        return(
          <Marker position={[props.latitude, props.longitude]}>
          </Marker>
        );
      }
      else{
        return (
          <div></div>
        );
      }
    }

    let marker = getMarker();
  return (
    <MapContainer center={[props.latitude, props.longitude]} zoom={13}>
        <SearchField  
          setLatitude = {(val) => {props.setLatitude(val)}}
          setLongitude = {(val) => {props.setLongitude(val)}}
          setAddress = {(val) => {props.setAddress(val)}}
          setShowInitMarker = {(val) => {setShowInitMarker(val)}}
          setLocationHasBeenSet = {(val) => {props.setLocationHasBeenSet(val)}}
        />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker}
      {/* <DraggableMarker /> */}
    </MapContainer>
  )
}

export default MapComponent;