import Gallery from './Gallery';

function Hero({ gallery }) {
    return (
        <div className="hero-content">
            <Gallery images={gallery} />
        </div>
    );
}

export default Hero;
