import { TextField, Button, Popper, Box, ClickAwayListener } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import Attraction from './Attraction';

function Details({ notes, setNotes, handleClickNearby, nearby, foundNearby, nearbyAdded, handleClickNext, handleClickPrev, addToDestination, removeFromDestination, offset, total }) {

    const placement = (window.innerWidth < 769 ? 'right' : 'left'); //make popper appear on right for mobile

    const [anchorEl, setAnchorEl] = useState(null); //anchor for poppers
    const [foundNearbyNotEmpty, setFoundNearbyNotEmpty] = useState(false);

    useEffect(() => {
        setFoundNearbyNotEmpty(foundNearbyNotEmpty || nearby.length !== 0 && foundNearby)
    }, [nearby])

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        if (!open) { handleClickNearby(); }
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const id = open ? 'simple-popper' : undefined;

    return (
        <>
            <TextField
                name='notes'
                className='textfield'
                id="outlined-textarea"
                label="Add details"
                onChange={(e) => setNotes(e.target.value)}
                defaultValue={notes}
                multiline={true}
                rows={(placement == 'right') ? 3 : 6}
            />
            <br />
            <Button aria-describedby={id} type="button" onClick={handleClick}>find nearby attractions</Button>
            <Popper id={id} open={open} anchorEl={(placement == 'left') ? anchorEl : null} placement={placement} className='popper'>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} className="box-attractions">
                        {(placement == 'right') && <><button onClick={() => { setAnchorEl(null) }}>Close</button><br /></>}
                        <div className='d-flex justify-content-between'>
                            <Button onClick={handleClickPrev}>previous</Button>
                            {offset} - {offset + 5} of {total}
                            <Button onClick={handleClickNext}>next</Button>
                        </div>
                        <div className='overflow-auto' style={{ width: '100%' }}>
                            {(nearby.length === 0 && foundNearby && !foundNearbyNotEmpty) ? 'no nearby attractions' : (nearby.length === 0 ? 'loading...' : null)}
                            <ul className='list-group list-group-numbered'>
                                {nearby.map((attraction, index) =>
                                    <Attraction key={attraction.img + index} attraction={attraction} addToDestination={addToDestination} removeFromDestination={removeFromDestination} added={false} />
                                )}
                            </ul>
                        </div>
                    </Box>
                </ClickAwayListener>
            </Popper>
            <div className='overflow-auto' style={{ width: '100%' }}>
                <ul className='list-group list-group-numbered'>
                    {nearbyAdded.map((attraction, index) =>
                        <Attraction key={attraction.img + index} attraction={attraction} addToDestination={addToDestination} removeFromDestination={removeFromDestination} added={true} />
                    )}
                </ul>
            </div>
        </>
    );
}

export default Details;