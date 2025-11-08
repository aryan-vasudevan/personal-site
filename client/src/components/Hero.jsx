import './Hero.css';

function Hero({ profile }) {
    return (
        <section id="about" className="hero">
            <h2 className="hero-title">{profile.title}</h2>
            <p className="hero-location">{profile.location}</p>
            <p className="hero-bio">{profile.bio}</p>
        </section>
    );
}

export default Hero;
