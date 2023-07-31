import React from "react";
function FavoriteSong(props) {
  const changeSong = () => {
    props.setCurrentSongIndex(props.index);
    props.setIsPlaying(true);
  };
  return (
    <button className="fav-song" onClick={changeSong}>
      {/* <div className="fav-song"> */}
      <div className="fav-details--img">
        <img src={props.song.img_src} alt="" height={65} />
      </div>
      <div className="fav-song--details">
        <h3 className="fav-details--title">{props.song.title}</h3>
        <h4 className="fav-details--artist">{props.song.artist}</h4>
      </div>
      {/* </div> */}
    </button>
  );
}

export default FavoriteSong;
