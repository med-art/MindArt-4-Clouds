let introText = ["Touch the screen to begin", "Watching", "Listening", "Imagining", "Where is our mind taking us", "Let's create our own dreamscape", "Paint slowly, faster, find your rhythm", "Then let your creation take you where you want to go with ‘trace’", "Enjoy \n \n Touch the screen to continue"];
let slide = 0;
let delayTime = 1000;
let introState = 0; // 3 way state. State 0 is intro begun, state 1 is intro over and waiting for input, state 2 is active painting

function slideShow() {
  audio.loop();

  if (slide === introText.length) {
    introState = 2;

  }

  if (slide < introText.length) {
    textLayer.blendMode(BLEND)
    textLayer.clear();
    textLayer.fill(color("#1B4643"));
    textLayer.textSize(lmax * 6);
    textLayer.textAlign(CENTER, CENTER);
    textLayer.rectMode(CENTER);
    textLayer.text(introText[slide], width / 2, hmax * 50, width * 0.8, height);

if (slide > 0){
      slide++;
      setTimeout(slideShow, delayTime);
    }

  }
}
