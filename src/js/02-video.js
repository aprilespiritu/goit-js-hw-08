import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
let currentTime = 0;

// Load current time from local storage if available
const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
    currentTime = parseFloat(savedTime);
}

// Set current time on the player
player.setCurrentTime(currentTime);

// Listen for timeupdate event and save current time to local storage
player.on('timeupdate', throttle(() => {
    player.getCurrentTime().then(time => {
        localStorage.setItem('videoplayer-current-time', time);
    });
}, 1000));

