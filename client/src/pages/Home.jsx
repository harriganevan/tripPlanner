import { useState } from 'react';
import Map from '../components/Map.jsx';
import Destinations from '../components/Destinations.jsx';

function Home() {

    const [points, setPoints] = useState([]);
    console.log(points)

    //convert latlng to place here? - maybe do it in places where setpoints is called

    return (
        <div className='row'>
            <Map points={points} setPoints={setPoints} />
            <Destinations points={points} setPoints={setPoints} />
        </div>
    ); 
}

export default Home;