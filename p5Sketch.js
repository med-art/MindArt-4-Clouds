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
  const colHueMin = 255;
  const colHueMax = 0;

  let colSat;
  const colSatMin = 50;
  const colSatMax = 200;

  let colBri;
  const colBriMin = 190;
  const colBriMax = 250;

  let colOpacity = 0.4;

  const hueDrift = 3;
  const satDrift = 3;
  const rotateDrift = 0.2;


  // STATE SWITCH
  let bool = 1;
  let brushTemp = 0;

  //button spacing
  //margin from right

  function preload() {
    bg = loadImage('assets/paper.jpg'); // background paper
    for (i = 1; i < 21; i++) {
      brush[i] = loadImage('assets/br-' + i + '.png') // brush loader
    }
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1); // Ignores retina displays

    imageMode(CENTER); // centers loaded brushes
    blendMode(BLEND); // consider overlay and multiply
    colorMode(HSB, 255, 255, 255, 1)
    colHue = random(colHueMin, colHueMax);
    colSat = random(colSatMin, colSatMax);
    colBri = random(colBriMin, colBriMax)

    image(bg, width / 2, height / 2, width, height); // display backgrond

    segLength = width / 15; // length of delay between touch and paint or line // 15 is a good value

    strokeWeight(4); // for line work
    stroke(255, 0, 255); // for line work
  }

  function keyPressed() {
    bool = !bool; // temporary invert function, will be overidden by UI
  }



  function mousePressed() {

    tempMouseX = ((width / 2) - mouseX); // record position on downpress
    tempMouseY = ((height / 2) - mouseY); // record position on downpress
    brushTemp = int(random(1, 20));
    tint(255, 0.03); // Display at half opacit

    if (bool) {
      image(bg, width / 2, height / 2, width, height);
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
