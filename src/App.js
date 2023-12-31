import { useState, useEffect, useCallback } from "react";
import Player from "./components/Player";
// import { songsList } from "./Utils/songUtil";
import FavoriteList from "./components/FavoriteList";

function App() {
  const [songs] = useState([
    {
      title: "Forget me too ft. Halsey",
      artist: "Machine Gun Kelly",
      img_src: "./images/song-1.jpg",
      src: "./music/on-n-on.mp3",
      duration: 208,
    },
    {
      title: "Song 2",
      artist: "Artist 2",
      img_src: "./images/song-2.jpg",
      src: "./music/somebody-new.mp3",
      duration: 150,
    },
    {
      title: "Song 3",
      artist: "Artist 3",
      img_src: "./images/song-3.jpg",
      src: "./music/on-n-on.mp3",
      duration: 208,
    },
    {
      title: "Song 4",
      artist: "Artist 4",
      img_src: "./images/song-4.jpg",
      src: "./music/somebody-new.mp3",
      duration: 150,
    },
  ]);
  const [currentPage, setCurrentPage] = useState("player");
  const [likedList, setLikedList] = useState([]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(1);
  const [prevSongIndex, setPrevSongIndex] = useState(-1);

  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const [shuffleQueue, setShuffleQueue] = useState([]);
  const [shuffleIndex, setShuffleIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [playerClass, setPlayerClass] = useState("c-player");
  const [favoriteClass, setFavoriteClass] = useState(
    "favorite-songlist-conatiner"
  );

  // for checking whether shuffleIndex should change
  // const [isShuffleIndexChanges, setIisShuffleIndexChanges] = useState(false);

  const generateShuffleQueue = useCallback(() => {
    const totalSongs = songs.length;
    let shuffledIndices = Array.from(Array(totalSongs).keys()).filter(
      (index) => index !== currentSongIndex
    ); // Filter out the current song index

    // Shuffle the indices using the Fisher-Yates algorithm
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [
        shuffledIndices[j],
        shuffledIndices[i],
      ];
    }
    shuffledIndices = [currentSongIndex, ...shuffledIndices];
    // setShuffleIndex(0);
    // Return the shuffled queue
    return shuffledIndices;
  }, [currentSongIndex, songs.length]);

  useEffect(() => {
    if (currentPage === "player") {
      setPlayerClass("c-player c-active-block");
      setFavoriteClass("favorite-songlist-conatiner");
    } else if (currentPage === "favorite") {
      setPlayerClass("c-player");
      setFavoriteClass("favorite-songlist-conatiner c-active-block");
    }
  }, [currentPage]);

  useEffect(() => {
    if (isShuffle) {
      setShuffleQueue(generateShuffleQueue());
      setShuffleIndex(currentSongIndex || 0);
      //testing
      // console.log("UseEffect triggered ---" + shuffleQueue);
    } else {
      setShuffleQueue([]);
    }
  }, [isShuffle]);
  // }, [isShuffle, setShuffleQueue, generateShuffleQueue]);

  useEffect(() => {
    // console.log(currentSongIndex);
  }, [currentSongIndex]);

  useEffect(() => {
    let isPrevDisabled = false;
    let isNextDisabled = false;
    // setIsNextDisabled(false);
    // setIsPrevDisabled(false);
    setNextSongIndex(() => {
      let nextSong = 0;
      if (isShuffle && shuffleQueue.length) {
        // shuffle index setting...
        const shuffleIndex = shuffleQueue.indexOf(currentSongIndex);
        setShuffleIndex(shuffleIndex);
        if (currentSongIndex === shuffleQueue[songs.length - 1]) {
          if (isRepeat) {
            nextSong = shuffleQueue[0];
          } else {
            //next button disable... next song any random
            isNextDisabled = true;
            nextSong = 0;
          }
        } else {
          nextSong = shuffleQueue[shuffleIndex + 1];
        }
      } else {
        // not shuffled
        if (currentSongIndex === songs.length - 1) {
          if (!isRepeat) {
            // next button disable... next song 1st song in original
            isNextDisabled = true;
          }
          nextSong = 0;
        } else {
          nextSong = currentSongIndex + 1;
        }
      }
      setIsNextDisabled(isNextDisabled);
      return nextSong;
    });
    setPrevSongIndex(() => {
      let prevSong = 0;
      if (isShuffle) {
        if (currentSongIndex === shuffleQueue[0]) {
          if (isRepeat) {
            prevSong = shuffleQueue[songs.length - 1];
          } else {
            // disable prev button
            isPrevDisabled = true;
            prevSong = 0;
          }
        } else {
          prevSong = shuffleQueue[shuffleIndex - 1];
        }
      } else {
        // not shuffle
        if (currentSongIndex === 0) {
          if (isRepeat) {
            prevSong = songs.length - 1;
          } else {
            //disable prev button
            isPrevDisabled = true;
          }
        } else {
          prevSong = currentSongIndex - 1;
        }
      }
      setIsPrevDisabled(isPrevDisabled);
      return prevSong;
    });
  }, [currentSongIndex, songs.length, isRepeat, isShuffle, shuffleQueue]);

  return (
    <div className="App">
      {/* <Player song={songs[currentSongIndex]} nextSong={songs[nextSongIndex]} /> */}

      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
        likedList={likedList}
        setLikedList={setLikedList}
        isShuffle={isShuffle}
        setIsShuffle={setIsShuffle}
        isRepeat={isRepeat}
        setIsRepeat={setIsRepeat}
        prevSongIndex={prevSongIndex}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        setCurrentPage={setCurrentPage}
        playerClass={playerClass}
      />

      <FavoriteList
        songs={songs}
        likedList={likedList}
        setCurrentSongIndex={setCurrentSongIndex}
        setIsPlaying={setIsPlaying}
        setCurrentPage={setCurrentPage}
        favoriteClass={favoriteClass}
      />
    </div>
  );
}

export default App;
