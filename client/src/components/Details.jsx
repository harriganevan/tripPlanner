import { TextField, Button } from '@mui/material';

function Details({ notes, setNotes }) {

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
            <Button>find nearby attractions</Button>
        </>
    );

}

export default Details;