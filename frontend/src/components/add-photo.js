import React, { useState } from "react";
import axios from "axios";
import "../styles/Add.css";
import { useParams, useNavigate } from "react-router-dom";

const AddBiometricCredential = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // To store the selected image file
  const [imagePreview, setImagePreview] = useState(null); // For displaying image preview
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create image preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // Convert image to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract Base64 part
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setResponseMessage("⚠️ Please select an image.");
      return;
    }

    setLoading(true);

    try {
      // Convert image to Base64
      const base64Image = await convertToBase64(image);

      // Create payload
      const payload = {
        user_id: id,
        get_quality: [0], // Option to always return quality score
        suppress_liveness: false, // Configure based on requirements
        biometric_data: {
          modality: "face",
          datatype: "png", // Assuming PNG format
          data: base64Image,
        },
      };

      // Make API request
      const response = await axios.post(
        "https://192.168.30.138:443/api/v1/credentials",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "hid-arciid",
            Accept: "application/json",
          },
        }
      );

      const { error_code, error_message, credential } = response.data;

      if (error_code === 0) {
        setResponseMessage("🎉 Biometric credential added successfully!");
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to the dashboard or another page
        }, 1000);
      } else {
        setResponseMessage(`⚠️ Error: ${error_message || "Unknown error"}`);
      }
    } catch (error) {
      setResponseMessage("⚠️ Error adding biometric credential.");
      console.error("Error details:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md sm:w-96"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add Biometric Credential for User #{id}
        </h2>

        <div className="file-preview-container">
          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview-container">
              <img
                src={imagePreview}
                alt="Selected Image"
                className="image-preview"
              />
            </div>
          )}
          {/* File Input */}
          <div>
            <input
              type="file"
              id="file-upload"
              name="file"
              onChange={handleFileChange} // Handle file selection
            />
            <label htmlFor="file-upload" className="text-center label-file">
              <span className="icon">📁</span> Choose a file
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-medium py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Adding Credential..." : "Add Credential"}
        </button>

        {/* Response Message */}
        {responseMessage && (
          <p
            className={`text-center text-sm mt-4 ${
              responseMessage.includes("🎉") ? "text-green-600" : "text-red-600"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddBiometricCredential;
