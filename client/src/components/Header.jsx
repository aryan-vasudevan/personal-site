import './Header.css';

function Header({ profile }) {
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left">
                    <a href="/" className="logo-link">
                        <div className="profile-photo">
                            {profile.name.charAt(0)}
                        </div>
                        <h1 className="name">{profile.name}</h1>
                    </a>
                </div>
                <nav className="nav">
                    <a href="#about">About</a>
                    <a href="#experience">Experience</a>
                    <a href="#projects">Projects</a>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
