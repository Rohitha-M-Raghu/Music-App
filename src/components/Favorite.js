import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Favorite(props) {
  let { likedList, setLikedList, songIndex, showFavorites, setShowFavorites } =
    props;
  let isLiked = likedList.includes(songIndex);
  const likedClass = `like-btn ${isLiked ? "active-btn" : ""}`;
  const favoriteClass = `favorite-btn ${showFavorites ? "active-btn" : ""}`;

  const handleFavoriteBtnClick = () => {
    const newShowFavorites = !showFavorites;
    setShowFavorites(newShowFavorites);
    console.log("Favorite List... Clicked");
  };

  const likingSong = () => {
    isLiked = !isLiked;
    let newLikedList = [...likedList];
    if (isLiked) {
      newLikedList = [...newLikedList, songIndex];
    } else {
      newLikedList.splice(songIndex, 1);
    }
    // printed for testing --- remove
    setLikedList(newLikedList);
    console.log(likedList);
  };

  return (
    <div className="c-favorite">
      <button className={likedClass} onClick={likingSong}>
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <button className={favoriteClass} onClick={handleFavoriteBtnClick}>
        <FontAwesomeIcon icon={faStar} />
      </button>
    </div>
  );
}

export default Favorite;
