import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../palette";

interface FullScreenImageProps {
  src: string;
  alt: string;
}

export const StyledPredictionMushroomImg: React.FC<FullScreenImageProps> = ({
  src,
  alt,
}) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleClick = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Styles fs={isFullScreen}>
      {isFullScreen && <div className="overlay" onClick={handleClick}></div>}
      <img
        src={src}
        alt={alt}
        className={`image ${isFullScreen ? "full-screen" : ""}`}
        onClick={handleClick}
      />
    </Styles>
  );
};

export const Styles = styled.div<{ fs: boolean }>`
  .image {
    cursor: ${(props) => (props.fs ? "zoom-out" : "zoom-in")};
    background-color: black;
    transition: transform 0.3s ease;
    width: 100%;
    max-width: ${(props) => (props.fs ? "100%" : "400px")};
    height: auto;
    border: 1px solid black;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .full-screen {
    position: fixed;
    top: 2%;
    left: 2%;
    width: 96%;
    height: 96%;
    object-fit: contain;
    z-index: 1001;
  }

  .overlay {
    position: fixed;
    top: -10px;
    left: -10px;
    width: 110%;
    height: 110%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
`;
