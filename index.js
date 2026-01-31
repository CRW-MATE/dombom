//loading imgs logic when all is loaded the .then block is executed
Promise.allSettled(promises)
  .then(() => {
    document.getElementById("white").remove();
    if (
      localStorage.world == "" ||
      localStorage.world === undefined ||
      localStorage.world === "[]"
    ) {
      ////////////////||
      localStorage.world = `[
        //scene 0
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
         new platform(1600,0,150,mh,"break",256,64,0,200),
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
              new entity(1150, 661, "02","the forest's east from here"),
              new entity(1500, 661, "03",
              "07"),
            new door(1900, 400, 1, 0, 200, 730),


          ],
          1600,
          2,
          "ycz"
        ),
        //scene 1
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
        ///-------------------------------
        //scene 2
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
              mx/2,
              0,
              9,
              3
            ),
            new platform(-200, 750, 2500, 200, 0, 800, 800),
            new door(-200, 500, 0, 0, 1400, 700),
                      
            new effect(
              images.bkpatAmb,
              0,
              mh,
              250,
              290,
              "full",
              0,
              0,
              mx/2,
              0,
              9,
              3
            ),
          ],
          2000,
          2,
          "ycz"
        ),
        ///-------------------------------
        //test scene
        new scene(
          [
            new platform(0, 0, 2000, 2000, "floor", 384, 0, 100, 100),
            new door(198, 201, 0, 1, 1400, 700),
            new entity(mx, mh / 2, "01"),
          ],
          300,
          0,
          300
        ),
      ]`;
      console.log("loaded in");
    }

    try {
      // compile the string into a function and run it
      const worldFn = new Function("return " + localStorage.world);
      let worldArray = worldFn();

      if (!Array.isArray(worldArray)) {
        throw new Error("World did not return an array");
      }

      world = worldArray[PlayerBase[interZept].room];
      if (!world) {
        throw new Error(
          "Scene not found: PlayerBase[interZept].room=" +
            PlayerBase[interZept].room,
        );
      }
    } catch (err) {
      console.error("Failed to load world:", err);
      if (err.message == "World did not return an array") {
        alert(
          "Empty world buffer detected \n refresh the page to set the buffer appropriately ",
        );
      } else {
        alert("World load error:\n" + err.message);
      }
      localStorage.world = [];
    }

    window.addEventListener("load", () => {
      jyM();
    });

    setInterval(
      () => {
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
          }

          if (PlayerBase[interZept].timeRatekoff) {
            c.fillRect(0, 0, mx, mh);
          }
        }

        if (PlayerBase[interZept].crtty) {
          crtOverlay();
        }
      },
      250 * Math.abs(PlayerBase[interZept].timeRate),
    );
  })
  .catch((err) => {
    console.log(err);
  });
