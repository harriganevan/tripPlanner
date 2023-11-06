import { Button } from '@mui/material';

function TripDetails({ trip }) {

    const handleClick = async () => {
        const response = await fetch(`http://localhost:5000/api/${trip._id}`, {
            method: 'DELETE'
        })
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            console.log('trip deleted');
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