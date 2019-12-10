var isPlaying = false;
var player = videojs('book-player');

var pathPrefix = './assets/video/';
var pageTurnSound = new Audio('./assets/audio/page-flip-03.mp3');

var currentVideoIndex = 0;

var KEY_PLAY_PAUSE = 32; // space
var KEY_FULLSCREEN = 70; // 'f'
var KEY_PREVIOUS = 37; // arrow left
var KEY_NEXT = 39; // arrow right

var videos = [
	'01-02-03-04.mp4',
	'03-04-05-06.mp4',
	'05-06-07-08.mp4'
];

function togglePlayPause() {
	if (isPlaying) {
		player.pause();
		isPlaying = false;
	} else {
		player.play();
		isPlaying = true;
		pageTurnSound.play();
	}
}

function toggleFullscreen() {
	player.requestFullscreen();
}

function generateSourcesFromFile(file) {
	return [{
		"type": "video/mp4",
		"src": pathPrefix + file
	}]
}

function changeVideo(index) {
	player.pause();
	player.src(generateSourcesFromFile(videos[index]));
}

player.ready(function() {

	player.src(generateSourcesFromFile(videos[currentVideoIndex]));

	document.body.onkeyup = function(e){
		if(e.keyCode == KEY_PLAY_PAUSE){
			togglePlayPause();
		}

		if (e.keyCode == KEY_FULLSCREEN) {
			toggleFullscreen();
		}

		if (e.keyCode == KEY_PREVIOUS) {
			currentVideoIndex--;
			currentVideoIndex = Math.max(currentVideoIndex, 0);
			changeVideo(currentVideoIndex);
		}

		if (e.keyCode == KEY_NEXT) {
			currentVideoIndex++;
			currentVideoIndex = Math.min(currentVideoIndex, videos.length - 1);
			changeVideo(currentVideoIndex);
		}
	}

	player.on("ended", function() {
		isPlaying = false;
		if (currentVideoIndex < videos.length - 1) {
			currentVideoIndex++;
			player.src(generateSourcesFromFile(videos[currentVideoIndex]));
		}
	})
})