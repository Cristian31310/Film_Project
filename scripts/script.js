import { controller } from "./controller.js"
import { searchButtom, reportButtonEvent, favMoviesButton } from "./eventos.js";
export { container };
const buttonSearchMovie = document.getElementById("buttonMovie");
const buttonSearchSerie = document.getElementById("buttonSerie");

var inputMovie = document.getElementById("movieInput");
var inputSerie = document.getElementById("serieInput");
var reportButton = document.getElementById("buttonReport");
var favViewButton = document.getElementById("favMoviesButton")
var petecionEnCurso;

var container = document.createElement("div");
container.setAttribute("id", "superDiv");

window.onload = () => {
  searchButtom(buttonSearchMovie, inputMovie, "movie");
  searchButtom(buttonSearchSerie, inputSerie, "series");
  reportButtonEvent(reportButton);
  favMoviesButton(favViewButton);
  document.body.appendChild(container);
}

window.onscroll = (e) => {
  let cercaFinal =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

  if (cercaFinal) {
    controller.movieSearch(container);
  }
};

