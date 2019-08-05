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
        alphaErase = color(0, 0, 0, 0);
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

  function invertColourSet() {

    colourBool = !colourBool;

    if (colourBool) {
      button1A.style('background-color', col);
      button1A.style('color', 'grey');
      button1B.style('background-color', '#225E5E');
      button1B.style('color', 'white');
    } else {
      button1A.style('background-color', '#EE6944');
      button1A.style('color', 'white');
      button1B.style('background-color', col);
      button1B.style('color', 'grey');
    }

  }

  function invertTracing() {
    bool = !bool; // temporary invert function, will be overidden by UI

    if (bool) {
      button2A.style('background-color', colSelect);
      button2A.style('color', 'white');
      button2B.style('background-color', col);
      button2B.style('color', 'grey');
    } else {
      button2A.style('background-color', col);
      button2A.style('color', 'grey');
      button2B.style('background-color', colSelect);
      button2B.style('color', 'white');

    }
  }

  function writeTextUI() {

    textSize(windowWidth / 50);
    fill(0);
    noStroke();


    button1A = createButton('Warm colours');
    button1B = createButton('Cool colours');
    button2A = createButton('Paint');
    button2B = createButton('Trace');
    // button2C = createButton('Eraser');
    button3 = createButton('New drawing');

    button1A.position(lmax, windowHeight - lmax * 5);
    button1B.position((lmax * 16) + lmax, windowHeight - lmax * 5); // 16 because 16 characters in 'Sunset Colours'
    button2A.position(lmax, windowHeight - lmax * 10);
    button2B.position(lmax * 13.5 + lmax, windowHeight - lmax * 10); // 7 because 7 characters in Paint
    // button2C.position(lmax * 27 + lmax, windowHeight - lmax * 10);

    button3.position(windowWidth - (20 * lmax) - (lmax * 3), windowHeight - lmax * 5);

    col = color(0, 0, 0, 0.2);
    colSelect = color(0, 0, 0, 0.7);
    colH3 = color(355, 87, 74);

    button1A.style('background-color', '#EE6944')
    button1A.style('font-size', '2vmax');
    button1A.style('color', 'white');
    button1A.style('width', '15vmax');
    button1A.mousePressed(invertColourSet);

    button1B.style('background-color', col)
    button1B.style('font-size', '2vmax');
    button1B.style('color', 'grey');
    button1B.style('width', '15vmax');
    button1B.mousePressed(invertColourSet);

    button2A.style('background-color', colSelect)
    button2A.style('font-size', '2.5vmax');
    button2A.style('color', 'white');
    button2A.mousePressed(invertTracing);
    button2A.style('border-radius', '0.25vmax')
    button2A.style('width', '12.5vmax');

    button2B.style('background-color', col)
    button2B.style('font-size', '2.5vmax');
    button2B.style('color', 'grey');
    button2B.style('border-radius', '0.25vmax')
    button2B.style('width', '12.5vmax');
    button2B.mousePressed(invertTracing);

    // button2C.style('background-color', col)
    // button2C.style('font-size', '2.5vmax');
    // button2C.style('color', 'grey');
    // button2C.style('border-radius', '0.25vmax')
    // button2C.style('width', '12.5vmax');
    // button2C.mousePressed(eraser);

    button3.style('background-color', colH3);
    button3.style('font-size', '2.5vmax');
    button3.style('color', 'white');
    button3.style('border-radius', '0.25vmax')
    button3.style('width', '20vmax')
    button3.mousePressed(reset);
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

  // function writeTextUIAudio() {
  //
  //   textSize(longEdge / 50);
  //   fill(0);
  //   noStroke();
  //   let vmax = longEdge / 100; // suspect we may have issue here with IOS in terms of rotation and measuring height, etc
  //   let textMargin = longEdge / 100; // consolidate into above - no point having 2
  //   button4.position(windowWidth - (10 * vmax) - (textMargin), vmax * 1);
  //   button4.style('font-size', '1.75vmax');
  //   button4.style('color', 'black');
  //   button4.style('border-radius', '3.5vmax')
  //   button4.style('width', '7vmax')
  //   button4.mousePressed(switchSound);
  // }


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

  function eraseDrawing(){

    traceLayer.set(winMouseX, winMouseY, alphaErase);
    paintLayer.set(winMouseX, winMouseY, alphaErase);
    traceLayer.updatePixels();
    paintLayer.updatePixels();
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
      traceLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 0.3, 2)); // for line work
      traceLayer.stroke(255, 0, 255); // for line work
      traceLayer.line(_x, _y, pX, pY);
    }
  }

  // function switchSound() {
  //   if (audio.isPlaying()) {
  //     audio.stop();
  //     button4.remove();
  //     button4 = createImg('assets/gui2.png');
  //     writeTextUIAudio();
  //
  //   } else {
  //     audio.loop();
  //     button4.remove();
  //     button4 = createImg('assets/gui1.png');
  //     writeTextUIAudio();
  //   }
  //
  //   return false;
  // }


  function segment(rakeX, rakeY, a, rake, scalar) {

      paintLayer.tint((colHue += random(-hueDrift, hueDrift)), (colSat += random(-satDrift, satDrift)), colBri, colOpacity); // Display at half opacity
    paintLayer.push();

    paintLayer.translate(rakeX + (randomGaussian(-scatterAmount * (0.1 * scalar), scatterAmount * (0.1 * scalar))), rakeY + (randomGaussian(-scatterAmount * (0.1 * scalar), scatterAmount * (0.1 * scalar))));

    paintLayer.scale(scalar);
    paintLayer.rotate(a);

    paintLayer.image(rake, 0, 0, 0, 0);

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
