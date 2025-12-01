let i = 0,
  PpN = {
    dire: "N",
    items: { axe: 0, beans: 0, knife: 0 },
    is: -1,
    azenidx: 12,
    am: [],
    crtty: 1,
    state: "",
    StealthVisuals: false,
    char: 0,
    menuOppa: 0.7,
    x: 60,
    xc: 0,
    yc: 0,
    y: 700,
    size: 3,
    w: 0,
    h: 0,
    velX: 0,
    velY: 0,
    room: 0,
    hp: 20,
    look: "L",
    G: 2,
    SpX: 0,
    SpY: 0,
    xi: 0,
    yi: 0,
    frame: 0,
    lstDir: "R",
    lstSta: 100,
    anchorAnim: 0,
    lastFrame: 0,
    doanimvar: 0,
    control: 1,
    lum: 20,
    awake: 1,
    time: 0,
    dark: 0,
    timeRate: 0.1,
    timeRatekoff: 0.1,
    clouds: 1,
    playerCount: 1,
  },
  Answer = 0,
  hell = 1,
  mainVel = 0,
  waitHotSause = 1,
  menuMode = true,
  resetDialog = "reset",
  dynamicStorage = 0,
  world, //world nuthin much to see here guys
  // i an ominous godlike aura lies behind that name
  shift = 0;
// a bool which is tells whether the game is paused or runing like normal
// for debuging purposes only
// will likely be un reachable by any normal button again
//lol no it became a new mechanic well known as "pausing the game"

const menuBut = () => {
  if (!menuMode) {
    PpN.timeRatekoff = PpN.timeRatekoff ? 0 : 0.1;
  }
  menuMode = false;
};
//characters and their animation frames
//functions of importance
//doanim handles animation
// obj is the object (npcs,structures,etc...)
// arr is the array in which the frames are embedded in
//each frame is in object form ({SpX,SpY,h,w})
//t is the number of times for each frame to be rendered
// t is isnt a unit of time but rather is in "display per game cycle(tick)"
// loop is a boolean that if true it would redo the frames from the start
//but if false it would stay at the last frame it allowed to be displayed
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

    // Apply frame-specific physics or look values
    if (piz.look) obj.look = piz.look;

    // Adjust dimensions
    obj.y += obj.h - piz.h * obj.size;
    obj.w = piz.w * obj.size;
    obj.h = piz.h * obj.size;

    // Advance frame
    obj.frame++;
  }
};
const distem = (A, B) =>
  Math.hypot(A.x + A.w / 2 - (B.x + B.w / 2), A.y + A.h / 2 - (B.y + B.h / 2));
function dCC(color, obj, dist) {
  if (!PpN.StealthVisuals) return;
  // center inside the rectangle
  const cx = obj.x + obj.w / 2;
  const cy = obj.y + obj.h / 2;

  // radius = half of the smallest dimension
  const radius = dist ? dist : Math.min(obj.w, obj.h) / 2;

  c.strokeStyle = color;
  c.beginPath();
  c.arc(cx - PpN.xc, cy - PpN.yc, radius, 0, Math.PI * 2);
  c.lineWidth = 7;
  c.stroke();
}

// their src preferably in the art folder pls ld dem haV sAme nuame
let characters;
//button functionality biatch
const shiftFx = () => {
  shift = true;
};
const cfx = () => {
  if (shift) {
    menuBut();
    shift = 0;
    return;
  }
  if (PpN.timeRate) {
    if (PpN.state == "crouch") {
      PpN.state = "";
      PpN.lstSta = 0;
    } else {
      if (PpN.state == "") {
        PpN.state = "crouching";
      }
    }
  }
};
const zfx = () => {
  if (!PpN.timeRatekoff) Answer = 1;
};
const xfx = () => {
  if (!PpN.timeRatekoff) {
    Answer = -1;
  } else {
    if (PpN.state == "") {
      PpN.state = "gtjump";
    }
  }
};
const movemento = (obj) => {
  /////
  if (obj.state == "crouching") {
    obj.look == "R" ? characters.CTR.do() : characters.CTL.do();
    obj.velX = 0;
    obj.velY = 0;
    return;
  } else if (obj.state == "crouch") {
    if (obj.dire == "R") {
      obj.velX = 5;
      obj.velY = 0;
    } else if (obj.dire == "L") {
      obj.velX = -5;
      obj.velY = 0;
    } else if (obj.dire == "U" && !obj.G) {
      obj.velY = 5;

      obj.velX = 0;
    } else if (obj.dire == "D" && !obj.G) {
      obj.velY = -5;

      obj.velX = 0;
    } else if (obj.dire == "DR") {
      if (!obj.G) {
        obj.velY = -5;
      }
      obj.velX = 3;
    } else if (obj.dire == "DL") {
      if (!obj.G) {
        obj.velY = -5;
      }
      obj.velX = -3;
    } else if (obj.dire == "UL") {
      if (!obj.G) {
        obj.velY = 5;
      }
      obj.velX = -5;
    } else if (obj.dire == "UR") {
      if (!obj.G) {
        obj.velY = 5;
      }
      obj.velX = 5;
    } else {
      obj.velY = 0;
      obj.velX = 0;
    }
    if (
      obj.dire !== "N" ||
      (obj.dire == "D" && obj.G) ||
      (obj.dire == "U" && obj.G)
    ) {
      obj.look == "R" ? characters.CWR.do() : characters.CWL.do();
    } else {
      obj.look == "R" ? characters.CNR.do() : characters.CNL.do();
    }
    return;
  } else if (obj.state == "sprinting") {
    obj.velX = 14;
  } else if (obj.state == "gtjump" && obj.G) {
    obj.velX *= 0.9;
    obj.look == "R" ? characters.GTJR.do() : characters.GTJL.do();
  } else if (obj.state == "jumping" && obj.G) {
    obj.look == "R" ? characters.JR.do() : characters.JL.do();
    if (obj.dire == "R") {
      obj.velX = 3;
    } else if (obj.dire == "L") {
      obj.velX = -3;
    }
  } else {
    if (
      obj.dire === "R" ||
      (obj.lstSta == 12 &&
        obj.lstDir === "R" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
      // anchoring is making the animation pipeline wait for the completion of an animation
      // instead of awkwardly or prematurely cut of the animation
      //anchoring formula is: the input that does animation or [[
      //the the input before the current with the current input being nothing N for neutral
      // with the your last state lstSta being the same as the animation's
      //with the obj.AnchorAnime the check for the Anchor is the do anim is true]]
      //Anchoring its pretty trippy just copy the formula
      //make sure you turn on the flag of anchoring in the doanim function per animation
    ) {
      obj.velX = 7;

      obj.velY = 0;

      obj.look = "R";

      characters.WR.do();

      obj.lstDir = "R";
    } else if (
      obj.dire === "L" ||
      (obj.lstSta == 13 &&
        obj.lstDir === "L" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      obj.velX = -7;
      obj.velY = 0;

      obj.look = "L";
      characters.WL.do();

      obj.lstDir = "L";
    } else if (obj.dire === "U") {
      if (!PpN.G) {
        obj.velY = 7;
        obj.look = "U";
        characters.WU.do();
      }
      obj.velX = 0;
    } else if (obj.dire === "D") {
      if (!PpN.G) {
        obj.velY = -7;
        obj.look = "D";
        characters.WD.do();
      }
      obj.velX = 0;
    } else if (
      obj.dire === "DL" ||
      (obj.lstSta == 13 &&
        obj.lstDir === "DL" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      if (!PpN.G) {
        obj.velY = -7;
      }

      characters.WL.do();

      obj.lstDir = "DL";
      obj.velX = -7;
      obj.look = "L";
    } else if (
      obj.dire === "DR" ||
      (obj.lstSta == 12 &&
        obj.lstDir === "DR" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      if (!PpN.G) {
        obj.velY = -7;
      }

      characters.WR.do();

      obj.velX = 7;
      obj.lstDir = "DR";
      obj.look = "R";
    } else if (
      obj.dire === "UL" ||
      (obj.lstSta == 13 &&
        obj.lstDir === "UL" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      if (!PpN.G) {
        obj.velY = 7;
      }

      characters.WL.do();

      obj.velX = -7;
      obj.lstDir = "UL";
      obj.look = "L";
    } else if (
      obj.dire === "UR" ||
      (obj.lstSta == 12 &&
        obj.lstDir === "UR" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      if (!PpN.G) {
        obj.velY = 7;
      }

      characters.WR.do();

      obj.velX = 7;
      obj.lstDir = "UR";
      obj.look = "R";
    } else {
      // default
      // obj.velX = 0;

      if (PpN.velX !== 0) {
        if (PpN.look == "R") {
          PpN.velX -= 1;
          if (PpN.velX < 0) {
            PpN.velX = 0;
          }
        } else if (PpN.look == "L") {
          PpN.velX += 1;
          if (PpN.velX > 0) {
            PpN.velX = 0;
          }
        }
      }
      if (PpN.look == "R") {
        characters.NR.do();
      } else if (PpN.look == "L") {
        characters.NL.do();
      } else if (PpN.look == "D") {
        characters.ND.do();
      } else if (PpN.look == "U") {
        characters.NU.do();
      }
      if (!PpN.G) {
        obj.velY = 0;
      }
    }
  }
};

//the function seen before you is the drawpat lol no go to canvas.js
// you'll find my monolithic render function there
// it takes the pattern drawing from the "draw"
const HitBox = (obj) => {
  c.beginPath();
  c.lineWidth = 3;
  c.strokeStyle = "green";
  c.strokeRect(obj.x - PpN.xc, obj.y - PpN.yc, obj.w, obj.h);
};

// by drawing an outline around an object
// it makes the colliding areas clear and visable
// if nothing is visable make sure you're not using non existing vars , nulls or NaNs
function rand(a, b) {
  let pepe = 0;
  while (pepe <= a || pepe > b) {
    pepe = Math.round(Math.random() * b);
  }
  return pepe;
}
// a "random" int value generator
// generates an int between a and b
//an oddly specific function
// just for satiating those who grew a liking to hoping in games
//===end
//before the next point i must explain how things are settled as they are
// this js file has an interval that runs for every 40ms
// before it there is an array called world this array has "scenes"
// they are classes that has a the length of the journey assigned as (bet)
// and det which inside is named as the "entities" array
// entities house a varity of classes effects platforms doors npcs ,etc...
// inside the scene there is a function that itterate over every entity
// checks collision for the player and the other objects then draws them
// then draws the player and handles the perceiving distance of the player
// this function is being repeatedly called by the interval
//classes of importance
class scene {
  constructor(bet, det, vure, deo) {
    this.entities = bet;
    this.chkCol = function (A, B) {
      if (B.type != "effect" || B.kind == "seek") {
        if (!B.Hha) {
          B.Hha = 0;
        }
        if (
          A.x < B.x + B.w &&
          B.x < A.x + A.w &&
          A.y < B.y + B.h &&
          B.y - B.Hha < A.y + A.h
        ) {
          switch (B.type) {
            case "item":
              //an example of deleting
              B.chkCol();
              this.entities.splice(this.entities.indexOf(B), 1);
              break;
            case "door":
              // an example of checking before doing anything
              if (B.ido) {
                if (PpN.dire == "U") {
                  B.chkCol(world.dess);
                }
              } else {
                B.chkCol(det);
              }
              break;
            case "tile":
              B.chkCol(A);
              break;
            case "effect":
              B.chkCol(A);
              break;
          }
        }
      }
      //this function does stuff beyond the object colliding
      //where this could check extra stuff before acting the aftermath
      //this could also delete the object from the entities array
      // or just run the thing as normal
    };
    this.collis = function () {
      PpN.G = vure;

      c.clearRect(0, 0, mx, mh);
      ///collisionn!!
      if (PpN.timeRatekoff) {
        PpN.xi = PpN.x;
        PpN.yi = PpN.y;
        if (PpN.G) {
          PpN.velY -= PpN.G;
          console.log(PpN.velY);
        }
        PpN.y -= PpN.velY;
        PpN.x += PpN.velX;

        if (deo == "ycz" && PpN.yc > 0) {
          //mism vragity
          PpN.yc--;
        }
        // the cinematic view "ie camera following you around in the x axis"
        if (PpN.x > mx / 2 || PpN.xc > 0) {
          if (PpN.xc + PpN.x < det + mx / 2) {
            PpN.xc += PpN.velX;
            if (PpN.xc < 0) {
              PpN.xc = 0;
            }
          }
        }
        // the cinematic view "ie camera following you around in the y axis"
        if (PpN.y > mh / 2 || PpN.yc < 0) {
          if (PpN.yc + PpN.y < deo + mh / 2) {
            PpN.yc -= PpN.velY;
            if (PpN.yc < 0) {
              PpN.yc = 0;
            }
          }
        }
      }

      if (PpN.awake) {
        if (PpN.timeRatekoff) {
          PpN.clouds += 10 * Math.abs(PpN.timeRate);
          PpN.time += PpN.timeRate;
        }
        if (PpN.clouds > mx) {
          PpN.clouds = 0;
        }
        if (PpN.time > 255 || PpN.time < 0) {
          PpN.timeRate = -PpN.timeRate;
        }
        c.fillStyle = `rgba(
          ${76 - Math.round(PpN.time)},
          ${186 - Math.round(PpN.time)},
          ${255 - Math.round(PpN.time)},
          1
        )`;
        c.fillRect(0, 0, mx, mh);
        c.drawImage(images.clouds_thin, 0, 0, mx, mh / 4);
        c.fillStyle = `rgba(
          ${15},
          ${23},
          ${147},
          .3
        )`;
        c.fillRect(0, 0, mx, mh);

        drawPat(
          images.clouds,
          0,
          0,
          512,
          256,
          mx,
          mh,
          -mx + Math.round(PpN.clouds),
          0,
          2 * mx,
          300
        );
        c.fillRect(0, 0, mx, mh);
      }
      //a wake from the non handling th sky time and clouds
      for (i = 0; i < this.entities.length; i++) {
        if (this.entities[i].YesDraw) {
          draw(this.entities[i]);
        } else {
          this.entities[i].YesDraw = 1;
        }
        this.chkCol(PpN, this.entities[i]);
        if (this.entities[i].type == "ent" && PpN.timeRatekoff) {
          this.entities[i].action(this.entities[i]);
        }
      }
      // a being promoted to be more than any by simply existing(player render)
      c.drawImage(
        images.Pp1,
        PpN.SpX,
        PpN.SpY,
        PpN.w / PpN.size,
        PpN.h / PpN.size,
        PpN.x - PpN.xc,
        PpN.y - PpN.yc,
        PpN.w,
        PpN.h
      );
    };
  }
}
class entity {
  constructor(x, y, id) {
    this.type = "ent";
    this.w;
    this.h;
    this.xi = x;
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velX = 0;
    this.lstSta = 0;
    this.alert = false;
    this.agro = false;
    switch (id) {
      case "01":
        this.w = 30;
        this.h = 24;
        this.size = 3;
        this.y = this.y - this.h;
        this.color = images.rabbit;
        this.SpX = 0;
        this.SpY = 0;

        this.anims = {
          NR: (obj) => {
            doanim(
              obj,
              [
                { SpX: 0, SpY: 0, w: 30, h: 24 },
                { SpX: 31, SpY: 0, w: 30, h: 23 },
              ],
              1,
              12,
              13,
              0
            );
          },
          AR: (obj) => {
            doanim(obj, [{ SpX: 62, SpY: 0, w: 30, h: 42 }]);
          },
        };

        break;
    }
    this.action = (obj) => {
      switch (id) {
        case "01":
          if (PpN.x < obj.x + obj.w) {
            if (distem(obj, PpN) > 420) {
              this.alert = false;
              dCC("rgb(0,0,255)", obj, 420);
            }
            if (distem(obj, PpN) > 210 && distem(obj, PpN) < 420) {
              dCC("rgb(0,255,0)", obj, 210);
              if (PpN.state == "") {
                this.alert = true;
              }
            }
            if (
              PpN.state == "crouch" &&
              distem(obj, PpN) < 100 &&
              distem(obj, PpN) >= obj.w / 2
            ) {
              this.alert = true;
              dCC("rgb(255,0,0)", obj, 100);
            }
          } else {
            this.alert = true;
          }

          this.alert ? this.anims.AR(obj) : this.anims.NR(obj);
          this.x += this.velX;
          break;
      }
    };
  }
}

class effect {
  constructor(bro, x, y, w, h, kind, sx, sy, px, py, size, Pos) {
    this.x = x;
    this.size = size;
    this.Pos = Pos;
    this.type = "effect";
    this.kind = kind;
    this.frame = 0;
    this.lastFrame = 0;
    this.color = bro;
    if (!size) {
      this.size = 1;
    }
    let deltaH;
    this.Sh = h;
    this.Sw = w;

    if (kind == "seek") {
      if (Pos < 0) {
        Pos = 0;
      }
      this.chkCol = (A) => {
        if (A.x < this.x + this.w - this.size * Pos) {
          this.YesDraw = 0;
        }
      };
    }
    if (kind == "full") {
      if (!Pos) {
        this.Pos = 1;
      }
      this.h = this.Pos * h;
      this.w = this.size * w;
      deltaH = (this.Pos - 1) * h;
    } else {
      deltaH = (this.size - 1) * h;
      this.w = w * this.size;
      this.h = h * this.size;
    }

    this.y = y - deltaH - h;

    if (this.color.tagName == "IMG") {
      this.SpX = sx;
      this.SpY = sy;
      this.patn = px || py ? [px, py] : 0;
    } else {
      this.oppa;
      this.y = y;
      sx ? (this.oppa = sx) : (this.oppa = 1);
    }
  }
}
//effect is a non collidable class built for visual auditory
//that means it will not run in the collision detection function
// unless you give it the "seek" kind
class platform {
  constructor(x, y, w, h, kind, sx, sy, px, py) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.Sh = 128;
    this.Sw = 128;
    this.type = "tile";
    this.kind = kind;
    this.color = images.atlas01;
    if (!kind || kind == "floor") {
      this.h = h;
    } else {
      if (kind == "stairR" || "stairL") {
        this.h = w;
        this.Hha = 200;
      }
    }
    this.SpX = sx;
    this.SpY = sy;
    this.patn = px || py ? [px, py] : [w, h];
    this.chkCol = (A) => {
      let dY = A.y - A.yi,
        dX = A.x - A.xi;
      switch (kind) {
        case 0:
          if (dY && (A.h + A.y - dY <= this.y || A.y - dY >= this.y + this.h)) {
            if (dY < 0) {
              A.velY = 0;
              A.y = this.y + this.h; // hitting the celling
            } else {
              if (dY > 0 && A.y + A.h > this.y - 2 && A.y < this.y + this.h) {
                //
                //floor collison;
                //
                if (A.state == "jumping" && A.velY <= -26) A.state = "";
                A.y = this.y - A.h;
                A.velY = 0;
              }
            }
          } else {
            if (dX || A.h + A.y - dY > this.y) {
              A.x -= dX;
              A.velX = 0;
              //hitting a wall right or left
            }
          }
          break;
        case "stairR":
          if (
            A.velY <= 0 &&
            A.y > this.y + (this.h - (A.x + A.w - this.x) - A.h)
          ) {
            if (this.h > A.x + A.w - this.x) {
              A.y = this.y + (this.h - (A.x + A.w - this.x) - A.h);
            } else {
              A.y = this.y - A.h;
            }
            A.velY = 0;
          }
          break;
        case "stairL":
          if (
            A.velY <= 0 &&
            A.y > this.y + A.x - this.x - A.h &&
            A.x >= this.x
          ) {
            A.y = this.y + A.x - this.x - A.h;

            A.velY = 0;
          }
      }
    };
  }
}
//platforms like slopes and walls to help shape the pathway of the scene
//each kind explained inside the class "didnt do it did i?
/*class circle {
  constructor() {
    this.x = obj.x + obj.w / 2;
    this.y = obj.y + obj.h;
    this.w = 100;
    this.h = 100;
    this.vBlx = 0;
    this.vBly = -10;
    this.color = colors[Math.round(Math.random() * (colors.length - 1))];
    this.chkCol = function () {
      this.color = colors[Math.round(Math.random() * (colors.length - 1))];
      this.vBlx = obj.velX - this.vBlx;
      this.vBly = -30;
      this.y = obj.y - obj.h * obj.size;
      if (this.vBlx > 0) {
        this.x = obj.x + obj.w;
      }
      if (this.vBlx < 0) {
        this.x = obj.x - 100;
      }
      if (!this.vBlx) {
        this.x = obj.x;
      }
      if (this.vBlx > 30) {
        this.vBlx = 30;
      }
    };
    this.vBly += 2;
    if (this.x < 5) {
      this.vBlx = -this.vBlx;
      this.x = 5;
    }
    if (this.x + 100 + 5 > mx) {
      this.vBlx = -this.vBlx;
      this.x = mx - 100 - 5;
    }
    if (this.y < 0) {
      this.vBly = -this.vBly;
    }
    if (this.y + 100 + 50 > mh) {
      this.y = mh - 100 - 50;
      this.vBly = 0;
    }
  }
}*/
//circle is as old as existance likely kept for when needed
//it's for a time i didnt know canvas for what it is
//for when this game was supposed to be a touhou 1 esque fighting game
//about a purple-haired-green-sweater-girl flinging balls at her opponents

class item {
  constructor(alp, bet, id) {
    this.type = "item";
    this.x = alp;
    this.y = bet;
    this.chkCol = function () {
      if (id) {
      }
      obj.inventory.id = "0";
    };
  }
}
//items are pretty self explanatory
// you find them in a scene they disappear and reappear in your inventory
class door {
  constructor(alp, bet, dess, ido, xD, xom) {
    this.type = "door";
    this.x = alp;
    this.y = bet;
    this.w = 100;
    this.h = 200;
    this.ido = ido;
    this.color = "black";
    this.chkCol = (A) => {
      PpN.room = dess;
      PpN.x = xD;
      PpN.y = xom - PpN.h;
      PpN.velY = 0;
      world = eval(localStorage.world);
      world = world[PpN.room];
      if (xD > mx / 2) {
        if (xD > A + mx / 2) {
          PpN.xc = A;
        } else {
          PpN.xc = xD - mx / 2;
        }
      } else {
        PpN.xc = 0;
      }
    };
  }
}
// door is what transitions you between different scenes
// could be used in the future as beds to transend to dream world
//e1m#
// designation of scenes to that of doom
// but i think it's useless considering i'm doing every thing in one "world"
class menus {
  constructor(struct) {
    if (PpN.is < 0) {
      PpN.is = 0;
    }
    this.floor = struct;
    for (let ik = 0; ik < PpN.am.length; ik++) {
      this.floor = this.floor[PpN.am[ik]];
    }

    this.nav = () => {
      if (PpN.dire == "U" && waitHotSause) {
        if (PpN.is > 0) {
          PpN.is--;
          waitHotSause = 0;
        }
      } else if (PpN.dire == "D" && waitHotSause) {
        if (PpN.is < Object.keys(this.floor).length - 1) {
          PpN.is++;
          waitHotSause = 0;
        }
      }

      if (PpN.lstDir == "N" && PpN.dire == "N") {
        waitHotSause = 1;
      }

      if (Answer > 0) {
        const key = Object.keys(this.floor)[PpN.is];
        let value = this.floor[key];
        PpN.is = -1;
        if (Object.prototype.toString.call(value) === "[object Object]") {
          PpN.am.push(key);
        } else if (typeof value === "function") {
          value();
        } else if (Object.prototype.toString.call(value) === "[object Array]") {
          PpN.am.push(key);
        } else if (
          Object.prototype.toString.call(value) === "[object String]"
        ) {
          alert(value);
        }
        Answer = 0;
      } else if (Answer < 0) {
        if (PpN.am.length) {
          PpN.am.splice(PpN.am.length - 1, 1);
          Answer = 0;
          PpN.is = -1;
        }
      }
    };

    this.draw = () => {
      let font =
        PpN.am.join("/").length < 24 ? 50 : 900 / PpN.am.join("/").length;
      c.fillStyle = "rgba(190, 211, 34, 1)";
      c.font = `${font}px bitcount`;
      c.fillText(".../" + PpN.am.join("/"), 100, 100);
      for (let dlod = 0; dlod < Object.keys(this.floor).length; dlod++) {
        const key = Object.keys(this.floor)[dlod];
        font = 0;
        c.globalAlpha = 1;
        if (PpN.is == dlod) {
          font = key.length < 20 ? 30 : 600 / key.length;
          c.font = `${font}px p2p`;
          c.fillStyle = "rgba(240, 184, 238, 1)";
        } else {
          font = key.length < 20 ? 50 : 500 / key.length;
          c.font = `${font}px bitcount`;
          c.fillStyle = "rgba(190, 211, 34, 1)";
        }
        let stat = PpN.is == dlod ? `>${key}<` : key;
        stat = stat.replace(/_/g, " ");
        c.fillText(
          stat,
          mx / 2 - 250 - (stat.length - key.length) * 25,
          mh / 2 + dlod * 50 - (PpN.is - dlod + 1) * 10
        );
      }
    };
  }
}
