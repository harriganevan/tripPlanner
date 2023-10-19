import { useMapEvent } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet'

function LocationMarkers({ points, setPoints }) {

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].lat == obj.lat && list[i].lng == obj.lng) {
        return true;
      }
    }
    return false;
  }

  useMapEvent({
    click(e) {
      if (!containsObject(e.latlng, points)) {
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