let log;
let int;
let vel = Pp1.v;
const joy = document.getElementById("joy");
const hub = document.querySelector("#joyHub").style;
//joyStyles
let joys = 100;
joy.style.height = `${joys}px`;
joy.style.width = `${joys}px`;
joy.style.backgroundColor = "rgb(113, 37,37)";
joy.style.textAlign = "center";
joy.style.color = "azure";
joy.style.translate = `${joys}px ${joys}px`;
//hubStyle
let hubx = 200,
  huby = 700,
  hubs = 300;
hub.opacity = "40%";
hub.border = "double 15px white";
hub.backgroundColor = "gray";
hub.height = `${hubs}px`;
hub.width = `${hubs}px`;
hub.translate = `${hubx}px ${huby}px`;
hub.position = "absolute";
hub.zIndex = "3";
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
      if (log[1] > 90) {
        Pp1.y = Pp1.y + Pp1.vel;
        joy.innerHTML = "D";
      }
      if (log[1] < 40) {
        Pp1.y = Pp1.y - Pp1.vel;
        joy.innerHTML = "U";
      }
      if (log[0] > 90) {
        if (log[1] > 90) {
          Pp1.x = Pp1.x + Pp1.vel * 0.707;
          Pp1.y = Pp1.y + Pp1.vel * 0.707;
          joy.innerHTML = "DR";
        } else {
          if (log[1] < 40) {
            Pp1.x = Pp1.x + Pp1.vel * 0.707;
            Pp1.y = Pp1.y - Pp1.vel * 0.707;
            joy.innerHTML = "UR";
          } else {
            Pp1.x = Pp1.x + Pp1.vel;
            joy.innerHTML = "R";
          }
        }
      }
      if (40 < log[0] && log[0] < 90) {
        if (40 < log[1] && log[1] < 90) {
          joy.innerHTML = "N";
        }
      }

      if (log[0] < 40) {
        if (log[1] > 90) {
          Pp1.x = Pp1.x - Pp1.vel * 0.707;
          Pp1.y = Pp1.y + Pp1.vel * 0.707;
          joy.innerHTML = "DL";
        } else {
          if (log[1] < 40) {
            Pp1.x = Pp1.x - Pp1.vel * 0.707;
            Pp1.y = Pp1.y - Pp1.vel * 0.707;
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
  log = [50, 50];
  clearInterval(int);
  joy.style.translate = `${joys}px ${joys}px`;
};
