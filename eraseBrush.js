function eraseDrawing() {


  if (eraserVersion) {

    paintLayer.noStroke();
    paintLayer.fill(255,0,255,0.4);
    paintLayer.circle(mouseX, mouseY, 50, 50);

        }

        else {
          traceLayer.blendMode(BLEND);
          traceLayer.strokeWeight(40);
          traceLayer.stroke(255,0,0,0.4);
          traceLayer.line(mouseX, mouseY, pmouseX, pmouseY);
          traceLayer.blendMode(LIGHTEST);

              }



      }
