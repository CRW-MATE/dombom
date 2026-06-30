// ============================================
// UTILITY FUNCTIONS
// ============================================

// Calculate distance between two objects
const distem = (A, B) => {
  return Math.hypot(
    A.x + A.w / 2 - (B.x + B.w / 2),
    A.y + A.h / 2 - (B.y + B.h / 2),
  );
};

// Draw detection circle (stealth visualization)
function dCC(color, obj, dist) {
  if (!PlayerBase[interZept].StealthVisuals) return;
  const cx = obj.x + obj.w / 2;
  const cy = obj.y + obj.h / 2;
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

// Draw arc segment (vision cone)
const arcSeg = (obj, radius, angleDeg) => {
  const ox = obj.x + obj.w / 2 - PlayerBase[interZept].xc;
  const oy = obj.y + obj.h / 2 - PlayerBase[interZept].yc;
  const angleRad = (angleDeg * Math.PI) / 180;

  c.beginPath();
  c.moveTo(ox, oy);
  c.arc(ox, oy, radius, 0, angleRad, false);
  c.closePath();

  c.strokeStyle = "red";
  c.lineWidth = 3;
  c.stroke();
};

// Draw hitbox (collision debug)
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

// Random number generator
function rand(a, b) {
  let pepe = 0;
  while (pepe <= a || pepe > b) {
    pepe = Math.round(Math.random() * b);
  }
  return pepe;
}

// Execute one-time functions
function onetimers(a) {
  new Function("return " + a);
}
