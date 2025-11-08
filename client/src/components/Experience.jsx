import './Experience.css';

function Experience({ experience }) {
    if (!experience || experience.length === 0) {
        return null;
    }

    const renderHighlightedText = (text) => {
        const wordsToHighlight = [
            'user growth initiatives',
            'hands-on testing',
            'content creation',
            'technical documentation',
            'Y Combinator backed',
            'comprehensive project guides and templates',
            'Python',
            'Swift',
            'Kotlin',
            'C++',
            'app templates for RF-DETR',
            'Computer Vision',
            'YOLOv13 notebooks',
            'Google Colab',
            'cross-platform resources',
            'iOS',
            'Android',
            'hardware',
            'ESP32',
            'Organized',
            'judged',
            'Canada\'s largest recurring university hackathons',
            'Roboflow Computer Vision prize track',
            'AI/ML implementation',
            'technical mentorship',
            'computer vision',
            'machine learning',
            'emerging technologies',
            'web development fundamentals',
            'HTML',
            'CSS',
            'JavaScript',
            'Python programming',
            'Scratch',
            'AI generated questions',
            'Microsoft webservices',
            'openai',
            'openpyxl',
            'Advanced Functions'
        ];

        // Create pattern that matches any of the phrases/words
        const pattern = new RegExp(`(${wordsToHighlight.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
        const parts = text.split(pattern);

        return parts.map((part, index) => {
            const isHighlighted = wordsToHighlight.some(
                word => part.toLowerCase() === word.toLowerCase()
            );

            if (isHighlighted) {
                return <span key={index} className="tag inline-tag">{part}</span>;
            }
            return <span key={index}>{part}</span>;
        });
    };

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
                        <p className="description">{renderHighlightedText(job.description)}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Experience;
