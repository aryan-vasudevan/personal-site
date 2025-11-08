import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use('/static', express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api/profile', (req, res) => {
    res.json({
        name: 'Aryan Vasudevan',
        title: 'Software Engineer',
        location: 'Toronto',
        bio: "Hey! Glad you're here. I'm Aryan, a passionate software engineer based in Toronto, with a love for building anything and everything. Let's play badminton sometime!",
        photo: 'http://localhost:3001/static/profile.png',
        email: 'your.email@example.com',
        github: 'https://github.com/aryan-vasudevan',
        twitter: 'https://twitter.com/yourusername',
        linkedin: 'https://linkedin.com/in/aryan-vasudevan'
    });
});

app.get('/api/experience', (req, res) => {
    res.json([
        {
            id: 1,
            company: 'Roboflow (Y Combinator S20)',
            role: 'Machine Learning Intern, Contributor, Growth',
            period: 'June 2025 - Aug 2025',
            description: 'Drove user growth initiatives through hands-on testing, content creation, and technical documentation. Authored 12+ comprehensive project guides reaching 30,000+ users. Built app templates for RF-DETR models and developed YOLOv13 notebooks with Google Colab compatibility.'
        },
        {
            id: 2,
            company: 'IgnitionHacks',
            role: 'Judge, Organizer',
            period: 'June 2025 - Aug 2025',
            description: 'Organized and judged at one of Canada\'s largest recurring university hackathons with 500+ annual participants. Evaluated projects for Roboflow Computer Vision prize track and provided technical mentorship to participants.'
        },
        {
            id: 3,
            company: 'BestBrains Learning Centre',
            role: 'Coding Instructor',
            period: 'June 2025 - Aug 2025',
            description: 'Taught web development fundamentals including HTML, CSS, and JavaScript. Instructed Python programming concepts and introduced visual programming with Scratch to younger students.'
        },
        {
            id: 4,
            company: 'TopChild Learning Centre',
            role: 'Software Engineer, Functions Tutor',
            period: 'Oct 2024 - Present',
            description: 'Integrated AI generated questions into an online quiz feature built with Microsoft webservices. Designed an application to automate question making process in Python using openai and openpyxl. Taught Advanced Functions and challenging math concepts.'
        }
    ]);
});

app.get('/api/projects', (req, res) => {
    res.json([
        {
            id: 1,
            title: 'Project One',
            description: 'A cool project that does something amazing.',
            technologies: ['React', 'Node.js', 'MongoDB'],
            link: 'https://github.com/yourusername/project-one'
        },
        {
            id: 2,
            title: 'Project Two',
            description: 'Another interesting project with great features.',
            technologies: ['Python', 'Django', 'PostgreSQL'],
            link: 'https://github.com/yourusername/project-two'
        },
        {
            id: 3,
            title: 'Project Three',
            description: 'An open-source contribution that made an impact.',
            technologies: ['TypeScript', 'React', 'Express'],
            link: 'https://github.com/yourusername/project-three'
        }
    ]);
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
