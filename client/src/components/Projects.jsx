import { useState } from 'react';
import './Projects.css';

function Projects({ projects }) {
    const [hoveredProject, setHoveredProject] = useState(null);

    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <section className="projects">
            <div className="projects-list">
                {projects.map((project, index) => (
                    <a
                        key={index}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-item"
                        onMouseEnter={() => setHoveredProject(index)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <div className="project-header">
                            <h3 className="project-title">{project.title}</h3>
                            <div className="project-technologies">
                                {project.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                        <p className="project-description">{project.description}</p>
                        {project.elaboration && (
                            <p className="project-elaboration">{project.elaboration}</p>
                        )}

                        {hoveredProject === index && project.demo && (
                            <div className="project-preview">
                                {project.demo.endsWith('.mp4') ? (
                                    <video
                                        src={project.demo}
                                        className="project-preview-media"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={project.demo}
                                        alt={`${project.title} preview`}
                                        className="project-preview-media"
                                    />
                                )}
                            </div>
                        )}
                    </a>
                ))}
            </div>
        </section>
    );
}

export default Projects;
