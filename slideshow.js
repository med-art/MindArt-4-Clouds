
let introText = ["Touch", "Look", "Listen", "Touch"];

let appCol = "#f1b300";

let slide = 0;
let delayTime = 8000;
let introState = 0;
let noiseScale=2;

function mousePressed(){


  if (introState < 3){


  if (audio.isPlaying()){

  }
  else {
        audio.loop(5);
      }

}

if (slide === 0){
  slide++;
  slideShow();
}

 return false;
}

function slideShow() {

  if (slide === 0){


  }

  if (slide === introText.length) {
    textLayer.clear();
    introState = 3;
    writeTextUI();
     imageMode(CENTER)
    paintLayer.clear();

    //restart();
    counter = 0;
  }

  else if (slide < introText.length) {

    textLayer.clear();
    textLayer.fill(255, 5);
    textLayer.textSize(vMax*8);
    textLayer.textAlign(CENTER, CENTER);
    textLayer.rectMode(CENTER);
    textLayer.text(introText[slide], width+(width/2), (height/8)*(slide+2));

if (slide > 0){

if (slide === introText.length-1){
  delayTime = 10000;
}

      slide++;
      console.log(slide);
      setTimeout(slideShow, delayTime);
}

  }
}
