import React from "react";
function SongData(props) {
  let { index, song, setCurrentSongIndex, setIsPlaying } = props;
  const changeSong = () => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };
  return (
    <button className="fav-song" onClick={changeSong}>
      {/* <div className="fav-song"> */}
      <div className="fav-details--img">
        <img src={song.img_src} alt="" height={65} />
      </div>
      <div className="fav-song--details">
        <h3 className="fav-details--title">{song.title}</h3>
        <h4 className="fav-details--artist">{song.artist}</h4>
      </div>
      {/* </div> */}
    </button>
  );
}

export default SongData;
