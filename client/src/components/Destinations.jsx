import { useState } from 'react';
import Button from '@mui/material/Button';
import Destination from './Destination.jsx';

function Destinations({ points }) {

    const pointsWithIds = points.map((point, index) => { return { ...point, myId: index }; }); //check this - adding ids to points on render - for keys

    const [destinations, setDestinations] = useState([]);

    return (
        <div className='col-sm-3 destinations overflow-auto'>
            <div className='d-flex justify-content-between'>
                <h1 className='destinations-header'>Destinations</h1>
                <Button variant='contained' size='medium' sx={{width: 100}}>save</Button>
            </div>
            <ul className='list-group list-group-numbered'>
                {pointsWithIds.map(point =>
                    <Destination key={point.myId} point={point} destinations={destinations} setDestinations={setDestinations} />
                )}
            </ul>
        </div>
    );
}

export default Destinations;