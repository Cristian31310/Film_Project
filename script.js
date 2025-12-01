
const buttonSearchMovie = document.getElementById("buttonMovie");
const buttonSearchSerie = document.getElementById("buttonSerie");

var inputMovie = document.getElementById("movieInput");
var inputSerie = document.getElementById("serieInput");
var petecionEnCurso;

var container = document.createElement("div");
container.setAttribute("id", "superDiv");

window.onload = () => {
  searchButtom(buttonSearchMovie, inputMovie, "movie");
  searchButtom(buttonSearchSerie, inputSerie, "series");
}

function searchButtom(button, input, type) {
  controller.movieSearch(container);

  button.addEventListener("click", (event) => {
    console.log("INPUT =>" + input.value)
    if (controller.userSearch != input.value) {
      controller.setPageNumber(1);
      controller.setType(type)
      view.reload();
    }

    controller.setUserSearch(input.value);
    controller.movieSearch(container);
  });
}

window.onscroll = (e) => {
  let cercaFinal =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

  if (cercaFinal) {
    controller.movieSearch(container);
  }
};

document.body.appendChild(container);
