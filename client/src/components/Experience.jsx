import './Experience.css';

function Experience({ experience }) {
    if (!experience || experience.length === 0) {
        return null;
    }

    const renderHighlightedText = (text) => {
        const wordsToHighlight = [
            'hands-on testing',
            'Linear',
            '1M+',
            'Typescript',
            'Docker',
            'Node.js',
            '$30k MRR',
            'Google Cloud Platform',
            'Github Actions',
            'Roboflow\'s architecture',
            'Firebase',
            '12+',
            'content creation',
            'technical documentation',
            'Y Combinator backed',
            'Python',
            'Swift',
            'Kotlin',
            'C++',
            'Computer Vision',
            'YOLOv13 notebooks',
            'cross-platform resources',
            'iOS',
            'Android',
            'hardware',
            'ESP32',
            'Organized',
            'judged',
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
            'Advanced Functions',
            '30,000+',
            'full-stack'
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

    // Group roles that share a company into a single block, keeping the order
    // in which each company first appears in content.json.
    const companies = [];
    const indexByCompany = new Map();
    experience.forEach((job) => {
        if (indexByCompany.has(job.company)) {
            companies[indexByCompany.get(job.company)].roles.push(job);
        } else {
            indexByCompany.set(job.company, companies.length);
            companies.push({ company: job.company, roles: [job] });
        }
    });

    return (
        <section id="experience" className="experience">
            <div className="experience-list">
                {companies.map((group, index) => (
                    <div key={group.company} className="experience-item fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <h3 className="company">{group.company}</h3>
                        <div className={`role-list${group.roles.length > 1 ? ' grouped' : ''}`}>
                            {group.roles.map((job) => (
                                <div key={job.id} className="role-entry">
                                    <div className="role-header">
                                        <p className="role">{job.role}</p>
                                        <span className="period">{job.period}</span>
                                    </div>
                                    <p className="description">{renderHighlightedText(job.description)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Experience;
