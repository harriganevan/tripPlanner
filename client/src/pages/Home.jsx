import { useState } from 'react';
import Map from '../components/Map.jsx';
import Destinations from '../components/Destinations.jsx';

function Home() {

    const [points, setPoints] = useState([]);

    //destinationDetails object for state? - put in destinations

    return (
        <>
            
            <div className='row'>
                <Map points={points} setPoints={setPoints} />
                <Destinations points={points} />
            </div>

        </>
    );

}

export default Home;