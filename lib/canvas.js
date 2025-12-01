const drawPat = (img, SpX, SpY, Sw, Sh, pX, pY, x, y, w, h) => {
  Sh == "act" ? images.mainMenu.naturalHeight : Sh;
  Sw == "act" ? images.mainMenu.naturalWidth : Sw;
  Sh ? Sh : 0;
  Sw ? Sw : 0;
  if (pX == 0 && pY == 0) return;

  let pw, ph;
  let dx, dy;

  let ix = 0;
  while (true) {
    if (pX === 0) {
      pw = w;
      dx = x;
    } else {
      if (ix + pX <= w) {
        pw = pX;
      } else {
        pw = w - ix;
      }
      dx = x + ix;
    }

    let iy = 0;
    while (true) {
      if (pY === 0) {
        ph = h;
        dy = y;
      } else {
        if (iy + pY <= h) {
          ph = pY;
        } else {
          ph = h - iy;
        }
        dy = y + iy;
      }

      c.drawImage(img, SpX, SpY, Sw, Sh, dx, dy, pw, ph);

      if (pY === 0 || iy + pY >= h) break;
      iy += pY;
    }

    if (pX === 0 || ix + pX >= w) break;
    ix += pX;
  }
};
const draw = (obj) => {
  let brol = 0;
  if (obj.kind == "bk" || obj.kind == "tilebk") {
    brol = PpN.xc;
  }
  //brol is an integer used specificly for the effect kind "bk"
  // in order to be seen no matter the change in position
  if (obj.color.tagName == "IMG") {
    if (obj.type == "ent") {
      if (!obj.size) {
        obj.size = 1;
      }
      c.drawImage(
        obj.color,
        obj.SpX,
        obj.SpY,
        obj.w / obj.size,
        obj.h / obj.size,
        obj.x - PpN.xc + brol,
        obj.y - PpN.yc,
        obj.w,
        obj.h
      );
      return;
    }
    //checks for the asset given for the object if it is an image or a color
    if (!obj.patn) {
      //checks if it has no pattern
      //see the next bulletin for information about patterns
      //could be multiple kinds of things
      // kinds that would fall under this definition are
      // prop ,bk ,seek ,all kinds of platforms ,etc...

      if (!obj.SpX) {
        obj.SpX = 0;
      }
      if (!obj.SpY) {
        obj.SpY = 0;
      }
      if (!obj.Sh) {
        obj.Sh = obj.h;
      }
      if (!obj.Sw) {
        obj.Sw = obj.w;
      }
      {
        c.drawImage(
          obj.color,
          obj.SpX,
          obj.SpY,
          obj.Sw,
          obj.Sh,
          obj.x - PpN.xc + brol,
          obj.y - PpN.yc,
          obj.w,
          obj.h
        );
      }
    } else {
      drawPat(
        obj.color,
        obj.SpX,
        obj.SpY,
        obj.Sw,
        obj.Sh,
        obj.patn[0],
        obj.patn[1],
        obj.x - PpN.xc + brol,
        obj.y - PpN.yc,
        obj.w,
        obj.h
      );
    }
  } else {
    // if the object failed to have an img accommodated to its color attribute
    // whether if the image was assign correctly or it is a color
    // any type of any kind could be found here if there is no img
    c.fillStyle = obj.color;
    c.fillRect(obj.x - PpN.xc + brol, obj.y - PpN.yc, obj.w, obj.h);
  }
};
//draw handles the process of the rendering
// it simply utilizes the objects' attributes to be drawn in canvas
// and configures them to meet demands
// view the function for documentation
//canvas

function crtDash() {
  const w = canvas.width;
  const h = canvas.height;
  const size = 6; // pixel size (10x10 grid cells)

  crt.beginPath();
  crt.strokeStyle = "rgba(0, 0, 0, 1)"; // grid line color
  crt.lineWidth = 2;

  // vertical lines
  for (let x = 0; x <= w; x += size) {
    crt.moveTo(x + 0.5, 0);
    crt.lineTo(x + 0.5, h);
  }

  // horizontal lines
  for (let y = 0; y <= h; y += size) {
    crt.moveTo(0, y + 0.5);
    crt.lineTo(w, y + 0.5);
  }

  crt.stroke();
}
function crtOverlay() {
  // --- BLOOM PASS ---
  crt.save();
  crt.globalAlpha = 0.1;
  crt.filter = "blur(0.8px) brightness(1.15)";
  crt.drawImage(canvas, 0, 0);
  crt.restore();

  // --- SCANLINES / GRID ---
  crtDash();

  // --- COLOR TINT ---
  crt.save();
  crt.globalAlpha = 0.08;
  crt.fillStyle = "rgba(160, 220, 255, 1)";
  crt.fillRect(0, 0, canvas.width, canvas.height);
  crt.restore();
}
