let isJumping = false,
  //determines if the jump button is pressed
  i = 0,
  test01 = 1;
// i a pretty godlike aura lies behind that name
Gamestarting = 1;
// a bool which is tells whether the game is paused or runing like normal
// for debuging purposes only
// will likely be un reachable by any normal button again
const gamev = {
  awake: 1,
  time: 0,
  timeRate: 0.1,
  clouds: 1,
  playerCount: 1,
};
//awake? time, time rate,clouds
const images = {
  Pp1: new Image(),
  atlas01: new Image(),
  sky: new Image(),
  clouds: new Image(),
  clouds_thin: new Image(),
  props: new Image(),
  struct_1: new Image(),
};

//declare images as variables
images.Pp1.src = "art/Pp1.png";
images.atlas01.src = "art/atlas01.png";
images.clouds.src = "art/clouds.png";
images.clouds_thin.src = "art/clouds_thin.png";
images.props.src = "art/props.png";
images.struct_1.src = "art/struct_1.png";
// their src preferably in the art folder pls ld dem haV sAme nuame
const characters = [
  {
    //obj the og
    WR: [
      {
        SpX: 0,
        SpY: 0,
        h: 62,
        w: 28,
      },
      {
        h: 62,
        w: 28,
      },
      {
        h: 62,
        w: 28,
      },
      {
        h: 61,
        w: 28,
      },
      {
        h: 61,
        w: 28,
      },
      {
        h: 63,
        w: 28,
      },
      {
        h: 63,
        w: 28,
      },
      {
        h: 61,
        w: 28,
      },
    ],
    WL: [
      {
        SpX: 0,
        SpY: 65,
        h: 62,
        w: 28,
      },
      {
        h: 62,
        w: 28,
      },
      {
        h: 62,
        w: 28,
      },
      {
        h: 61,
        w: 28,
      },
      {
        h: 61,
        w: 28,
      },
      {
        h: 63,
        w: 28,
      },
      {
        h: 63,
        w: 28,
      },
      {
        h: 61,
        w: 28,
      },
    ],
    NR: [
      {
        SpX: 0,
        SpY: 0,
        h: 62,
        w: 28,
      },
    ],
    Nl: [
      {
        SpX: 0,
        SpY: 65,
        h: 62,
        w: 28,
      },
    ],
  },
];
const drawPat = (img, SpX, SpY, Sw, Sh, pX, pY, x, y, w, h) => {
  if (pX === 0 && pY === 0) return;

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
const movemento = (obj) => {
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowUp":
        // Up arrow key pressed
        obj.dire = "U";
        break;
      case "ArrowDown":
        // Down arrow key pressed
        obj.dire = "D";
        break;
      case "ArrowLeft":
        // Left arrow key pressed
        obj.dire = "L";
        break;
      case "ArrowRight":
        obj.dire = "R";
        // Right arrow key pressed
        break;

      case "z":
        // "z"
        isJumping = true;
        break;
    }
  });
  document.addEventListener("keyup", function (event) {
    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (keys.includes(event.key)) {
      // Handle key release for any of the specified keys
      obj.dire = "N";
    }
  });
  switch (obj.dire) {
    case "N":
      obj.velX = 0;
      if (obj.look == "R") {
        doanim(obj, characters[obj.char].NR, 1, 0);
      }
      if (obj.look == "L") {
        doanim(obj, characters[obj.char].Nl, 1, 0);
      }
      obj.lstDir = "N";
      break;
    case "U":
      break;
    case "D":
      obj.velX = 0;
      obj.lstDir = "D";
      break;
    case "R":
      obj.velX = 10;
      doanim(obj, characters[obj.char].WR, 2, 1, 6);
      obj.lstDir = "R";
      obj.look = "R";
      break;
    case "L":
      obj.velX = -10;
      doanim(obj, characters[obj.char].WL, 2, 1, 6);
      obj.lstDir = "L";
      obj.look = "L";
      break;
    case "UR":
      obj.velX = 0;
      obj.look = "R";
      break;
    case "DR":
      obj.velX = 0;
      obj.look = "R";
      break;
    case "UL":
      obj.velX = 0;
      obj.look = "L";
      break;
    case "DL":
      obj.velX = 0;
      obj.look = "L";
      break;
  }
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
const doanim = (obj, arr, t, loop, smart) => {
  if (!arr) return;

  if (obj.frame < t * arr.length || loop) {
    if (obj.frame >= t * arr.length) {
      obj.frame = 0;
    }

    const piz = arr[Math.trunc(obj.frame / t)];

    if (smart) {
      obj.SpX = arr[0].SpX + (2 + piz.w) * Math.trunc(obj.frame / t);
      obj.SpY = arr[0].SpY;
    } else {
      obj.SpX = piz.SpX;
      obj.SpY = piz.SpY;
    }
    obj.y += obj.h - piz.h * obj.size;
    obj.w = piz.w * obj.size;
    if (obj.kind == "full") {
      obj.h = piz.h * obj.Pos;
    } else {
      obj.h = piz.h * obj.size;
    }

    obj.frame++;
  } else {
    if (obj.lstDir !== obj.dire) {
      obj.frame = 0;
    }
  }
};
//draw handles the process of the rendering
// it simply utilizes the objects' attributes to be drawn in canvas
// and configures them to meet demands
// view the function for documentation
const draw = (obj) => {
  let brol = 0;
  if (obj.kind == "bk" || obj.kind == "tilebk") {
    brol = Pp1.xc;
  }
  //brol is an integer used specificly for the effect kind "bk"
  // in order to be seen no matter the change in position
  if (obj.color.tagName == "IMG") {
    //checks for the asset given for the object if it is an image or a color
    if (!obj.patn[0] && !obj.patn[1]) {
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
      c.drawImage(
        obj.color,
        obj.SpX,
        obj.SpY,
        obj.Sw,
        obj.Sh,
        obj.x - Pp1.xc + brol,
        obj.y,
        obj.w,
        obj.h
      );
    } else {
      drawPat(
        obj.color,
        obj.SpX,
        obj.SpY,
        obj.Sw,
        obj.Sh,
        obj.patn[0],
        obj.patn[1],
        obj.x - Pp1.xc + brol,
        obj.y,
        obj.w,
        obj.h
      );
    }
  } else {
    // if the object failed to have an img accommodated to its color attribute
    // whether if the image was assign correctly or it is a color
    // any type of any kind could be found here if there is no img
    c.fillStyle = obj.color;
    c.fillRect(obj.x - Pp1.xc + brol, obj.y, obj.w, obj.h);
  }
};

//the function seen before you is the drawpat
// it takes the pattern drawing from the "draw" to used without needing objects
const HitBox = (obj) => {
  if (!obj.Hha) {
    obj.Hha == 0;
  }
  c.fillStyle = "green";
  c.lineWidth = "15px";
  c.strokeRect(obj.x - obj.xc, obj.y - obj.Hha, obj.w, obj.Hha + obj.h);
};
// by drawing a green outline around an object
// it makes the colliding areas clear and visable
function rand(a, b) {
  let pepe = 0;
  while (pepe <= a || pepe > b) {
    pepe = Math.round(Math.random() * b);
  }
  return pepe;
}
// a "random" int value generator
// generates an int between a and b
const jump = () => {
  if (Gamestarting) {
    isJumping = true;
  }
};
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
  constructor(bet, det) {
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
                if (Pp1.dire == "U") {
                  B.chkCol(det);
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
      //Eeeerase!!
      c.clearRect(0, 0, mx, mh);
      ///collisionn!!
      Pp1.xi = Pp1.x;
      Pp1.yi = Pp1.y;
      Pp1.velY += Pp1.G;
      Pp1.y = Pp1.y - Pp1.velY;
      Pp1.x += Pp1.velX;
      //mism vragity
      if (gamev.awake) {
        gamev.clouds++;
        gamev.time += gamev.timeRate;
        if (gamev.clouds > mx) {
          gamev.clouds = 0;
        }
        if (gamev.time > 255 || gamev.time < 0) {
          gamev.timeRate = -gamev.timeRate;
        }
        c.fillStyle = `rgba(
          ${76 - Math.round(gamev.time)},
          ${186 - Math.round(gamev.time)},
          ${255 - Math.round(gamev.time)},
          1
        )`;
        c.fillRect(0, 0, mx, mh);
        c.drawImage(images.clouds_thin, 0, 0, mx, mh / 4);
        c.fillStyle = `rgba(
          ${15},
          ${23},
          ${147},
          0.3
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
          -mx + Math.round(gamev.clouds),
          0,
          2 * mx,
          300
        );
        c.fillRect(0, 0, mx, mh);
      }
      //a wake from the non handling th sky time and clouds
      if (hell) {
        switch (Pp1.room) {
          case 0:
            if (Pp1.room == 0) {
              let oppaVel = 0.07;
              let seekl = 6;
              if (this.entities[seekl].YesDraw) {
                this.entities[seekl - 2].YesDraw = 0;
                if (this.entities[seekl - 3].oppa > 0) {
                  this.entities[seekl - 3].oppa -= oppaVel;
                }
              } else {
                if (this.entities[seekl - 3].oppa < 1) {
                  this.entities[seekl - 3].oppa += oppaVel;
                }
              }
              this.entities[seekl - 3].color = `rgba(0,0,0,${
                this.entities[seekl - 3].oppa
              })`;
            } else {
              this.entities[seekl - 2].YesDraw = 1;
            }
            break;
          case 1:
            break;
        }
      }

      // this switch is known in the hierchy as called "protocol"
      //it checks and manipulates entities via switch cases
      //simply add a case with the targeted room in the world index and break;
      //used for potenial cutscenes ,dynamic visuals and technicalities galore
      // this is where both collision and rendering happen
      for (i = 0; i < this.entities.length; i++) {
        if (this.entities[i].YesDraw) {
          draw(this.entities[i]);
        } else {
          this.entities[i].YesDraw = 1;
        }
        this.chkCol(Pp1, this.entities[i]);
      }
      // the cinematic view "ie camera following you around in the x axis"
      if (Pp1.x > mx / 2 || Pp1.xc > 0) {
        if (Pp1.xc + Pp1.x < det + mx / 2) {
          Pp1.xc += Pp1.velX;
          if (Pp1.xc < 0) {
            Pp1.xc = 0;
          }
        }
      }
      // a being promoted to be more than any by simply existing(player render)
      c.drawImage(
        images.Pp1,
        Pp1.SpX,
        Pp1.SpY,
        Pp1.w / Pp1.size,
        Pp1.h / Pp1.size,
        Pp1.x - Pp1.xc,
        Pp1.y,
        Pp1.w,
        Pp1.h
      );
    };
  }
}
// double tapping a button in an aggressive manner in a semi maliable laptop chaisis sounds like a
// two .22 colibri sub round coming out of a rifle that wasn't very useful
class effect {
  constructor(bro, x, y, w, h, kind, sx, sy, px, py, size, Pos) {
    this.x = x;
    this.size = size;
    this.Pos = Pos;
    this.type = "effect";
    this.kind = kind;
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
              A.y = this.y + this.h;
            } else {
              A.y = this.y - A.h;
            }
            A.velY = 0;
            if (isJumping) {
              A.velY = 30;
              isJumping = false;
            }
          } else {
            if (dX || A.h + A.y - dY > this.y) {
              A.x -= dX;
              A.velX = 0;
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

              if (isJumping) {
                A.velY = 30;
                isJumping = false;
              }
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
        case "floor":
          if (Pp1.dire == "U") {
            Pp1.velY = 10;
          } else {
            if (Pp1.dire == "D") {
              Pp1.velY = -10;
            } else {
              Pp1.velY = -Pp1.G;
            }
          }
          break;
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
//circle is as old as existance , the first interaction with canvas
class item {
  constructor(alp, bet, id) {
    this.type = "item";
    this.x = alp;
    this.y = bet;
    this.chkCol = function () {
      if (id) {
      }
      obj.inventory.push(itemList[id]);
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
      Pp1.room = dess;
      Pp1.x = xD;
      Pp1.y = xom - Pp1.h;
      Pp1.velY = 0;
      if (xD > mx / 2) {
        if (xD > A + mx / 2) {
          Pp1.xc = A;
        } else {
          Pp1.xc = xD - mx / 2;
        }
      } else {
        Pp1.xc = 0;
      }
    };
  }
}
// door is what transitions you between different scenes
//e1
const world = [
  new scene(
    [
      //new platform(500, 400, 200, 200, "stairR", 0, 128),
      //new platform(300, 400, 200, 200, "stairL", 128, 128),
      new effect(images.props, 0, mh, 256, 289, "full", 0, 81, mx, 0, 9, 1.5),
      new platform(0, 265, 60, 435, 0, 900, 900), //wall
      new platform(0, 700, 2500, 200, 0, 800, 800), //ground
      new effect(`rgba(0, 0, 0, 0)`, 0, 0, mx, mh, "bk"),
      new effect(`rgba(66, 36, 69, 1)`, 13, 700, 750, 20, "prop"),
      new effect(images.struct_1, 0, 700, 408, 211, "struct", 0, 301, 0, 0, 3),
      new effect(images.struct_1, 0, 700, 267, 187, "seek", 0, 77, 0, 0, 3, 66),
      new door(1900, 400, 1, 0, 200, 300),
    ],
    1600
  ),
  new scene(
    [
      new platform(0, 200, 660, 640, "floor", 384, 0, 128, 128), //ground
      new door(200, 200, 0, 1, 1700, 700 - Pp1.h * Pp1.size),
    ],
    800
  ),
];
//the world array containing 2 scenes currently
// this array has a list of objects that are constructed by the classes
let gameLoo = setInterval(function () {
  if (Gamestarting) {
    movemento(Pp1);
    world[Pp1.room].collis();
    //HitBox(world[0].entities[1]); draws a hitbox of an element
    //the MvP (MAIN VISUAL //and technical// PROCESSOR)
    //player border and movement
    //movement uses obj.dire which is from a js file called joyhub.js
    i = 0;
  } else {
    if (i == 0) {
      c.fillStyle = "rgba(245, 188, 145, .6)";
      c.fillRect(0, 0, mx, mh);
      i = 1;
      // when gamestarting is off the game pause protocol gets activated
      // the scene is visable but with a tranparent yellow overlay on top
      // use the purple button to pause/resume
    }
  }
}, 40);
// interval in question the (runtime / game) loop
/*
before i get accused of "bad code", this is a proof of concept,
even thought im already aware that it can work as a concept,
but i want to be sure if it can do it, 
for i am famillarizing myself with what goes into making games,
and most importantly is to be more agile towards low level api,
i have a 20-year-old device that i came across its sdk and apis,
sadly theres not a single easy light weight framework that is available.
or atleast i didnt across a path with it so its me and myself trying to learn,
*/
