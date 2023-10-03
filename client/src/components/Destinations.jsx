function Destinations({ points }){
    return (
        <div className='col-sm-3'>
            <h1>destinations</h1>
            <ul className='list-group list-group-numbered'>
                {points.map(point => <li className='list-group-item'>
                    {point.lat + ", " + point.lng}
                </li>)}
            </ul>
        </div>
    );
}

export default Destinations