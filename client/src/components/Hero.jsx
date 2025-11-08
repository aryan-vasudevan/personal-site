import './Hero.css';

function Hero({ profile }) {
    return (
        <div className="hero-content">
            <p className="hero-intro">
                {profile.title} {profile.location}
            </p>
            <p className="hero-bio">{profile.bio}</p>
        </div>
    );
}

export default Hero;
