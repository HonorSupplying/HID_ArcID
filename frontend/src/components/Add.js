import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Add.css";

const AddUser = () => {
  const [formData, setFormData] = useState({
    external_id: "",
    custom_content: "",
    search_tags: [],
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "search_tags") {
      setFormData({
        ...formData,
        [name]: value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean), // Convert input into an array and remove empty tags
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const payload = {
      external_id: formData.external_id || null, // Send null if empty
      custom_content: formData.custom_content || null, // Send null if empty
      search_tags:
        formData.search_tags.length > 0 ? formData.search_tags : null, // Send null if empty
    };

    try {
      const response = await axios.post(
        "https://192.168.30.138:443/api/v1/users",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "hid-arciid",
            Accept: "application/json",
          },
        }
      );

      const { error_code, error_message, user } = response.data;

      if (error_code === 0) {
        setResponseMessage(`🎉 User created successfully! Redirecting...`);
        setTimeout(() => {
          navigate(`/add-photo/${user.id}`); // Navigate to Add Photo page with user ID
        }, 1000); // Slight delay before navigating
      } else {
        setResponseMessage(`⚠️ Error: ${error_message || "Unknown error"}`);
      }
    } catch (error) {
      setResponseMessage("⚠️ Error creating user!");
      console.error("Error details:", error.response || error); // Log the full error response
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md sm:w-96"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create User
        </h2>

        {/* External ID Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            External ID
          </label>
          <input
            type="text"
            name="external_id"
            value={formData.external_id}
            onChange={handleChange}
            placeholder="Optional: External ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Custom Content Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Custom Content
          </label>
          <textarea
            name="custom_content"
            value={formData.custom_content}
            onChange={handleChange}
            placeholder="Optional: Additional user data"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            maxLength={10240} // 10 KB max
          />
        </div>

        {/* Search Tags Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Search Tags (comma-separated)
          </label>
          <input
            type="text"
            name="search_tags"
            value={formData.search_tags.join(", ")} // Show tags as a comma-separated list
            onChange={handleChange}
            placeholder="Optional: Add search tags"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Creating User..." : "Create User"}
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

export default AddUser;
