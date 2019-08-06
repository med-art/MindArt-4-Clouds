function writeTextUI() {

  textSize(windowWidth / 50);
  fill(0);
  noStroke();


  button1A = createButton('Warm colours');
  button1B = createButton('Cool colours');
  button2A = createButton('Paint');
  button2B = createButton('Trace');
  button2C = createButton('Eraser');
  button3 = createButton('New drawing');

  button1A.position(lmax, windowHeight - lmax * 5);
  button1B.position((lmax * 16) + lmax, windowHeight - lmax * 5); // 16 because 16 characters in 'Sunset Colours'
  button2A.position(lmax, windowHeight - lmax * 10);
  button2B.position(lmax * 13.5 + lmax, windowHeight - lmax * 10); // 7 because 7 characters in Paint
  button2C.position(lmax * 27 + lmax, windowHeight - lmax * 10);

  button3.position(windowWidth - (20 * lmax) - (lmax * 3), windowHeight - lmax * 5);

  col = color(0, 0, 0, 0.2);
  colSelect = color(120, 75, 78, 0.7);
  colH3 = color(355, 65, 80);

  button1A.style('background-color', '#EE6944')
  button1A.style('font-size', '2vmax');
  button1A.style('color', 'white');
  button1A.style('width', '15vmax');
  button1A.mousePressed(invertColourSet);

  button1B.style('background-color', '#4B5E5E')
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

  button2C.style('background-color', col)
  button2C.style('font-size', '2.5vmax');
  button2C.style('color', 'grey');
  button2C.style('border-radius', '0.25vmax')
  button2C.style('width', '12.5vmax');
  button2C.mousePressed(eraser);

  button3.style('background-color', colH3);
  button3.style('font-size', '2.5vmax');
  button3.style('color', 'white');
  button3.style('border-radius', '0.25vmax')
  button3.style('width', '20vmax')
  button3.mousePressed(reset);
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

function invertColourSet() {

  colourBool = !colourBool;

  if (colourBool) {
    button1A.style('background-color', '#EDC8BE');
    button1A.style('color', 'grey');
    button1B.style('background-color', '#225E5E');
    button1B.style('color', 'white');
  } else {
    button1A.style('background-color', '#EE6944');
    button1A.style('color', 'white');
    button1B.style('background-color', '#4B5E5E');
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


function eraser() {

  if (eraseState === 0) {
    eraseState = 1;
    button2C.style('background-color', '#048bbd');
        button2C.style('color', 'white');
  } else {
    eraseState = 0;
    button2C.style('background-color', col);
        button2C.style('color', 'grey');
  }

}
