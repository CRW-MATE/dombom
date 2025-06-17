let innerH = window.innerHeight;
let innerW = window.innerWidth;
let mh;
let mx;
let innerD;
let log;
let int;
let ds;
let dire = "N";
const joy = document.getElementById("joy");
const hub = document.querySelector("#joyHub").style;
//hubStyle
hub.position = "absolute";
hub.backgroundImage = "url('ui/joyhub.png')";
hub.backgroundSize = "cover";
hub.zIndex = "3";
let Alp = ["A", "B", "C", "D"];
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
  hub.translate = `${b}px ${c}px`;
  joy.style.translate = `${a / 3}px ${a / 3}px`;
  for (i = 0; i < buttons.length; i++) {
    let a = buttons[i].style;
    a.backgroundImage = `url("ui/${Alp[i]}.png")`;
    a.backgroundSize = "cover";
    a.backgroundColor = "rgba(0,0,0, 0)";
    a.margin = "0px";
    a.padding = "0px";
    a.border = "0px";
    a.height = `150px`;
    a.width = `150px`;
    a.position = "absolute";
    a.zIndex = "3";
    a.textAlign = "center";
    a.userSelect = "none";
    a.fontSize = " 100px";
  }
};
const joyST = (e) => {
  e.preventDefault();
  log = [
    Math.floor(e.touches[0].clientX) - hubs / 6 - hubx,
    Math.floor(e.touches[0].clientY) - (9 * hubs) / 30 - huby,
  ];
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
    dire = "D";
    // joy.innerHTML = "D";
  }
  if (log[1] < hubs / 3 - ds) {
    dire = "U";
    //joy.innerHTML = "U";
  }
  if (log[0] > hubs / 3 + ds) {
    if (log[1] > hubs / 3 + ds) {
      dire = "DR";
      //joy.innerHTML = "DR";
    } else {
      if (log[1] < hubs / 3 - ds) {
        dire = "UR";
        //joy.innerHTML = "UR";
      } else {
        dire = "R";
        // joy.innerHTML = "R";
      }
    }
  }
  if (hubs / 3 - ds < log[0] && log[0] < hubs / 3 + ds) {
    if (hubs / 3 - ds < log[1] && log[1] < hubs / 3 + ds) {
      //joy.innerHTML = "N";
      dire = "N";
    }
  }

  if (log[0] < hubs / 3 - ds) {
    if (log[1] > hubs / 3 + ds) {
      dire = "DL";
      //joy.innerHTML = "DL";
    } else {
      if (log[1] < hubs / 3 - ds) {
        dire = "UL";
        //joy.innerHTML = "UL";
      } else {
        dire = "L";
        //joy.innerHTML = "L";
      }
    }
  }
};

const joyEnd = () => {
  //joy.innerHTML = "N";
  dire = "N";
  log = [];
  joy.style.backgroundImage = "url('ui/fing.png')";
  joy.style.translate = `${hubs / 3}px ${hubs / 3}px`;
};
const button = (a, b) => {
  if (b) {
    buttons[a].style.backgroundImage = `url("ui/${Alp[a]}1.png")`;
  } else {
    buttons[a].style.backgroundImage = `url("ui/${Alp[a]}.png")`;
  }
};
const screenResize = (X) => {
  /*  if (X) {
    innerD = innerH;
    innerH = innerW;
    innerW = innerD;
  }
  if (innerW >= innerH) {*/
  mh = 800;
  mx = 1000;
  jySize(450, 10, (1 / 3) * mh - 50);
  buttons[0].style.translate = `${innerW - mx / 2 + 50}px ${250}px`;
  buttons[1].style.translate = `${innerW - mx / 2 + 300}px ${400}px`;
  buttons[2].style.translate = `${innerW - mx / 2 + 50}px ${550}px`;
  buttons[3].style.translate = `${(innerW - mx) / 2 - 200}px ${huby - 200}px`;
  /* } else {
    mx = 1000;
    mh = 800;
    jySize(500, 10, mh + 100);
    buttons[3].style.translate = `${hubx + hubs + 100}px ${mh + 100}px`;
    buttons[1].style.translate = `${innerW - mx / 2 + 300}px ${huby + hubs}px`;
    buttons[2].style.translate = `${innerW - mx / 2 + 50}px ${
      huby + hubs + 100
    }px`;
    buttons[0].style.translate = `${innerW - mx / 2 + 300}px ${
      huby + hubs + 250
    }px`;
  }*/

  kindow.style.width = `${innerW}px`;
  kindow.style.height = `${innerH}px`;

  canvas.style.translate = `${(innerW - mx) / 2}px`;
  canvas.height = mh;
  canvas.width = mx;
};
