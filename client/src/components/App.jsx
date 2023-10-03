import { useState } from 'react';
import Map from './Map.jsx'
import Destinations from './Destinations.jsx';

function App() {

  const [points, setPoints] = useState([]);

  return (
    <div className='row'>
      <Map points={points} setPoints={setPoints}/>
      <Destinations points={points} />
    </div>
  );
}

export default App
