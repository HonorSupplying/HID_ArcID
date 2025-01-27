import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Your main CSS file that includes global styles
import "./font/Overpass-Regular.ttf"; // This should be imported in your CSS file

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
