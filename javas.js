document.addEventListener("DOMContentLoaded", () => {
// const boutons = document.querySelectorAll(".bouton");

document.querySelectorAll(".bouton-deroule").forEach(btn => {
  btn.addEventListener("click", () => {
    const box = btn.closest(".box-deroule");
    const int_box = box.querySelector(".int-box-deroule");

    // Ferme tous les autres
    document.querySelectorAll(".int-box-deroule").forEach(i => {
      if (i !== int_box) {
        i.classList.remove("open"); 
        const otherBtn = i.closest(".box-deroule").querySelector(".bouton-deroule p");
        otherBtn.textContent = "∨";}
    });

    // Ouvre / ferme celui cliqué
    int_box.classList.toggle("open");
     const icon = btn.querySelector("p");
    if (int_box.classList.contains("open")) {
      icon.textContent = "∧";  // ouvert
    } else {
      icon.textContent = "∨";  // fermé
    }
  });
});

//CURSEUR
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
  const el = document.elementFromPoint(e.clientX, e.clientY);

  const isInteractive = el?.closest("a, button, input, textarea, select");

  const cursor = document.getElementById("cursor");

  if (isInteractive) {
    cursor.style.display = "none"; // on laisse le curseur natif
  } else {
    cursor.style.display = "block";
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }
});

//COULEURS
const root = document.documentElement;

// Couleurs "logiques" choisies par l'utilisateur
// (jamais écrasées par le mode nuit : c'est la source de vérité)
const inputs = {
  c1: "sombre",
  c2: "clair",
  c3: "autre"
};

const defaults = {
  sombre: "#453A9B",
  clair: "#B8E6FE",
  autre: "#8C81E3"
};

// clé localStorage dédiée pour ne pas entrer en conflit avec d'anciennes clés CSS
const storageKey = key => `color_${key}`;

// valeurs actuelles en mémoire (claire/sombre/autre, indépendantes du thème)
const userColors = {};
Object.values(inputs).forEach(key => {
  const saved = localStorage.getItem(storageKey(key));
  userColors[key] = saved || defaults[key];
});

// Calcul des couleurs à afficher selon le thème
function getDisplayColors() {
  const isDark = root.getAttribute("data-theme") === "dark";
  if (!isDark) {
    return { ...userColors };
  }
  // En mode nuit : on inverse claire et sombre, "autre" reste inchangée
  return {
    sombre: userColors.clair,
    clair: userColors.sombre,
    autre: userColors.autre
  };
}

function applyDisplayColors() {
  const display = getDisplayColors();
  root.style.setProperty("--color_sombre", display.sombre);
  root.style.setProperty("--color_clair", display.clair);
  root.style.setProperty("--color_autre", display.autre);
}

// met à jour le choix logique de l'utilisateur, sauvegarde, puis ré-applique l'affichage
function setUserColor(key, value) {
  userColors[key] = value;
  localStorage.setItem(storageKey(key), value);
  applyDisplayColors();
}

// Gestion du mode nuit
function toggleTheme() {
  const isDark = root.getAttribute("data-theme") === "dark";
  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
  applyDisplayColors(); // recalcule l'affichage selon le nouveau thème
}

// restore theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  root.setAttribute("data-theme", "dark");
}

document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

// Initialisation des inputs couleur + écouteurs
Object.keys(inputs).forEach(id => {
  const key = inputs[id];
  const input = document.getElementById(id);
  if (input) input.value = userColors[key];
});

Object.keys(inputs).forEach(id => {
  const key = inputs[id];
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener("input", e => {
    setUserColor(key, e.target.value);
  });
});

// premier rendu (tient compte du thème déjà restauré)
applyDisplayColors();

// RESET
document.getElementById("reset").addEventListener("click", () => {
  Object.keys(defaults).forEach(key => {
    userColors[key] = defaults[key];
    localStorage.removeItem(storageKey(key));
    const inputId = Object.keys(inputs).find(k => inputs[k] === key);
    if (inputId) {
      const el = document.getElementById(inputId);
      if (el) el.value = defaults[key];
    }
  });
  applyDisplayColors();
});

// BOUTON PANNEAU COULEURS
const panel = document.getElementById("panel");
const toggle = document.getElementById("toggle");
toggle.addEventListener("click", () => {
  panel.style.display = panel.style.display === "flex" ? "none" : "flex";
});



//BOUTON MENU BURGER
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

// Ouvrir / fermer avec le bouton
burger.addEventListener("click", (e) => {
  e.stopPropagation(); // évite fermeture immédiate
  menu.classList.toggle("active");
});

// Fermer si clic ailleurs
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && e.target !== burger) {
    menu.classList.remove("active");
  }
});


console.log("JS chargé !");
//GESTION PDF

const modal = document.getElementById('pdfModal');
// const modalVid = document.getElementById('vidModal');
const iframe = document.getElementById('pdfFrame');
// const video = document.getElementById('mp4Frame');
// const source = document.getElementById('mp4Src');
const buttonsPDF = document.querySelectorAll('.open-pdf');
// const buttonsVID = document.querySelectorAll('.open-mp4');

// Pour chaque bouton
buttonsPDF.forEach(button => {
  button.addEventListener('click', () => {
    const pdfPath = button.getAttribute('data-pdf');
    const orientation = button.getAttribute('data-orientation');

    iframe.src = pdfPath;

    if (orientation === "landscape") {
      iframe.style.aspectRatio = "1.414 / 1"; // horizontal
    } else {
      iframe.style.aspectRatio = "1 / 1.414"; // vertical
    }

    modal.style.display = 'flex';
  });
});
// buttonsVID.forEach(button => {
//   button.addEventListener('click', () => {
//     const vidPath = button.getAttribute('data-mp4');

//     source.src = vidPath;
//     source.type = "video/mp4";
//     video.load(); 

//     modalVid.style.display = 'flex';
//   });
// });

  // Fermer la modale
  document.getElementById('closePdf').addEventListener('click', () => {
    modal.style.display = 'none';
    iframe.src = ''; // reset
  });
  // document.getElementById('closeVid').addEventListener('click', () => {
  //   modalVid.style.display = 'none';
  //   source.src = ''; // reset
  //   source.type = "video/mp4";
  //   video.load(); 
  // });

});


//GESTION GALERIE

const modal_gallery = document.getElementById("galleryModal");
const img = document.getElementById("galleryImage");
let images = [];
let current = 0;
let currentFolder = "";

document.querySelectorAll(".open-gallery").forEach(button => {
  button.addEventListener("click", async () => {
    currentFolder = button.dataset.folder;
    const response = await fetch(`medias/${currentFolder}/0.json`);
    images = await response.json();

    current = 0;
    img.src = `medias/${currentFolder}/${images[current]}`;
    modal_gallery.classList.add("active");
  });
});

// document.querySelector(".close").onclick = () => {
//     modal_gallery.classList.remove("active");
// };
document.getElementById('closeGall').addEventListener('click', () => {
  modal_gallery.classList.remove("active");
  images = [];
  current = 0;
  currentFolder = "";// reset
});

document.getElementById("next").onclick = () => {
    current = (current + 1) % images.length;
    img.src = `medias/${currentFolder}/${images[current]}`;
};

document.getElementById("prev").onclick = () => {
    current = (current - 1 + images.length) % images.length;
    img.src = `medias/${currentFolder}/${images[current]}`;
};

modal_gallery.onclick = (e) => {
    if (e.target === modal_gallery) {
        modal_gallery.classList.remove("active");
    }
};
