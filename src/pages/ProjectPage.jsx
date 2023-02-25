import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 

//components
import PledgeForm from "../components/PledgeForm/PledgeForm";


// extra libraries 
import { format } from "date-fns";

function ProjectPage() {
    // State
    const [project, setProject] = useState({ pledges: [] });
    
    //hooks
    const { id } = useParams();

    // Effects
    // ---- ASYNC change
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}projects/${id}`);
                const data = await response.json();
                setProject(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProject();
}, []);

    //formatting the dates
    const formattedDate = project.date_created
    ? format(new Date(project.date_created), "do MMMM y")
    : "";

    // this is the dumb but I love it - changing era to gnome version
    const formattedDateEra = project.date_created
    ? format(new Date(project.date_created), "GGGG")
    : "";

    const formattedDateGnomeEra = formattedDateEra.indexOf("Anno Domini") > -1 ? "Anno Gnome (AG)"
    : formattedDateEra.indexOf("Before Christ") > -1 ? "Before Gnome (BG)"
    : "";

    return (
        <div className="project-detail">
        <h2>{project.title}</h2>
        <h3>Project created on: {formattedDate} - {formattedDateGnomeEra}</h3>

        <h3>{`Total gnomes pledged: ${project.total}`}</h3>
        <h3>{`Open to new pledges: ${project.is_open}`}</h3>
        <h3>Project Description</h3>
        <p>{project.description}</p>
        <div>
            <img src={project.image} />
        </div>
        <h3>Pledges:</h3>
        <ul>
            {project.pledges.map((pledgeData, key) => {
            return (
                <li>
                {pledgeData.amount} gnomes donated from {pledgeData.supporter_public} - "{pledgeData.comment}"
                </li>
                );
            })}
        </ul>
    <PledgeForm project={project} /> 
                </div>
    
            );
}


export default ProjectPage;

