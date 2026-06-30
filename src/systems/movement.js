// ============================================
// PLAYER MOVEMENT SYSTEM
// ============================================

const movemento = (obj) => {
  if (obj.state == "crouching") {
    obj.look == "R"
      ? PlayerBase[interZept].animations.CTR.do()
      : PlayerBase[interZept].animations.CTL.do();
    obj.velX = 0;
    obj.velY = 0;
    return;
  } else if (obj.state == "crouch") {
    if (obj.dire == "R") {
      obj.velX = 5;
      obj.velY = 0;
    } else if (obj.dire == "L") {
      obj.velX = -5;
      obj.velY = 0;
    } else if (obj.dire == "U" && !obj.G) {
      obj.velY = 5;
      obj.velX = 0;
    } else if (obj.dire == "D" && !obj.G) {
      obj.velY = -5;
      obj.velX = 0;
    } else if (obj.dire == "DR") {
      if (!obj.G) {
        obj.velY = -5;
      }
      obj.velX = 3;
    } else if (obj.dire == "DL") {
      if (!obj.G) {
        obj.velY = -5;
      }
      obj.velX = -3;
    } else if (obj.dire == "UL") {
      if (!obj.G) {
        obj.velY = 5;
      }
      obj.velX = -5;
    } else if (obj.dire == "UR") {
      if (!obj.G) {
        obj.velY = 5;
      }
      obj.velX = 5;
    } else {
      obj.velY = 0;
      obj.velX = 0;
    }
    if (
      obj.dire !== "N" ||
      (obj.dire == "D" && obj.G) ||
      (obj.dire == "U" && obj.G)
    ) {
      obj.look == "R"
        ? PlayerBase[interZept].animations.CWR.do()
        : PlayerBase[interZept].animations.CWL.do();
    } else {
      obj.look == "R"
        ? PlayerBase[interZept].animations.CNR.do()
        : PlayerBase[interZept].animations.CNL.do();
    }
    return;
  } else if (obj.state == "sprinting") {
    obj.velX = 12;
    obj.animations.SL.do();
    if (obj.frame == 1) {
      obj.sSs++;
    }
    if (obj.sSs == 8) {
      obj.state = "sprintingM";
    }
  } else if (obj.state == "sprintingM") {
    obj.velX = 14;
    obj.animations.SLM.do();
  } else if (obj.state == "gtjump" && obj.G) {
    obj.velX *= 0.9;
    obj.look == "R"
      ? PlayerBase[interZept].animations.GTJR.do()
      : PlayerBase[interZept].animations.GTJL.do();
  } else if (obj.state == "jumping" && obj.G) {
    obj.look == "R"
      ? PlayerBase[interZept].animations.JR.do()
      : PlayerBase[interZept].animations.JL.do();
    if (obj.dire == "R") {
      obj.velX = 3;
    } else if (obj.dire == "L") {
      obj.velX = -3;
    }
  } else if (obj.state == "pain") {
    obj.velX = -10 * (20 / obj.hp);
    obj.animations.P.do();
    if (obj.frame == 15) {
      obj.rand = rand(0, 3);
      obj.state = "";
      if (obj.hp == 0) {
      }
    }
  } else {
    if (
      obj.dire === "R" ||
      (obj.lstSta == 12 &&
        obj.lstDir === "R" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      obj.velX = 7;
      obj.velY = 0;
      obj.look = "R";
      PlayerBase[interZept].animations.WR.do();
      obj.lstDir = "R";
    } else if (
      obj.dire === "L" ||
      (obj.lstSta == 13 &&
        obj.lstDir === "L" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      obj.velX = -7;
      obj.velY = 0;
      obj.look = "L";
      PlayerBase[interZept].animations.WL.do();
      obj.lstDir = "L";
    } else if (obj.dire === "U") {
      if (!PlayerBase[interZept].G) {
        obj.velY = 7;
        obj.look = "U";
        PlayerBase[interZept].animations.WU.do();
      }
      obj.velX = 0;
    } else if (obj.dire === "D") {
      if (!PlayerBase[interZept].G) {
        obj.velY = -7;
        obj.look = "D";
        PlayerBase[interZept].animations.WD.do();
      }
      obj.velX = 0;
    } else if (
      obj.dire === "DL" ||
      (obj.lstSta == 13 &&
        obj.lstDir === "DL" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      if (!PlayerBase[interZept].G) {
        obj.velY = -7;
      }
      PlayerBase[interZept].animations.WL.do();
      obj.lstDir = "DL";
      obj.velX = -7;
      obj.look = "L";
    } else if (
      obj.dire === "DR" ||
      (obj.lstSta == 12 &&
        obj.lstDir === "DR" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      if (!PlayerBase[interZept].G) {
        obj.velY = -7;
      }
      PlayerBase[interZept].animations.WR.do();
      obj.velX = 7;
      obj.lstDir = "DR";
      obj.look = "R";
    } else if (
      obj.dire === "UL" ||
      (obj.lstSta == 13 &&
        obj.lstDir === "UL" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      if (!PlayerBase[interZept].G) {
        obj.velY = 7;
      }
      PlayerBase[interZept].animations.WL.do();
      obj.velX = -7;
      obj.lstDir = "UL";
      obj.look = "L";
    } else if (
      obj.dire === "UR" ||
      (obj.lstSta == 12 &&
        obj.lstDir === "UR" &&
        obj.dire == "N" &&
        obj.AnchorAnim == true)
    ) {
      if (!PlayerBase[interZept].G) {
        obj.velY = 7;
      }
      PlayerBase[interZept].animations.WR.do();
      obj.velX = 7;
      obj.lstDir = "UR";
      obj.look = "R";
    } else {
      if (PlayerBase[interZept].velX !== 0) {
        if (PlayerBase[interZept].look == "R") {
          PlayerBase[interZept].velX -= 1;
          if (PlayerBase[interZept].velX < 0) {
            PlayerBase[interZept].velX = 0;
          }
        } else if (PlayerBase[interZept].look == "L") {
          PlayerBase[interZept].velX += 1;
          if (PlayerBase[interZept].velX > 0) {
            PlayerBase[interZept].velX = 0;
          }
        }
      }
      if (PlayerBase[interZept].look == "R") {
        PlayerBase[interZept].animations.NR.do();
      } else if (PlayerBase[interZept].look == "L") {
        PlayerBase[interZept].animations.NL.do();
      } else if (PlayerBase[interZept].look == "D") {
        PlayerBase[interZept].animations.ND.do();
      } else if (PlayerBase[interZept].look == "U") {
        PlayerBase[interZept].animations.NU.do();
      }
      if (!PlayerBase[interZept].G) {
        obj.velY = 0;
      }
    }
  }
};
