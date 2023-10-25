function Attraction({ img, name, descr }) {

    return (
        <div className="card" style={{width: '100%'}}>
            <img src={img} className="card-img-top" alt="NO IMAGE AVAILABLE" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{descr}</p>
                <a href="#" className="btn btn-primary">Add to destination</a>
            </div>
        </div>
    )
}

export default Attraction;