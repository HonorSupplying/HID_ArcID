import React from "react";

function File() {
  const handleFileSelected = (e) => {
    console.log(e.target.files);
  };
  return (
    <div>
      <form>
        <input type="file" onChange={handleFileSelected} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default File;
