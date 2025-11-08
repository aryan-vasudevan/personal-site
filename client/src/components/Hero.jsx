function Hero({ profile }) {
    return (
        <div className="hero-content">
            <h2 className="section-title">About</h2>
            <p className="hero-title">{profile.title}</p>
            <span className="tag">{profile.location}</span>
            <p className="hero-bio">{profile.bio}</p>
        </div>
    );
}

export default Hero;
