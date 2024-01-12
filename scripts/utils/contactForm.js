const _body = document.getElementById("body");
const _main = document.getElementById("main");
const _modal = document.getElementById("contact_modal");
const _open_modal_btn = document.getElementById("open_modal");
const _close_modal_btn = document.getElementById("close_modal");

function displayModal() {
  _body.classList.add("no-scroll");
  _main.setAttribute("aria-hidden", "true");
  _modal.setAttribute("aria-hidden", "false");
  _modal.style.display = "block";
  _close_modal_btn.focus();
}

function closeModal() {
  _body.classList.remove("no-scroll");
  _main.setAttribute("aria-hidden", "false");
  _modal.setAttribute("aria-hidden", "true");
  _modal.style.display = "none";
  _open_modal_btn.focus();
}

// Fermer la modale quand on appuie sur échap
addEventListener("keydown", (e) => {
  if (_modal.getAttribute("aria-hidden") == "false" && e.key === "Escape") {
    closeModal();
  }
});

function send(e) {
  const form = e.target;
  const formData = new FormData(form);
  e.preventDefault();

  const json = {};
  formData.forEach((value, key) => (json[key] = value));

  console.log(json);

  // Réinitialiser tous les champs de formulaires
  form.querySelectorAll("input").forEach((i) => {
    i.value = ""
  })

}
