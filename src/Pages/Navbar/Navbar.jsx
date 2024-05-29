import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="nav">
            <Link className="logo" to="/Homepage">b</Link>
            <ul className="ul">
                <li className="li">
                    <Link className="link" to="/Experience">Experience</Link>
                </li>
                <li className="li">
                    <Link className="link" to="/Mywork">My Work</Link>
                </li>
                <li className="li">
                    <Link className="link" to="/Contact">Contact</Link>
                </li>
                <li className="li">
                    <Link className="link" to="/Login">Login</Link>
                </li>
                <li className="li">
                    <Link className="link" to="/Register">Register</Link>
                </li>
                <li className="li">
                    <Link className="link" to="/Admin">Admin</Link>
                </li>

            </ul>
        </nav>
    );
}

export default Navbar;