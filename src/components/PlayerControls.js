import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faShuffle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";

function PlayerControls(props) {
  let {
    isPlaying,
    onPlay,
    SkipSong,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
    isPrevDisabled,
    isNextDisabled,
  } = props;
  const shuffleClass = `shuffle-btn ${isShuffle ? "active-btn" : ""}`;
  const repeatClass = `repeat-btn ${isRepeat ? "active-btn" : ""}`;

  const changeShuffle = () => {
    const newShuffle = !isShuffle;
    setIsShuffle(newShuffle);
    console.log("Shuffle Clicked... " + newShuffle);
  };

  const changeRepeat = () => {
    const newRepeat = !isRepeat;
    setIsRepeat(newRepeat);
    console.log("Repeat Clicked... " + newRepeat);
  };

  const prevBtnClass = `skip-btn ${isPrevDisabled ? "skip-btn--disabled" : ""}`;

  const nextBtnClass = `skip-btn ${isNextDisabled ? "skip-btn--disabled" : ""}`;

  return (
    <div className="c-player--buttons">
      <button className={shuffleClass} onClick={changeShuffle}>
        <FontAwesomeIcon icon={faShuffle} />
      </button>
      <div className="c-player--controls">
        <button
          className={prevBtnClass}
          onClick={() => SkipSong(false)}
          disabled={isPrevDisabled}
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button
          className="play-btn"
          // onClick={() => setIsPlaying(!isPlaying)}
          onClick={onPlay}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button
          className={nextBtnClass}
          onClick={() => SkipSong(true)}
          disabled={isNextDisabled}
        >
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
      <button className={repeatClass} onClick={changeRepeat}>
        <FontAwesomeIcon icon={faRepeat} />
      </button>
    </div>
  );
}

export default PlayerControls;
