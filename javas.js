
// const boutons = document.querySelectorAll(".bouton");

document.querySelectorAll(".bouton").forEach(btn => {
  btn.addEventListener("click", () => {
    const box = btn.closest(".box-deroule");
    const int_box = box.querySelector(".int-box-deroule");

    // Ferme tous les autres
    document.querySelectorAll(".int-box-deroule").forEach(i => {
      if (i !== int_box) {
        i.classList.remove("open"); 
        const otherBtn = i.closest(".box-deroule").querySelector(".bouton p");
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
