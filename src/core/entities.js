// ============================================
// ENTITY CLASSES
// ============================================

class scene {
  constructor(bet, det, vure, deo) {
    this.entities = bet;
    this.deolaba = deo;
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
              B.chkCol();
              this.entities.splice(this.entities.indexOf(B), 1);
              break;
            case "door":
              if (B.ido) {
                if (
                  PlayerBase[interZept].dire == "U" &&
                  PlayerBase[interZept].timeRatekoff
                ) {
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
            case "ent":
              B.chkCol(A);
              break;
          }
        }
      }
    };
    this.collis = function (X) {
      X.G = vure;
      c.clearRect(0, 0, mx, mh);
      ///collisionn!!
      if (X.timeRatekoff) {
        X.xi = X.x;
        X.yi = X.y;
        if (X.G) {
          X.velY -= X.G;
        }
        X.y -= X.velY;
        X.x += X.velX;

        if (deo == "ycz" && X.yc > 0) {
          X.yc--;
        }
        if (X.x > mx / 2 || X.xc > 0) {
          if (X.xc + X.x < det + mx / 2) {
            X.xc += X.velX;
            if (X.xc < 0) {
              X.xc = 0;
            }
          }
        }
        if (X.y > mh / 2 || X.yc < 0) {
          if (X.yc + X.y < deo + mh / 2) {
            X.yc -= X.velY;
            if (X.yc < 0) {
              X.yc = 0;
            }
          }
        }
      }

      if (X.awake) {
        if (X.timeRatekoff) {
          for (let mrs = 0; mrs < PlayerBase.length; mrs++) {
            PlayerBase[mrs].clouds += 10 * Math.abs(X.timeRate);
            PlayerBase[mrs].time += X.timeRate;
          }
        }
        if (X.clouds > mx) {
          X.clouds = 0;
        }
        if (X.time > 255 || X.time < 0) {
          X.timeRate = -X.timeRate;
        }
        c.fillStyle = `rgba(
          ${76 - Math.round(X.time)},
          ${186 - Math.round(X.time)},
          ${255 - Math.round(X.time)},
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
          -mx + Math.round(X.clouds),
          0,
          2 * mx,
          300,
        );
        c.fillRect(0, 0, mx, mh);
      }
      for (i = 0; i < this.entities.length; i++) {
        if (this.entities[i].YesDraw) {
          draw(this.entities[i]);
        } else {
          this.entities[i].YesDraw = 1;
        }
        if (this.kind == "onee") {
          console.log(this.entities[i]);
          this.entities.splice(i, 1);
        } else {
          this.chkCol(PlayerBase[interZept], this.entities[i]);
        }
        if (this.entities[i].type == "ent" && X.timeRatekoff) {
          this.entities[i].action(this.entities[i]);
        }
        for (let xec = 0; xec < PlayerBase.length; xec++)
          if (
            X.Zindex == i ||
            (i == this.entities.length - 2 && this.deolaba == "ycz")
          ) {
            c.drawImage(
              PlayerBase[xec].color,
              PlayerBase[xec].SpX,
              PlayerBase[xec].SpY,
              PlayerBase[xec].w / PlayerBase[xec].size,
              PlayerBase[xec].h / PlayerBase[xec].size,
              PlayerBase[xec].x - X.xc,
              PlayerBase[xec].y - X.yc,
              PlayerBase[xec].w,
              PlayerBase[xec].h,
            );
          }
      }
    };
  }
}

class entity {
  constructor(x, y, id, dd) {
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
    this.dd = dd;
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
              0,
            );
          },
          AR: (obj) => {
            doanim(obj, [{ SpX: 62, SpY: 0, w: 30, h: 42 }]);
          },
        };

        break;
      case "02":
        this.color = images.dialog;

        this.SpY = 28;
        this.SpX = 0;
        this.size = 5;
        dialog.text = this.dd;
        this.w = 22 * this.size;
        this.h = 31 * this.size;
        this.y -= this.h;
        break;

      case "03":
        this.color = images.dialog;

        this.SpY = 0;
        this.SpX = 0;
        this.size = 5;
        dialog.text = this.dd;
        this.w = 16 * this.size;
        this.h = 27 * this.size;
        this.y -= this.h;
        break;
    }
    this.action = (obj) => {
      switch (id) {
        case "01":
          if (PlayerBase[interZept].x < obj.x + obj.w) {
            if (distem(obj, PlayerBase[interZept]) > 420) {
              this.alert = false;
              dCC("rgb(0,0,255)", obj, 420);
            }
            if (
              distem(obj, PlayerBase[interZept]) > 210 &&
              distem(obj, PlayerBase[interZept]) < 420
            ) {
              dCC("rgb(0,255,0)", obj, 210);
              if (PlayerBase[interZept].state == "") {
                this.alert = true;
              }
            }
            if (
              PlayerBase[interZept].state == "crouch" &&
              distem(obj, PlayerBase[interZept]) < 100 &&
              distem(obj, PlayerBase[interZept]) >= obj.w / 2
            ) {
              this.alert = true;
              dCC("rgb(255,0,0)", obj, 100);
            }
          } else {
            arcSeg(obj, 500, 30);
            if (
              Math.pow(
                PlayerBase[interZept].x +
                  PlayerBase[interZept].w / 2 -
                  obj.x -
                  obj.w / 2,
                2,
              ) +
                Math.pow(
                  PlayerBase[interZept].y +
                    PlayerBase[interZept].h / 2 -
                    obj.y -
                    obj.h / 2,
                  2,
                ) <=
              Math.pow(500, 2)
            ) {
              if (
                500 * Math.cos(Math.PI / 6) <
                PlayerBase[interZept].x +
                  PlayerBase[interZept].w / 2 -
                  obj.x -
                  obj.w / 2
              ) {
                console.log("agg");
              }
            }
          }

          this.alert ? this.anims.AR(obj) : this.anims.NR(obj);
          this.x += this.velX;
          break;
      }
    };
    this.chkCol = () => {
      if (id == "03" || id == "02") {
        if (id == "02") {
          dialog.SpY = 69;
          dialog.SpX = 0;
          dialog.sw = 80;
          dialog.sh = 33;
          dialog.font = "rgb(87,41,75)";
        } else {
          dialog.SpY = 104;
          dialog.SpX = 0;
          dialog.sw = 80;
          dialog.sh = 33;
          dialog.font = "rgb(255,255,255)";
        }
        dialog.text = this.dd;
        dialog.draw();
      }
    };
  }
}

class Player {
  constructor() {
    this.hp = 20;
    this.G = 0;
    this.SpX = 0;
    this.SpY = 0;
    this.StealthVisuals = true;
    this.Zindex = 0;
    this.am = [];
    this.anchorAnim = 0;
    this.awake = 1;
    this.char = 0;
    this.clouds = 281;
    this.color = images.Pp1;
    this.control = 1;
    this.crtty = 1;
    this.dark = 0;
    this.dire = "N";
    this.doanimvar = 0;
    this.frame = 0;
    this.h = 0;
    this.holdShft = 0;
    this.is = -1;
    this.items = { axe: 0, beans: 0, knife: 0 };
    this.keysDown = { ArrowRight: 0, ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0 };
    this.lastFrame = 0;
    this.look = "L";
    this.lstDir = "R";
    this.lstSta = 100;
    this.lum = 20;
    this.menuOppa = 0.7;
    this.playerCount = 1;
    this.room = 0;
    this.shift = false;
    this.size = 3;
    this.rand = rand(0, 3);
    this.state = "";
    this.animations = {
      SLM: {
        timeDef: 4,
        arr: [
          { SpY: 391, SpX: 0, w: 37, h: 61 },
          { SpY: 391, SpX: 38, w: 28, h: 62 },
          { SpY: 391, SpX: 68, w: 32, h: 61 },
          { SpY: 391, SpX: 102, w: 28, h: 62 },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, 1, 60, this.timeDef, false);
        },
      },
      SL: {
        timeDef: 4,
        arr: [
          { SpY: 258, SpX: 0, w: 28, h: 62 },
          { SpY: 258, SpX: 29, w: 28, h: 60 },
          { SpY: 258, SpX: 58, w: 28, h: 58 },
          { SpY: 258, SpX: 87, w: 35, h: 62 },
          { SpY: 258, SpX: 123, w: 37, h: 64 },
          { SpY: 258, SpX: 162, w: 34, h: 56 },
          { SpY: 258, SpX: 197, w: 30, h: 60 },
          { SpY: 258, SpX: 228, w: 28, h: 60 },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, 1, 50, this.timeDef, false);
        },
      },
      P: {
        timeDef: 15,
        arr: [
          [
            { SpX: 186, SpY: 134, w: 28, h: 53 },
            { SpX: 186, SpY: 134, w: 28, h: 53, s: "" },
          ],
          [
            { SpX: 216, SpY: 128, w: 28, h: 58 },
            { SpX: 216, SpY: 128, w: 28, h: 58, s: "" },
          ],
          [
            { SpX: 245, SpY: 134, w: 28, h: 53 },
            { SpX: 245, SpY: 134, w: 28, h: 53, s: "" },
          ],
          [
            { SpX: 275, SpY: 134, w: 28, h: 53 },
            { SpX: 275, SpY: 134, w: 28, h: 53, s: "" },
          ],
        ],
        do: function () {
          doanim(
            PlayerBase[interZept],
            this.arr[PlayerBase[interZept].rand],
            0,
            90,
            this.timeDef,
            4,
          );
        },
      },
      GTJR: {
        timeDef: 5,
        arr: [
          { SpX: 304, SpY: 128, h: 61, w: 29 },
          { SpX: 304, SpY: 128, h: 61, w: 29, s: "jumping" },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, 0, 20, this.timeDef, 4);
        },
      },
      GTJL: {
        timeDef: 5,
        arr: [
          { SpX: 304, SpY: 214, h: 61, w: 29 },
          { SpX: 304, SpY: 214, h: 61, w: 29, s: "jumping" },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, 0, 21, this.timeDef, 4);
        },
      },
      JR: {
        timeDef: 7,
        arr: [
          { SpX: 335, SpY: 128, h: 67, w: 28, vy: 30 },
          { h: 66, w: 29 },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, 0, 22, this.timeDef, 4);
        },
      },
      JL: {
        timeDef: 7,
        arr: [
          { SpX: 334, SpY: 214, h: 67, w: 28, vy: 30 },
          { h: 66, w: 29 },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, 0, 23, this.timeDef, 4);
        },
      },
      WR: {
        timeDef: 5,
        arr: [
          { SpX: 0, SpY: 0, h: 62, w: 28, look: "R" },
          { h: 62, w: 28 },
          { h: 62, w: 28 },
          { h: 61, w: 28 },
          { h: 61, w: 28 },
          { h: 63, w: 28 },
          { h: 63, w: 28 },
          { h: 62, w: 28 },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, true, 12, this.timeDef, 4);
        },
      },
      WU: {
        timeDef: 5,
        arr: [
          { SpX: 0, SpY: 192, w: 29, h: 64 },
          { w: 29, h: 64 },
          { w: 29, h: 64 },
          { w: 29, h: 64 },
          { w: 29, h: 64 },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, true, 16, this.timeDef, 4);
        },
      },
      WD: {
        timeDef: 5,
        arr: [
          { SpX: 0, SpY: 127, w: 29, h: 64 },
          { w: 29, h: 64 },
          { w: 29, h: 64 },
          { w: 29, h: 64 },
          { w: 29, h: 64 },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, true, 17, this.timeDef, 4);
        },
      },
      WL: {
        timeDef: 5,
        arr: [
          { SpX: 0, SpY: 63, h: 63, w: 28, look: "L" },
          { h: 63, w: 28 },
          { h: 63, w: 28 },
          { h: 62, w: 28 },
          { h: 62, w: 28 },
          { h: 64, w: 28 },
          { h: 64, w: 28 },
          { h: 62, w: 28 },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, true, 13, this.timeDef, 4);
        },
      },
      ND: {
        timeDef: 1,
        arr: [{ SpX: 0, SpY: 127, h: 64, w: 29 }],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, false, 14, this.timeDef, 0);
        },
      },
      NU: {
        timeDef: 1,
        arr: [{ SpX: 0, SpY: 192, h: 64, w: 29 }],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, false, 15, this.timeDef, 0);
        },
      },
      NL: {
        timeDef: 1,
        arr: [{ SpX: 0, SpY: 63, h: 63, w: 28 }],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, false, 11, this.timeDef, 0);
        },
      },
      NR: {
        arr: [{ SpX: 0, SpY: 0, h: 62, w: 28 }],
        timeDef: 2,
        do: function () {
          doanim(PlayerBase[interZept], this.arr, false, 10, this.timeDef, 0);
        },
      },
      CNL: {
        arr: [{ SpX: 396, SpY: 0, h: 57, w: 28 }],
        timeDef: 2,
        do: function () {
          doanim(PlayerBase[interZept], this.arr, false, 30, this.timeDef, 0);
        },
      },
      CNR: {
        arr: [{ SpX: 397, SpY: 64, h: 57, w: 28 }],
        timeDef: 2,
        do: function () {
          doanim(PlayerBase[interZept], this.arr, false, 33, this.timeDef, 0);
        },
      },
      CWL: {
        timeDef: 9,
        arr: [
          { SpX: 396, SpY: 0, h: 57, w: 28 },
          { SpX: 425, SpY: 0, h: 55, w: 28 },
          { h: 57, w: 28, SpX: 454, SpY: 0 },
          { h: 56, w: 28, SpX: 483, SpY: 1 },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, true, 31, this.timeDef, 0);
        },
      },
      CWR: {
        timeDef: 9,
        arr: [
          { SpX: 397, SpY: 64, h: 57, w: 28 },
          { SpX: 426, SpY: 64, h: 55, w: 28 },
          { SpX: 455, SpY: 64, h: 57, w: 28 },
          { SpX: 484, SpY: 64, h: 56, w: 28 },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, true, 32, this.timeDef, 0);
        },
      },
      CTR: {
        timeDef: 5,
        arr: [
          { SpX: 281, SpY: 64, h: 62, w: 28 },
          { SpX: 310, SpY: 64, h: 62, w: 28 },
          { h: 61, w: 28, SpX: 339, SpY: 64 },
          { h: 61, w: 28, SpX: 368, SpY: 64 },
          { h: 61, w: 28, SpX: 368, SpY: 64, s: "crouch" },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, 0, 30, this.timeDef, 0);
        },
      },
      CTL: {
        timeDef: 5,
        arr: [
          { SpX: 279, SpY: 0, h: 61, w: 28 },
          { SpX: 308, SpY: 1, h: 61, w: 28 },
          { h: 61, w: 28, SpX: 337, SpY: 0 },
          { h: 61, w: 28, SpX: 367, SpY: 0 },
          { h: 61, w: 28, SpX: 367, SpY: 0, s: "crouch" },
        ],
        do: function () {
          doanim(PlayerBase[interZept], this.arr, 0, 30, this.timeDef, 0);
        },
      },
    };
    this.time = PlayerBase.length > 1 ? PlayerBase[interZept] : 0;
    this.timeRate = 0.1;
    this.timeRatekoff = 0.1;
    this.velX = 0;
    this.velY = 0;
    this.w = 0;
    this.x = 60;
    this.xc = 0;
    this.xi = 60;
    this.y = 700;
    this.yc = 0;
    this.yi = 700;
    this.sSs = 0;
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

class platform {
  constructor(x, y, w, h, kind, sx, sy, px, py) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.Sh = 64;
    this.Sw = 64;
    this.type = "tile";
    this.kind = kind;
    this.color = images.atlas01;
    if (!kind || kind == "break") {
      this.h = h;
    } else if (kind == "stairR" || "stairL") {
      this.h = w;
      this.Hha = 200;
    }
    this.SpX = sx;
    this.SpY = sy;
    this.patn = px || py ? [px, py] : [w, h];
    this.chkCol = (A) => {
      let dY = A.y - A.yi,
        dX = A.x - A.xi;
      switch (kind) {
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
          break;
        default:
          if (dY && (A.h + A.y - dY <= this.y || A.y - dY >= this.y + this.h)) {
            if (dY < 0) {
              A.velY = 0;
              A.y = this.y + this.h;
            } else {
              if (dY > 0 && A.y + A.h > this.y - 2 && A.y < this.y + this.h) {
                if (A.state == "jumping" && A.velY <= -26) A.state = "";
                A.y = this.y - A.h;
                A.velY = 0;
              }
            }
          } else {
            if (dX || A.h + A.y - dY > this.y) {
              A.x -= dX;
              A.velX = 0;
              if (
                PlayerBase[interZept].state == "sprinting" ||
                PlayerBase[interZept].state == "sprintingM"
              ) {
                PlayerBase[interZept].state = "pain";
                PlayerBase[interZept].sSs = 0;
              }
            }
          }
      }
    };
  }
}

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
      for (let scz = 0; scz < PlayerBase.length; scz++) {
        PlayerBase[scz].room = dess;
        PlayerBase[scz].x = xD;
        if (PlayerBase[scz].state == "jumping") {
          PlayerBase[scz].state = "";
        }
        PlayerBase[scz].y = xom - PlayerBase[scz].h;
        PlayerBase[scz].velY = 0;
        world = eval(localStorage.world);
        world = world[PlayerBase[interZept].room];
        if (xD > mx / 2) {
          if (xD > A + mx / 2) {
            PlayerBase[scz].xc = A;
          } else {
            PlayerBase[scz].xc = xD - mx / 2;
          }
        } else {
          PlayerBase[scz].xc = 0;
        }
      }
    };
  }
}

class menus {
  constructor(struct) {
    if (PlayerBase[interZept].is < 0) {
      PlayerBase[interZept].is = 0;
    }
    this.floor = struct;
    for (let ik = 0; ik < PlayerBase[interZept].am.length; ik++) {
      this.floor = this.floor[PlayerBase[interZept].am[ik]];
    }

    this.nav = () => {
      if (PlayerBase[interZept].dire == "U" && waitHotSause) {
        if (PlayerBase[interZept].is > 0) {
          PlayerBase[interZept].is--;
          waitHotSause = 0;
        }
      } else if (PlayerBase[interZept].dire == "D" && waitHotSause) {
        if (PlayerBase[interZept].is < Object.keys(this.floor).length - 1) {
          PlayerBase[interZept].is++;
          waitHotSause = 0;
        }
      }

      if (
        PlayerBase[interZept].lstDir == "N" &&
        PlayerBase[interZept].dire == "N"
      ) {
        waitHotSause = 1;
      }

      if (Answer > 0) {
        const key = Object.keys(this.floor)[PlayerBase[interZept].is];
        let value = this.floor[key];
        PlayerBase[interZept].is = -1;
        if (Object.prototype.toString.call(value) === "[object Object]") {
          PlayerBase[interZept].am.push(key);
        } else if (typeof value === "function") {
          value();
        } else if (Object.prototype.toString.call(value) === "[object Array]") {
          PlayerBase[interZept].am.push(key);
        } else if (
          Object.prototype.toString.call(value) === "[object String]"
        ) {
          alert(value);
        }
        Answer = 0;
      }

      if (Answer < 0) {
        if (PlayerBase[interZept].am.length > 0) {
          PlayerBase[interZept].am.pop();
          PlayerBase[interZept].is = -1;
        }
        Answer = 0;
      }
    };

    this.draw = () => {
      let indexAt = PlayerBase[interZept].is;
      c.fillStyle = "rgba(0, 0, 0, 0.4)";
      c.fillRect(0, 0, mx, mh);
      c.font = "50px p2p";
      const keys = Object.keys(this.floor);
      const maxVisible = 5;

      let startIdx = Math.max(0, indexAt - Math.floor(maxVisible / 2));
      let endIdx = Math.min(keys.length, startIdx + maxVisible);
      if (endIdx - startIdx < maxVisible) {
        startIdx = Math.max(0, endIdx - maxVisible);
      }

      for (let i = startIdx; i < endIdx; i++) {
        let keyName = keys[i];
        let y = 200 + (i - startIdx) * 100;
        if (i === indexAt) {
          c.fillStyle = "rgba(255, 255, 0, 0.7)";
          c.fillRect(50, y - 40, mx - 100, 80);
          c.fillStyle = "rgb(255, 255, 0)";
        } else {
          c.fillStyle = "rgb(200, 200, 200)";
        }
        c.fillText(keyName, 100, y);
      }
    };
  }
}
