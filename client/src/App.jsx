import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './App.css';

function App() {
    const [profile, setProfile] = useState(null);
    const [experience, setExperience] = useState([]);
    const [projects, setProjects] = useState([]);

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

    return (
        <div className="app">
            <Header profile={profile} />
            <main className="main-content">
                <Hero profile={profile} />
                <Experience experience={experience} />
                <Projects projects={projects} />
            </main>
            <Footer profile={profile} />
        </div>
    );
}

export default App;
