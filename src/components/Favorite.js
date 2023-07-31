import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Favorite(props) {
  let isLiked = props.likedList.includes(props.songIndex);
  const likedClass = `like-btn ${isLiked ? "active-btn" : ""}`;
  const favoriteClass = `favorite-btn ${
    props.showFavorites ? "active-btn" : ""
  }`;

  const handleFavoriteBtnClick = () => {
    const newShowFavorites = !props.showFavorites;
    props.setShowFavorites(newShowFavorites);
    console.log("Favorite List... Clicked");
  };

  const likingSong = () => {
    isLiked = !isLiked;
    let newLikedList = [...props.likedList];
    if (isLiked) {
      newLikedList = [...newLikedList, props.songIndex];
    } else {
      newLikedList.splice(props.songIndex, 1);
    }
    // printed for testing --- remove
    props.setLikedList(newLikedList);
    console.log(props.likedList);
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
