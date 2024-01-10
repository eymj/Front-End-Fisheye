import getPhotographers from "../utils/getPhotographers.js";
import getMedias from "../utils/getMedias.js";
import photographerTemplate from "../templates/photographer.js";
import mediaTemplate from "../templates/media.js";
import { createLightbox } from "../utils/lightbox.js";

async function displayData(photograph, medias) {
  // Définitions des éléments statiques
  const _grid = document.querySelector(".photograph-grid");
  const _name = document.querySelector(".photograph-header .name");
  const _geography = document.querySelector(".photograph-header .geography");
  const _tagline = document.querySelector(".photograph-header .tagline");
  const _rate = document.querySelector(".photograph-stats .rate");
  const _portrait = document.querySelector(".photograph-header img");
  const _modal_title = document.getElementById("modal-title");

  // Paramétrage des éléments statiques
  _modal_title.textContent = `Contactez-moi\r\n`;
  _modal_title.textContent += photograph.name;
  _name.textContent = photograph.name;
  _rate.textContent = `${photograph.price}€ / jour`;
  _geography.textContent = `${photograph.city}, ${photograph.country}`;
  _tagline.textContent = photograph.tagline;
  _portrait.setAttribute("src", photograph.picture);
  _portrait.alt = photograph.name;

  // Création des éléments dynamiques dans le DOM à partir de la factory
  medias.forEach((media) => {
    const mediaModel = mediaTemplate(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    _grid.appendChild(mediaCardDOM);
  });

  // Mise à jour du compteur de likes
  updateTotalLikes();
}

async function init() {
  // Récupère les datas des medias
  const params = new URL(document.location).searchParams;
  const id = params.get("id");
  const photograph = await getPhotographers(id);
  const photographModel = photographerTemplate(photograph);
  const medias = await getMedias(id);

  displayData(photographModel, medias);
  createLightbox(medias);

  // Implémentation des likes
  const likeElements = document.querySelectorAll("article .likes");
  likeElements.forEach((el) => {
    el.addEventListener("click", function () {
      likePhoto(el, medias);
    });
  });

  // Implémentation du tri
  const sortSelect = document.getElementById("sort");
  sortSelect.addEventListener("change", function () {
    handleSortSelectChange(medias);
  });
}

function handleSortSelectChange(medias) {
  const elements = document.querySelectorAll("article");
  const array = [...medias];
  const newValue = document.getElementById("sort").value;
  switch (newValue) {
    case "likes":
      array.sort((a, b) => {
        return b.likes - a.likes;
      });
      break;
    case "date":
      array.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      break;
    case "title":
      array.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      break;
  }
  elements.forEach((el) => {
    const order = array.findIndex((m) => m.id == el.id);
    el.style.order = order;
  });
  createLightbox(array);
}

function likePhoto(element, medias) {
  const id = element.closest("article").id;
  const _text = element.querySelector(".likes-text");
  const currentMedia = medias.find((m) => m.id == id);
  _text.textContent = currentMedia.likes + 1;
  updateTotalLikes();
}

function updateTotalLikes() {
  const _like_icon = document.createElement("img");
  const _likes = document.querySelector(".photograph-stats .likes");
  const likesTextElements = document.querySelectorAll("article .likes-text");
  _like_icon.setAttribute("src", "assets/icons/black-heart.png");
  _like_icon.setAttribute("alt", "likes");
  let likes = 0;
  likesTextElements.forEach((el) => {
    likes += Number(el.textContent);
  });
  _likes.textContent = likes;
  _likes.appendChild(_like_icon);
}

init();
