import { Audio } from "expo-av";
const soundObject = new Audio.Sound();

let playFast

const init = async ()  =>{
  try{
    await soundObject.loadAsync(require('../audio/Click6.mp3'));
  }catch (error) {
    ///console.log("error: "+error);
  }
}

const play = async () => {
  await soundObject.playAsync();
    //console.log("Playing Messages!")

    //await soundObject.setPositionAsync(0)
    // if (playFast==undefined) {
    //   playFast  = await soundObject.replayAsync();
    // }else {
    //   console.log(playFast,"1");
    // }
}

export default {init,play}
