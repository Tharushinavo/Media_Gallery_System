import React from "react";

const ImageDetail = ({ image }) => (
  <div>
    <style>{`
      .image-detail-container {
        max-width: 500px;
        margin: 40px auto;
        padding: 20px;
        background-color: #fafafa;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-family: Arial, sans-serif;
        text-align: center;
      }

      .image-detail-title {
        font-size: 24px;
        margin-bottom: 15px;
        color: #333;
      }

      .image-detail-img {
        width: 300px;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin-bottom: 15px;
      }

      .image-detail-description {
        font-size: 16px;
        color: #555;
      }
    `}</style>

    <div className="image-detail-container">
      <h3 className="image-detail-title">{image.title}</h3>
      <img
        className="image-detail-img"
        src={image.url}
        alt={image.title}
      />
      <p className="image-detail-description">{image.description}</p>
    </div>
  </div>
);

export default ImageDetail;
