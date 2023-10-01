import { useState } from 'react';
import { useMapEvents } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet'

function LocationMarkers() {

    const [markers, setMarkers] = useState([]);
  
    const map = useMapEvents({
      click(e) {
        markers.push(e.latlng);
        setMarkers((prevValue) => [...prevValue, e.latlng]);
      }
    });
  
    return (
      <>
        {markers.map(marker => <Marker position={marker} ></Marker>)}
      </>
    );
  }

  export default LocationMarkers