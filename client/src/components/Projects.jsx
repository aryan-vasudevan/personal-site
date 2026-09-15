import './Projects.css';

function Projects({ projects }) {
    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <section id="projects" className="projects">
            <div className="projects-list">
                {projects.map((project, index) => (
                    <div key={project.id ?? index} className="project-item fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="project-text">
                            <div className="project-heading">
                                <h3 className="project-title">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link"
                                        aria-label={`${project.title} on GitHub`}
                                    >
                                        {project.title}
                                        <svg className="project-arrow" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <line x1="7" y1="17" x2="17" y2="7" />
                                            <polyline points="7 7 17 7 17 17" />
                                        </svg>
                                    </a>
                                </h3>
                                {project.technologies?.length > 0 && (
                                    <div className="project-technologies">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="tag">{tech}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {project.elaboration && (
                                <p className="project-elaboration">{project.elaboration}</p>
                            )}
                        </div>
                        {project.demo && (
                            <div className="project-media">
                                {project.demo.endsWith('.mp4') ? (
                                    <video
                                        src={project.demo}
                                        className="project-media-item"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                    />
                                ) : (
                                    <img
                                        src={project.demo}
                                        alt={`${project.title} preview`}
                                        className="project-media-item"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;
