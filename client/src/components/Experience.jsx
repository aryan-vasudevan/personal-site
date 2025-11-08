import './Experience.css';

function Experience({ experience }) {
    if (!experience || experience.length === 0) {
        return null;
    }

    return (
        <section id="experience" className="experience">
            <h2 className="section-title">Experience</h2>
            <div className="experience-list">
                {experience.map((job) => (
                    <div key={job.id} className="experience-item">
                        <div className="experience-header">
                            <h3 className="company">{job.company}</h3>
                            <span className="period">{job.period}</span>
                        </div>
                        <p className="role">{job.role}</p>
                        <p className="description">{job.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Experience;
