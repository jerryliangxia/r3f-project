import React, { useRef } from "react";

function Image({ src }) {
  const imgRef = useRef();

  const handleImageLoad = () => {
    if (imgRef.current) {
      setImgWidth(imgRef.current.offsetWidth);
      setImgHeight(imgRef.current.offsetHeight);
    }
  };

  return (
    <>
      <img
        src={src}
        style={{ width: "100%" }}
        onLoad={handleImageLoad}
        alt=""
      />
    </>
  );
}

export default Image;
