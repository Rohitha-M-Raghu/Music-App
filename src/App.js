import { useState, useEffect, useCallback } from "react";
import Player from "./components/Player";

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

  const [likedList, setLikedList] = useState([]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
  const [prevSongIndex, setPrevSongIndex] = useState(-1);

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const [shuffleQueue, setShuffleQueue] = useState([]);

  const generateShuffleQueue = useCallback(() => {
    const totalSongs = songs.length;
    const shuffledIndices = Array.from(Array(totalSongs).keys()).filter(
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

    // Return the shuffled queue
    return shuffledIndices;
  }, [currentSongIndex, songs.length]);

  useEffect(() => {
    if (isShuffle) {
      setShuffleQueue(generateShuffleQueue());
    } else {
      setShuffleQueue([]);
    }
  }, [isShuffle, setShuffleQueue, generateShuffleQueue]);

  useEffect(() => {
    setNextSongIndex(() => {
      if (isShuffle && shuffleQueue.length !== 0) {
        return shuffleQueue[0];
      }
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      }
      return currentSongIndex + 1;
    });
  }, [currentSongIndex, songs.length]);

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
        shuffleQueue={shuffleQueue}
      />
    </div>
  );
}

export default App;
