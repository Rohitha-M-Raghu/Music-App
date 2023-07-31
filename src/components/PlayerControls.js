import React, { useState } from "react";
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
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

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

  return (
    <div className="c-player--buttons">
      <button className={shuffleClass} onClick={changeShuffle}>
        <FontAwesomeIcon icon={faShuffle} />
      </button>
      <div className="c-player--controls">
        <button
          className="skip-btn"
          onClick={() => props.SkipSong(isRepeat, isShuffle, false)}
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button
          className="play-btn"
          // onClick={() => props.setIsPlaying(!props.isPlaying)}
          onClick={props.onPlay}
        >
          <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
        </button>
        <button
          className="skip-btn"
          onClick={() => props.SkipSong(isRepeat, isShuffle, true)}
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
