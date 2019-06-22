  // images
  let bg;
  let brush = [];

  // bursh mechanics
  let angle1, segLength,
    rake3X = 0,
    rake3Y = 0;
  let scalar = 0;
  let tempMouseX = 0;
  let tempMouseY = 0;

  // VARIABLES FOR TIME DELAY ON BRUSH
  let milliCounter;
  let milliTrack = 0;

  //BRUSH CHARACTERISTICS
  let milliComp = 10;
  let scatterAmount = 2;

  // COLOUR VARAIABLES
  let colHue;
  const colHueMax = 255;
  let colSat;
  const colSatMax = 120;
  let colBri;
  const colBriMax = 255;

  // STATE SWITCH
  let bool = 1;
  let brushTemp = 0;

  //button spacing
  //margin from right




  function preload() {

    bg = loadImage('assets/paper.jpg');

    for (i = 1; i < 21; i++) {
      brush[i] = loadImage('assets/br-' + i + '.png')
    }
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER); // centers loaded brushes
    pixelDensity(1); // Ignores retina displays
    blendMode(BLEND);

    // smooth();

    image(bg, width / 2, height / 2, width, height);

    segLength = width / 15;

    colorMode(HSB, 255, 255, 255, 1)

    colHue = random(0, 255);
    colSat = random(50, 180);
    colBri = random(0, 255);

    strokeWeight(5);
    stroke(255, 0, 255);
  }

  function keyPressed() {
    bool = !bool;
  }

  function draw() {
    milliCounter = millis();
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


  function mouseDragged() {

    if (bool) {

      if (milliCounter > milliTrack + milliComp) {
        tint((colHue += random(-3, 3)), (colSat += random(-3, 3)), 220, 0.4); // Display at half opacity

        console.log(colHue);
        dx = mouseX - rake3X;
        dy = mouseY - rake3Y;
        angle1 = atan2(dy, dx) + (random(-0.5, 0.5));
        rake3X = mouseX - (cos(angle1) * (segLength / 2));
        rake3Y = mouseY - (sin(angle1) * (segLength / 2));
        scalar = random(0, 2 * (width - (abs(mouseX - pmouseX))) / width);
        console.log(scalar);

        segment(rake3X, rake3Y, angle1, brush[brushTemp], scalar)

        milliTrack = milliCounter;


      }
    } else {


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
    setup();
  }
