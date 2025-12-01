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
      2 * mh
    );
    c.fillStyle = "rgba(240, 184, 238, 1)";
    c.font = "120px p2p";
    c.fillText("Dombom", mx / 2 - 350, (mh * 2) / 5);

    c.fillStyle = "rgba(190, 211, 34, 1)";
    c.font = "50px bitcount";
    c.fillText("Press 'shift+c' to start", mx / 2 - 250, (mh * 4) / 5);
  });
};
//menus for any type of thing its an object
function byteLength(str) {
  // Calculates the UTF-8 byte length, a common wire encoding
  return new TextEncoder().encode(str).length;
}
const pause_menu = () => {
  let objSup = {
    resume: () => {
      menuBut();
    },
    items: PpN.items,
    options: {
      [`crt ${PpN.crtty ? "on" : "off"}`]: () => {
        PpN.crtty = !PpN.crtty;
        crt.clearRect(0, 0, mx, mh);
      },
      reset_world: {
        ["sure?"]: {
          [resetDialog]: () => {
            localStorage.world = "";
            resetDialog = `restก็็็็็....
            `;
            alert(
              "you've emptied the world buffer ,reload this tab now or suffer the consequences"
            );
          },
        },
      },
      [`Stealth ${PpN.StealthVisuals ? "on" : "off"}`]: () => {
        PpN.StealthVisuals = !PpN.StealthVisuals;
      },
      Menu_opacity: {
        opaque: () => {
          PpN.menuOppa = 1;
        },
        semi: () => {
          PpN.menuOppa = 0.8;
        },
        transparent: () => {
          PpN.menuOppa = 0.3;
        },
      },
      log: {
        [`world Size[${byteLength(localStorage.world) / 1000} kb]`]: 0,
      },
    },
    help: {
      ["press X to jump"]: 0,
      ["press C to crouch aka quiet"]: 0,
      ["try to be quiet with Mr Rabit and try not to fall of the cliff"]: 0,
    },
    titlescreen: () => {
      menuMode = 1;
      Gamestarting = 0;
    },
  };
  new menus(objSup).nav();
  c.fillStyle = `rgba(134, 65, 25, ${PpN.menuOppa})`;
  c.fillRect(0, 0, mx, mh);
  new menus(objSup).draw();
  if (dynamicStorage) {
    localStorage.world = "";
    dynamicStorage = 0;
  }
};
//
const images = {
  Pp1: new Image(),
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
};

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
//promise header
characters = {
  GTJR: {
    timeDef: 5,
    arr: [
      { SpX: 304, SpY: 128, h: 61, w: 29 },
      { SpX: 304, SpY: 128, h: 61, w: 29, s: "jumping" },
    ],
    do: function () {
      doanim(PpN, this.arr, 0, 20, this.timeDef, 4);
    },
  },
  GTJL: {
    timeDef: 5,
    arr: [
      { SpX: 304, SpY: 214, h: 61, w: 29 },
      { SpX: 304, SpY: 214, h: 61, w: 29, s: "jumping" },
    ],
    do: function () {
      doanim(PpN, this.arr, 0, 21, this.timeDef, 4);
    },
  },
  JR: {
    timeDef: 7,
    arr: [
      { SpX: 335, SpY: 128, h: 67, w: 28, vy: 30 },
      { h: 66, w: 29 },
    ],
    do: function () {
      doanim(PpN, this.arr, 0, 22, this.timeDef, 4);
    },
  },
  JL: {
    timeDef: 7,
    arr: [
      { SpX: 334, SpY: 214, h: 67, w: 28, vy: 30 },
      { h: 66, w: 29 },
    ],
    do: function () {
      doanim(PpN, this.arr, 0, 23, this.timeDef, 4);
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
      doanim(PpN, this.arr, true, 12, this.timeDef, 4);
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
      doanim(PpN, this.arr, true, 16, this.timeDef, 4);
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
      doanim(PpN, this.arr, true, 17, this.timeDef, 4);
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
      doanim(PpN, this.arr, true, 13, this.timeDef, 4);
    },
  },
  ND: {
    timeDef: 1,
    arr: [{ SpX: 0, SpY: 127, h: 64, w: 29 }],
    do: function () {
      doanim(PpN, this.arr, false, 14, this.timeDef, 0);
    },
  },
  NU: {
    timeDef: 1,
    arr: [{ SpX: 0, SpY: 192, h: 64, w: 29 }],
    do: function () {
      doanim(PpN, this.arr, false, 15, this.timeDef, 0);
    },
  },
  NL: {
    timeDef: 1,
    arr: [{ SpX: 0, SpY: 63, h: 63, w: 28 }],
    do: function () {
      doanim(PpN, this.arr, false, 11, this.timeDef, 0);
    },
  },
  NR: {
    arr: [{ SpX: 0, SpY: 0, h: 62, w: 28 }],
    timeDef: 2,
    do: function () {
      doanim(PpN, this.arr, false, 10, this.timeDef, 0);
    },
  },
  CNL: {
    arr: [{ SpX: 396, SpY: 0, h: 57, w: 28 }],
    timeDef: 2,
    do: function () {
      doanim(PpN, this.arr, false, 30, this.timeDef, 0);
    },
  },
  CNR: {
    arr: [{ SpX: 397, SpY: 64, h: 57, w: 28 }],
    timeDef: 2,
    do: function () {
      doanim(PpN, this.arr, false, 33, this.timeDef, 0);
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
      doanim(PpN, this.arr, true, 31, this.timeDef, 0);
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
      doanim(PpN, this.arr, true, 32, this.timeDef, 0);
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
      doanim(PpN, this.arr, 0, 30, this.timeDef, 0);
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
      doanim(PpN, this.arr, 0, 30, this.timeDef, 0);
    },
  },
};

//promise footer
Promise.allSettled(promises)
  .then(() => {
    document.getElementById("white").remove();
    if (localStorage.world == "") {
      ////////////////||
      localStorage.world = `[
        new scene(
          [
            new effect(
              images.bkpat0,
              0,
              mh + 50,
              256,
              290,
              "full",
              0,
              0,
              mx,
              0,
              9,
              2
            ),
            new platform(0, 265, 60, 435, 0, 900, 900),

            new platform(0, 700, 2500, 200, 0, 800, 800),
            new effect("rgba(0, 0, 0, 0)", 0, 0, mx, mh, "bk"),
            new effect("rgba(66, 36, 69, 1)", 13, 700, 750, 20, "prop"),
            new effect(
              images.struct_1,
              0,
              700,
              408,
              211,
              "struct",
              0,
              301,
              0,
              0,
              3
            ),
            new effect(
              images.struct_1,
              0,
              700,
              267,
              187,
              "seek",
              0,
              77,
              0,
              0,
              3,
              66
            ),
            new door(1900, 400, 1, 0, 200,730),
          ],
          1600,
          2,
          "ycz"
        ),
        new scene(
          [
            new platform(0, 730, 1152, 200, 0, 900, 900, 0, 100, 100),
            new effect(images.bkpat01,-50,800,256,49,"snip",0,59,0,0,4.5,258),
            new door(-100, 500, 0, 0, 1400, 700),
            new entity(mx-50,700, "01"),
          ],
          1600,
          2,
          "ycz"
        ),
        new scene(
          [
            new platform(0, 0, 2000, 2000, "floor", 384, 0, 100, 100),
            new door(198, 201, 0, 1, 1400, 700),
            new entity(mx, mh / 2, "01"),
          ],
          300,
          0,
          300
        ),
      ]`;
      console.log("loaded in");
    }

    try {
      // compile the string into a function and run it
      const worldFn = new Function("return " + localStorage.world);
      let worldArray = worldFn();

      if (!Array.isArray(worldArray)) {
        throw new Error("World did not return an array");
      }

      world = worldArray[PpN.room];
      if (!world) {
        throw new Error("Scene not found: PpN.room=" + PpN.room);
      }
    } catch (err) {
      console.error("Failed to load world:", err);
      alert("World load error:\n" + err.message);
      localStorage.world = ""; // fallback so your game doesn't crash
    }

    window.addEventListener("load", () => {
      jyM();
    });

    setInterval(() => {
      if (menuMode == true) {
        menu();
      } else {
        if (PpN.timeRatekoff) {
          PpN.is = -1;
          movemento(PpN);
        }
        world.collis(PpN);
        if (!PpN.timeRatekoff) {
          pause_menu();
        }
        c.fillStyle = `rgba(0,0,0,${
          ((PpN.time / 255) * (100 - PpN.lum)) / 100 - 0.2
        })`;

        switch (PpN.room) {
          case 0:
            if (PpN.room == 0) {
              let oppaVel = 0.07;
              let seekl = 6;
              if (world.entities[seekl].YesDraw) {
                world.entities[seekl - 2].YesDraw = 0;
                if (world.entities[seekl - 3].oppa > 0) {
                  world.entities[seekl - 3].oppa -= oppaVel;
                }
              } else {
                c.fillStyle = "rgba(0, 0, 0, 0.2)";
                if (world.entities[seekl - 3].oppa < 1) {
                  world.entities[seekl - 3].oppa += oppaVel;
                }
              }
              world.entities[seekl - 3].color = `rgba(0,0,0,${
                world.entities[seekl - 3].oppa
              })`;
            } else {
              world.entities[seekl - 2].YesDraw = 1;
            }

            break;
          case 1:
            if (PpN.timeRatekoff) {
              doanim(world.entities[1], [0, 0, 0, 0, 0, 0, 0], 0, 0, 4, 0);
              break;
            }
        }

        c.fillRect(0, 0, mx, mh);
      }

      if (PpN.crtty) {
        crtOverlay();
      }
    }, 250 * Math.abs(PpN.timeRate));
  })
  .catch((err) => {
    console.log(err);
  });
