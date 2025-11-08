function Hero({ profile }) {
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
            <p className="hero-bio">{renderBio(profile.bio)}</p>
        </div>
    );
}

export default Hero;
