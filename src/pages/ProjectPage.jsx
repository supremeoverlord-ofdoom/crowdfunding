import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 

// extra libraries 
import { format } from "date-fns";

function ProjectPage() {
    // State
    const [projectData, setProjectData] = useState({ pledges: [] });
    
    //hooks
    const { id } = useParams();

    //Effects
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
        setProjectData(data);
        });
    }, []);

    const formattedDate = projectData.date_created
    ? format(new Date(projectData.date_created), "do MMMM y - GGGG G")
    : "";

    return (
        <div>
        <h2>{projectData.title}</h2>
        <h3>Project created on: {formattedDate}</h3>

        <h3>{`Total gnomes pledged: ${projectData.total}`}</h3>
        <h3>{`Open to new pledges: ${projectData.is_open}`}</h3>
        <h3>Project Description</h3>
        <p>{projectData.description}</p>
        <div>
            <img src={projectData.image} />
        </div>
        <h3>Pledges:</h3>
        <ul>
            {projectData.pledges.map((pledgeData, key) => {
            return (
                <li>
                {pledgeData.amount} gnomes donated from {pledgeData.supporter_public} - "{pledgeData.comment}"
                </li>
                );
            })}
        </ul>
    </div>
);
}


export default ProjectPage;

