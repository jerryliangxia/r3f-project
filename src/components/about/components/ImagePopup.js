import React, { useState, useRef } from "react";
import { Link } from "@radix-ui/themes";

function ImagePopup({ src, isSubtle = false, link = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const isMobile = window.innerWidth <= 768;
  const imgRef = useRef();

  const handleImageLoad = () => {
    if (imgRef.current) {
      setImgWidth(imgRef.current.offsetWidth);
      setImgHeight(imgRef.current.offsetHeight);
    }
  };

  function ImageLink({ link }) {
    return (
      <Link to={link}>
        {!isOpen && (
          <img
            ref={imgRef}
            src={src}
            style={{ width: "100%" }}
            onClick={() => {
              window.location.href = link;
            }}
            onLoad={handleImageLoad}
            alt=""
            className={isSubtle ? "image-class-subtle" : "image-class"}
          />
        )}
      </Link>
    );
  }

  return link ? (
    <ImageLink link={link} />
  ) : (
    <>
      {!isOpen && (
        <img
          ref={imgRef}
          src={src}
          style={{ width: "100%", cursor: "pointer" }}
          onClick={() => {
            if (!isMobile) {
              setIsOpen(true);
            }
          }}
          onLoad={handleImageLoad}
          alt=""
          className={isSubtle ? "image-class-subtle" : "image-class"}
        />
      )}
      {isOpen && <div style={{ width: imgWidth, height: imgHeight }} />}
      {isOpen && !isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsOpen(false)}
        >
          <img src={src} style={{ maxWidth: "90%", maxHeight: "90%" }} alt="" />
        </div>
      )}
    </>
  );
}

export default ImagePopup;
