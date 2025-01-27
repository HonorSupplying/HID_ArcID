import React, { useEffect, useRef, useState } from "react";
import "../styles/Search.css";
import axios from "axios";
import Camera from "./Camera";

const Search = () => {
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
    <Camera/>
  );
};

export default Search;
