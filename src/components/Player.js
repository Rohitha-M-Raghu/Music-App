import React, { useState, useRef, useEffect } from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";
import Favorite from "./Favorite";
// import FavoriteList from "./FavoriteList";

function Player(props) {
  let {
    currentSongIndex,
    setCurrentSongIndex,
    nextSongIndex,
    songs,
    likedList,
    setLikedList,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
    prevSongIndex,
    isPrevDisabled,
    isNextDisabled,
    setIsPlaying,
    isPlaying,
    setCurrentPage,
  } = props;

  let { title, artist } = songs[nextSongIndex];
  const audioEl = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  }, [currentSongIndex, isPlaying]);

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

  const SkipSong = (forwards) => {
    if (forwards) {
      setCurrentSongIndex(nextSongIndex || 0);

      // change shuffle index
    } else {
      setCurrentSongIndex(prevSongIndex || 0);
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
        src={songs[currentSongIndex].src}
        ref={audioEl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        onEnded={() => {
          SkipSong(false, false, true);
        }}
      ></audio>
      <h4>Playing Now</h4>
      {/* Details */}
      <PlayerDetails song={songs[currentSongIndex]} />
      {/* Liked Song */}
      <Favorite
        // songs={songs}
        // song={songs[currentSongIndex]}
        likedList={likedList}
        setLikedList={setLikedList}
        songIndex={currentSongIndex}
        setCurrentPage={setCurrentPage}
        // showFavorites={showFavorites}
        // setShowFavorites={setShowFavorites}
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
        isShuffle={isShuffle}
        setIsShuffle={setIsShuffle}
        isRepeat={isRepeat}
        setIsRepeat={setIsRepeat}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
      />
      <p className="c-next--song-data">
        <strong>Next up:</strong> {title || "error loading title"} by{" "}
        {artist || "error loading artist"}
      </p>
      {/* {showFavorites && (
        <FavoriteList
          songs={songs}
          likedList={likedList}
          setCurrentSongIndex={setCurrentSongIndex}
          setIsPlaying={setIsPlaying}
        />
      )} */}
    </div>
  );
}

export default Player;
