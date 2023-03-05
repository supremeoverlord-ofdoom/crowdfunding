import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import './ProjectPage.css'
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
    }, [id]);

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
        <h5>Project created on: {formattedDate} - {formattedDateGnomeEra}</h5>
        <h5>{`Goal: ${project.goal} Gnomes`}</h5>
        <h5>{`Total Gnomes Pledged: ${project.total}`}</h5>
        <h5>{`Open To New Pledges: ${project.is_open}`}</h5>
        <h5>Project Description</h5>
        <p>{project.description}</p>
        <div>
            <img src={project.image} />
        </div>
        <h2>Pledges:</h2>
        <ul>
            {project.pledges.map((pledgeData, key) => {
            return (
                <li>
                {pledgeData.amount} gnomes donated from {pledgeData.supporter_public} - "{pledgeData.comment}"
                </li>
                );
            })}
        </ul>
    <PledgeForm project={project}/> 
                </div>
    
            );
}


export default ProjectPage;

