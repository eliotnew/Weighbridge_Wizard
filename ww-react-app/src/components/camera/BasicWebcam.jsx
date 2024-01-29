import React from "react";
import Webcam from "react-webcam";

function BasicWebcam() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Webcam audio={false} style={{ width: 640, height: 320 }} />
    </div>
  );
}
export default BasicWebcam;
