import { useState, useEffect } from 'react';
import { Popper, Box, Button, ClickAwayListener } from '@mui/material';
import Details from './Details';

function Destination({ point, points, setPoints, destinations, setDestinations }) {

    const placement = (window.innerWidth < 769 ? 'right' : 'left'); //make popper appear on right for mobile

    //states for finding and adding nearby attractions
    const [nearby, setNearby] = useState([]); //all nearby attractions for destination
    const [nearbyAdded, setNearbyAdded] = useState([]); //attractions added to destination
    const [foundNearby, setFoundNearby] = useState(false); //tracks if api call has already been made for this destination
    const [displayedNearby, setDisplayedNearby] = useState([]); //tracks all seen attractions - should be image and description in each array element = {img: ..., text: ...}

    //states for Destination
    const [notes, setNotes] = useState(''); //custom notes in textbox
    const [days, setDays] = useState(1); //how many days at destination
    const [places, setPlaces] = useState([]); //nearby attractions added - should be image and description in each array element = {img: ..., text: ...}

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

    const pageLength = 5; // number of objects per page

    const lng = point.lng; // place longitude
    const lat = point.lat; // place latitude

    const handleClickNearby = async () => {

        if (!foundNearby) {
            console.log('sending api request');
            const response = await fetch(`http://localhost:5000/api/otmAPI/radius/radius=5000&lon=${lng}&lat=${lat}&rate=3&limit=200&format=json`);
            const nearbyAttractions = await response.json();

            if (response.ok) {
                console.log(nearbyAttractions);
                setNearby(nearbyAttractions);
                setFoundNearby(true);
            }

            // getAttractionDetails(json[0].wikidata);
            if(nearbyAttractions.length > 5){
                getAttractionDetails(nearbyAttractions[0].wikidata)
                .then(getAttractionDetails(nearbyAttractions[1].wikidata)
                .then(getAttractionDetails(nearbyAttractions[2].wikidata)
                .then(getAttractionDetails(nearbyAttractions[3].wikidata)
                .then(getAttractionDetails(nearbyAttractions[4].wikidata)))));
            }
        }

        console.log(nearby);
    }

    //make async function that gets image - call it 5 times from somewhere else
    const getAttractionDetails = async (wikidata) => {
        const response = await fetch(`http://localhost:5000/api/details/${wikidata}`);
        const json = await response.json();
        console.log(json);
    }

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
                        <Details notes={notes} setNotes={setNotes} point={point} handleClickNearby={handleClickNearby} nearby={nearby} />
                    </Box>
                </ClickAwayListener>
            </Popper>
            <Button type="button" onClick={() => {
                setDestinations(
                    destinations.filter((destination) =>
                        !(destination.latlng[0] === point.lat && destination.latlng[1] === point.lng)
                    )
                );
                setPoints(
                    points.filter((points) =>
                        !(points.lat === point.lat && points.lng === point.lng)
                    )
                );
            }}>
                delete destination
            </Button>
        </li>
    );
}

export default Destination;