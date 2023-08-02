import React from "react";
import SongData from "./SongData";

function FavoriteList(props) {
  let { songs, likedList, setCurrentSongIndex, setIsPlaying } = props;
  return (
    <div>
      <h2 className="c-favorites--title">Favorites</h2>
      <div className="c-favorite--playlist">
        {likedList.map((likedIndex) => (
          <SongData
            index={likedIndex}
            key={likedIndex}
            song={songs[likedIndex]}
            setCurrentSongIndex={setCurrentSongIndex}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteList;
