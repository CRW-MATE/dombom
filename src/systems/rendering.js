// ============================================
// RENDERING SYSTEM (Canvas 2D & WebGL)
// ============================================

// Pattern drawing function
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

// Main draw function for all objects
const draw = (obj) => {
  let brol = 0;
  if (obj.kind == "bk" || obj.kind == "tilebk") {
    brol = PlayerBase[interZept].xc;
  }

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
        obj.x - PlayerBase[interZept].xc + brol,
        obj.y - PlayerBase[interZept].yc,
        obj.w,
        obj.h
      );
      return;
    }

    if (!obj.patn) {
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
          obj.x - PlayerBase[interZept].xc + brol,
          obj.y - PlayerBase[interZept].yc,
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
        obj.x - PlayerBase[interZept].xc + brol,
        obj.y - PlayerBase[interZept].yc,
        obj.w,
        obj.h
      );
    }
  } else {
    c.fillStyle = obj.color;
    c.fillRect(
      obj.x - PlayerBase[interZept].xc + brol,
      obj.y - PlayerBase[interZept].yc,
      obj.w,
      obj.h
    );
  }
};

// CRT scanlines effect
function crtDash() {
  const w = canvas.width;
  const h = canvas.height;
  const size = 6;

  crt.beginPath();
  crt.strokeStyle = "rgba(0, 0, 0, 1)";
  crt.lineWidth = 2;

  for (let x = 0; x <= w; x += size) {
    crt.moveTo(x + 0.5, 0);
    crt.lineTo(x + 0.5, h);
  }

  for (let y = 0; y <= h; y += size) {
    crt.moveTo(0, y + 0.5);
    crt.lineTo(w, y + 0.5);
  }

  crt.stroke();
}

// CRT glow overlay effect
function crtOverlay() {
  crt.save();
  crt.globalAlpha = 0.1;
  crt.fillStyle = "rgb(200, 200, 255)";
  crt.fillRect(0, 0, canvas.width, canvas.height);
  crt.restore();
}

// Dialog drawing
function drawMultilineText(ctx, text, x, y, lineHeight = 20) {
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * lineHeight);
  });
}

// Setup dialog draw function
dialog.draw = () => {
  c.drawImage(
    images.dialog,
    dialog.SpX,
    dialog.SpY,
    dialog.sw,
    dialog.sh,
    100,
    20,
    800,
    250,
  );

  c.fillStyle = dialog.font;
  c.font = "25px p2p";

  drawMultilineText(c, dialog.text, 160, 100, 28);
};
