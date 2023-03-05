import React, { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import moment from "moment"
import './ProjectForm.css'

function ProjectForm() {
    // const { project } = props;
    const authToken = window.localStorage.getItem("token")
    const [loggedIn] = useOutletContext();
    const [projects, setProjects] = useState({
        // from JSON Raw Body in Deployed (default values)
        // this is what you return at the bottom - your list might look different to mine. If so, don't worry!
        "title": "",
        "description": "",
        "goal": null,
        "image": "",
        "is_open": true,
        "date_created": moment().toISOString(new Date()),
        // "supporter_private": null,       
    });

    // enables redirect
    const navigate = useNavigate();
    const { id } = useParams();

    // copies the original data, replaces the old data for each id/value pair to what is input in the form (changes state). this will be submitted to API below
    const handleChange = (event) => {
        const { id, value } = event.target;
        setProjects((prevProjects) => ({
        ...prevProjects,
        [id]: value,
        }));
    };

    // submit the new data (state change) from handleChange.
        // POST has been moved from separate function to be embedded and actioned when the submit button is pressed. 
    const handleSubmit = async (event) => {
        event.preventDefault();

        // if the auth token exists (if logged in) 
            // TRY to POST the data to your deployed, using fetch.
            // send the token with it to authorise the ability to post
                // wait for the response - 
                // if successful, return the JSON payload and reload the page with the data
                // if not successful, CATCH the error and display as a pop up alert
        // if not logged in, redirect to login page

        if (loggedIn) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}projects/`,
                    {
                    method: "post",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify(projects), 
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
        } else {
        // redirect to login page
        navigate(`/login`);
        }
    };

    return (
        <>
        {loggedIn ? 
            <div>
            <form onSubmit={handleSubmit} class="create-project">
            <h1>Gnome My Enemy</h1>
                <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder="title of project"
                    onChange={handleChange}
                />
                </div>
                <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    type="text"
                    id="description"
                    placeholder="describe your gnoming project"
                    onChange={handleChange}
                />
                </div>
                <div>
                <label htmlFor="goal">Goal:</label>
                <input
                    type="number"
                    id="goal"
                    placeholder="number of gnomes"
                    onChange={handleChange}
                />
                </div>
                <div>
                <label htmlFor="image">Image URL:</label>
                <input 
                    type="text"
                    id="image" 
                    placeholder="a picture is worth 1000 gnomes"
                    onChange={handleChange} 
                />
                </div>
                <div id="is-open">
                <label htmlFor="is_open">Open Project:</label>
                <input 
                    type="checkbox"
                    id="is_open" 
                    onChange={handleChange} 
                />
                </div>
                <button type="submit">Create Project</button>
            </form>
            </div>
        : (<p>Login to create a project</p>) }
        </>

    );
}

export default ProjectForm;