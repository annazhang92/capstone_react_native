import { Sound } from 'react-native-sound';
// const Sound = require('react-native-sound');

Sound.setCategory('Playback');

const sound = new Sound('ping.mp3', null, (error) => {
  if(error) {
    console.log('Error!', error);
  } else {
    console.log('sound should play')
  }
})

export default sound;


/*import Sound from 'react-native-sound';

const sound = new Sound(null, null, (error) => {
  // return function() {
    if(error) {
      console.log('Error!', error);
    } else {
      console.log('sound should play')
      // sound.play();
    }
  // }
})

export default sound;*/
