import { useState } from 'react';
import Map from './Map.jsx'
import Destinations from './Destinations.jsx';

function App() {

  const [points, setPoints] = useState([]);

  //destinations useState hook - put inside Destinations component if save button is there

  return (
    <>
      {/* header */}
      <div className='row'>
        <Map points={points} setPoints={setPoints} />
        <Destinations points={points} />
      </div>
      {/* save button - maybe inside Destinations component */}
    </>
  );
}

export default App
