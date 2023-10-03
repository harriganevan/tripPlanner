import { useState } from 'react';
import { useMapEvent } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet'

function LocationMarkers({ points, setPoints }) {
  
    useMapEvent({
      click(e) {
        setPoints([...points, e.latlng]);
      }
    });

    return (
      <>
        {points.map(marker => <Marker key={crypto.randomUUID()} position={marker} ></Marker>)}
      </>
    );
  }

  export default LocationMarkers