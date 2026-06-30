// ============================================
// INPUT SYSTEM (Keyboard & Joystick)
// ============================================

// Input button handlers
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

const menuBut = () => {
  if (!menuMode) {
    PlayerBase[interZept].timeRatekoff = PlayerBase[interZept].timeRatekoff
      ? 0
      : 0.1;
  }
  menuMode = false;
};

// Joystick setup and sizing
const jySize = (a, b, c) => {
  const hub = document.querySelector("#joyHub").style;
  const joy = document.getElementById("joy");
  const buttons = document.getElementsByTagName("button");

  hub.height = `${a}px`;
  hub.width = `${a}px`;
  hubs = a;
  ds = a / 6;
  hubx = b;
  huby = c;
  joy.style.height = `${(a * 9) / 15}px`;
  joy.style.width = `${a / 3}px`;
  if (ska == 1) {
    hub.translate = `${b}px ${c + innerH - 900}px`;
  } else {
    hub.translate = `${b}px ${c}px`;
  }

  joy.style.translate = `${a / 3}px ${a / 3}px`;
  for (i = 0; i < buttons.length; i++) {
    let a = buttons[i].style;
    a.backgroundSize = "cover";
    a.opacity = "75%";
    a.backgroundColor = "slategrey";
    a.color = "darkslategray";
    a.margin = "0px";
    a.padding = "0px";
    a.border = "10px darkslategray solid";
    a.height = `150px`;
    a.borderRadius = "75px";
    a.width = `150px`;
    a.position = "absolute";
    a.zIndex = "3";
    a.textAlign = "center";
    a.userSelect = "none";
    a.fontFamily = "p2p";
    a.fontSize = `${50 + (1 - buttons[i].textContent.length * 2.5) * 2}px`;
  }
};

// Mobile port setup
function mobilePort() {
  const hub = document.querySelector("#joyHub").style;
  const joy = document.getElementById("joy");
  const buttons = document.getElementsByTagName("button");

  if (innerW >= innerH) {
    canvas.style.translate = `${(innerW - mx) / 2}px`;
    canvas.style.transform = `scale(1)`;
    crtvas.style.translate = `${(innerW - mx) / 2}px`;
    crtvas.style.transform = `scale(1)`;
    jySize(450, 10, (1 / 3) * mh - 50);
    buttons[0].style.translate = `${innerW - mx / 2 + 20}px ${
      20 + innerH - 900
    }px`;
    buttons[1].style.translate = `${innerW - mx / 2 + 250}px ${
      120 + innerH - 900
    }px`;
    buttons[2].style.translate = `${innerW - mx / 2 + 50}px ${
      300 + innerH - 900
    }px`;
    buttons[3].style.translate = `${(innerW - mx) / 2 - 200}px ${
      huby - 200 + innerH - 900
    }px`;
  } else {
    ska = innerW / mx;
    canvas.style.transform = `scale(${ska})`;
    canvas.style.translate = canvas.style.translate = `${
      (innerW - mx * ska) / 2
    }px 0px`;
    crtvas.style.transform = `scale(${ska})`;
    crtvas.style.translate = canvas.style.translate = `${
      (innerW - mx * ska) / 2
    }px 0px`;
    jySize(500, 10, mh + 10);
    buttons[3].style.translate = `${hubx + hubs + 100}px ${mh + 50}px`;
    buttons[1].style.translate = `${innerW - mx / 2 + 300}px ${mh + 500}px`;
    buttons[2].style.translate = `${innerW - mx / 2 + 120}px ${mh + 500}px`;
    buttons[0].style.translate = `${innerW - mx / 2 + 300}px ${mh + 300}px`;
  }
}

// PC port setup
function pcPort() {
  const buttons = document.getElementsByTagName("button");
  document.querySelector("#joyHub").remove();
  for (let i = buttons.length - 1; i >= 0; i--) {
    buttons[i].remove();
  }
  if (innerW < innerH) {
    if (innerW > mx) {
      ska = mx / innerW;
    } else {
      ska = innerW / mx;
    }
  } else {
    if (innerH > mh) {
      ska = mh / innerH;
    } else {
      ska = innerH / mh;
    }
  }

  canvas.style.transform = `scale(${ska})`;
  canvas.style.translate = `${(innerW - mx * ska) / 2}px ${
    (innerH - mh * ska) / 2
  }px`;
  crtvas.style.transform = `scale(${ska})`;
  crtvas.style.translate = `${(innerW - mx * ska) / 2 - 1}px ${
    -1 + (innerH - mh * ska) / 2
  }px`;
}

// Main input initialization
function jyM() {
  const kindow = document.querySelector("html");

  const screenResize = (X) => {
    if (X) {
      let innerD = innerH;
      innerH = innerW;
      innerW = innerD;
    }
    kindow.style.width = `${innerW}px`;
    kindow.style.height = `${innerH}px`;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      mobilePort();

      joyST = (e, VanillaJoystick) => {
        e.preventDefault();
        const joy = document.getElementById("joy");
        const hub = document.querySelector("#joyHub").style;
        PlayerBase[interZept].lstDir = PlayerBase[interZept].dire;

        log = [
          Math.floor(e.touches[0].clientX) - hubs / 6 - hubx,
          Math.floor(e.touches[0].clientY) - (9 * hubs) / 30 - huby,
        ];
        if (VanillaJoystick) {
          if (log[0] > hubs - hubs / 3) {
            log[0] = hubs - hubs / 3;
          }
          if (log[1] > hubs - hubs / 3) {
            log[1] = hubs - hubs / 3;
          }
          if (log[0] < 0) {
            log[0] = 0;
          }
          if (log[1] < 0) {
            log[1] = 0;
          }
          if (log[0] < hubs / 3 - hubs / 6) {
            joy.style.backgroundImage = "url('ui/fingL.png')";
          } else {
            joy.style.backgroundImage = "url('ui/fing.png')";
          }
          joy.style.translate = `${log[0]}px ${log[1]}px`;
          if (log[1] > hubs / 3 + ds) {
            PlayerBase[interZept].dire = "D";
          }
          if (log[1] < hubs / 3 - ds) {
            PlayerBase[interZept].dire = "U";
          }
          if (log[0] > hubs / 3 + ds) {
            if (log[1] > hubs / 3 + ds) {
              PlayerBase[interZept].dire = "DR";
            } else {
              if (log[1] < hubs / 3 - ds) {
                PlayerBase[interZept].dire = "UR";
              } else {
                PlayerBase[interZept].dire = "R";
              }
            }
          }
          if (hubs / 3 - ds < log[0] && log[0] < hubs / 3 + ds) {
            if (hubs / 3 - ds < log[1] && log[1] < hubs / 3 + ds) {
              PlayerBase[interZept].dire = "N";
            }
          }

          if (log[0] < hubs / 3 - ds) {
            if (log[1] > hubs / 3 + ds) {
              PlayerBase[interZept].dire = "DL";
            } else {
              if (log[1] < hubs / 3 - ds) {
                PlayerBase[interZept].dire = "UL";
              } else {
                PlayerBase[interZept].dire = "L";
              }
            }
          }
        }
      };

      joyEnd = () => {
        const joy = document.getElementById("joy");
        PlayerBase[interZept].dire = "N";
        log = [];
        joy.style.backgroundImage = "url('ui/fing.png')";
        joy.style.translate = `${hubs / 3}px ${hubs / 3}px`;
      };
    } else {
      pcPort();

      document.addEventListener("touchstart", (e) => e.preventDefault(), {
        passive: false,
      });

      const keybo = (doad) => {
        let kaka = 0;
        if (PlayerBase[interZept].is >= 0) {
          kaka = 1;
        }
        PlayerBase[interZept].lstDir = PlayerBase[interZept].dire;
        if (PlayerBase[interZept].keysDown.ArrowUp) {
          if (PlayerBase[interZept].keysDown.ArrowRight) {
            PlayerBase[interZept].dire = "UR";
          } else if (PlayerBase[interZept].keysDown.ArrowLeft) {
            PlayerBase[interZept].dire = "UL";
          } else {
            PlayerBase[interZept].dire = "U";
          }
        } else if (PlayerBase[interZept].keysDown.ArrowDown) {
          if (PlayerBase[interZept].keysDown.ArrowRight) {
            PlayerBase[interZept].dire = "DR";
          } else if (PlayerBase[interZept].keysDown.ArrowLeft) {
            PlayerBase[interZept].dire = "DL";
          } else {
            PlayerBase[interZept].dire = "D";
          }
        } else if (PlayerBase[interZept].keysDown.ArrowRight) {
          PlayerBase[interZept].dire = "R";
        } else if (PlayerBase[interZept].keysDown.ArrowLeft) {
          PlayerBase[interZept].dire = "L";
        } else {
          PlayerBase[interZept].dire = "N";
        }
        if (kaka && doad)
          PlayerBase[interZept].lstDir = PlayerBase[interZept].dire;
      };

      document.addEventListener("keyup", function (event) {
        switch (event.key) {
          case "ArrowRight":
            PlayerBase[interZept].keysDown.ArrowRight = 0;
            break;
          case "ArrowDown":
            PlayerBase[interZept].keysDown.ArrowDown = 0;
            break;
          case "ArrowLeft":
            PlayerBase[interZept].keysDown.ArrowLeft = 0;
            break;
          case "ArrowUp":
            PlayerBase[interZept].keysDown.ArrowUp = 0;
            break;
          case "Shift":
            if (PlayerBase[interZept].holdShft) {
              PlayerBase[interZept].shift = 0;
              PlayerBase[interZept].holdShft = 0;
            }
            break;
        }
        keybo(3);
      });

      window.addEventListener("blur", () => {
        PlayerBase[interZept].keysDown.ArrowUp = 0;
        PlayerBase[interZept].keysDown.ArrowLeft = 0;
        PlayerBase[interZept].keysDown.ArrowDown = 0;
        PlayerBase[interZept].keysDown.ArrowRight = 0;
      });

      document.addEventListener("keydown", function (event) {
        switch (event.key) {
          case "ArrowRight":
            PlayerBase[interZept].keysDown.ArrowRight = 1;
            break;
          case "ArrowDown":
            PlayerBase[interZept].keysDown.ArrowDown = 1;
            break;
          case "ArrowLeft":
            PlayerBase[interZept].keysDown.ArrowLeft = 1;
            break;
          case "ArrowUp":
            PlayerBase[interZept].keysDown.ArrowUp = 1;
            break;
          case "z":
            if (event.repeat) {
              return;
            } else {
              zfx();
            }
            break;
          case "x":
            if (event.repeat) {
              return;
            } else {
              xfx();
            }
            break;
          case "Shift":
            if (event.repeat) {
              PlayerBase[interZept].shift = 1;
              PlayerBase[interZept].holdShft = 1;
            } else {
              shiftFx();
            }
            break;
          case "c":
          case "C":
            if (event.repeat) return;
            cfx();
            break;
        }
        keybo();
      });
    }
  };

  screenResize();
  window.addEventListener("orientationchange", () => screenResize(1));
}
