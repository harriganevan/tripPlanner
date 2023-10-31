import { Button } from '@mui/material';

function Attraction({ attraction, addToDestination, removeFromDestination, added }) {

    return (
        <div className="card" style={{ width: '100%' }}>
            <img src={attraction.img} className="card-img-top" alt="NO IMAGE AVAILABLE" />
            <div className="card-body">
                <h5 className="card-title">{attraction.name}</h5>
                <p className="card-text">{attraction.description}</p>
                {(!added ? <Button type="button" onClick={() => addToDestination(attraction)}>Add to this destination</Button> : <Button type="button" onClick={() => removeFromDestination(attraction)}>remove</Button>)}
            </div>
        </div>
    )
}

export default Attraction;