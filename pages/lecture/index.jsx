import React from "react";
import YouTube from "react-youtube";

export default function Lecture() {
  // const iframeRef = useRef(null);
  // const handleIframeLoad = () => {
  //   const iframe = iframeRef.current;
  //   const iframeDocument =
  //     iframe.contentDocument || iframe.contentWindow.document;

  //   iframeDocument.addEventListener("keydown", handleKeyDown);
  // };

  // const handleKeyDown = (event) => {
  //   // if (event.ctrlKey && event.code === "KeyC") {
  //   //   document.execCommand("copy");
  //   // }
  //   console.log("event", event);
  // };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
    },
  };
  // useEffect(() => {
  //   handleIframeLoad();
  // }, []);
  return (
    <div style={{ width: "640px", height: "390px", backgroundColor: "red" }}>
      {/* <div
        style={{
          position: "absolute",
          backgroundColor: "transparent",
          height: "100px",
          width: "100px",
          right: "150px",
        }}
      ></div>
      <YouTube
        // onLoad={handleIframeLoad}
        // ref={iframeRef}
        videoId="9diMiLy2pSo"
        opts={opts}
        // onReady={onPlayerReady}
      /> */}
    </div>
  );
}
