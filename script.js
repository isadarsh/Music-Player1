console.log("Welcome to Spotify!");
// varibles
let songIndex = 0;
let audioElement = new Audio("songs/0.mp3");
let progress;
let masterPlay = document.getElementById("masterPlay");
let listPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Slow Atmospheric Synth-Wave",
    filePath: "songs/0.mp3",
    coverPath: "covers/0.jpg",
  },
  {
    songName: "Let Me Love You",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Beach House (SpaceSong)[NCS]",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Bobby Wave  -by MemeMandir",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Himesh Wave -The Journey",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Aathma Raama -Brodha V",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Tujhe Mein Rab - [Lofi]",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Tumhe Dillagi -ft NFAK [Bass]",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
];

//listing all song data on the page
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

}

)
// Function to play the next song
function playNextSong() {
  togglePlayPause(false);
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  // Set the audio source to the next song
  audioElement.src = songs[songIndex].filePath;
  // Update the master song name
  masterSongName.innerText = songs[songIndex].songName;
  // Play the audio
  audioElement.play();
  // Toggle play/pause icon for newsong
  togglePlayPause(true);
  
}
// Event listener for the ended event of the audioElement
audioElement.addEventListener('ended', playNextSong);


//to synchronize play/pause for masterPlay and songListPlay
const togglePlayPause = (isPlaying) => {
  if (isPlaying) {
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    // updating songlist play/pause
    listPlay[songIndex].classList.remove("fa-circle-play");
    listPlay[songIndex].classList.add("fa-circle-pause");
  } else {
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    // updating songlist play/pause
    listPlay[songIndex].classList.remove("fa-circle-pause");
    listPlay[songIndex].classList.add("fa-circle-play");
  }
};

//to handle last song's icon
const makeAllPlay = () => {
  listPlay.forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

//updating seekbar progress
audioElement.addEventListener("timeupdate", () => {
  //setting seek bar progress
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});
//updating currentTime
myProgressBar.addEventListener("click", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// play/pause handling for masterPlay
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    togglePlayPause(!audioElement.paused);
  } else {
    audioElement.pause();
    togglePlayPause(!audioElement.paused);
  }
});
//play/pause handling for songListPlay
listPlay.forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlay();
      index = parseInt(e.target.id);
      // index = e.target.id;
      //same song hit
      if (index === songIndex) {
        if (audioElement.paused || audioElement.currentTime <= 0) {
          audioElement.play();
          togglePlayPause(!audioElement.paused);
        } else {
          audioElement.pause();
          togglePlayPause(!audioElement.paused);
        }
      } //new song chosen
      else {
        songIndex = index;
        audioElement.src = `songs/${index}.mp3`;
        masterSongName.innerText = songs[index].songName;
        audioElement.play();
        togglePlayPause(!audioElement.paused);
      }
      // audioElement.currentTime = 0;
    });
  }
);
//handling next>> 
document.getElementById("next").addEventListener("click", (element) => {
  if (songIndex >= songs.length-1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  makeAllPlay();

  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;

  audioElement.currentTime = 0;
  audioElement.play();
  togglePlayPause(!audioElement.paused);
});
// handling previous<<
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = songs.length-1;
  } else {
    songIndex -= 1;
  }
  makeAllPlay();

  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;

  audioElement.currentTime = 0;
  audioElement.play();
  togglePlayPause(!audioElement.paused);
});
