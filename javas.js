
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
     const icon = btn.querySelector("h3");
    if (int_box.classList.contains("open")) {
      icon.textContent = "∧";  // ouvert
    } else {
      icon.textContent = "∨";  // fermé
    }
  });
});



console.log("JS chargé !");
//GESTION PDF

  const modal = document.getElementById('pdfModal');
  const iframe = document.getElementById('pdfFrame');
  const buttons = document.querySelectorAll('.open-pdf');

  // Pour chaque bouton
  buttons.forEach(button => {
  button.addEventListener('click', () => {
    const pdfPath = button.getAttribute('data-pdf');
    const orientation = button.getAttribute('data-orientation');

    iframe.src = pdfPath;

    if (orientation === "landscape") {
      iframe.style.aspectRatio = "1.414 / 1"; // horizontal
    } else {
      iframe.style.aspectRatio = "1 / 1.414"; // vertical
    }

    modal.style.display = 'block';
  });
});

  // Fermer la modale
  document.getElementById('closePdf').addEventListener('click', () => {
    modal.style.display = 'none';
    iframe.src = ''; // reset
  });