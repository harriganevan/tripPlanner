import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function TripDetails({ trip, setTrigger, trigger }) {

    const { user } = useAuthContext();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const navigate = useNavigate();

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    }

    const handleDeleteClick = () => {
        setDeleteOpen(true);
    }

    const handleDeleteClickFinalYes = async () => {
        if (!user) {
            return
        }

        try {
            const response = await fetch(`https://tripplanner-api.onrender.com/api/${trip._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                setTrigger(!trigger);
            } else {
                throw new Error(response.status + ' ' + json.error);
            }
        } catch (error) {
            console.error(error);
        }

    }

    const handleDeleteClickFinalNo = () => {
        setDeleteOpen(false);
    }

    const handleOpenClick = async () => {

        if (!user) {
            return
        }

        try {
            const response = await fetch(`https://tripplanner-api.onrender.com/api/${trip._id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                localStorage.setItem('id', json._id);
                localStorage.setItem('destinations', JSON.stringify(json.destinations));
                navigate('/');
            } else {
                throw new Error(response.status + ' ' + json.error);
            }
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this trip? This cannot be undone.
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleDeleteClickFinalNo}>No</Button>
                        <Button onClick={handleDeleteClickFinalYes}>Yes</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <h5 style={{ display: 'inline' }}>{trip.name}</h5> <p style={{ display: 'inline' }}>: {trip.destinations.map((destination, index) => {
                if (index != trip.destinations.length - 1) {
                    return (destination.name + ' -> ');
                } else {
                    return (destination.name);
                }
            })}</p><br></br>
            <Button onClick={handleDeleteClick}>Delete</Button>
            <Button onClick={handleOpenClick}>Open</Button>
        </>
    );
}

export default TripDetails;