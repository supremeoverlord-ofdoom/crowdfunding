//if you have jsx in the file extension you don't need import react at the top
import { useState, useEffect } from "react";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

function HomePage() {
  //State
  const [projectList, setProjectList] = useState([]);
  
  // have to be really careful what you put in the array can cause a loop of death
  useEffect(() => {   //always runs the first time after the UI is rendered
    fetch(`${import.meta.env.VITE_API_URL}projects`)
    .then((results) => {
    return results.json();
    })
    .then((data) => {
    setProjectList(data);
    });
}, []);

    return (
    <div id="page-container">
    <div id="intro-section">
    <h1>Gnome My Enemy</h1>
    <h2>Gnome your own journey</h2>
    <h3>The ultimate crowdfunding platform to source gnomes for your epic gnomeing schemes </h3>
    </div>
    <div id="projects-section">
    <h4>Discover Gnome My Enemy Projects</h4>
    <div id="project-list">
      {projectList.map((project, key) => {
        return <ProjectCard key={key} projectData={project} />;
      })}
    </div>
    </div>
    </div>
  );
}


export default HomePage;


