import './Footer.css';

function Footer({ profile }) {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a href={`mailto:${profile.email}`}>Email</a>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href={profile.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
