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
            <div class="main-nav">
                {!loggedIn && <Link to="/login" className="btn">Login</Link>}
                {!loggedIn && <Link to="/users" className="btn">Create Account</Link>}
                {loggedIn && <button onClick={handleClick} className="btn">Sign Out</button>}
            {loggedIn && <Link to="/create-project" className="btn">Create Project</Link>}
               <div id="nav-always-displayed">
               <Link to="/projects" className="btn">Explore Projects</Link>
               </div>
                <div id="nav-controls">
                    <Link to="/" >Home</Link>
                </div>
            </div>
      <div class="small-nav" role="navigation">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <Link to="/"><li>Home</li></Link>
            <Link to="/projects"><li>Explore Projects</li></Link>
            {!loggedIn && <Link to="/login"><li>Login</li></Link>}
            {!loggedIn && <Link to="/users"><li>Create Account</li></Link>}
            {loggedIn && <Link to="/create-project"><li>Create Project</li></Link>}
            {loggedIn && <button onClick={handleClick} className="btn">Sign Out</button>}
          </ul>
        </div>
      </div>
    </nav>
    );
}
export default Nav;

