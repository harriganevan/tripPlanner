import { Button } from '@mui/material';
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

function TripDetails({ trip, setTrigger, trigger }) {

    console.log(trip)

    const { user } = useAuthContext();

    const navigate = useNavigate();

    const handleClickDelete = async () => {

        //add confirmation

        if (!user) {
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

    const handleClickOpen = async () => {

        if (!user) {
            return
        }

        const response = await fetch(`http://localhost:5000/api/${trip._id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            console.log('trip loaded');
            localStorage.setItem('id', json._id);
            localStorage.setItem('destinations', JSON.stringify(json.destinations));
            navigate('/');
        } else {
            console.log('uhoh');
        }
    }

    return (
        <>
            <h5 style={{display: 'inline'}}>{trip.name}</h5> <p style={{display: 'inline'}}>: {trip.destinations.map((destination, index) => {
                if (index != trip.destinations.length - 1) {
                    return (destination.name + ' -> ');
                } else {
                    return (destination.name);
                }
            })}</p><br></br>
            <Button onClick={handleClickDelete}>Delete</Button>
            <Button onClick={handleClickOpen}>Open</Button>
        </>
    );
}

export default TripDetails;