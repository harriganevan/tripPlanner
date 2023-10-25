import { TextField, Button, Popper, Box, ClickAwayListener } from '@mui/material';
import { useState, useEffect } from 'react';
import Attraction from './Attraction';

function Details({ notes, setNotes, point, handleClickNearby, nearby }) {

    //add attractions prop

    const placement = (window.innerWidth < 769 ? 'right' : 'left'); //make popper appear on right for mobile

    const [anchorEl, setAnchorEl] = useState(null); //anchor for poppers

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
                id="outlined-textarea"
                label="Add details"
                onChange={(e) => setNotes(e.target.value)}
                defaultValue={notes}
                multiline
            />
            <br />
            <Button aria-describedby={id} type="button" onClick={handleClick}>find nearby attractions</Button>
            {/* nearbyAdded state from Destination */}
            <Popper id={id} open={open} anchorEl={anchorEl} placement={placement} className='popper'>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} className="box-attractions">
                        <div className='col-sm-3 attractions overflow-auto' style={{width: '100%'}}>
                            <ul className='list-group list-group-numbered'>
                                <Attraction img={'https://upload.wikimedia.org/wikipedia/commons/0/01/Prudential_Tower_Panorama.jpg'} descr={'this is a place'} name={'name'} />
                                <Attraction img={'https://upload.wikimedia.org/wikipedia/commons/8/80/Alexandria_Torpedo_Factory8.jpg'} descr={'this is a place'} name={'name'} />
                                <Attraction img={'https://upload.wikimedia.org/wikipedia/commons/8/80/Alexandria_Torpedo_Factory8.jpg'} descr={'this is a place'} name={'name'} />
                                <Attraction img={'https://upload.wikimedia.org/wikipedia/commons/8/80/Alexandria_Torpedo_Factory8.jpg'} descr={'this is a place'} name={'name'} />
                                <Attraction img={'https://upload.wikimedia.org/wikipedia/commons/8/80/Alexandria_Torpedo_Factory8.jpg'} descr={'this is a place'} name={'name'} />
                            </ul>
                        </div>
                    </Box>
                </ClickAwayListener>
            </Popper>
        </>
    );
}

export default Details;