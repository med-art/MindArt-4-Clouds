let introText = ["Touch ", "Look", "Listen", "Touch"];
let slide = 0;
let delayTime = 8000;
let introState = 0; // 3 way state. State 0 is intro begun, state 1 is intro over and waiting for input, state 2 is active painting

function slideShow() {
  audio.loop();

  if (slide === introText.length-1) {
    introState = 2;

  }

  if (slide < introText.length) {
    textLayer.blendMode(BLEND)
    textLayer.clear();
    textLayer.fill(color("#1B4643"));
    textLayer.textSize(vMax * 5);
    textLayer.textAlign(CENTER, CENTER);
    textLayer.rectMode(CENTER);
    textLayer.text(introText[slide], width / 2, hmax * 50, width * 0.8, height);

if (slide > 0){
      slide++;
      setTimeout(slideShow, delayTime);
    }

  }
}
