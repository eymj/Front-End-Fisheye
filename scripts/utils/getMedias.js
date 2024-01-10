export default async function getMedias(id) {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  const medias = data.media.filter((m) => m.photographerId == id);
  return medias;
}
