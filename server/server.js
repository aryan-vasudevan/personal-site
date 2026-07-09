import express from 'express';
import cors from 'cors';
import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Load site content from JSON. Asset fields hold bare filenames that live in
// public/ and are expanded to absolute URLs at serve time.
const content = JSON.parse(
    readFileSync(path.join(__dirname, 'data', 'content.json'), 'utf-8')
);

const asset = (file) => `${BASE_URL}/static/${file}`;

const profile = { ...content.profile, photo: asset(content.profile.photo) };
const projects = content.projects.map((p) => ({ ...p, demo: asset(p.demo) }));
const gallery = content.gallery.map((g) => ({ ...g, src: asset(g.src) }));

app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use('/static', express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api/profile', (req, res) => {
    res.json(profile);
});

app.get('/api/experience', (req, res) => {
    res.json(content.experience);
});

app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.get('/api/gallery', (req, res) => {
    res.json(gallery);
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
