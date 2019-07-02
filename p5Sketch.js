  // images
  let bg;
  let brush = [];

  // bursh mechanics
  let angle1, segLength;
  let scalar = 0;
  let tempMouseX = 0;
  let tempMouseY = 0;
  let tempX = 100;
  let tempY = 100;
  let dx;
  let dy;


  // VARIABLES FOR TIME DELAY ON BRUSH
  let milliCounter;
  let milliTrack = 0;

  //BRUSH CHARACTERISTICS
  let milliComp = 10;
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

  // Saved colours as discussed with Emma - see mood board


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

  const hueDrift = 1;
  const satDrift = 1;
  const rotateDrift = 0.2;


  // STATE SWITCH
  let bool = 1;
  let brushTemp = 0;

  // BUTTON TEXT
  let buttonText1state = 0;
  let buttonText2state = 0;

  let button1A, button1B, button2A, button2B, button3;

  var col;
  var colSelect;



  //button spacing
  //margin from right

  function preload() {
    bg = loadImage('assets/paper.jpg'); // background paper
    for (i = 1; i < 21; i++) {
      brush[i] = loadImage('assets/br-' + i + '.png') // brush loader
    }
  }

  function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    pixelDensity(1); // Ignores retina displays

    imageMode(CENTER); // centers loaded brushes
    blendMode(BLEND); // consider overlay and multiply
    colorMode(HSB, 360, 100, 100, 1)
    colHue = random(colHueMin, colHueMax);
    colSat = random(colSatMin, colSatMax);


  backdrop();

    segLength = width / 15; // length of delay between touch and paint or line // 15 is a good value

    strokeWeight(4); // for line work
    stroke(255, 0, 255); // for line work

    writeTextUI();
  }

  function backdrop(){
      noTint();
      image(bg, width / 2, height / 2, width, height); // display backgrond
  }

  function invertTracing() {
    bool = !bool; // temporary invert function, will be overidden by UI

    if (bool) {
      button2A.style('background-color', colSelect);
      button2B.style('background-color', col);
    }
    else {
      button2A.style('background-color', col);
      button2B.style('background-color', colSelect);

    }
  }

  function writeTextUI(){

    textSize(width/50);
    fill(0);

    let textOrient = height/3;
    let textMargin = width/10;

    button1A = createButton('Sunset Colours');
    button1B = createButton('Sea Colours');
    button2A = createButton('Paint');
    button2B = createButton('Trace');
    button3 = createButton('Restart');
    button1A.position(20,20);
    button1B.position(250,20);
    button2A.position(20,80);
    button2B.position(115,80);
    button3.position(20,140);

   col = color(0,0,0,0.2);
   colSelect = color(0,0,0,0.7);
   button1A.style('background-color', colSelect)
   button1A.style('font-size', '30px');
   button1A.style('color', 'white');
   button1A.mousePressed(invertColourSet);

   button1B.style('background-color', col)
   button1B.style('font-size', '30px');
   button1B.style('color', 'white');
   button1B.mousePressed(invertColourSet);

   button2A.style('background-color', colSelect)
   button2A.style('font-size', '30px');
   button2A.style('color', 'white');
   button2A.mousePressed(invertTracing);

   button2B.style('background-color', col)
   button2B.style('font-size', '30px');
   button2B.style('color', 'white');
   button2B.mousePressed(invertTracing);

   button3.style('background-color', col)
   button3.style('font-size', '30px');
   button3.style('color', 'white');
   button3.mousePressed(backdrop);

if (deviceOrientation === LANDSCAPE || deviceOrientation === 'undefined'){

}

else {

}

  }


function invertColourSet() {

  colourBool = !colourBool;

  if (colourBool) {
    button1A.style('background-color', col);
    button1B.style('background-color', colSelect);
  }
  else {
    button1A.style('background-color', colSelect);
    button1B.style('background-color', col);
  }


}

  function mousePressed() {

    tempMouseX = ((width / 2) - mouseX); // record position on downpress
    tempMouseY = ((height / 2) - mouseY); // record position on downpress
    brushTemp = int(random(1, 20));
    tint(255, 0.01); // Display at half opacit

    if (bool) {
      image(bg, width / 2, height / 2, width, height);
      let swatchTemp = int(random(0,5));
      //console.log(swatchTemp);

      if (colourBool) {
        colHue = cloudHSB[swatchTemp][0];
        colSat = cloudHSB[swatchTemp][1];
        colBri = cloudHSB[swatchTemp][2];
      }
      else  {
        colHue = sunsetHSB[swatchTemp][0];
        colSat = sunsetHSB[swatchTemp][1];
        colBri = sunsetHSB[swatchTemp][2];
      }

    }
  }


  function touchMoved() {

    milliCounter = millis();

    if (bool) {

      if (milliCounter > milliTrack + milliComp) {
        tint((colHue += random(-hueDrift, hueDrift)), (colSat += random(-satDrift, satDrift)), colBri, colOpacity); // Display at half opacity

        if (colSat < 10) {
          colSat += 30
        }

        console.log('Hue = '+colHue);
        console.log('Saturation = '+colSat);
        console.log('Brightness = '+colBri);

        dx = mouseX - tempX;
        dy = mouseY - tempY;

        angle1 = atan2(dy, dx) + (random(-rotateDrift, rotateDrift)); // https://p5js.org/reference/#/p5/atan2
        tempX = mouseX - (cos(angle1) * segLength/2); // https://p5js.org/examples/interaction-follow-1.html
        tempY = mouseY - (sin(angle1) * segLength/2);
        scalar = random(0, 1 * (width - (abs(mouseX - pmouseX))) / width);


        segment(tempX, tempY, angle1, brush[brushTemp], scalar)

        milliTrack = milliCounter;
      }
    } else {
      strokeWeight(constrain(abs(mouseX-pmouseX),0.7,4)); // for line work
      stroke(255, 0, 255); // for line work
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
  }

  function segment(rakeX, rakeY, a, rake, scalar) {
    push();

    translate(rakeX + (randomGaussian(-scatterAmount, scatterAmount)), rakeY + (randomGaussian(-scatterAmount, scatterAmount)));
    rotate(a);
    scale(scalar);

    image(rake, 0, 0, 0, 0);
    pop();
  }


  function windowResized() {
    setup(); // need to rewrite this to ensure image is saved
  }
