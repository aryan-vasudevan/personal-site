import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Snowflakes from './components/Snowflakes';
import './App.css';

function App() {
    const [profile, setProfile] = useState(null);
    const [experience, setExperience] = useState([]);
    const [projects, setProjects] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('activeTab') || 'gallery';
    });
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved !== null ? saved === 'true' : true; // Default to dark mode
    });

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        if (profile?.photo) {
            document.documentElement.style.setProperty('--profile-photo-url', `url(${profile.photo})`);
        }
    }, [profile]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

        fetch(`${API_URL}/api/profile`)
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(err => console.error('Error fetching profile:', err));

        fetch(`${API_URL}/api/experience`)
            .then(res => res.json())
            .then(data => setExperience(data))
            .catch(err => console.error('Error fetching experience:', err));

        fetch(`${API_URL}/api/projects`)
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error('Error fetching projects:', err));

        fetch(`${API_URL}/api/gallery`)
            .then(res => res.json())
            .then(data => setGallery(data))
            .catch(err => console.error('Error fetching gallery:', err));
    }, []);

    useEffect(() => {
        if (!profile || !gallery.length || !projects.length) return;

        const imagesToLoad = [
            profile.photo,
            ...gallery.map(img => img.src),
            ...projects.map(p => p.demo).filter(demo => demo && !demo.endsWith('.mp4'))
        ];

        const imagePromises = imagesToLoad.map(src => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => resolve();
                img.src = src;
            });
        });

        Promise.all(imagePromises).then(() => {
            setAssetsLoaded(true);
        });
    }, [profile, gallery, projects]);

    if (!profile || !assetsLoaded) {
        return <div className="loading">Loading...</div>;
    }

    const renderBio = (text) => {
        const wordsToHighlight = {
            'Toronto': null,
        };

        const pattern = new RegExp(`(${Object.keys(wordsToHighlight).join('|')})`, 'gi');
        const parts = text.split(pattern);

        return parts.map((part, index) => {
            const matchedWord = Object.keys(wordsToHighlight).find(
                word => part.toLowerCase() === word.toLowerCase()
            );

            if (matchedWord) {
                const href = wordsToHighlight[matchedWord];

                if (href) {
                    return (
                        <a
                            key={index}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tag inline-tag inline-tag-link"
                        >
                            {part}
                        </a>
                    );
                } else {
                    return <span key={index} className="tag inline-tag">{part}</span>;
                }
            }
            return <span key={index}>{part}</span>;
        });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'gallery':
                return <Hero gallery={gallery} />;
            case 'experience':
                return <Experience experience={experience} />;
            case 'projects':
                return <Projects projects={projects} />;
            default:
                return <Hero gallery={gallery} />;
        }
    };

    return (
        <div className="app">
            {darkMode && <Snowflakes />}
            <main className="main-content">
                <div className="header-with-toggle fade-in-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '24px' }}>
                    <h1 className="name" style={{ margin: 0 }}>{profile.name}</h1>
                    <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
                        <img
                            src={`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/static/${darkMode ? 'sun' : 'moon'}.png`}
                            alt={darkMode ? 'Light mode' : 'Dark mode'}
                            className="dark-mode-icon"
                        />
                    </button>
                </div>
                <div className="fade-in-up profile-spotify-container" style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '32px', width: '100%' }}>
                    <img
                        src={profile.photo}
                        alt={profile.name}
                        className="profile-photo-large"
                    />
                    <iframe
                        className="spotify-embed"
                        style={{ borderRadius: '12px', border: 0, flex: 1, height: '152px' }}
                        src="https://open.spotify.com/embed/track/3xKsf9qdS1CyvXSMEid6g8?utm_source=generator&theme=0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Spotify Playlist"
                    ></iframe>
                </div>
                <p className="hero-bio fade-in-up" style={{ width: '100%' }}>{renderBio(profile.bio)}</p>
                {/* <hr className="content-divider fade-in-up" style={{ marginTop: '36px', marginBottom: '36px' }} /> */}
                <nav className="nav fade-in-up" style={{ marginBottom: '12px', width: '100%' }}>
                    <a
                        href="#gallery"
                        className={activeTab === 'gallery' ? 'tag active' : 'tag'}
                        onClick={(e) => { e.preventDefault(); setActiveTab('gallery'); }}
                    >
                        Gallery
                    </a>
                    <a
                        href="#projects"
                        className={activeTab === 'projects' ? 'tag active' : 'tag'}
                        onClick={(e) => { e.preventDefault(); setActiveTab('projects'); }}
                    >
                        Projects
                    </a>
                    <a
                        href="#experience"
                        className={activeTab === 'experience' ? 'tag active' : 'tag'}
                        onClick={(e) => { e.preventDefault(); setActiveTab('experience'); }}
                    >
                        Experience
                    </a>
                </nav>
                <div key={activeTab} className="content-area fade-in-up">
                    {renderContent()}
                </div>
                <footer className="social-footer fade-in-up">
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                    <a href="https://instagram.com/aryaan_v" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/aryan-vasudevan/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </a>
                    <a href="mailto:vasudevan.aryan@gmail.com" className="social-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                        </svg>
                    </a>
                </footer>
            </main>
        </div>
    );
}

export default App;
