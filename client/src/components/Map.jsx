import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import LocationMarkers from './LocationMarkers.jsx';

function Map({points, setPoints}) {
  return (
    <>
      <MapContainer className='col-sm-9' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarkers points={points} setPoints={setPoints}/>
      </MapContainer>
    </>
  );
}

export default Map