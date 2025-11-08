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
            period: 'June 2025 - Present',
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
            title: 'AutoClose',
            description: 'Close your door... autonomously',
            technologies: ['Swift', 'C++', 'Xcode', 'Roboflow', 'ESP32'],
            demo: 'http://localhost:3001/static/autoclose-demo.mp4',
            github: 'https://github.com/aryan-vasudevan/door-closer-esp32',
            elaboration: 'I got tired of people not closing my door when I asked : /—It\'s an ESP32 microcontroller connected to a motor that automatically closes the door when it detects that it\'s open using an iOS app and a CoreML vision model trained with Roboflow.'
        },
        {
            id: 2,
            title: 'Eye Spy',
            description: 'An AR solution to finding your glasses, all contained in an iOS app',
            technologies: ['Swift', 'XCode', 'CoreML'],
            demo: 'http://localhost:3001/static/eyespy-demo.mp4',
            github: 'https://github.com/aryan-vasudevan/eye-spy',
            elaboration: 'Losing your glasses is the worst. This app uses ARKit and a CoreML model on an iOS app to help you find your glasses by scanning your surroundings with your phone\'s camera.'
        },
        {
            id: 3,
            title: 'DetectionSmoother',
            description: 'Create prod-level demos for computer vision models',
            technologies: ['Roboflow', 'Python'],
            demo: 'http://localhost:3001/static/detectionsmoother-demo.mp4',
            github: 'https://github.com/aryan-vasudevan/detectionsmoother',
            elaboration: 'During my internship at Roboflow, I built an open-source tool for smoothing object detection results to create more polished demos and presentations.'
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
