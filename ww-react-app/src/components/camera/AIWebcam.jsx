import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";

function AIWebcam({ setChildReg }) {
  const webcamRef = useRef(null);

  const captureAndSend = React.useCallback(() => {
    if (webcamRef.current) {
      console.log("Webcam is working!");
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc); // Convert base64 to blob for url transport
      const formData = new FormData();
      formData.append("image", blob, "image.jpg");

      fetch("http://localhost:5000/reg", {
        method: "POST",
        body: formData, // Send as FormData
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data.extracted_texts);

          // Check if extracted_texts is an array with multiple entries
          if (
            Array.isArray(data.extracted_texts) &&
            data.extracted_texts.length > 1
          ) {
            setChildReg("Multiple reg plates detected");
          } else if (
            Array.isArray(data.extracted_texts) &&
            data.extracted_texts.length === 1
          ) {
            // If it's an array with a single entry, use that entry

            setChildReg(data.extracted_texts[0]);
          } else {
            setChildReg("No reg detected");
          }
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
    }, 4000); // Set to capture every 3 secs
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
        style={{ width: 680, height: 365 }}
      />
    </div>
  );
}
export default AIWebcam;
