function eraseDrawing() {

  if (bool) {
    paintLayer.loadPixels();
    for (let y = (winMouseY - 25); y < (winMouseY + 25); y++) {
      for (let x = (winMouseX - 25); x < (winMouseX + 25); x++) {
          let index = (x + y * width) * 4;
          paintLayer.pixels[index + 3] = 0; // alpha channel
        }
    }
    paintLayer.updatePixels();
  } else {
    traceLayer.loadPixels();
    // for (let y = (winMouseY - 50); y < (winMouseY + 50); y++) {
    //   for (let x = (winMouseX - 50); x < (winMouseX + 50); x++) {
    //     if (dist(x, y, winMouseX, winMouseY) < 50) {
    //       let index = (x + y * width) * 4;
    //       traceLayer.pixels[index + 3] = 0; // alpha channel
    //     }
    //   }
    // }
    traceLayer.updatePixels();
  }
}
