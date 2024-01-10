export default function photographerTemplate(data) {
  const { city, country, id, name, portrait, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // Définitions des éléments
    const _article = document.createElement("article");
    const _portrait = document.createElement("img");
    const _name = document.createElement("h2");
    const _geography = document.createElement("p");
    const _tagline = document.createElement("p");
    const _price = document.createElement("p");
    const _link = document.createElement("a");

    // Paramétrage des éléments
    _portrait.setAttribute("src", picture);
    _portrait.alt = `Portrait de ${name}`;
    _name.textContent = name;
    _geography.textContent = `${city}, ${country}`;
    _tagline.textContent = tagline;
    _price.textContent = `${price}€/jour`;
    _article.id = id;
    _link.href = `photographer.html?id=${id}`;
    _link.role = "link";
    _link.ariaLabel = `${name}`;

    // Construction de la carte
    _article.appendChild(_link);
    _link.appendChild(_portrait);
    _link.appendChild(_name);
    _article.appendChild(_geography);
    _article.appendChild(_tagline);
    _article.appendChild(_price);

    return _article;
  }
  return { name, picture, city, country, id, price, tagline, getUserCardDOM };
}
