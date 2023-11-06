import { useEffect, useState } from 'react';
import TripDetails from '../components/TripDetails';

function Trips() {

    const [trips, setTrips] = useState(null);
    
    useEffect(() => {
        const fetchTrips = async () => {
            const response = await fetch('http://localhost:5000/api/trips');
            const json = await response.json();

            if (response.ok) {
                setTrips(json);
            }

        }

        fetchTrips();

    }, [trips]);

    return (
        <>
            <h1>Trips</h1>
            <ul className='list-group'>
                {trips && trips.map((trip) => (
                    <li className='list-group-item' key={trip._id}>
                        <TripDetails trip={trip} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Trips