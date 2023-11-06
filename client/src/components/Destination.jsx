import { useState, useEffect } from 'react';
import { Popper, Box, Button, ClickAwayListener, Input } from '@mui/material';
import Details from './Details';

function Destination({ point, points, setPoints, destinations, setDestinations }) {

    const placement = (window.innerWidth < 769 ? 'right' : 'left'); //make popper appear on right for mobile

    const [nearby, setNearby] = useState([]); //all nearby attractions for destination
    const [displayedNearby, setDisplayedNearby] = useState([]); //tracks attractions to display
    const [foundNearby, setFoundNearby] = useState(false); //tracks if api call has already been made for this destination
    const [offset, setOffset] = useState(0)

    const [notes, setNotes] = useState(''); //custom notes in textbox
    const [days, setDays] = useState('0'); //how many days at destination
    const [nearbyAdded, setNearbyAdded] = useState([]); //attractions added to destination

    const [anchorEl, setAnchorEl] = useState(null); //anchor for poppers

    var displayedAttractions = [];

    useEffect(() => {

        var seen = false;
        
        const newDestinations = destinations.map((destination) => {
            if (destination.latlng[0] === point.lat && destination.latlng[1] === point.lng) {
                seen = true;
                return {
                    name: point.name,
                    latlng: [point.lat, point.lng],
                    days: days,
                    notes: notes,
                    places: nearbyAdded,
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
                name: point.name,
                latlng: [point.lat, point.lng],
                days: days,
                notes: notes,
                places: nearbyAdded,
            }]);
        }

    }, [days, notes, nearbyAdded]);

    const removeDuplicates = (destinations) => {
        const set = new Set();

        let noDuplicates = [];

        for (let i = 0; i < destinations.length; i++) {
            if (destinations[i].wikidata && !set.has(destinations[i].wikidata)) {
                noDuplicates.push(destinations[i]);
                set.add(destinations[i].wikidata);
            }
        }

        return noDuplicates;
    }

    const getFirstNearbyPage = async (nearbyNoDupes) => {
        for (let i = 0; i < 5; i++) {
            if (nearbyNoDupes[offset + i]) {
                await (getAttractionDetails(nearbyNoDupes[offset + i].wikidata, nearbyNoDupes[offset + i].name));
            }
        }
        await (setDisplayedNearby(displayedAttractions));
    }

    const getNearbyPage = async (offset) => {
        for (let i = 0; i < 5; i++) {
            if (nearby[offset + i]) {
                await (getAttractionDetails(nearby[offset + i].wikidata, nearby[offset + i].name));
            }
        }
        await (setDisplayedNearby(displayedAttractions));
    }

    const handleClickNearby = async () => {

        if (!foundNearby) {
            console.log('sending api request');
            const response = await fetch(`http://localhost:5000/api/otmAPI/radius/radius=5000&lon=${point.lng}&lat=${point.lat}&rate=3&limit=200&format=json`);
            const nearbyAttractions = await response.json();

            if (response.ok) {
                var nearbyNoDupes = removeDuplicates(nearbyAttractions);
                console.log(nearbyNoDupes);
                getFirstNearbyPage(nearbyNoDupes);
                setNearby(nearbyNoDupes);
                setFoundNearby(true);
            }

        }

        console.log(nearby);
        console.log(displayedNearby);
    }

    //make async function that gets image - call it 5 times from somewhere else
    const getAttractionDetails = async (wikidata, name) => {
        console.log('sending api request');
        const response = await fetch(`http://localhost:5000/api/details/${wikidata}`);
        let json = await response.json();
        json = { ...json, name: name };
        displayedAttractions.push(json);
    }

    const addToDestination = (attraction) => {
        var seen = false;
        for (let i = 0; i < nearbyAdded.length; i++) {
            if (nearbyAdded[i].name == attraction.name) {
                seen = true;
            }
        }
        if (!seen) {
            setNearbyAdded([...nearbyAdded, attraction]);
        }
        console.log(nearbyAdded)
    }

    const removeFromDestination = (attraction) => {
        setNearbyAdded(
            nearbyAdded.filter((nearby) =>
                !(nearby.name == attraction.name)
            )
        );
    }

    const handleClickNext = () => {
        setDisplayedNearby([]);
        getNearbyPage(offset + 5);
        setOffset(offset + 5);
    }

    const handleClickPrev = () => {
        if (offset > 0) {
            setDisplayedNearby([]);
            getNearbyPage(offset - 5);
            setOffset(offset - 5);
        }
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
            {point.name}<br />
            <Button aria-describedby={id} type="button" onClick={handleClick}>
                Edit Destination
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} placement={placement} className='popper'>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} className="box">
                        add stuff to your {point.name} destination here <br /><br />
                        <div className='d-flex justify-conntent-start'>
                            <Input type='number'
                                defaultValue={days}
                                onChange={(e) => Number(e.target.value) > 0 ? setDays(e.target.value) : setDays('0')} />
                            <p>Days</p>
                        </div>
                        <br />
                        <Details notes={notes} setNotes={setNotes} point={point} handleClickNearby={handleClickNearby} handleClickNext={handleClickNext} handleClickPrev={handleClickPrev} nearby={displayedNearby} nearbyAdded={nearbyAdded} addToDestination={addToDestination} removeFromDestination={removeFromDestination} />
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