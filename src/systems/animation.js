// ============================================
// ANIMATION SYSTEM
// ============================================

const doanim = (obj, arr, loop, stat, timeDef, Anchor) => {
  if (!arr) return;
  let piz;
  if (obj.kind == "snip") {
    if (obj.lastFrame < arr.length)
      if (obj.frame < timeDef) {
        obj.frame++;
      } else {
        obj.frame = 0;
        obj.lastFrame++;
        obj.SpX = obj.Pos * obj.lastFrame;
      }
    else if (loop) {
      obj.lastFrame = 0;
      obj.SpX = 0;
    } else {
      obj.SpX = 0;
    }

    return;
  }
  if (arr.length == 1) {
    obj.lstSta = 0;
    piz = arr[0];
    obj.SpX = piz.SpX;
    obj.SpY = piz.SpY;
    obj.y += obj.h - piz.h * obj.size;
    obj.w = piz.w * obj.size;
    obj.h = piz.h * obj.size;
  }
  if (
    Math.trunc(stat / 10) >= Math.trunc(obj.lstSta / 10) &&
    obj.lstSta != stat
  ) {
    obj.lstSta = stat;
    obj.lstDir = obj.dire;
    obj.frame = 0;
    obj.doanimvar = 0;
    obj.lastFrame = 0;
    if (Anchor) {
      obj.AnchorAnim = true;
    } else {
      obj.AnchorAnim = false;
    }
  }

  if (obj.lastFrame >= arr.length && !loop) {
    return;
  }

  if (obj.lastFrame < arr.length || loop) {
    if (obj.lastFrame >= arr.length) {
      obj.frame = 0;
      obj.doanimvar = 0;
      if (Anchor) {
        obj.lstSta = 0;
        obj.AnchorAnim = false;
      }
      obj.lastFrame = 0;
    }

    piz = arr[obj.lastFrame];

    let t;
    if (piz.t != null) {
      t = piz.t;
    } else {
      t = timeDef;
    }
    if (!obj.frame) {
      if (piz.vy != null) obj.velY = piz.vy;
      if (piz.vx != null) obj.velX = piz.vx;
    }
    if (obj.frame == t) {
      obj.frame = 0;
      if (piz.s != null) obj.state = piz.s;
      obj.doanimvar += piz.w;
      obj.lastFrame++;
      piz = arr[obj.lastFrame];
      if (!piz) return;
      if (piz.t != null) {
        t = piz.t;
      } else {
        t = timeDef;
      }
    }
    if (obj.lstDir !== obj.dire && Anchor == obj.lastFrame) {
      obj.lstSta = 0;
      obj.AnchorAnim = false;
      return;
    }

    if (piz.SpX != null && piz.SpY != null) {
      obj.SpX = piz.SpX;
      obj.SpY = piz.SpY;
    } else {
      obj.SpX = arr[0].SpX + 2 * obj.lastFrame + obj.doanimvar;
      obj.SpY = arr[0].SpY;
    }

    if (piz.look) obj.look = piz.look;

    obj.y += obj.h - piz.h * obj.size;
    obj.w = piz.w * obj.size;
    obj.h = piz.h * obj.size;

    obj.frame++;
  }
};
