import { useEffect, useState } from 'react';
import './Snowflakes.css';

function Snowflakes() {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        const flakes = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: 10 + Math.random() * 20,
            animationDelay: -(Math.random() * 20),
            fontSize: 8 + Math.random() * 20,
            opacity: 0.2 + Math.random() * 0.5
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="snowflakes-container">
            {snowflakes.map(flake => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: `${flake.left}%`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.animationDelay}s`,
                        fontSize: `${flake.fontSize}px`,
                        opacity: flake.opacity
                    }}
                />
            ))}
        </div>
    );
}

export default Snowflakes;
