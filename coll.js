let Radius = 50,
  n = 1,
  G = -2,
  vG = 0,
  colors = ["darkRed", "brown", "darkGreen", "green", "darkBlue", "blue"];
c.lineWidth = 4;
class circle {
  constructor() {
    this.x = rand(mx);
    this.y = rand(mh);
    this.vBlx = 15;
    this.vBly = 15;
    this.color = colors[Math.round(Math.random() * (colors.length - 1))];
    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, Radius, 0, 6.28);
      c.fillStyle = this.color;
      c.fill();
      c.stroke();
    };
  }
}
function rand(a) {
  let pepe = 0;
  while (pepe < Radius || pepe > a - Radius) {
    pepe = Math.floor(Math.random() * a);
  }
  return pepe;
}
let cir = [],
  i;
for (i = 0; i < n; i++) {
  cir.push(new circle());
}
i = 0;
let draw = setInterval(function () {
  c.clearRect(0, 0, mx, mh);
  while (i < n) {
    if (cir[i].x < Radius || cir[i].x > mx - Radius) {
      cir[i].vBlx = -cir[i].vBlx;
    }
    cir[i].x += cir[i].vBlx;
    if (cir[i].y < Radius || cir[i].y > mh - Radius) {
      cir[i].vBly = -cir[i].vBly;
    }
    cir[i].y += cir[i].vBly;
    cir[i].draw();
    i++;
  }
  i = 0;
  //player border
  vG = vG - G;
  Pp1.y = Pp1.y + vG;
  if (Pp1.x > mx - Pp1.w) {
    Pp1.x = mx - Pp1.w;
  }
  if (Pp1.y > mh - Pp1.h) {
    Pp1.y = mh - Pp1.h;
    vG = 0;
  }
  if (Pp1.x < 0) {
    Pp1.x = 0;
  }
  if (Pp1.y < 0) {
    Pp1.y = 0;
  }
  c.fillStyle = "purple";
  c.fillRect(Pp1.x, Pp1.y, Pp1.w, Pp1.h);
  c.strokeRect(Pp1.x, Pp1.y, Pp1.w, Pp1.h);
}, 100);
