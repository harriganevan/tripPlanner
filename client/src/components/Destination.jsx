import { useState, useEffect, useRef } from 'react';
import { Popper, Box, Button, ClickAwayListener, Input } from '@mui/material';
import Details from './Details';

function Destination({ point, points, setPoints, destinations, setDestinations, defaultNotes, defaultDays, defaultPlaces }) {

    const placement = (window.innerWidth < 769 ? 'right' : 'left'); //make popper appear on right for mobile

    // const [nearby, setNearby] = useState([]); //all nearby attractions for destination
    const nearby = useRef([]);
    const [displayedNearby, setDisplayedNearby] = useState([]); //tracks attractions to display
    const [foundNearby, setFoundNearby] = useState(false); //tracks if api call has already been made for this destination
    const [offset, setOffset] = useState(0)

    const [notes, setNotes] = useState(defaultNotes); //custom notes in textbox
    const [days, setDays] = useState(defaultDays); //how many days at destination
    const [nearbyAdded, setNearbyAdded] = useState(defaultPlaces); //attractions added to destination

    const [anchorEl, setAnchorEl] = useState(null); //anchor for poppers

    const displayedAttractions = useRef([]);

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

    const getNearbyPage = async (offset) => {
        displayedAttractions.current = [];
        for (let i = 0; i < 5; i++) {
            if (nearby.current[offset + i]) {
                await (getAttractionDetails(nearby.current[offset + i].wikidata, nearby.current[offset + i].name));
            }
        }
        setDisplayedNearby(displayedAttractions.current);
        setFoundNearby(true);
    }

    const handleClickNearby = async () => {
        if (!foundNearby) {
            try {
                const response = await fetch(`http://localhost:5000/api/otmAPI/radius/radius=5000&lon=${point.lng}&lat=${point.lat}&rate=3&limit=200&format=json`);
                const json = await response.json();
                if (response.ok) {
                    let nearbyNoDupes = removeDuplicates(json);
                    nearby.current = nearbyNoDupes;
                    getNearbyPage(offset);
                } else {
                    throw new Error(response.status + ' ' + json.error);
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    const getAttractionDetails = async (wikidata, name) => {
        try {
            const response = await fetch(`http://localhost:5000/api/details/${wikidata}`);
            if (response.ok) {
                let json = await response.json();
                json = { ...json, name: name };
                displayedAttractions.current.push(json);
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            console.error(error);
        }
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
        setAnchorEl(document.getElementsByClassName('destinations-header')[0]);
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
            <Popper id={id} open={open} anchorEl={(placement == 'left') ? anchorEl : null} placement={placement} className='popper'>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} className="box">
                        {(placement == 'right') && <><button onClick={() => { setAnchorEl(null) }}>Close</button><br /></>}
                        add stuff to your {point.name} destination here <br /><br />
                        {/* move this to details? */}
                        <div className='d-flex'>
                            <Input type='number'
                                defaultValue={days}
                                name='days'
                                onChange={(e) => Number(e.target.value) > 0 ? setDays(e.target.value) : setDays('0')} />
                            <p style={{ marginBottom: 0 }}>Days</p>
                        </div>
                        <br />
                        <Details notes={notes} setNotes={setNotes} point={point} handleClickNearby={handleClickNearby} handleClickNext={handleClickNext} handleClickPrev={handleClickPrev} nearby={displayedNearby} foundNearby={foundNearby} nearbyAdded={nearbyAdded} addToDestination={addToDestination} removeFromDestination={removeFromDestination} offset={offset} total={nearby.current.length} />
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