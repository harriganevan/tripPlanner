import { useEffect, useState } from 'react';
import TripDetails from '../components/TripDetails';
import useAuthContext from '../hooks/useAuthContext';

function Trips() {

    const [trips, setTrips] = useState(null);
    const [trigger, setTrigger] = useState(false); //fix this
    const { user } = useAuthContext();

    useEffect(() => {

        if (!user) {
            console.log('weird')
            return
        }
        const fetchTrips = async () => {
            const response = await fetch('http://localhost:5000/api/trips', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                setTrips(json);
            }
        }

        fetchTrips();

    }, [user, trigger]);

    return (
        <div className='trips-container'>
            <h1>Trips</h1>
            <ul className='list-group'>
                {trips && trips.map((trip) => (
                    <li className='list-group-item' key={trip._id}>
                        <TripDetails trip={trip} setTrigger={setTrigger} trigger={trigger} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Trips