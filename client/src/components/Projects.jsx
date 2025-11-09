import { useState } from 'react';
import './Projects.css';

function Projects({ projects }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!projects || projects.length === 0) {
        return null;
    }

    const nextProject = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevProject = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
    };

    const currentProject = projects[currentIndex];

    return (
        <section className="projects">
            <div className="carousel-container">
                <button
                    className="carousel-arrow carousel-arrow-left"
                    onClick={prevProject}
                    aria-label="Previous project"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                <div className="carousel-content">
                    <div className="project-header">
                        <h3 className="project-title">{currentProject.title}</h3>
                        {currentProject.github && (
                            <a
                                href={currentProject.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link-icon"
                                aria-label="View on GitHub"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                        )}
                    </div>
                    <p className="project-description">{currentProject.description}</p>

                    <div className="demo-container">
                        {currentProject.demo?.endsWith('.mp4') ? (
                            <video
                                src={currentProject.demo}
                                className="demo-image"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        ) : (
                            <img
                                src={currentProject.demo}
                                alt={`${currentProject.title} demo`}
                                className="demo-image"
                            />
                        )}
                    </div>

                    <div className="project-technologies">
                        {currentProject.technologies.map((tech, index) => (
                            <span key={index} className="tag">{tech}</span>
                        ))}
                    </div>

                    {currentProject.elaboration && (
                        <p className="project-elaboration">{currentProject.elaboration}</p>
                    )}
                </div>

                <button
                    className="carousel-arrow carousel-arrow-right"
                    onClick={nextProject}
                    aria-label="Next project"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>

            <div className="carousel-indicators">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to project ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default Projects;
