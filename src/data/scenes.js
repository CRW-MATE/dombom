// ============================================
// SCENE DEFINITIONS
// ============================================

const getDefaultScenes = () => {
  return [
    // Scene 0
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
        new door(1350, 500, 2, 1, 200, 700),
        new effect(
          images.pathTTUT,
          1120,
          710,
          64,
          104,
          "full",
          0,
          0,
          0,
          0,
          10,
          2.2
        ),
        new platform(1600, 0, 150, mh, "break", 256, 64, 0, 200),
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
        new entity(1150, 661, "02", "the forest's east from here"),
        new entity(1500, 661, "03", "07"),
        new door(1900, 400, 1, 0, 200, 730),
      ],
      1600,
      2,
      "ycz"
    ),

    // Scene 1
    new scene(
      [
        new platform(0, 730, 1152, 200, 0, 900, 900, 0, 100, 100),
        new effect(
          images.bkpat01,
          -50,
          800,
          256,
          49,
          "snip",
          0,
          59,
          0,
          0,
          4.5,
          258
        ),
        new door(-100, 500, 0, 0, 1400, 700),
        new entity(mx - 50, 700, "01"),
      ],
      1600,
      2,
      "ycz"
    ),

    // Scene 2
    new scene(
      [
        new effect(
          images.bkpat02,
          0,
          mh,
          250,
          290,
          "full",
          0,
          0,
          mx / 2,
          0,
          9,
          3
        ),
        new platform(-200, 750, 2500, 200, 0, 800, 800),
        new door(-200, 500, 0, 0, 1400, 700),
        new door(2000, 500, 3, 0, 100, 500),
        new effect(
          images.bkpatAmb,
          0,
          mh,
          250,
          290,
          "full",
          0,
          0,
          mx / 2,
          0,
          9,
          3
        ),
      ],
      2000,
      2,
      "ycz"
    ),

    // Scene 3
    new scene(
      [
        new door(-200, 201, 0, 1, 1400, 700),
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
          3
        ),
        new effect("rgb(70,185,127,1)", 0, mh - 300, 7000, 300),
        new entity(mx, mh / 2, "01"),
      ],
      7000,
      0,
      200
    ),
  ];
};

const loadWorldFromStorage = () => {
  // For now, always use default scenes
  // TODO: Implement proper save/load system
  world = getDefaultScenes()[PlayerBase[interZept].room];
  world.currentRoom = PlayerBase[interZept].room;
  
  if (!world) {
    console.error("Scene not found, using fallback");
    world = getDefaultScenes()[0];
    world.currentRoom = 0;
  }
};
