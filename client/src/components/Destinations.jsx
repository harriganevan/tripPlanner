import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Destination from './Destination.jsx';

function Destinations({ points, setPoints }) {

    const [open, setOpen] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [tripName, setTripName] = useState();
    const [saved, setSaved] = useState(false);
    const [id, setID] = useState(null);

    console.log(destinations);

    const saveNewTrip = async () => {
        //check if logged in
        //if user is not null
        setSaved(true);
        const response = await fetch(`http://localhost:5000/api/trips/`, {
            method: 'POST',
            body: JSON.stringify({ tripName, destinations }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            console.log('new trip added');
            setID(json._id);
        } else {
            console.log('uhoh')
        }
    }

    const updateTrip = async () => {
        const response = await fetch(`http://localhost:5000/api/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ tripName, destinations }),
            headers: {
                'Content-Type': 'application/json'
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
        saveNewTrip();
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
            <div className='col-sm-3 destinations overflow-auto'>
                <div className='d-flex justify-content-between'>
                    <h1 className='destinations-header'>Destinations</h1>
                    <Button variant='contained' size='medium' sx={{ width: 100 }} onClick={handleClick}>save</Button>
                </div>
                <ul className='list-group list-group-numbered'>
                    {points.map(point =>
                        <Destination key={point.lat + point.lng} point={point} destinations={destinations} setDestinations={setDestinations} points={points} setPoints={setPoints} />
                    )}
                </ul>
            </div>
        </>
    );
}

export default Destinations;