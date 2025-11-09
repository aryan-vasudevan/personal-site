import { useState } from 'react';
import './Gallery.css';

function Gallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);

    if (!images || images.length === 0) {
        return null;
    }

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const getGridStyle = (size) => {
        if (!size) return {};

        const [cols, rows] = size.split('x').map(Number);
        return {
            gridColumn: `span ${cols}`,
            gridRow: `span ${rows}`
        };
    };

    return (
        <div className="gallery">
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="gallery-item fade-in-up"
                        style={{ ...getGridStyle(image.size), animationDelay: `${index * 0.05}s` }}
                        onClick={() => openModal(image)}
                    >
                        <img src={image.src} alt={image.title} />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            ×
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            className="modal-image"
                        />
                        <div className="modal-description">
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;
