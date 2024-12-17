let log;
let int;
let ds = 45;
const joy = document.getElementById("joy");
const hub = document.querySelector("#joyHub").style;
//hubStyle
let hubx = 18,
  huby = 0,
  hubs = 300;
hub.opacity = "40%";
hub.border = "double 15px white";
hub.backgroundColor = "gray";
hub.height = `${hubs}px`;
hub.width = `${hubs}px`;
hub.translate = `${hubx}px ${huby}px`;
hub.position = "absolute";
hub.zIndex = "3";
//joyStyles
let joys = 90;
joy.style.height = `${joys}px`;
joy.style.width = `${joys}px`;
joy.style.backgroundColor = "rgb(113, 37,37)";
joy.style.textAlign = "center";
joy.style.color = "azure";
joy.style.translate = `${hubs / 3}px ${hubs / 3}px`;
//joystick apperance "nub border amd main loop for input"
const joyST = (e, xrc) => {
  log = [
    Math.floor(e.touches[0].clientX) - joys - hubx,
    Math.floor(e.touches[0].clientY) - joys - huby,
  ];
  if (log[0] > hubs - joys) {
    log[0] = hubs - joys;
  }
  if (log[1] > hubs - joys) {
    log[1] = hubs - joys;
  }
  if (log[0] < 0) {
    log[0] = 0;
  }
  if (log[1] < 0) {
    log[1] = 0;
  }
  joy.style.translate = `${log[0]}px  
${log[1]}px`;
  if (xrc == 2) {
    int = setInterval(function () {
      if (log[1] > hubs - joys - ds) {
        //  Pp1.y = Pp1.y + Pp1.ver;
        joy.innerHTML = "D";
      }
      if (log[1] < joys - ds) {
        // Pp1.y = Pp1.y - Pp1.ver;
        joy.innerHTML = "U";
      }
      if (log[0] > hubs - joys - ds) {
        if (log[1] > hubs - joys - ds) {
          Pp1.x = Pp1.x + Pp1.vel * 0.707;
          Pp1.y = Pp1.y + Pp1.vel * 0.707;
          joy.innerHTML = "DR";
        } else {
          if (log[1] < joys - ds) {
            Pp1.x = Pp1.x + Pp1.vel * 0.707;
            //Pp1.y = Pp1.y - Pp1.vel * 0.707;
            joy.innerHTML = "UR";
          } else {
            Pp1.x = Pp1.x + Pp1.vel;
            joy.innerHTML = "R";
          }
        }
      }
      if (joys - ds < log[0] && log[0] < hubs - joys - ds) {
        if (joys - ds < log[1] && log[1] < hubs - joys - ds) {
          joy.innerHTML = "N";
        }
      }

      if (log[0] < joys - ds) {
        if (log[1] > hubs - joys - ds) {
          Pp1.x = Pp1.x - Pp1.vel * 0.707;
          //Pp1.y = Pp1.y + Pp1.vel * 0.707;
          joy.innerHTML = "DL";
        } else {
          if (log[1] < joys - ds) {
            Pp1.x = Pp1.x - Pp1.vel * 0.707;
            //Pp1.y = Pp1.y - Pp1.vel * 0.707;
            joy.innerHTML = "UL";
          } else {
            Pp1.x = Pp1.x - Pp1.vel;
            joy.innerHTML = "L";
          }
        }
      }
    }, 100);
  }
};

const joyEnd = () => {
  joy.innerHTML = "N";
  log = [];
  vG = 0;
  clearInterval(int);
  joy.style.translate = `${hubs / 3}px ${hubs / 3}px`;
};
//buttons postition and styles
const buttons = document.getElementsByClassName("butt");
for (i = 0; i < buttons.length; i++) {
  let a = buttons[i].style;
  a.opacity = "40%";
  a.border = "double 15px white";
  a.backgroundColor = "gray";
  a.height = `${150}px`;
  a.width = `${150}px`;
  a.translate = `${hubx}px ${huby}px`;
  a.position = "absolute";
  a.zIndex = "3";
}
buttons[0].style.translate = `600px 10px`;
buttons[1].style.translate = `800px 10px`;
buttons[2].style.translate = `600px 160px`;
buttons[3].style.translate = `800px 160px`;
