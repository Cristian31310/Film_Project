
const buttonSearchMovie = document.getElementById("buttonMovie");
const buttonSearchSerie = document.getElementById("buttonSerie");

var inputMovie = document.getElementById("movieInput");
var inputSerie = document.getElementById("serieInput");
var petecionEnCurso;

var container = document.createElement("div");
container.setAttribute("id", "superDiv");

window.onload = () => {
  // searchButtom(buttonSearchMovie, inputMovie, "movie");
  // searchButtom(buttonSearchSerie, inputSerie, "series");
  searchButtom(buttonSearchMovie, inputMovie, "movie");
  searchButtom(buttonSearchSerie, inputSerie, "series");
  document.body.appendChild(container);
}

window.onscroll = (e) => {
  let cercaFinal =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

  if (cercaFinal) {
    controller.movieSearch(container);
  }
};

