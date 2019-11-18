function eraseDrawing() {


  if (eraserVersion) {

    paintLayer.noStroke();
    paintLayer.fill(255,0,255,0.4);
    paintLayer.circle(mouseX, mouseY, 50, 50);

        }

        else {
          traceLayer.blendMode(BLEND);
          traceLayer.noStroke();
          traceLayer.fill(255,0,0,0.4);
          traceLayer.circle(mouseX, mouseY, 40, 40);
          traceLayer.blendMode(LIGHTEST);

              }



      }
