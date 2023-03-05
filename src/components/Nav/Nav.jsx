import { Link } from "react-router-dom";
import './Nav.css'

function Nav(props) {
    const { loggedIn, setLoggedIn } = props
    const handleClick = () => {
        window.localStorage.removeItem("token")
        setLoggedIn(false)
    }
    return (
        <nav>
            <div id="nav-right">
                {!loggedIn && <Link to="/login" className="btn">Login</Link>}
                {!loggedIn && <Link to="/users" className="btn">Create Account</Link>}
                {loggedIn && <button onClick={handleClick} className="btn">Sign Out</button>}
            {loggedIn && <Link to="/projects" className="btn">Create Project</Link>}
                <div id="nav-controls">
                    <Link to="/" >Home</Link>
                </div>
            </div>
        </nav>
    );
}
export default Nav;

