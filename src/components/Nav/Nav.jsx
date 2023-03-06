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
                {/* icon won't render properly in app */}
                {/* <div class="nav-button-socials">
          <a href="https://www.instagram.com/p/CAVcrA7nwUr/?utm_source=ig_web_copy_link">
            <img
              class="icon"
              src="src/images/instagram-48.png"
              alt="Instagram"
            />
          </a>
        </div> */}
            </div>
      <div class="small-nav" role="navigation">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <a onClick={() => {window.location.href="/"}}><li>Home</li></a>
            <a onClick={() => {window.location.href="/projects"}}><li>Explore Projects</li></a>
            {!loggedIn &&<a onClick={() => {window.location.href="/login"}}><li>Login</li></a>}
            {!loggedIn &&<a onClick={() => {window.location.href="/users"}}><li>Create Account</li></a>}
            {loggedIn &&<a onClick={() => {window.location.href="/create-project"}}><li>Create Project</li></a>}
            {loggedIn && <button onClick={handleClick} className="btn">Sign Out</button>}
          </ul>
        </div>
      </div>
    </nav>
    );
}
export default Nav;

