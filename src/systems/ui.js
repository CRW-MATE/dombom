// ============================================
// UI SYSTEM (Menus & Dialogs)
// ============================================

// Main title screen menu
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

// Pause menu
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
            resetDialog = `restก็็็็็....`;
            alert(
              "you've emptied the world buffer ,reload this tab now or suffer the consequences",
            );
          },
        },
      },
      [`Stealth ${PlayerBase[interZept].StealthVisuals ? "on" : "off"}`]: () => {
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
      [`remove 1 ${PlayerBase.length > 1 ? `out of the ${PlayerBase.length}` : "unavailable"}`]: () => {
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

// Helper function for byte length
function byteLength(str) {
  return new TextEncoder().encode(str).length;
}

// Player management
function addP() {
  let newPlayer = new Player();
  PlayerBase.push(newPlayer);
}

function rmvP() {
  if (PlayerBase.length > 1) {
    PlayerBase.pop();
  }
}
