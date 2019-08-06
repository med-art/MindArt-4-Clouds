function eraseDrawing() {

  if (bool) {
    // paintLayer.loadPixels();
    // for (let y = (winMouseY - 50); y < (winMouseY + 50); y+=(random(1,5))) {
    //   for (let x = (winMouseX - 50); x < (winMouseX + 50); x+=(random(1,5))) {
    //     if (dist(x, y, winMouseX, winMouseY) < 50) {
    //       //let index = (x + y * windowWidth) * 4;
    //       //paintLayer.pixels[index + 3] = 0; // alpha channel
    //
    //       paintLayer.set(x, y, color(255,0,0,0.5));
    paintLayer.noStroke();
    paintLayer.fill(255,0,85,0.1);
    paintLayer.circle(mouseX, mouseY, 80, 80);

        }

        else {
          traceLayer.blendMode(BLEND);
          traceLayer.noStroke();
          traceLayer.fill(255,0,0,0.1);
          traceLayer.circle(mouseX, mouseY, 80, 80);
          traceLayer.blendMode(LIGHTEST);

              }



      }
