  let button1A, button1B, button2A, button2B;
  let col, colSelect;
  let resetButton, saveButton;

  let button1, button2, button3;

  let eraserVersion = 0; // erase paint = 0, erase trace = 1;

  function calcDimensions() {

    wmax = width / 100;
    hmax = height / 100;
    vW = width / 100;

    if (width > height) {
      vMax = width / 100;
      vMin = height / 100;
    } else {
      vMax = height / 100;
      vMin = width / 100;
    }
  }



  function writeTextUI() {

    textSize(windowWidth / 50);
    fill(0);
    noStroke();

    button1 = createImg("assets/icon1.1.png");
    button1.style('width', '24.5vmax'); // 28 is 1.75 * 16.
    button1.position(0, height - (14 * vMax));
    button1.mousePressed(switchToPaint);

    button2 = createImg("assets/icon2.0.png");
    button2.style('width', '14vmax');
    button2.position(23.5 * vMax, height - (14 * vMax));
    button2.mousePressed(switchToTrace);

    button3 = createImg("assets/icon3.0.png");
    button3.style('width', '21vmax');
    button3.position(36.5 * vMax, height - (14 * vMax));
    button3.mousePressed(eraser);

    saveButton = createButton("Save");
    saveButton.class("select");
    saveButton.style('font-size', '2.6vmax');
    saveButton.style('height', '4vmax');
    saveButton.position(width - (13.5 * vMax), height - (12.5 * vMax));
    saveButton.mousePressed(saveImage);

    resetButton = createButton("New");
    resetButton.class("select");
    resetButton.style('font-size', '2.6vmax');
    resetButton.style('height', '4vmax');
    resetButton.position(width - (13.5 * vMax), height - (6.5 * vMax));
    resetButton.mousePressed(reset);

    fsButton = createImg('assets/enterFS.png');
    fsButton.style('height', '4vmax');
    fsButton.position(width-(7.5 * vMax), 1.5 * vMax);
    fsButton.mousePressed(fs);

  }


  function resetButtons(){
    //reset all buttons// would be nice to replace this at some point
    button3.remove();
    button3 = createImg("assets/icon3.0.png");
    button3.style('width', '21vmax');
    button3.position(36.5 * vMax, height - (14 * vMax));
    button3.mousePressed(eraser);

    button2.remove();
    button2 = createImg("assets/icon2.0.png");
    button2.style('width', '14vmax');
    button2.position(23.5 * vMax, height - (14 * vMax));
    button2.mousePressed(switchToTrace);

    button1.remove();
    button1 = createImg("assets/icon1.0.png");
    button1.style('width', '24.5vmax'); // 28 is 1.75 * 16.
    button1.position(0, height - (14 * vMax));
    button1.mousePressed(switchToPaint);

  }


  function switchToPaint() {

    eraseState = 0;
    eraserVersion = 0;
    resetButtons();

if (bool){
colourBool = !colourBool;
}

if (!colourBool){
          button1.remove();
          button1 = createImg("assets/icon1.1.png");
          button1.style('width', '24.5vmax'); // 28 is 1.75 * 16.
          button1.position(0, height - (14 * vMax));
          button1.mousePressed(switchToPaint);
}
else {

          button1.remove();
          button1 = createImg("assets/icon1.2.png");
          button1.style('width', '24.5vmax'); // 28 is 1.75 * 16.
          button1.position(0, height - (14 * vMax));
          button1.mousePressed(switchToPaint);
}





        bool = 1;



  }

  function switchToTrace() {

    bool = 0;
    eraseState = 0; // revert to True for erase before passing back to eraser function, which inverts
    eraserVersion = 0;
    resetButtons();

    button2.remove();
    button2 = createImg("assets/icon2.1.png");
    button2.style('width', '14vmax');
    button2.position(23.5 * vMax, height - (14 * vMax));
    button2.mousePressed(switchToTrace);


  }


  function eraser() {

    resetButtons();

    if (eraseState === 1) {
      eraserVersion = !eraserVersion;
      console.log(eraserVersion);
    }

    eraseState = 1;

    if (eraserVersion) {
      button3.remove();
      button3 = createImg("assets/icon3.1.png");
      button3.style('width', '21vmax');
      button3.position(36.5 * vMax, height - (14 * vMax));
      button3.mousePressed(eraser);
    } else {
      button3.remove();
      button3 = createImg("assets/icon3.2.png");
      button3.style('width', '21vmax');
      button3.position(36.5 * vMax, height - (14 * vMax));
      button3.mousePressed(eraser);
    }

  }

  function saveImage() {
    save('colourscape' + month() + day() + hour() + second() + '.jpg');
  }


  function fs(){


   if (!fsBool){
     fullscreen(1);
     fsBool = 1;
   }

   else{

     fullscreen(0);
     fsBool = 0;

   }
 }
