import React, { useState, useRef, useEffect } from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";
import Favorite from "./Favorite";
import FavoriteList from "./FavoriteList";

function Player(props) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  }, [props.currentSongIndex, isPlaying]);

  // for play/pause button
  const handlePlayPause = () => {
    if (isPlaying) {
      audioEl.current.pause();
    } else {
      audioEl.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // for timeline
  const handleTimeUpdate = () => {
    setCurrentTime(audioEl.current.currentTime);
  };

  // for duration
  const handleLoadedData = () => {
    setDuration(audioEl.current.duration);
  };

  const SkipSong = (isRepeat, isShuffle, forwards) => {
    if (isShuffle) {
      // Shuffle handle code
    } else {
      // Not Repeat -- stopping condition
      if (!isRepeat) {
        if (forwards && props.currentSongIndex === props.songs.length - 1) {
          audioEl.current.pause();
        } else if (!forwards && props.currentSongIndex === 0) {
          audioEl.current.pause();
        }
      }
      // Normal Skip
      if (forwards) {
        props.setCurrentSongIndex(() => {
          let temp = props.currentSongIndex;
          temp++;

          if (temp > props.songs.length - 1) {
            temp = 0;
          }
          return temp;
        });
      } else {
        props.setCurrentSongIndex(() => {
          let temp = props.currentSongIndex;
          temp--;

          if (temp < 0) {
            temp = props.songs.length - 1;
          }
          return temp;
        });
      }
    }
  };

  // handle time seek
  const handleTimeSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioEl.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // for formatting time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="c-player">
      <audio
        src={props.songs[props.currentSongIndex].src}
        ref={audioEl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        onEnded={() => {
          SkipSong(false, false, true);
        }}
      ></audio>
      <h4>Playing Now</h4>
      {/* Details */}
      <PlayerDetails song={props.songs[props.currentSongIndex]} />
      {/* Liked Song */}
      <Favorite
        songs={props.songs}
        song={props.songs[props.currentSongIndex]}
        likedList={props.likedList}
        setLikedList={props.setLikedList}
        songIndex={props.currentSongIndex}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
      {/* Time Line */}
      <div>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          className="c-timeline--slider"
          onChange={handleTimeSeek}
        />
      </div>
      <div className="c-song--duration">
        <span>{formatTime(currentTime)}</span>
        <span> / </span>
        <span>{formatTime(duration)}</span>
      </div>
      {/* Controlls */}
      <PlayerControls
        isPlaying={isPlaying}
        // setIsPlaying={setIsPlaying}
        onPlay={handlePlayPause}
        SkipSong={SkipSong}
      />
      <p>
        <strong>Next up:</strong> {props.songs[props.nextSongIndex].title} by{" "}
        {props.songs[props.nextSongIndex].artist}
      </p>
      {showFavorites && (
        <FavoriteList
          songs={props.songs}
          likedList={props.likedList}
          setCurrentSongIndex={props.setCurrentSongIndex}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
}

export default Player;
