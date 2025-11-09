import Gallery from './Gallery';

function Hero({ profile, gallery }) {
    const renderBio = (text) => {
        const wordsToHighlight = {
            'Toronto': null,
        };

        // Create a regex pattern that matches any of the words
        const pattern = new RegExp(`(${Object.keys(wordsToHighlight).join('|')})`, 'gi');
        const parts = text.split(pattern);

        return parts.map((part, index) => {
            // Check if this part is one of the words to highlight
            const matchedWord = Object.keys(wordsToHighlight).find(
                word => part.toLowerCase() === word.toLowerCase()
            );

            if (matchedWord) {
                const href = wordsToHighlight[matchedWord];

                if (href) {
                    return (
                        <a
                            key={index}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tag inline-tag inline-tag-link"
                        >
                            {part}
                        </a>
                    );
                } else {
                    return <span key={index} className="tag inline-tag">{part}</span>;
                }
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="hero-content">
            <h2 className="section-title">About</h2>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '32px' }}>
                <img
                    src={profile.photo}
                    alt={profile.name}
                    style={{
                        width: '152px',
                        height: '152px',
                        borderRadius: '12px',
                        objectFit: 'cover',
                        border: '2px solid #e5e5e5',
                        flexShrink: 0
                    }}
                />
                <iframe
                    style={{ borderRadius: '12px', border: 0, flex: 1, height: '152px' }}
                    src="https://open.spotify.com/embed/playlist/0IREds4RiFiqJA4PoWLVSb?utm_source=generator"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Spotify Playlist"
                ></iframe>
            </div>
            <p className="hero-bio">{renderBio(profile.bio)}</p>
            <hr className="content-divider" style={{ marginTop: '36px', marginBottom: '36px' }} />
            <Gallery images={gallery} />
        </div>
    );
}

export default Hero;
