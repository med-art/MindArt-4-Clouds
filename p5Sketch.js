  // images
  let bg;
  let brush = [];
  // brush mechanics
  let angle1, segLength;
  let scalar = 30;
  let tempwinMouseX = 0;
  let tempwinMouseY = 0;
  let tempX = 100;
  let tempY = 100;
  let dx, dy;
  // VARIABLES FOR TIME DELAY ON BRUSH
  let milliCounter;
  let milliTrack = 0;
  //BRUSH CHARACTERISTICS
  let milliComp = 5;
  let scatterAmount = 2;
  // COLOUR VARAIABLES
  let colHue;
  const colHueMin = 0;
  const colHueMax = 360;
  let colSat;
  const colSatMin = 0;
  const colSatMax = 255;
  let colBri;
  const colBriMin = 0;
  const colBriMax = 255;
  let colOpacity = 0.4;
  let colourBool = 0;



  let cloudHSB = [
    [180, 47, 25],
    [178, 23, 55],
    [170, 15, 75],
    [164, 12, 95],
    [176, 45, 19]
  ];
  let sunsetHSB = [
    [11, 53, 96],
    [13, 83, 91],
    [2, 90, 100],
    [334, 81, 91],
    [300, 67, 99]
  ];

  const hueDrift = 3;
  const satDrift = 3;
  const rotateDrift = 0.2;
  let bool = 1;
  let brushTemp = 0;
  let buttonText1state = 0;
  let buttonText2state = 0;
  let button1A, button1B, button2A, button2B, button3, button4;
  let col;
  let colSelect;
  let wmax, hmax, longEdge, shortEdge, lmax;
  let audio;
  let startState = 0;

  let alphaErase;

  let eraseState = 0;


  let autoX = 0, autoY = 0, pautoX = 0, pautoY = 0; // automated drawing mouse states

  let textLayer, paintLayer, traceLayer;

  function preload() {
    bg = loadImage('assets/paper.jpg'); // background paper
    for (i = 1; i < 21; i++) {
      brush[i] = loadImage('assets/br-' + i + '.png') // brush loader
    }

    audio = loadSound('assets/audio.mp3');

  }

  function setup() {
    createCanvas(windowWidth, windowHeight);

    textLayer = createGraphics(width, height);
    paintLayer = createGraphics(width, height);
    traceLayer = createGraphics(width, height);

    dimensionCalc();
    pixelDensity(1); // Ignores retina displays
    imageMode(CENTER); // centers loaded brushes
    blendMode(BLEND); // consider overlay and multiply
    colorMode(HSB, 360, 100, 100, 1)
        paintLayer.colorMode(HSB, 360, 100, 100, 1);
        traceLayer.colorMode(HSB, 360, 100, 100, 1);
    colHue = random(colHueMin, colHueMax);
    colSat = random(colSatMin, colSatMax);
    backdrop();
    segLength = windowWidth / 40; // length of delay between touch and paint or line // 15 is a good value
    strokeWeight(4); // for line work
    stroke(255, 0, 255); // for line work

    setProperties(0,0);
    autoSetProperties();
    slideShow();
  }

  function backdrop() {
    noTint();
    image(bg, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight); // display backgrond
  }

  function dimensionCalc() {
    wmax = width / 100;
    hmax = height / 100;
    if (width > height) {
      longEdge = width;
      shortEdge = height;
      lmax = width / 100;
    } else {
      longEdge = height;
      shortEdge = width;
      lmax = height / 100;
    }
  }





  function eraser(){

    if (eraseState === 0){
    eraseState = 1;
        button2C.style('background-color', colSelect);
    }
    else {
      eraseState = 0;
     button2C.style('background-color', col);
    }

  }




function touchStarted() {

  if (introState === 0){
    introState = 1;
    slide++;
    audio.loop();
    slideShow();
  }

  else if (introState === 1){
    // do nothing
  }

  else if (introState === 2){
    paintLayer.clear();
    textLayer.clear();
    introState++;
    writeTextUI();
      button4 = createImg('assets/gui2.png'); //not ideal to have this here.
    //writeTextUIAudio();
  }

  else if (introState === 3){
  setProperties(winMouseX, winMouseY);
  }
}

  function setProperties(_x, _y) {
    tempwinMouseX = ((windowWidth / 2) - _x); // record position on downpress
    tempwinMouseY = ((windowHeight / 2) - _y); // record position on downpress
    brushTemp = int(random(1, 20));
  //  tint(255, 0.01); // Display at half opacit

    if (bool) {
      //image(bg, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
      let swatchTemp = int(random(0, 5));

      if (colourBool) {
        colHue = cloudHSB[swatchTemp][0];
        colSat = cloudHSB[swatchTemp][1];
        colBri = cloudHSB[swatchTemp][2];
      } else {
        colHue = sunsetHSB[swatchTemp][0];
        colSat = sunsetHSB[swatchTemp][1];
        colBri = sunsetHSB[swatchTemp][2];
      }
    }
  }

function draw(){

  if (introState < 3){
      autoDraw();
  }


    backdrop();
    image(paintLayer, width/2, height/2);
    image(traceLayer, width/2, height/2);
    image(textLayer, width/2, height/2);

}

function autoSetProperties(){


  setProperties();

  setTimeout(autoSetProperties, 5000);

}

  function touchMoved() {

    if (eraseState === 0 && introState === 3){
    makeDrawing(winMouseX, winMouseY, pwinMouseX, pwinMouseY);}
    else {
      eraseDrawing();
    }
  }



  function autoDraw() {

    pautoX = autoX;
    pautoY = autoY;
    autoX = autoX + (random(-50,55));
    autoY = autoY + (random(-20,22));

    makeDrawing(autoX % width, autoY % height, pautoX % width, pautoY % height);

  }

  function makeDrawing(_x, _y, pX, pY) {
    milliCounter = millis();

    if (bool) {

      if (milliCounter > milliTrack + milliComp) {


        if (colSat < 10) {
          colSat += 30
        }



        dx = _x - tempX;
        dy = _y - tempY;

        angle1 = atan2(dy, dx) + (random(-rotateDrift, rotateDrift)); // https://p5js.org/reference/#/p5/atan2
        tempX = _x - (cos(angle1) * segLength / 2); // https://p5js.org/examples/interaction-follow-1.html
        tempY = _y - (sin(angle1) * segLength / 2);
        scalar = constrain(100 * (random(3, abs(_x - pX)) / windowWidth), 0.2, 1.2);


        segment(tempX, tempY, angle1, brush[brushTemp], scalar)

        milliTrack = milliCounter;
      }
    } else {
      traceLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 0.3, 5)); // for line work
      traceLayer.stroke(255, 0, 255); // for line work
      traceLayer.line(_x, _y, pX, pY);
      traceLayer.updatePixels();
    }
  }


  function segment(rakeX, rakeY, a, rake, scalar) {

      paintLayer.tint((colHue += random(-hueDrift, hueDrift)), (colSat += random(-satDrift, satDrift)), colBri, colOpacity); // Display at half opacity
    paintLayer.push();
paintLayer.imageMode(CENTER); // centers loaded brushes
    paintLayer.translate(rakeX + (randomGaussian(-scatterAmount * (0.1 * scalar), scatterAmount * (0.1 * scalar))), rakeY + (randomGaussian(-scatterAmount * (0.1 * scalar), scatterAmount * (0.1 * scalar))));

    paintLayer.scale(scalar);
    paintLayer.rotate(a);

    paintLayer.image(rake, 0, 0, 0, 0);
paintLayer.imageMode(CORNER); // centers loaded brushes
    paintLayer.pop();



  }

  function reset() {
    paintLayer.clear();
    traceLayer.clear();
    if (!bool)
      invertTracing();
  }


  function windowResized() {
    setup(); // need to rewrite this to ensure image is saved
  }
