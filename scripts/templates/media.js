export default function mediaTemplate(data) {
  const { date, id, likes, photographerId, price, title, video, image } = data;

  const media = `assets/medias/${image ? image : video}`;

  function getMediaCardDOM() {
    // Définitions des éléments
    const _article = document.createElement("article");
    const _media = image
      ? document.createElement("img")
      : document.createElement("video");
    const _name = document.createElement("h2");
    const _like_icon = document.createElement("img");
    const _details = document.createElement("aside");
    const _likes_container = document.createElement("div");
    const _likes = document.createElement("span");

    // Paramétrage des éléments
    _like_icon.setAttribute("src", "assets/icons/heart.png");
    _article.id = id;
    _media.setAttribute("src", media);
    _media.classList = "media";
    _likes.textContent = likes;
    _name.textContent = title;
    _details.className = "details";
    _likes_container.className = "likes";
    _likes.className = "likes-text";
    _like_icon.setAttribute("alt", "likes");

    // Construction de la carte
    _likes_container.appendChild(_likes);
    _likes_container.appendChild(_like_icon);
    _details.appendChild(_name);
    _details.appendChild(_likes_container);
    _article.appendChild(_media);
    _article.appendChild(_details);

    return _article;
  }
  return { date, media, getMediaCardDOM };
}
