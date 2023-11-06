import { useState } from 'react';
import Map from '../components/Map.jsx';
import Destinations from '../components/Destinations.jsx';

function Home() {

    const [points, setPoints] = useState([]);
    //maybe add destinations here and allow props from App.jsx for when loading a trip from database
    //trip id state?

    return (
        <div className='row'>
            <Map points={points} setPoints={setPoints} />
            <Destinations points={points} setPoints={setPoints} />
        </div>
    ); 
}

export default Home;