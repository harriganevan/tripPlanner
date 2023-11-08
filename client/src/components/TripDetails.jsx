import { Button } from '@mui/material';
import useAuthContext from '../hooks/useAuthContext';

function TripDetails({ trip, setTrigger, trigger }) {

    const { user } = useAuthContext();

    const handleClick = async () => {

        if(!user){
            return
        }

        const response = await fetch(`http://localhost:5000/api/${trip._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            console.log('trip deleted');
            setTrigger(!trigger);
        } else {
            console.log('uhoh')
        }

    }

    return (
        <>
            <p>{trip.name}</p>
            <Button onClick={handleClick}>Delete</Button>
        </>
    );
}

export default TripDetails;