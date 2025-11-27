const container = document.createElement("div");

let pageNumber = 1;
var userSearch = "pink+floyd";
var apiURL = "http://www.omdbapi.com/?apikey=496cdeca&s=";
var defaultApiURL = "http://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch;
const buttonSearch = document.getElementById("searchButtom");
var inputMovie = document.getElementById("movieInput");
var petecionEnCurso;

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

function insertJsonContent(data, i) {
  title.textContent = data.Search[i].Title;
  year.textContent = data.Search[i].Year;
  type.textContent = data.Search[i].Type;
  caratula.setAttribute("src", data.Search[i].Poster);
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
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundSize = "100%";
  document.body.style.backgroundAttachment = "fixed";
}

// function search() {
//   displayFilms(masPeliculas);
// }

function displayFilms(dataFilms) {
  for (let i = 0; i < dataFilms.Search.length; i++) {
    createElements();
    insertJsonContent(dataFilms, i);
    elementStyles();
    apendJsonElement();
  }
}

function movieSearch(url) {
  if (!petecionEnCurso) {
    petecionEnCurso = true;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayFilms(data));
    petecionEnCurso = false;
  }
}

movieSearch(defaultApiURL);

buttonSearch.addEventListener("click", (event) => {
  userSearch = inputMovie.value;
  let page = "&page=";
  movieSearch(apiURL + userSearch + page +pageNumber);
  pageNumber ++;
  console.log(page + pageNumber);
  
});

// Metodo para el scroll infinito, no funcional
window.onscroll = (e) => {
  let cercaFinal =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

  if (cercaFinal) {
    console.log("saltaImagen");
    //Lanzar petición aquí
  }
  console.log("scroll");
};

// displayFilms(peliculas);
bodyStyle();
document.body.appendChild(container);

// Solucionar el error cuando no aperece una imagen

// img.onerror = () => "ruta imagen por defecto"
