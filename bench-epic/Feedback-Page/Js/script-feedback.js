function cloneFeedbackPage() {
  // Seleziona il modello
  const template = document.getElementsByTagName("template")[0].content;

  // Clona il contenuto del modello
  const clone = template.cloneNode(true);

  // Aggiungi il clone al contenitore desiderato
  const cloneContainer = document.getElementById("clone-feedbackpage");
  cloneContainer.appendChild(clone);

  initStars();
}

// cloneFeedbackPage();

function initStars() {
  let divStar = document.querySelectorAll("path");

  divStar.forEach((star, index) => {
    star.addEventListener("click", () => {
      divStar.forEach((star, index2) => {
        index >= index2 ? star.classList.add("pathAcceso") : star.classList.remove("pathAcceso");
      });
    });
  });
}
