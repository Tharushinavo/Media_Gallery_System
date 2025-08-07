import React from "react";

const ZipDownload = () => {
  const handleDownload = () => {
    // Real download logic here
    alert("Downloading ZIP...");
  };

  return (
    <div>
      <button onClick={handleDownload}>Download All as ZIP</button>
    </div>
  );
};

export default ZipDownload;
