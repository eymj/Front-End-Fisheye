export default async function getPhotographers(id = null) {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  // console.log(data.photographers)
  if (id) {
    return data.photographers.find((photographer) => photographer.id == id);
  }
  return data.photographers;
}
