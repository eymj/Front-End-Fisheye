const _body = document.getElementById("body");
const _main = document.getElementById("main");
const _lightbox = document.getElementById("lightbox");
const _caption = document.getElementById("lightbox_caption");
const _container = document.getElementById("lightbox_container");
const _close_lightbox_btn = document.getElementById("close_lightbox");
const _nav_left_lightbox_lnk = document.getElementById("nav_left_lightbox");
const _nav_right_lightbox_lnk = document.getElementById("nav_right_lightbox");
const params = new URL(document.location).searchParams;
let medias = {};
let currentIndex = 0;

export function createLightbox(_medias) {
  // Initialisation
  medias = _medias;

  // Configuration des boutons
  _close_lightbox_btn.addEventListener("click", function () {
    closeLightbox();
  });
  _nav_left_lightbox_lnk.addEventListener("click", function () {
    navigate(-1);
  });
  _nav_right_lightbox_lnk.addEventListener("click", function () {
    navigate(1);
  });

  // Verifier si l'URL contient le paramètre "show". Si c'est le cas, ouvrir la lightbox à l'index de l'image donné
  const showImage = params.get("show");
  if (showImage !== null) {
    displayLightbox(showImage);
  }

  // Ouvrir la lightbox quand on clique sur une photo
  const mediaElements = document.querySelectorAll(".media");
  mediaElements.forEach((m) => {
    m.addEventListener("click", function () {
      displayLightbox(m.parentNode.id);
    });
  });
}

export function displayLightbox(photoId) {
  _body.classList.add("no-scroll");
  _main.setAttribute("aria-hidden", "true");
  _lightbox.setAttribute("aria-hidden", "false");
  _lightbox.style.display = "block";
  currentIndex = medias.findIndex((m) => m.id == photoId);
  updateLightboxImage();
}

function updateLightboxImage() {
  document.getElementById("lightbox_image").remove();
  const _image = medias[currentIndex].video
    ? document.createElement("video")
    : document.createElement("img");
  const source = `assets/medias/${
    medias[currentIndex].video
      ? medias[currentIndex].video
      : medias[currentIndex].image
  }`;
  _image.src = source;
  _image.controls = true;
  _image.autoplay = true;
  _image.loop = true;
  _image.id = "lightbox_image";
  _image.setAttribute("aria-labelledby", "lightbox_caption");
  document.getElementById("lightbox_container").insertBefore(_image, _caption);
  _caption.textContent = medias[currentIndex].title;
  updateURLParameter("show", medias[currentIndex].id);
}

function closeLightbox() {
  _body.classList.remove("no-scroll");
  _main.setAttribute("aria-hidden", "false");
  _lightbox.setAttribute("aria-hidden", "true");
  _lightbox.style.display = "none";
  removeURLParameter("show");
}

addEventListener("keydown", (e) => {
  if (_lightbox.getAttribute("aria-hidden") == "false" && e.key === "Escape") {
    // Fermer la modale quand on appuie sur échap
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    // Navigation par clavier
    navigate(-1);
  } else if (e.key === "ArrowRight") {
    // Navigation par clavier
    navigate(1);
  }
});

function navigate(direction) {
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = medias.length - 1;
  } else if (currentIndex >= medias.length) {
    currentIndex = 0;
  }
  updateLightboxImage();
}

function updateURLParameter(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  // Petite astuce pour mettre à jour l'historique sans rafraichir complétement la page
  history.pushState({}, "", url);
}

function removeURLParameter(key) {
  const url = new URL(window.location.href);
  params.delete(key);
  url.search = params.toString();
  history.pushState({}, "", url);
}
