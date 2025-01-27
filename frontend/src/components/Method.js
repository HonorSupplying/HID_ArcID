import { React, useState } from "react";
import "../styles/Method.css";
import Camera from "./Camera";
import File from "./File";
import MethodButton from "./MethodButton";

function Method() {
  const [useCam, setUseCam] = useState(false);
  const [useFile, setUseFile] = useState(false);

  const handleUseFile = () => {
    if (useCam) {
      setUseCam(false);
    }
    setUseFile(true);
  };

  const handleUseCam = () => {
    if (useFile) {
      setUseFile(false);
    }
    setUseCam(true);
  };

  return (
    <>
      <div className="method">
        <MethodButton
          text={"Use File"}
          onClick={handleUseFile}
          image={"./img/folder.png"}
        />
        <MethodButton
          text={"Use Camera"}
          onClick={handleUseCam}
          image={"./img/video.png"}
        />
      </div>
      <div className="home">
        {useFile && <File />}
        {useCam && <Camera />}
      </div>
    </>
  );
}

export default Method;
