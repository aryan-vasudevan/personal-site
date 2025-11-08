import './Projects.css';

function Projects({ projects }) {
    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <section id="projects" className="projects">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
                {projects.map((project) => (
                    <a
                        key={project.id}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card"
                    >
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="project-technologies">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

export default Projects;
