import React, { useRef, useState } from "react";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const fileInput = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      // Upload logic here
      alert(`Uploading: ${file.name}`);
    }
  };

  return (
    <div>
      <style>{`
        .upload-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .file-input {
          margin-bottom: 10px;
        }

        .upload-button {
          padding: 10px 20px;
          font-size: 14px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .upload-button:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }

        .upload-button:hover:not(:disabled) {
          background-color: #0056b3;
        }
      `}</style>

      <div className="upload-container">
        <input
          className="file-input"
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
        />
        <button
          className="upload-button"
          onClick={handleUpload}
          disabled={!file}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
