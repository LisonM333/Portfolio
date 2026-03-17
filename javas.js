
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

function fitTextToContainer(container, text) {
  let min = 1;
  let max = 1000;
  let size;

  while (min <= max) {
    size = Math.floor((min + max) / 2);
    text.style.fontSize = size + "px";

    if (text.offsetWidth < container.offsetWidth) {
      min = size + 1;
    } else {
      max = size - 1;
    }
  }

  text.style.fontSize = max + "px";
}

const cadre = document.querySelector(".box-base");
const texte = document.querySelector(".font-sized");

fitTextToContainer(cadre, texte);



//GESTION PDF

  const modal = document.getElementById('pdfModal');
  const iframe = document.getElementById('pdfFrame');
  const buttons = document.querySelectorAll('.open-pdf');

  // Pour chaque bouton
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      console.log("Bouton cliqué !");
      const pdfPath = button.getAttribute('data-pdf');
      iframe.src = pdfPath;
      modal.style.display = 'block';
    });
  });

  // Fermer la modale
  document.getElementById('closePdf').addEventListener('click', () => {
    modal.style.display = 'none';
    iframe.src = ''; // reset
  });