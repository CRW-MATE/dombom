// ============================================
// MAIN GAME LOOP & INITIALIZATION
// ============================================

const initGame = () => {
  // Set player base template
  Zst.color = images.Pp1;
  PlayerBase = [new Player()];
  
  // Load world from storage
  loadWorldFromStorage();

  // Setup input system
  window.addEventListener("load", () => {
    jyM();
  });

  // Main game loop (40ms tick)
  setInterval(() => {
    // Update world if room changed
    if (world && world.entities && PlayerBase[interZept].room !== world.currentRoom) {
      world = getDefaultScenes()[PlayerBase[interZept].room];
      world.currentRoom = PlayerBase[interZept].room;
    }

    if (menuMode == true) {
      menu();
    } else {
      if (PlayerBase[interZept].timeRatekoff) {
        PlayerBase[interZept].is = -1;
        movemento(PlayerBase[interZept]);
      }
      world.collis(PlayerBase[interZept]);

      if (!PlayerBase[interZept].timeRatekoff) {
        pause_menu();
      }
      c.fillStyle = `rgba(0,0,0,${
        ((PlayerBase[interZept].time / 255) *
          (100 - PlayerBase[interZept].lum)) /
          100 -
        0.2
      })`;
      for (let hb = 0; hb < PlayerBase.length && hitBoxToggle; hb++) {
        HitBox(PlayerBase[hb]);
      }
      
      // Scene-specific logic
      switch (PlayerBase[interZept].room) {
        case 0:
          if (PlayerBase[interZept].room == 0) {
            let oppaVel = 0.07;
            let seekl = 9;
            if (world.entities[seekl].YesDraw) {
              world.entities[seekl - 2].YesDraw = 0;
              if (world.entities[seekl - 3].oppa > 0) {
                world.entities[seekl - 3].oppa -= oppaVel;
              }
            } else {
              c.fillStyle = "rgba(0, 0, 0, 0.2)";
              if (world.entities[seekl - 3].oppa < 1) {
                world.entities[seekl - 3].oppa += oppaVel;
              }
            }
            world.entities[seekl - 3].color = `rgba(0,0,0,${
              world.entities[seekl - 3].oppa
            })`;
          } else {
            world.entities[seekl - 2].YesDraw = 1;
          }

          world.entities[11].dd = `   you need an axe to cut\n   the log head to the woods\n   press "up" when on the\n   path`;

          break;
        case 1:
          if (PlayerBase[interZept].timeRatekoff) {
            doanim(world.entities[1], [0, 0, 0, 0, 0, 0, 0], 0, 0, 4, 0);
          }
          break;
        case 2:
          break;
        case 3:
          break;
      }

      // CRT effects
      if (PlayerBase[interZept].crtty) {
        crtDash();
        crtOverlay();
      }
    }
  }, 40);
};

// Start the game when assets are loaded
Promise.allSettled(loadAssets()).then(() => {
  document.getElementById("white").remove();
  initGame();
});
