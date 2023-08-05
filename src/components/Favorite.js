import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faList } from "@fortawesome/free-solid-svg-icons";
// import { faStar } from "@fortawesome/free-solid-svg-icons";

function Favorite(props) {
  let { likedList, setLikedList, songIndex, setCurrentPage } = props;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likedList.includes(songIndex));
  }, [likedList, songIndex]);

  const handleFavoriteBtnClick = () => {
    const newCurrentPage = "favorite";
    setCurrentPage(newCurrentPage);
    console.log("Favorite List... Clicked");
    console.log("Favorite: " + likedList);
  };

  const likingSong = () => {
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
      <button className={`favorite-btn`} onClick={handleFavoriteBtnClick}>
        <div className="favorite-list-btn">
          <FontAwesomeIcon icon={faList} />
        </div>
        <div className="favorite-list-heart">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </button>
    </div>
  );
}

export default Favorite;
