import { useMapEvent, useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet'
import icon from '../assets/marker'

function LocationMarkers({ points, setPoints }) {

  const map = useMap();

  function containsObject(obj, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].lat == obj.lat && list[i].lng == obj.lng) {
        return true;
      }
    }
    return false;
  }

  useMapEvent({
    async click(e) {
      if (!containsObject(e.latlng, points)) {
        const response = await fetch(`http://localhost:5000/api/getCityName/${e.latlng.lat}/${e.latlng.lng}`);
        const name = await response.json();
        e.latlng.name = name;
        setPoints([...points, e.latlng]);
      }
    }
  });

  return (
    <>
      {points.map(marker => <Marker key={crypto.randomUUID()} position={marker} ></Marker>)}
    </>
  );
}

export default LocationMarkers;