import React from "react";
import { FaFolder, FaCamera } from "react-icons/fa"; // Import specific icons from React Icons
import "../styles/MethodButton.css"; // Importing the CSS file

function MethodButton({ text, icon, onClick }) {
  return (
    <div className="method-button" onClick={onClick}>
      <div className="method-button-icon">
        {icon} {/* Render icon passed as prop */}
      </div>
      <h3>{text}</h3>
    </div>
  );
}

export default MethodButton;
