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
            company: 'Current Company',
            role: 'Software Engineer',
            period: '2023 - Present',
            description: 'Working on exciting projects and building innovative solutions.'
        },
        {
            id: 2,
            company: 'Previous Company',
            role: 'Junior Developer',
            period: '2021 - 2023',
            description: 'Developed web applications and contributed to various projects.'
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
