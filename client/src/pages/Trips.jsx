import { useEffect, useState } from 'react';
import TripDetails from '../components/TripDetails';
import useAuthContext from '../hooks/useAuthContext';

function Trips() {

    const [trips, setTrips] = useState(null);
    const [trigger, setTrigger] = useState(false); //fix this
    const { user } = useAuthContext();

    useEffect(() => {

        if (!user) {
            return
        }

        const fetchTrips = async () => {
            try {
                const response = await fetch('https://tripplanner-api.onrender.com/api/trips', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json();
                if (response.ok) {
                    setTrips(json);
                } else {
                    throw new Error(response.status + ' ' + json.error);
                }
            } catch (error) {
                console.error(error);
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