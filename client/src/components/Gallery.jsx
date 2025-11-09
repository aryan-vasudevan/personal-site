import { useState } from 'react';
import { createPortal } from 'react-dom';
import './Gallery.css';

function Gallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    if (!images || images.length === 0) {
        return null;
    }

    const openModal = (image) => {
        setSelectedImage(image);
        setIsClosing(false);
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedImage(null);
            setIsClosing(false);
        }, 300); // Match animation duration
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

            {selectedImage && createPortal(
                <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
                    <div className={`modal-content ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
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
                </div>,
                document.body
            )}
        </div>
    );
}

export default Gallery;
