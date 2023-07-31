import React from "react";
import FavoriteSong from "./FavoriteSong";

function FavoriteList(props) {
  return (
    <div className="c-favorite--playlist">
      {props.likedList.map((likedIndex) => (
        <FavoriteSong
          index={likedIndex}
          song={props.songs[likedIndex]}
          setCurrentSongIndex={props.setCurrentSongIndex}
          setIsPlaying={props.setIsPlaying}
        />
      ))}
    </div>
  );
}

export default FavoriteList;
