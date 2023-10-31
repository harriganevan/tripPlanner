import { useState } from 'react';
import Map from '../components/Map.jsx';
import Destinations from '../components/Destinations.jsx';

function Home() {

    const [points, setPoints] = useState([]);

    return (
        <div className='row'>
            <Map points={points} setPoints={setPoints} />
            <Destinations points={points} setPoints={setPoints} />
        </div>
    ); 
}

export default Home;