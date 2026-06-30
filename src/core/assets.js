// ============================================
// ASSET LOADING SYSTEM
// ============================================

let promises = [];

const loadAssets = () => {
  promises = [];
  let keys = Object.keys(images);

  for (let key of keys) {
    let isUI = key.endsWith("U"),
      folder,
      file;
    if (isUI) {
      folder = "ui";
      file = key.slice(0, -1);
    } else {
      folder = "art";
      file = key;
    }

    images[key].src = `${folder}/${file}.png`;

    let promx = new Promise((resolve, reject) => {
      images[key].onload = () => {
        resolve(images[key]);
      };
      images[key].onerror = () => reject(images[key]);
    });

    promises.push(promx);
  }

  return promises;
};
