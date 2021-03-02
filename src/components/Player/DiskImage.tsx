import React from "react";
import "./DiskImage.css"

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage


interface DiskImageProps {
  isPlaying: boolean;
  onClickPlay: ()=>void;
}



export const DiskImage: React.FC<DiskImageProps> = ({isPlaying, onClickPlay}) => {
  return (
    <div className="image-container">
      <img
        src={`${PUBLIC_URL}/images/logo.svg`}
        className={`song-image ${!isPlaying ? "paused" : ""}`}
        alt="song"
        onClick={onClickPlay.bind(null)}
        // ref={songImage}
      />

      {!isPlaying && (
        <img
          src={`${PUBLIC_URL}/images/Player/play-button-arrowhead.svg`}
          className="play-button"
          alt="playButton"
          onClick={onClickPlay.bind(null)}
        />
      )}
    </div>
  );
};
