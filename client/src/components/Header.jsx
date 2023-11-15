import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import useAuthContext from '../hooks/useAuthContext';

function Header() {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClickLogout = () => {
        logout();
    }

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
                            {user &&
                                <Link to="/trips" style={{ textDecoration: "none" }}>
                                    <button className='btn navbar-text nav-link active'>Your Trips</button>
                                </Link>
                            }
                        </li>
                    </ul>
                    <span>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {!user && (
                                <>
                                    <li className="nav-item">
                                        <Link to="/login" style={{ textDecoration: "none" }}>
                                            <span className='navbar-text nav-link active'>Log in</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/signup" style={{ textDecoration: "none" }}>
                                            <span className='navbar-text nav-link active'>Sign up</span>
                                        </Link>
                                    </li>
                                </>
                            )}
                            {user && (
                                <li className="nav-item">
                                    <button className='btn navbar-text nav-link active' onClick={handleClickLogout}>Log out</button>
                                </li>
                            )}
                        </ul>
                    </span>
                </div>

            </div>
        </nav>
    );
}

export default Header;