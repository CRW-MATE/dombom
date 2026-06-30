// ============================================
// GLOBAL STATE & VARIABLES
// ============================================
// Canvas & rendering
const canvas = document.getElementById("canvas");
const crtvas = document.getElementById("crtvas");
const c = canvas.getContext("2d");
const crt = crtvas.getContext("2d");

// Screen dimensions
let mx = 1000;
let mh = 800;
let ska = 1;

// Game state
let PlayerBase = [];
let interZept = 0;
let world;
let menuMode = true;
let hitBoxToggle = 1;
let Answer = 0;
let mainVel = 0;
let waitHotSause = 1;
let resetDialog = "reset";
let dynamicStorage = 1;
let Gamestarting = 0;

// Player template
const Zst = {
  color: null, // Set during asset load
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
};

// Images object
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

// Dialog state
const dialog = {
  text: "nothing yet",
  SpX: 0,
  SpY: 0,
  sw: 0,
  sh: 0,
};

// Input state for joystick
let hubs, hubx, huby;
let joyST, joyEnd;
let innerH = window.visualViewport.height;
let innerW = window.visualViewport.width;
let log, ds, i;

// Setup canvas styles
canvas.style.transformOrigin = "top left";
crtvas.style.transformOrigin = "top left";
canvas.height = mh;
canvas.width = mx;
crtvas.height = mh + 1;
crtvas.width = mx + 1;
c.imageSmoothingEnabled = false;
crt.imageSmoothingEnabled = false;
