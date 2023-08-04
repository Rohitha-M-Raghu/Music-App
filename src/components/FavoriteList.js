import React from "react";
import SongData from "./SongData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function FavoriteList(props) {
  let { songs, likedList, setCurrentSongIndex, setIsPlaying, setCurrentPage } =
    props;
  const backToHome = () => {
    setCurrentPage("player");
  };
  return (
    <div className="favorite-songlist-conatiner">
      <button onClick={backToHome} className="back-btn">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h2 className="c-favorites--title">Favorites</h2>
      <div className="c-favorite--playlist">
        {likedList.length === 0 ? (
          <h3 className="c-nofavorite--songs">No Liked Songs</h3>
        ) : (
          likedList.map((likedIndex) => (
            <SongData
              index={likedIndex}
              key={likedIndex}
              song={songs[likedIndex]}
              setCurrentSongIndex={setCurrentSongIndex}
              setIsPlaying={setIsPlaying}
              setCurrentPage={setCurrentPage}
            />
          ))
        )}
        {/* {likedList.map((likedIndex) => (
          <SongData
            index={likedIndex}
            key={likedIndex}
            song={songs[likedIndex]}
            setCurrentSongIndex={setCurrentSongIndex}
            setIsPlaying={setIsPlaying}
          />
        ))} */}
      </div>
    </div>
  );
}

export default FavoriteList;
