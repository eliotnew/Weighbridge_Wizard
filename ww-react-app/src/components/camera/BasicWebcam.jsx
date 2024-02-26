import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";

function BasicWebcam() {
  const webcamRef = useRef(null);

  const captureAndSend = React.useCallback(() => {
    if (webcamRef.current) {
      console.log("webcam is current!");
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc); // Convert base64 to blob
      const formData = new FormData();
      formData.append("image", blob, "image.jpg");

      fetch("http://localhost:5000/reg", {
        method: "POST",
        body: formData, // Send as FormData
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data.extracted_texts);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [webcamRef]);

  // This function is not mine and the reference is: https://stackoverflow.com/questions/12168909/blob-from-dataurl
  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      captureAndSend();
      console.log("timer ticked");
    }, 3000); // Set to capture every 1.5 seconds

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [captureAndSend]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Webcam
        ref={webcamRef}
        audio={false}
        style={{ width: 640, height: 320 }}
      />
    </div>
  );
}
export default BasicWebcam;
