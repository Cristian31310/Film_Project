const container = document.createElement("div");

// const response = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=496cdeca", {});
// const response = fetch("http://www.omdbapi.com/?apikey=496cdeca&s=Star").then;

var userSearch = "pink+floyd";
var apiURL = "http://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch;
const buttonSearch = document.getElementById("searchButtom");

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

function movieSearch() {
  fetch(apiURL)
    .then((response) => response.json())
    // .then((data) => console.log(data));
    .then((data) => displayFilms(data));
}

// movieSearch();

const form  = document.getElementById('form');

movieSearch();
form.addEventListener('submit', (event) => {
   var algo = document.getElementById("movieInput").value

});

window.onscroll = (e) => {
  let cercaFinal = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300

  if(cercaFinal){
    console.log("saltaImagen");
    
  }
  console.log("scroll");
}

// buttonSearch.addEventListener("click", search);

// console.log(document.getElementById("movieInput").value);

// displayFilms(peliculas);
bodyStyle();
document.body.appendChild(container);
