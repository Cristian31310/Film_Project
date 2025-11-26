const container = document.createElement("div");
container.style.display = "grid";
container.style.gridTemplateColumns = "1fr 1fr 1fr";
container.style.color = "white";

var div;
var caratula;
var title;
var year;
var type;

function createElements() {
  div = document.createElement("div");
  caratula = document.createElement("img");
  title = document.createElement("p");
  year = document.createElement("p");
  type = document.createElement("p");
}

function insertJsonContent(i) {
  title.textContent = peliculas.Search[i].Title;
  year.textContent = peliculas.Search[i].Year;
  type.textContent = peliculas.Search[i].Type;
  caratula.setAttribute("src", peliculas.Search[i].Poster);
}

function elementStyles() {
  caratula.style.height = "500px";
  caratula.style.width = "340px";
  caratula.style.margin = "25px";
  div.style.textAlign = "center";
}

function apendJsonElement() {
  div.appendChild(caratula);
  div.appendChild(title);
  div.appendChild(year);
  div.appendChild(type);
  container.appendChild(div);
}

function bodyStyle() {
  document.body.style.backgroundImage = "url(./img/spaceBG.jpg)";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "100%";
  document.body.style.backgroundAttachment = "fixed";
}

function search() {
    displayFilms(masPeliculas);
}

function displayFilms(dataFilms) {
  for (let i = 0; i < dataFilms.Search.length; i++) {
    createElements();
    insertJsonContent(i);
    elementStyles();
    apendJsonElement();
  }
}

displayFilms(peliculas);
bodyStyle();
document.body.appendChild(container);
