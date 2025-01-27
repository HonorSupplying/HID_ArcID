import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "../styles/Match.css";

const Match = () => {
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [galleryImage, setGalleryImage] = useState(null);
  const [probeImage, setProbeImage] = useState(null);

  // Handle the file selection (drag and drop)
  const onDrop = (acceptedFiles, imageType) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(",")[1]; // Get base64 part of the data
        if (imageType === "gallery") {
          setGalleryImage(base64data);
        } else if (imageType === "probe") {
          setProbeImage(base64data);
        }
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  // Handle the match request
  const handleMatch = async () => {
    if (!galleryImage || !probeImage) {
      setError("Please upload both gallery and probe images.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      gallery: {
        modality: "face",
        datatype: "hftemplate",
        data: galleryImage, // Base64 image data for gallery
      },
      probe: {
        modality: "face",
        datatype: "hftemplate",
        data: probeImage, // Base64 image data for probe
      },
    };

    try {
      const response = await axios.post(
        "https://127.0.0.1:443/api/v1/match",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { error_code, error_message, match, match_confidence } =
        response.data;

      if (error_code === 0) {
        setMatchResult({
          match: match,
          confidence: match_confidence,
        });
      } else {
        // Handling specific error codes
        switch (error_code) {
          case "BIO_GENERAL":
            setError(
              "Error: Biometric data has different modalities and cannot be matched."
            );
            break;
          case "BIO_ALGO_INCOMPATIBLE":
            setError("Error: Biometric data is incompatible with the server.");
            break;
          case "NOT_IMPLEMENTED":
            setError("Error: This functionality is not yet implemented.");
            break;
          case "BIO_BAD_QUALITY":
            setError("Error: The input image quality is too low.");
            break;
          default:
            setError(`Error: ${error_message || "Unknown error"}`);
        }
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Use the dropzone hook for drag-and-drop file uploads
  const {
    getRootProps: getRootPropsGallery,
    getInputProps: getInputPropsGallery,
  } = useDropzone({
    accept: "image/jpeg, image/png", // Only allow specific image formats
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, "gallery"),
  });

  const { getRootProps: getRootPropsProbe, getInputProps: getInputPropsProbe } =
    useDropzone({
      accept: "image/jpeg, image/png", // Only allow specific image formats
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, "probe"),
    });

  return (
    <div className="match-container">
      <h1>Biometric Match</h1>

      <div
        className="drag-drop-container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ width: "48%" }}>
          <h3>Image 1 (Gallery)</h3>
          <div
            {...getRootPropsGallery()}
            className="dropzone"
            style={{
              padding: "20px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <input {...getInputPropsGallery()} />
            <p>Drag and drop the Gallery Image here or click to select it</p>
          </div>
        </div>

        <div style={{ width: "48%" }}>
          <h3>Image 2 (Probe)</h3>
          <div
            {...getRootPropsProbe()}
            className="dropzone"
            style={{
              padding: "20px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <input {...getInputPropsProbe()} />
            <p>Drag and drop the Probe Image here or click to select it</p>
          </div>
        </div>
      </div>

      <button onClick={handleMatch} className="match-button" disabled={loading}>
        {loading ? "Matching..." : "Start Matching"}
      </button>

      {matchResult && (
        <div className="match-result">
          <p>Match: {matchResult.match ? "Yes" : "No"}</p>
          <p>Confidence: {matchResult.confidence}</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Match;
