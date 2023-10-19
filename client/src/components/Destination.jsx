import { useState, useEffect } from 'react';
import { Popper, Box, Button, ClickAwayListener } from '@mui/material';
import Details from './Details';

function Destination({ point, points, setPoints, destinations, setDestinations }) {

    const placement = (window.innerWidth < 769 ? 'right' : 'left'); //make popper appear on right for mobile

    const [notes, setNotes] = useState('');
    const [days, setDays] = useState(1);
    const [places, setPlaces] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null); //anchor for poppers

    useEffect(() => {

        var seen = false;

        const newDestinations = destinations.map((destination) => {
            if (destination.latlng[0] === point.lat && destination.latlng[1] === point.lng) {
                seen = true;
                return {
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
            <Button aria-describedby={id} type="button" onClick={() => {
                setDestinations(
                    destinations.filter((destination, index) =>
                        !(destination.latlng[0] === point.lat && destination.latlng[1] === point.lng)
                    )
                );
                setPoints(
                    points.filter((points, index) =>
                        !(points.lat === point.lat && points.lng === point.lng)
                    )
                );
                console.log(points)
            }}>
                delete destination
            </Button>
        </li>
    );

}

export default Destination;