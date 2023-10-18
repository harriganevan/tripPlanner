import { useState, useEffect } from 'react';
import { Popper, Box, Button, ClickAwayListener } from '@mui/material';
import Details from './Details';

function Destination({ point, destinations, setDestinations }) {

    const placement = (window.innerWidth < 769 ? 'right' : 'left'); //make popper appear on right for mobile

    //combine these into one state object {notes: , days: }?
    const [notes, setNotes] = useState('');
    const [days, setDays] = useState(1);
    const [places, setPlaces] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null); //anchor for poppers

    useEffect(() => {

        var seen = false;

        //if point.myID is in destinations
        const newDestinations = destinations.map((destination) => {
            if (destination.ID === point.myId) {
                seen = true;
                return {
                    ID: point.myId,
                    latlng: [point.lat, point.lng],
                    days: days,
                    notes: notes,
                    places: places,
                }
            }
            else {
                return destination;
            }
        });

        if (seen) {
            setDestinations(newDestinations);
        } else { //new point
            setDestinations([...destinations, {
                ID: point.myId,
                latlng: [point.lat, point.lng],
                days: days,
                notes: notes,
                places: places,
            }]);
        }

    }, [days, notes, places]);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <li className='list-group-item'>
            {point.lat + ", " + point.lng}<br />
            <Button aria-describedby={id} type="button" onClick={handleClick}>
                Edit Destination
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} placement={placement} className='popper'>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} className="box">
                        add stuff to your {point.lat + ", " + point.lng} here <br /><br />
                        <Details notes={notes} setNotes={setNotes} />
                    </Box>
                </ClickAwayListener>
            </Popper>
        </li>
    );

}

export default Destination;