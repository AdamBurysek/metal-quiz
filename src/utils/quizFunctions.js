export function getImageUrl(array) {
  return require("../img/" + array.image + ".jpg");
}

export function translatePage(id) {
  return "translateX(" + id * 100 + "%)";
}

export function slidesWidth(array) {
  return array * 100 + "%";
}

export function slidePage(num) {
  return num * 100 + "%";
}
