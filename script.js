
const buttonSearch = document.getElementById("searchButtom");
var inputMovie = document.getElementById("movieInput");
var petecionEnCurso;

var container = document.createElement("div");
container.setAttribute("id", "superDiv");

window.onload = () => {

  controller.movieSearch(container);

  buttonSearch.addEventListener("click", (event) => {
    if (controller.userSearch != inputMovie.value) {
      controller.setPageNumber(1);
      view.reload();
    }

    controller.setUserSearch(inputMovie.value);
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
