import { Link } from 'react-router-dom';

function Header() {

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="navbar-brand">Trip Planner</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/trips" style={{ textDecoration: "none" }}>
                                <span className='navbar-text nav-link active'>Your Trips</span>
                            </Link>
                        </li>
                    </ul>
                    <span>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" style={{ textDecoration: "none" }}>
                                    <span className='navbar-text nav-link active'>Login</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" style={{ textDecoration: "none" }}>
                                    <span className='navbar-text nav-link active'>Signup</span>
                                </Link>
                            </li>
                        </ul>
                    </span>
                </div>

            </div>
        </nav>
    );
}

export default Header;