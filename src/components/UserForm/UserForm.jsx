import React, { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function UserForm() {
    // const { user } = props;
    const authToken = window.localStorage.getItem("token")
    const [loggedIn] = useOutletContext();
    const [users, setUsers] = useState({
        "email": "",
        "username": "",
        "password": ""     
    });

    // enables redirect
    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setUsers((prevUsers) => ({
        ...prevUsers,
        [id]: value,
        }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!loggedIn) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}users/`,
                    {
                    method: "post",
                    headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify(users), 
                }
                );
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                window.location.reload();
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            }
        } 
    };

    return (
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="email">E:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="enter your email"
                    onChange={handleChange}
                />
                </div>
                <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Create a username"
                    onChange={handleChange}
                />
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="create a secure password"
                    onChange={handleChange}
                />
                </div>
                <button type="submit">Create user</button>
            </form>

    );
}

export default UserForm;