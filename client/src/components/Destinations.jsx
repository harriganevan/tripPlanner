import { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Destination from './Destination.jsx';
import useAuthContext from '../hooks/useAuthContext.jsx';
import { LatLng } from 'leaflet';

function Destinations({ points, setPoints }) {

    //if loaded from trips menu - add id to local storage
    //then if local storage has id - setID(localStorage'id')

    const { user } = useAuthContext();

    const [open, setOpen] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [tripName, setTripName] = useState();
    const [saved, setSaved] = useState(false);
    const [id, setID] = useState(null);
    const[loading, setLoading] = useState(true); //waits for useEffect to finish

    console.log(destinations);
    console.log(points)

    if(!loading){
        localStorage.setItem('destinations', JSON.stringify(destinations));
    }
    
    useEffect(() => {
        // localStorage.removeItem('destinations')
        const destinations = JSON.parse(localStorage.getItem('destinations'));
        console.log(JSON.parse(localStorage.getItem('destinations')));
        if (destinations) {
            var newPoints = [];
            for (let i = 0; i < destinations.length; i++) {
                let point = new LatLng(destinations[i].latlng[0], destinations[i].latlng[1]);
                point.name = destinations[i].name;
                point.fromLocalStorage = true;
                newPoints.push(point);
            }
            setDestinations(destinations);
            setPoints(newPoints);
        }

        setLoading(false);

    }, []);

    const saveNewTrip = async () => {

        if(!user){
            return
        }

        const response = await fetch(`http://localhost:5000/api/trips/`, {
            method: 'POST',
            body: JSON.stringify({ tripName, destinations }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            setSaved(true);
            console.log('new trip added');
            setID(json._id);
        } else {
            console.log('uhoh')
        }
    }

    const updateTrip = async () => {

        if(!user){
            return
        }

        const response = await fetch(`http://localhost:5000/api/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ tripName, destinations }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            console.log('trip edited');
        } else {
            console.log('uhoh')
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickSave = async () => {
        setOpen(false);
        if (user) {
            saveNewTrip();
        }
    }

    const handleClick = () => {
        if (!saved) {
            setOpen(true);
        } else {
            updateTrip();
        }
    }

    return (
        <>
            {user && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Name</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter a name for your trip
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="email"
                            fullWidth
                            variant="standard"
                            defaultValue={tripName}
                            onChange={(e) => setTripName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            )}
            {!user && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Signup or login to save trip</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Click the login button in the top right if you already have an account. If you dont have an account, click the signup button.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            )}
            <div className='col-sm-3 destinations overflow-auto'>
                <div className='d-flex justify-content-between'>
                    <h1 className='destinations-header'>Destinations</h1>
                    <Button variant='contained' size='medium' sx={{ width: 100 }} onClick={handleClick}>save</Button>
                </div>
                <ul className='list-group list-group-numbered'>
                    {
                        points.map(point => {
                            //add notes, days, nearby props to be used as default for useState in destination
                            if (point.fromLocalStorage) {
                                //find the point in destinations
                                for (let i = 0; i < destinations.length; i++) {
                                    if (destinations[i].latlng[0] === point.lat && destinations[i].latlng[1] === point.lng) {
                                        return <Destination key={point.lat + point.lng} point={point} destinations={destinations} setDestinations={setDestinations} points={points} setPoints={setPoints} defaultNotes={destinations[i].notes} defaultDays={destinations[i].days} defaultPlaces={destinations[i].places} />
                                    }
                                }
                            } else {
                                //use default vaulues
                                return <Destination key={point.lat + point.lng} point={point} destinations={destinations} setDestinations={setDestinations} points={points} setPoints={setPoints} defaultNotes={''} defaultDays={'0'} defaultPlaces={[]} />
                            }
                        })}
                </ul>
            </div>
        </>
    );
}

export default Destinations;