import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Favorite(props) {
  let { likedList, setLikedList, songIndex, showFavorites, setShowFavorites } =
    props;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likedList.includes(songIndex));
  }, [likedList, songIndex]);

  const handleFavoriteBtnClick = () => {
    const newShowFavorites = !showFavorites;
    setShowFavorites(newShowFavorites);
    console.log("Favorite List... Clicked");
    console.log("Favorite: " + likedList);
  };

  const likingSong = () => {
    console.log("Liked function -- triggering");
    setLikedList((prevLikedList) => {
      if (!isLiked) {
        return [...prevLikedList, songIndex];
      } else {
        return prevLikedList.filter((index) => index !== songIndex);
      }
    });
  };

  return (
    <div className="c-favorite">
      <button
        className={`like-btn ${isLiked ? "active-btn" : ""}`}
        onClick={likingSong}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <button
        className={`favorite-btn ${showFavorites ? "active-btn" : ""}`}
        onClick={handleFavoriteBtnClick}
      >
        <FontAwesomeIcon icon={faStar} />
      </button>
    </div>
  );
}

export default Favorite;
