const canvas = document.getElementById("canvas");
const crtvas = document.getElementById("crtvas");
canvas.style.transformOrigin = "top left";
crtvas.style.transformOrigin = "top left";
const c = canvas.getContext("2d");
const crt = crtvas.getContext("2d");
let innerH = window.visualViewport.height;
let innerW = window.visualViewport.width;
c.imageSmoothingEnabled = false;
crt.imageSmoothingEnabled = false;
const kindow = document.querySelector("html");
let mx = 1000;
let mh = 800;
let ska = 1;
canvas.height = mh;
canvas.width = mx;
crtvas.height = mh + 1;
crtvas.width = mx + 1;

let innerD;
let log;
let int;
let ds;
const joy = document.getElementById("joy");
const hub = document.querySelector("#joyHub").style;
//hubStyle
hub.position = "absolute";
hub.backgroundImage = "url('ui/joyhub.png')";
hub.backgroundSize = "cover";
hub.zIndex = "2";
document.getElementById("white").style.zIndex = "4";
//hubs/3tyles
joy.style.textAlign = "center";
joy.style.backgroundImage = "url('ui/fing.png')";
joy.style.backgroundSize = "cover";
//hubs/3tick apperance "nub border amd main loop for input"
let hubs, hubx, huby;
const buttons = document.getElementsByTagName("button");
const jySize = (a, b, c) => {
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

    a.fontSize = `${100 + (1 - buttons[i].textContent.length) * 10}px`;
  }
};
let joyST, joyEnd;
function mobilePort() {
  if (innerW >= innerH) {
    canvas.style.translate = `${(innerW - mx) / 2}px`;
    canvas.style.transform = `scale(1)`;
    crtvas.style.translate = `${(innerW - mx) / 2}px`;
    crtvas.style.transform = `scale(1)`;
    //////////////////////////////////
    jySize(450, 10, (1 / 3) * mh - 50);
    //////////////////////////////////
    buttons[0].style.translate = `${innerW - mx / 2 + 50}px ${
      250 + innerH - 900
    }px`;
    buttons[1].style.translate = `${innerW - mx / 2 + 300}px ${
      400 + innerH - 900
    }px`;
    buttons[2].style.translate = `${innerW - mx / 2 + 50}px ${
      550 + innerH - 900
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
    /////////////////////////
    jySize(500, 10, mh + 100);
    //////////////////////////
    buttons[3].style.translate = `${hubx + hubs + 100}px ${mh + 100}px`;
    buttons[1].style.translate = `${innerW - mx / 2 + 300}px ${huby + hubs}px`;
    buttons[2].style.translate = `${innerW - mx / 2 + 50}px ${
      huby + hubs + 100
    }px`;
    buttons[0].style.translate = `${innerW - mx / 2 + 300}px ${
      huby + hubs + 250
    }px`;
  }
}

function pcPort() {
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

function jyM() {
  const screenResize = (X) => {
    if (X) {
      innerD = innerH;
      innerH = innerW;
      innerW = innerD;
    }
    kindow.style.width = `${innerW}px`;
    kindow.style.height = `${innerH}px`;
    if (/Android/i.test(navigator.userAgent)) {
      mobilePort();

      joyST = (e, VanillaJoystick) => {
        e.preventDefault();
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
          joy.style.translate = `${log[0]}px  
${log[1]}px`;
          if (log[1] > hubs / 3 + ds) {
            PlayerBase[interZept].dire = "D";
            // joy.innerHTML = "D";
          }
          if (log[1] < hubs / 3 - ds) {
            PlayerBase[interZept].dire = "U";
            //joy.innerHTML = "U";
          }
          if (log[0] > hubs / 3 + ds) {
            if (log[1] > hubs / 3 + ds) {
              PlayerBase[interZept].dire = "DR";
              //joy.innerHTML = "DR";
            } else {
              if (log[1] < hubs / 3 - ds) {
                PlayerBase[interZept].dire = "UR";
                //joy.innerHTML = "UR";
              } else {
                PlayerBase[interZept].dire = "R";
                // joy.innerHTML = "R";
              }
            }
          }
          if (hubs / 3 - ds < log[0] && log[0] < hubs / 3 + ds) {
            if (hubs / 3 - ds < log[1] && log[1] < hubs / 3 + ds) {
              //joy.innerHTML = "N";
              PlayerBase[interZept].dire = "N";
            }
          }

          if (log[0] < hubs / 3 - ds) {
            if (log[1] > hubs / 3 + ds) {
              PlayerBase[interZept].dire = "DL";
              //joy.innerHTML = "DL";
            } else {
              if (log[1] < hubs / 3 - ds) {
                PlayerBase[interZept].dire = "UL";
                //joy.innerHTML = "UL";
              } else {
                PlayerBase[interZept].dire = "L";
                //joy.innerHTML = "L";
              }
            }
          }
        } else {
        }
      };

      joyEnd = () => {
        //joy.innerHTML = "N";
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
      //////////////////////
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
      //////////////////keybo
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
            //PlayerBase[interZept].dire = "U";
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
        keybo(0);
      });
      ///////////////////////////////////////////////
    }
  };
  screenResize();
  screen.orientation.addEventListener("change", () => {
    screenResize(1);
  });
}
