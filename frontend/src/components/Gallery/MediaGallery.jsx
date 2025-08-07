import React from "react";

const dummyImages = [
  { url: "https://via.placeholder.com/150", title: "Image 1" },
  { url: "https://via.placeholder.com/150", title: "Image 2" },
];

const MediaGallery = () => (
  <div>
    <style>{`
      .gallery-container {
        padding: 20px;
        font-family: Arial, sans-serif;
      }

      .gallery-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .image-grid {
        display: flex;
        flex-wrap: wrap;
      }

      .image-item {
        margin: 10px;
        text-align: center;
      }

      .image-item img {
        width: 150px;
        height: 150px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }

      .image-item img:hover {
        transform: scale(1.05);
      }

      .image-title {
        margin-top: 8px;
        font-size: 14px;
        color: #333;
      }
    `}</style>

    <div className="gallery-container">
      <h2 className="gallery-title">Media Gallery</h2>
      <div className="image-grid">
        {dummyImages.map((img, i) => (
          <div key={i} className="image-item">
            <img src={img.url} alt={img.title} />
            <p className="image-title">{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MediaGallery;
