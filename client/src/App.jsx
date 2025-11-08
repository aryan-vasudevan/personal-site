import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import './App.css';

function App() {
    const [profile, setProfile] = useState(null);
    const [experience, setExperience] = useState([]);
    const [projects, setProjects] = useState([]);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        fetch('http://localhost:3001/api/profile')
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(err => console.error('Error fetching profile:', err));

        fetch('http://localhost:3001/api/experience')
            .then(res => res.json())
            .then(data => setExperience(data))
            .catch(err => console.error('Error fetching experience:', err));

        fetch('http://localhost:3001/api/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error('Error fetching projects:', err));
    }, []);

    if (!profile) {
        return <div className="loading">Loading...</div>;
    }

    const handleGithubClick = () => {
        window.open(profile.github, '_blank', 'noopener,noreferrer');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'about':
                return <Hero profile={profile} />;
            case 'experience':
                return <Experience experience={experience} />;
            case 'projects':
                return <Projects projects={projects} />;
            default:
                return <Hero profile={profile} />;
        }
    };

    return (
        <div className="app">
            <main className="main-content">
                <div className="header-nav-container">
                    <div className="hero-header">
                        <img src={profile.photo} alt={profile.name} className="profile-photo" />
                        <h1 className="name">{profile.name}</h1>
                    </div>
                    <nav className="nav">
                        <a
                            href="#about"
                            className={activeTab === 'about' ? 'tag active' : 'tag'}
                            onClick={(e) => { e.preventDefault(); setActiveTab('about'); }}
                        >
                            About
                        </a>
                        <a
                            href="#experience"
                            className={activeTab === 'experience' ? 'tag active' : 'tag'}
                            onClick={(e) => { e.preventDefault(); setActiveTab('experience'); }}
                        >
                            Experience
                        </a>
                        <a
                            href="#projects"
                            className={activeTab === 'projects' ? 'tag active' : 'tag'}
                            onClick={(e) => { e.preventDefault(); setActiveTab('projects'); }}
                        >
                            Projects
                        </a>
                        <a
                            href="#github"
                            className="tag"
                            onClick={(e) => { e.preventDefault(); handleGithubClick(); }}
                        >
                            GitHub
                        </a>
                    </nav>
                </div>
                <hr className="content-divider" />
                <div className="content-area">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}

export default App;
