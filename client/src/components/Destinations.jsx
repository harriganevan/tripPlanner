import { useState } from 'react';
import Button from '@mui/material/Button';
import Destination from './Destination.jsx';

function Destinations({ points, setPoints }) {

    const [destinations, setDestinations] = useState([]);

    //convert latlng to name here?

    console.log(destinations);

    return (
        <div className='col-sm-3 destinations overflow-auto'>
            <div className='d-flex justify-content-between'>
                <h1 className='destinations-header'>Destinations</h1>
                <Button variant='contained' size='medium' sx={{ width: 100 }}>save</Button>
            </div>
            <ul className='list-group list-group-numbered'>
                {points.map(point =>
                    <Destination key={point.lat + point.lng} point={point} destinations={destinations} setDestinations={setDestinations} points={points} setPoints={setPoints} />
                )}
            </ul>
        </div>
    );
}

export default Destinations;