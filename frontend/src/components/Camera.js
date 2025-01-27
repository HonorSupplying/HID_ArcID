import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Camera = () => {

    var stream;
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
  
    // Start the video stream
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true, // For camera input
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
  
    // Capture a frame from the video
    const captureImage = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
  
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.translate(canvas.width, 0); // Move the canvas context to the right
      context.scale(-1, 1); // Flip the context horizontally
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL("image/png");
      sendAPI(image);
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    };
  
    // Start Search image in database
    const sendAPI = async (image) => {
      const res = await axios.post(
        "https://127.0.0.1:443/api/v1/users/identify",
        {
          identification_policy: "strict",
          biometric_data: {
            modality: "face",
            datatype: "png",
            data: `${image}`,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": "hid_arcid",
          },
        }
      );
      console.log(res);
    };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>Police Camera</h1>
    <video
      className="stream"
      ref={videoRef}
      style={{ width: "50%", margin: "20px 0", transform: "scaleX(-1)" }}
    />
    <br />
    <button onClick={startCamera}>Start Camera</button>
    <button onClick={captureImage} style={{ marginLeft: "10px" }}>
      Capture Image
    </button>
    {/* <button onClick={} style={{ marginLeft: "10px" }}>Search Face</button> */}
    <br />
    <canvas ref={canvasRef} style={{ display: "none" }} />
    {imageSrc && (
      <div style={{ marginTop: "20px" }}>
        <h3>Captured Image:</h3>
        <img
          className="stream"
          src={imageSrc}
          alt="Captured"
          style={{ width: "50%" }}
        />
      </div>
    )}
  </div>
  )
}

export default Camera