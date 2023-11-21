import { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Destination from './Destination.jsx';
import useAuthContext from '../hooks/useAuthContext.jsx';
import { useAlert } from 'react-alert';
import { LatLng } from 'leaflet';

function Destinations({ points, setPoints }) {

    //if loaded from trips menu - add id to local storage
    //then if local storage has id - setID(localStorage'id')

    const { user } = useAuthContext();
    const alert = useAlert();

    const [saveOpen, setSaveOpen] = useState(false);
    const [clearOpen, setClearOpen] = useState(false);
    const [newOpen, setNewOpen] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [tripName, setTripName] = useState();
    const [saved, setSaved] = useState(false);
    const [id, setID] = useState(null);
    const [loading, setLoading] = useState(true); //waits for useEffect to finish

    if (!loading) {
        localStorage.setItem('destinations', JSON.stringify(destinations));
    }

    useEffect(() => {

        if (localStorage.getItem('id')) {
            setID(localStorage.getItem('id'));
            setSaved(true);
        } else {
            setSaved(false)
        }
        const destinations = JSON.parse(localStorage.getItem('destinations'));
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

    }, [user]);

    const saveNewTrip = async () => {
        if (!user) {
            return
        }

        try {
            const response = await fetch(`http://localhost:5000/api/trips/`, {
                method: 'POST',
                body: JSON.stringify({ tripName, destinations }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                setSaved(true);
                setID(json._id);
                alert.show('save successful');
            } else {
                throw new Error(response.status + ' ' + json.error);
            }
        } catch (error) {
            console.error(error);
        }

    }

    const updateTrip = async () => {

        if (!user) {
            return
        }

        try {
            const response = await fetch(`http://localhost:5000/api/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ tripName, destinations }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                alert.show('save successful');
            } else {
                throw new Error(response.status + ' ' + json.error);
            }
        } catch (error) {
            console.error(error);
        }

    }

    //handle save click
    const handleSaveClose = () => {
        setSaveOpen(false);
    }

    const handleSaveClick = () => {
        if (!saved) {
            setSaveOpen(true);
        } else {
            updateTrip();
        }
    }

    const handleSaveClickFinal = () => {
        setSaveOpen(false);
        if (user) {
            saveNewTrip();
        }
    }

    //handle clear click
    const handleClearClose = () => {
        setClearOpen(false);
    }

    const handleClearClick = () => {
        setClearOpen(true);
    }

    const handleClearClickFinalYes = () => {
        setPoints([]);
        setDestinations([]);
        setClearOpen(false);
    }

    const handleClearClickFinalNo = () => {
        setClearOpen(false);
    }

    //handle new click
    const handleNewClose = () => {
        setNewOpen(false);
    }

    const handleNewClick = () => {
        setNewOpen(true);
    }

    const handleNewClickFinalYes = () => {
        setPoints([]);
        setDestinations([]);
        setSaved(false);
        if (localStorage.getItem('id')) {
            updateTrip();
        }
        localStorage.removeItem('destinations');
        localStorage.removeItem('id');
        setNewOpen(false);
    }

    const handleNewClickFinalNo = () => {
        setNewOpen(false);
    }

    return (
        <>
            {user && (
                <Dialog open={saveOpen} onClose={handleSaveClose}>
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
                        <Button onClick={handleSaveClickFinal}>Save</Button>
                    </DialogActions>
                </Dialog>
            )}
            {!user && (
                <Dialog open={saveOpen} onClose={handleSaveClose}>
                    <DialogTitle>Sign up or Log in to save trip</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Click the 'Log in' button in the top right if you already have an account. If you don't have an account, click the 'Sign up' button.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            )}
            <Dialog open={clearOpen} onClose={handleClearClose}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to clear all destinations?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClearClickFinalNo}>No</Button>
                        <Button onClick={handleClearClickFinalYes}>Yes</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Dialog open={newOpen} onClose={handleNewClose}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to start a new trip? This trip will be saved.
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleNewClickFinalNo}>No</Button>
                        <Button onClick={handleNewClickFinalYes}>Yes</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <div className='col-sm-3 destinations '>
                <div className='d-flex justify-content-between destinations-header'>
                    <h1>Destinations</h1>
                    <Button variant='contained' size='medium' sx={{ width: 100, marginTop: '5px', marginBottom: '5px' }} onClick={handleSaveClick}>save</Button>
                </div>
                <div className='overflow-auto destinations-numbers'>
                    <ul className='list-group list-group-numbered'>
                        {
                            points.map(point => {
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
                <div className='footer'>
                    <Button className='footer-button' color='error' onClick={handleClearClick}>Clear Destinations</Button>
                    {user &&
                        <Button className='footer-button' color='error' onClick={handleNewClick}>Start New Trip</Button>
                    }
                </div>
            </div>
        </>
    );
}

export default Destinations;