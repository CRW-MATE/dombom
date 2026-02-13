const menu = () => {
  Promise.all([
    document.fonts.load("16px p2p"),
    document.fonts.load("16px bitcount"),
  ]).then(() => {
    c.clearRect(0, 0, mx, mh);
    mainVel++;
    mainVel > mh ? (mainVel = 0) : mainVel;
    drawPat(
      images.mainMenu,
      0,
      0,
      50,
      50,
      200,
      200,
      mainVel - mx,
      mainVel - mh,
      2 * mx,
      2 * mh,
    );
    c.fillStyle = "rgba(240, 184, 238, 1)";
    c.font = "120px p2p";
    c.fillText("Dombom", mx / 2 - 350, (mh * 2) / 5);

    c.fillStyle = "rgba(190, 211, 34, 1)";
    c.font = "50px bitcount";
    c.fillText("Press 'shftC' to start", mx / 2 - 300, (mh * 4) / 5);
  });
};
// the main menu bloc
function byteLength(str) {
  // Calculates the UTF-8 byte length, a common wire encoding
  return new TextEncoder().encode(str).length;
}
const pause_menu = () => {
  let objSup = {
    [`${!dynamicStorage ? "resume" : "dynamicStorage is on"}`]: () => {
      PlayerBase[interZept].shift = 1;
      cfx();
    },
    items: PlayerBase[interZept].items,
    options: {
      [`crt ${PlayerBase[interZept].crtty ? "on" : "off"}`]: () => {
        PlayerBase[interZept].crtty = !PlayerBase[interZept].crtty;
        crt.clearRect(0, 0, mx, mh);
      },
      reset_world: {
        ["sure?"]: {
          [resetDialog]: () => {
            localStorage.world = "";
            resetDialog = `restก็็็็็....
            `;
            alert(
              "you've emptied the world buffer ,reload this tab now or suffer the consequences",
            );
          },
        },
      },
      [`Stealth ${PlayerBase[interZept].StealthVisuals ? "on" : "off"}`]:
        () => {
          PlayerBase[interZept].StealthVisuals =
            !PlayerBase[interZept].StealthVisuals;
        },
      Menu_opacity: {
        opaque: () => {
          PlayerBase[interZept].menuOppa = 1;
        },
        semi: () => {
          PlayerBase[interZept].menuOppa = 0.8;
        },
        transparent: () => {
          PlayerBase[interZept].menuOppa = 0.3;
        },
      },
      log: {
        [`world Size[${byteLength(localStorage.world) / 1000} kb]`]: 0,
      },
    },
    Mutiplayer: {
      ["add"]: () => {
        addP();
      },
      [`remove 1 ${PlayerBase.length > 1 ? `out of the ${PlayerBase.length}` : "unavailable"}`]:
        () => {
          rmvP();
        },
      [`switch ${PlayerBase.length > 1 ? "" : "unavailable"}`]: () => {
        if (PlayerBase.length > 1) {
          if (interZept) {
            interZept = 0;
          } else {
            interZept = 1;
          }
        }
      },
      [`hitbox ${hitBoxToggle ? "on" : "off"}`]: () => {
        hitBoxToggle = !hitBoxToggle;
      },
      [`${PlayerBase.length} ${PlayerBase.length < 1 ? "player only" : "players"}`]: 0,
      [`you're controlling no.${interZept + 1}`]: 0,
    },
    help: {
      ["press X to jump"]: 0,
      ["press C to be Sneaky"]: 0,
    },
    titlescreen: () => {
      menuMode = 1;
      Gamestarting = 0;
    },
  };
  new menus(objSup).nav();
  c.fillStyle = `rgba(134, 65, 25, ${PlayerBase[interZept].menuOppa})`;
  c.fillRect(0, 0, mx, mh);
  new menus(objSup).draw();
  if (dynamicStorage && localStorage.world !== "") {
    localStorage.world = "";
  }
};
//
const images = {
  Pp1: new Image(),
  pathTTUT: new Image(),
  bkpat02: new Image(),
  bkpatAmb: new Image(),
  bkpat01: new Image(),
  cliff: new Image(),
  atlas01: new Image(),
  clouds: new Image(),
  clouds_thin: new Image(),
  bkpat0: new Image(),
  struct_1: new Image(),
  rabbit: new Image(),
  mainMenu: new Image(),
  fingU: new Image(),
  fingLU: new Image(),
  joyhubU: new Image(),
  dialog: new Image(),
  tools: new Image(),
};
// in order to add assets you have to add them in art
// name them inside the array as the name of the file
let promises = [],
  keys = Object.keys(images);

for (let key of keys) {
  let isUI = key.endsWith("U"),
    folder,
    file;
  if (isUI) {
    folder = "ui";
    file = key.slice(0, -1);
  } else {
    folder = "art";
    file = key;
  }

  images[key].src = `${folder}/${file}.png`;

  let promx = new Promise((resolve, reject) => {
    images[key].onload = () => {
      resolve(images[key]);
    };
    images[key].onerror = () => reject(images[key]);
  });

  promises.push(promx);
}

const dialog = {
  text: "nothing yet",
  SpX: 0,
  SpY: 0,
  sw: 0,
  sh: 0,
};
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
function drawMultilineText(ctx, text, x, y, lineHeight = 20) {
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * lineHeight);
  });
}
////dialog bloc the one on the top of the screen
let i = 0,
  // i an ominous godlike aura lies behind that name
  // (idk what does it do actually lol no time to rm it)
  Zst = {
    color: images.Pp1,
    dire: "N",
    items: { axe: 0, beans: 0, knife: 0 },
    keysDown: { ArrowRight: 0, ArrowUp: 0, ArrowLeft: 0, ArrowDown: 0 },
    is: -1,
    Zindex: -1,
    shift: false,
    holdShft: 0,
    am: [],
    crtty: 1,
    state: "",
    StealthVisuals: true,
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
  }, /// role model for all players untill i make a player class
  PlayerBase = [],
  interZept = 0,
  hitBoxToggle = 1,
  Answer = 0,
  hell = 1,
  mainVel = 0,
  waitHotSause = 1,
  menuMode = true,
  resetDialog = "reset",
  dynamicStorage = 1,
  world; //world nuthin much to see here guys
// a bool which is tells whether the game is paused or runing like normal
// for debuging purposes only
// will likely be un reachable by any normal button again
//lol no it became a new mechanic well known as "pausing the game"

const menuBut = () => {
  if (!menuMode) {
    PlayerBase[interZept].timeRatekoff = PlayerBase[interZept].timeRatekoff
      ? 0
      : 0.1;
  }
  menuMode = false;
};
//animations and their animation frames
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
const distem = (A, B) => {
  return Math.hypot(
    A.x + A.w / 2 - (B.x + B.w / 2),
    A.y + A.h / 2 - (B.y + B.h / 2),
  );
};
function dCC(color, obj, dist) {
  if (!PlayerBase[interZept].StealthVisuals) return;
  // center inside the rectangle
  const cx = obj.x + obj.w / 2;
  const cy = obj.y + obj.h / 2;

  // radius = half of the smallest dimension
  const radius = dist ? dist : Math.min(obj.w, obj.h) / 2;

  c.strokeStyle = color;
  c.beginPath();
  c.arc(
    cx - PlayerBase[interZept].xc,
    cy - PlayerBase[interZept].yc,
    radius,
    0,
    Math.PI * 2,
  );
  c.lineWidth = 7;
  c.stroke();
}
const arcSeg = (obj, radius, angleDeg) => {
  const ox = obj.x + obj.w / 2 - PlayerBase[interZept].xc;
  const oy = obj.y + obj.h / 2 - PlayerBase[interZept].yc;

  // degrees → radians
  const angleRad = (angleDeg * Math.PI) / 180;

  c.beginPath();

  // start at center
  c.moveTo(ox, oy);

  // draw arc from 0° to angle
  c.arc(ox, oy, radius, 0, angleRad, false);

  // close the sector
  c.closePath();

  c.strokeStyle = "red";
  c.lineWidth = 3;
  c.stroke();
};

//button functionality biatch
const shiftFx = () => {
  PlayerBase[interZept].shift = !PlayerBase[interZept].shift;
};
const cfx = () => {
  if (PlayerBase[interZept].shift) {
    if (dynamicStorage && !menuMode && !PlayerBase[interZept].timeRatekoff)
      return;
    menuBut();
    PlayerBase[interZept].shift = 0;
    return;
  }
  if (PlayerBase[interZept].timeRatekoff) {
    if (PlayerBase[interZept].state == "crouch") {
      PlayerBase[interZept].state = "";
      PlayerBase[interZept].lstSta = 0;
    } else {
      if (PlayerBase[interZept].state == "") {
        PlayerBase[interZept].state = "crouching";
      }
    }
  }
};
const zfx = () => {
  if (!PlayerBase[interZept].timeRatekoff) Answer = 1;
};
const xfx = () => {
  if (!PlayerBase[interZept].timeRatekoff) {
    Answer = -1;
  } else {
    if (PlayerBase[interZept].state == "") {
      PlayerBase[interZept].state = "gtjump";
    } else if (
      PlayerBase[interZept].state == "crouching" &&
      PlayerBase[interZept].look == "R"
    ) {
      PlayerBase[interZept].state = "sprinting";
    } else if (
      PlayerBase[interZept].state == "sprinting" ||
      PlayerBase[interZept].state == "sprintingM"
    ) {
      PlayerBase[interZept].state = "";
      PlayerBase[interZept].sSs = 0;
    }
  }
};
const movemento = (obj) => {
  /////
  if (obj.state == "crouching") {
    obj.look == "R"
      ? PlayerBase[interZept].animations.CTR.do()
      : PlayerBase[interZept].animations.CTL.do();
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
      obj.look == "R"
        ? PlayerBase[interZept].animations.CWR.do()
        : PlayerBase[interZept].animations.CWL.do();
    } else {
      obj.look == "R"
        ? PlayerBase[interZept].animations.CNR.do()
        : PlayerBase[interZept].animations.CNL.do();
    }
    return;
  } else if (obj.state == "sprinting") {
    obj.velX = 12;
    obj.animations.SL.do();
    if (obj.frame == 1) {
      obj.sSs++;
    }
    if (obj.sSs == 8) {
      obj.state = "sprintingM";
    }
  } else if (obj.state == "sprintingM") {
    obj.velX = 14;
    obj.animations.SLM.do();
  } else if (obj.state == "gtjump" && obj.G) {
    obj.velX *= 0.9;
    obj.look == "R"
      ? PlayerBase[interZept].animations.GTJR.do()
      : PlayerBase[interZept].animations.GTJL.do();
  } else if (obj.state == "jumping" && obj.G) {
    obj.look == "R"
      ? PlayerBase[interZept].animations.JR.do()
      : PlayerBase[interZept].animations.JL.do();
    if (obj.dire == "R") {
      obj.velX = 3;
    } else if (obj.dire == "L") {
      obj.velX = -3;
    }
  } else if (obj.state == "pain") {
    obj.velX = -10 * (20 / obj.hp);
    obj.animations.P.do();
    if (obj.frame == 15) {
      obj.rand = rand(0, 3);
      obj.state = "";
      if (obj.hp == 0) {
      }
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

      PlayerBase[interZept].animations.WR.do();

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
      PlayerBase[interZept].animations.WL.do();

      obj.lstDir = "L";
    } else if (obj.dire === "U") {
      if (!PlayerBase[interZept].G) {
        obj.velY = 7;
        obj.look = "U";
        PlayerBase[interZept].animations.WU.do();
      }
      obj.velX = 0;
    } else if (obj.dire === "D") {
      if (!PlayerBase[interZept].G) {
        obj.velY = -7;
        obj.look = "D";
        PlayerBase[interZept].animations.WD.do();
      }
      obj.velX = 0;
    } else if (
      obj.dire === "DL" ||
      (obj.lstSta == 13 &&
        obj.lstDir === "DL" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      if (!PlayerBase[interZept].G) {
        obj.velY = -7;
      }

      PlayerBase[interZept].animations.WL.do();

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
      if (!PlayerBase[interZept].G) {
        obj.velY = -7;
      }

      PlayerBase[interZept].animations.WR.do();

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
      if (!PlayerBase[interZept].G) {
        obj.velY = 7;
      }

      PlayerBase[interZept].animations.WL.do();

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
      if (!PlayerBase[interZept].G) {
        obj.velY = 7;
      }

      PlayerBase[interZept].animations.WR.do();

      obj.velX = 7;
      obj.lstDir = "UR";
      obj.look = "R";
    } else {
      // default
      // obj.velX = 0;

      if (PlayerBase[interZept].velX !== 0) {
        if (PlayerBase[interZept].look == "R") {
          PlayerBase[interZept].velX -= 1;
          if (PlayerBase[interZept].velX < 0) {
            PlayerBase[interZept].velX = 0;
          }
        } else if (PlayerBase[interZept].look == "L") {
          PlayerBase[interZept].velX += 1;
          if (PlayerBase[interZept].velX > 0) {
            PlayerBase[interZept].velX = 0;
          }
        }
      }
      if (PlayerBase[interZept].look == "R") {
        PlayerBase[interZept].animations.NR.do();
      } else if (PlayerBase[interZept].look == "L") {
        PlayerBase[interZept].animations.NL.do();
      } else if (PlayerBase[interZept].look == "D") {
        PlayerBase[interZept].animations.ND.do();
      } else if (PlayerBase[interZept].look == "U") {
        PlayerBase[interZept].animations.NU.do();
      }
      if (!PlayerBase[interZept].G) {
        obj.velY = 0;
      }
    }
  }
};

//the function seen before you is the drawpat lol no go to canvas.js
// you'll find my monolithic render function there
// it takes the pattern drawing from the "draw"
const HitBox = (obj) => {
  if (!obj) return "none existant";
  c.beginPath();
  c.lineWidth = 3;
  c.strokeStyle = "green";
  c.strokeRect(
    obj.x - PlayerBase[interZept].xc,
    obj.y - PlayerBase[interZept].yc,
    obj.w,
    obj.h,
  );
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
              //an example of deleting
              B.chkCol();
              this.entities.splice(this.entities.indexOf(B), 1);
              break;
            case "door":
              // an example of checking before doing anything
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
      //this function does stuff beyond the object colliding
      //where this could check extra stuff before acting the aftermath
      //this could also delete the object from the entities array
      // or just run the thing as normal
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
          //mism vragity
          X.yc--;
        }
        // the cinematic view "ie camera following you around in the x axis"
        if (X.x > mx / 2 || X.xc > 0) {
          if (X.xc + X.x < det + mx / 2) {
            X.xc += X.velX;
            if (X.xc < 0) {
              X.xc = 0;
            }
          }
        }
        // the cinematic view "ie camera following you around in the y axis"
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
      //a wake from the non handling th sky time and clouds
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
        // a being promoted to be more than any by simply existing(player render)
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
//scenes are every map you create on here
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
// where interactive elements such as npcs signs are called
class Player {
  // Changed class name to "Player" (capitalized) as a convention
  constructor() {
    this.hp = 20;
    this.G = 0;
    this.SpX = 0; // Added this.
    this.SpY = 0; // Added this.
    this.StealthVisuals = true;
    this.Zindex = 0;
    this.am = [];
    this.anchorAnim = 0;
    this.awake = 1;
    this.char = 0;
    this.clouds = 281;
    // Assuming 'images.Pp1' is defined elsewhere in your program's scope
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
//player classes
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
              if (
                PlayerBase[interZept].state == "sprinting" ||
                PlayerBase[interZept].state == "sprintingM"
              ) {
                PlayerBase[interZept].state = "pain";
                PlayerBase[interZept].sSs = 0;
              }
              //hitting a wall right or left
            }
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
// door is what transitions you between different scenes
// could be used in the future as beds to transend to dream world
//e1m#
// designation of scenes to that of doom
// but i think it's useless considering i'm doing every thing in one "world"
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
      } else if (Answer < 0) {
        if (PlayerBase[interZept].am.length) {
          PlayerBase[interZept].am.splice(
            PlayerBase[interZept].am.length - 1,
            1,
          );
          Answer = 0;
          PlayerBase[interZept].is = -1;
        }
      }
    };

    this.draw = () => {
      let font =
        PlayerBase[interZept].am.join("/").length < 24
          ? 50
          : 900 / PlayerBase[interZept].am.join("/").length;
      c.fillStyle = "rgba(190, 211, 34, 1)";
      c.font = `${font}px bitcount`;
      c.fillText(".../" + PlayerBase[interZept].am.join("/"), 100, 100);
      for (let dlod = 0; dlod < Object.keys(this.floor).length; dlod++) {
        const key = Object.keys(this.floor)[dlod];
        font = 0;
        c.globalAlpha = 1;
        if (PlayerBase[interZept].is == dlod) {
          font = key.length < 20 ? 30 : 600 / key.length;
          c.font = `${font}px p2p`;
          c.fillStyle = "rgba(240, 184, 238, 1)";
        } else {
          font = key.length < 20 ? 50 : 900 / key.length;
          c.font = `${font}px bitcount`;
          c.fillStyle = "rgba(190, 211, 34, 1)";
        }
        let stat = PlayerBase[interZept].is == dlod ? `>${key}<` : key;
        stat = stat.replace(/_/g, " ");
        c.fillText(
          stat,
          mx / 2 - 250 - (stat.length - key.length) * 25,
          mh / 2 + dlod * 50 - (PlayerBase[interZept].is - dlod + 1) * 10,
        );
      }
    };
  }
}
function onetimers(a) {
  new Function("return " + a);
  this.kind = "onee";
}
function addP() {
  PlayerBase.push(new Player());
  interZept++;
}
function rmvP() {
  if (PlayerBase.length == 1) return;
  if (interZept == 0) {
    PlayerBase.splice(1, 1);
  } else {
    interZept--;
    PlayerBase.splice(0, 1);
  }
}
//put a guy out there dude its player no.1
PlayerBase.push(new Player());
