import React from "react";

function PlayerDetails({ song = {} }) {
  const { title, artist, img_src } = song;
  return (
    <div className="c-player--details">
      <div className="details-img">
        <img src={img_src} alt="" />
      </div>
      <h3 className="details-title">{title}</h3>
      <h4 className="details-artist">{artist}</h4>
    </div>
  );
}

export default PlayerDetails;
