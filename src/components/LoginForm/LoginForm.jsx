import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import './LoginForm.css'

function LoginForm() {
    const [, setLoggedIn] = useOutletContext();


    //State

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    //hooks
    const navigate = useNavigate();

    //Actions
    const handleChange = (event) => {
        const { id, value } = event.target;

        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };
    
    const postData = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}api-token-auth/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        return response.json();
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
          const { token } = await postData();
          window.localStorage.setItem("token", token);
          setLoggedIn(true);
          navigate("/");
        }
      };

      useEffect(() => {
        const loginButton = document.querySelector("#login-button");
        const snakeBorder = document.querySelector(".snake-border");
    
        const handleClick = () => {
          snakeBorder.classList.add("break-apart");
        };
    
        loginButton.addEventListener("click", handleClick);
    
        return () => {
          loginButton.removeEventListener("click", handleClick);
        };
      }, []);

      return (
        <form onSubmit={handleSubmit} class="login">
        <h1>Gnome My Enemy</h1>
          <div className="snake-border">
            <div className="border-piece top"></div>
            <div className="border-piece right"></div>
            <div className="border-piece bottom"></div>
            <div className="border-piece left"></div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                onChange={handleChange}
                placeholder="enter username"
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                placeholder="enter password"
              />
            </div>
            <button id="login-button" type="submit">
              Login
            </button>
          </div>
        </form>
      );
    }
    
    export default LoginForm;
  