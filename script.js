document.addEventListener("DOMContentLoaded", function () {
    var play_button = document.getElementById("play_button");
    var backward_button = document.getElementById("backward_button");
    var forward_button = document.getElementById("forward_button");
    var next_button = document.getElementById("next_button");
    var prev_button = document.getElementById("prev_button");
    var music_poster = document.getElementById("music_poster");
    var progress_bar = document.getElementById("progress_bar");
    var current_time = document.getElementById("current_time");
    var song_duration = document.getElementById("song_duration");
    var songLoopingButton = document.getElementById("song-looping-btn");

    var isLoopingAllSongs = false; // Flag to track the looping mode


    // var song_name = document.getElementById(song);

    var audio = new Audio();
    var songList = [
        { name: "Song 0", image: "nvsp.png", song_file_name: "Abrar’S-Entry-Jamal-Kudu(PaglaSongs).mp3" },
        { name: "Song 1", image: "india.png", song_file_name: "Lashkare_192(PaglaSongs).mp3" },
        { name: "Song 2", image: "digi.png", song_file_name: "Arjan-Vailly(PaglaSongs).mp3" },
        // Add entries for songs 3 to 10
    ];
    // Add 98 more fake data entries
    for (let i = 3; i <= 100; i++) {
        songList.push({
            name: "Song " + i,
            image: "mypic" +".png",
            song_file_name: "Fake_Song_" + i + ".mp3",
        });
    }
    // Log the resulting array to the console
    console.log(songList);


    var songListElement = document.getElementById("song_List");
    // Loop through the songList array and create list items dynamically
    for (var i = 3; i < songList.length; i++) {
        var listItem = document.createElement("li");
        listItem.dataset.src = songList[i].song_file_name;
        listItem.textContent = songList[i].name;

        songListElement.appendChild(listItem);
    }
    //the visibility of the song_list on click song-list-btn
    document.getElementById("song-list-btn").addEventListener("click", function () {
        var songListElement = document.querySelector(".song_list");
        songListElement.style.display = (songListElement.style.display === "block") ? "none" : "block";
    });
    document.querySelector(".song_list ul").addEventListener("click", function (event) {
        var songListElement = document.querySelector(".song_list");
        
        // Check if the click occurred on an 'LI' element within the song list
        if (event.target.tagName === "LI") {
            // Hide the song list
            songListElement.style.display = "none";
            
            // Add any logic to play the selected song if needed
        }
    });
    
    

    var currentSongIndex = 0;

    audio.addEventListener("timeupdate", function () {
        var progress = (audio.currentTime / audio.duration) * 100;
        progress_bar.value = progress;

        var currentTimeMinutes = Math.floor(audio.currentTime / 60);
        var currentTimeSeconds = Math.floor(audio.currentTime % 60);
        current_time.innerHTML = currentTimeMinutes + ":" + (currentTimeSeconds < 10 ? "0" : "") + currentTimeSeconds;

        var durationMinutes = Math.floor(audio.duration / 60);
        var durationSeconds = Math.floor(audio.duration % 60);
        song_duration.innerHTML = durationMinutes + ":" + (durationSeconds < 10 ? "0" : "") + durationSeconds;
    });

    // play_button.addEventListener("click", function () {
    //     if (audio.paused) {
    //         audio.play();
    //         music_poster.style.animation = "rotation 2s infinite linear";
    //         play_button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    //     } else {
    //         audio.pause();
    //         music_poster.style.animation = "none";
    //         play_button.innerHTML = '<i class="fa-solid fa-play"></i>';
    //     }
    // });

    play_button.addEventListener("click", function () {
        if (audio.paused) {
            if (audio.src) {
                // Check if audio is loaded and ready to play
                audio.play().catch(function (error) {
                    console.log("Error playing audio:", error);
                });
                music_poster.style.animation = "rotation 2s infinite linear";
                play_button.innerHTML = '<i class="fa-solid fa-pause"></i>';

            } else {
                // If audio source is not set, load and play the first song
                playNextSong();
                play_button.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }
        } else {
            audio.pause();
            music_poster.style.animation = "none";
            play_button.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });

    backward_button.addEventListener("click", function () {
        audio.currentTime -= 10;
    });
    // console.log(backward_button.value)
    forward_button.addEventListener("click", function () {
        audio.currentTime += 10;
    });

    progress_bar.addEventListener("input", function () {
        var seekTime = (progress_bar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    next_button.addEventListener("click", function () {
        playNextSong();
    });

    prev_button.addEventListener("click", function () {
        playPreviousSong();
    });

    function playNextSong() {
        // currentSongIndex = (currentSongIndex + 1) % songList.length;
        // loadAndPlaySong(currentSongIndex);
        if (isLoopingAllSongs) {
            // If looping all songs, increment the index and loop to the beginning if needed
            currentSongIndex = (currentSongIndex + 1) % songList.length;
        } else {
            // If not looping all songs, stay on the current song
            currentSongIndex = currentSongIndex;
        }
        loadAndPlaySong(currentSongIndex);
    }

    function playPreviousSong() {
        currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
        loadAndPlaySong(currentSongIndex);
    }

    // function loadAndPlaySong(index) {
    //     if (index >= 0 && index < songList.length) {
    //         audio.src = songList[index];
    //         audio.play();
    //     }
    // }
    // function loadAndPlaySong(index) {
    //     if (index >= 0 && index < songList.length) {
    //         audio.src = songList[index];
    //         audio.play();

    //         // Set the song name in the element with id="song_name"
    //         var songNameElement = document.getElementById("song_name");
    //         songNameElement.textContent = "Song " + (index + 1); // Change this line to set the actual song name

    //         // Set the song image in the element with id="music_poster"
    //     var musicPosterElement = document.getElementById("music_poster");
    //     musicPosterElement.innerHTML = '<img src="path_to_your_images/' + songList[index] + '" alt="img">';
    //     }
    // }
    function loadAndPlaySong(index) {
        if (index >= 0 && index < songList.length) {
            audio.src = songList[index].song_file_name;
            audio.play();

            var musicPosterElement = document.getElementById("music_poster");
            // Update the content with both the image and the song name
            musicPosterElement.innerHTML = `<img src="${songList[index].image}" alt="img"><span id="song_name">${songList[index].song_file_name}</span>`;
        }
    }

    // Assuming you have this variable defined somewhere in your code
var isLoopingAllSongs = true;
    songLoopingButton.addEventListener("click", function () {
        // Toggle the looping mode on each click
        isLoopingAllSongs = !isLoopingAllSongs;

        if (isLoopingAllSongs) {
            // If looping all songs, update the button text
            songLoopingButton.textContent = "Loop All Songs";
            songLoopingButton.innerHTML = '<i class="fa-solid fa-repeat"></i>';
        } else {
            // If not looping all songs, update the button text
            songLoopingButton.textContent = "Loop Single Song";
            songLoopingButton.innerHTML = '<i class="fa-solid fa-arrow-up-1-9"></i>';
        }
    });






    //working to dispay song list on screen
    var songListElement = document.querySelector(".song_list ul");

    // Event listener for song selection
    songListElement.addEventListener("click", function (event) {
        var target = event.target;
        if (target.tagName === "LI") {
            var index = Array.from(songListElement.children).indexOf(target);
            loadAndPlaySong(index);
            play_button.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
    });
    //for playing  next song automatically
    audio.addEventListener("ended", function () {
        playNextSong();
    });
});




