// import { FavController } from "./favController.js";

//TODO
// corrousel en fav view
// cambiar el await por un fetch
// imports
// refactorizar todo
// documentar 
var favMovies = [];
if (JSON.parse(localStorage.getItem("movie"))) {
  favMovies = JSON.parse(localStorage.getItem("movie"));
}
// favMovies = JSON.parse(localStorage.getItem("favMovies"));
// if (fav) {
//   console.log(favMovies);
// }
// console.log();
function imageClick(element, data) {
  element.addEventListener("click", (event) => {
    controller.imdbData(element.getAttribute("id"));
    view.reload("itemDetail");
  });
}

function closeDetail(element) {
  element.addEventListener("click", (event) => {
    view.reload("itemDetail");
  });
}

function searchButtom(button, input, type) {
  controller.movieSearch(container);
  input.addEventListener("keyup", (event) => {
    if (input.value.length >= 3 || event.key == "Enter") {
      console.log("INPUT =>" + input.value)
      if (controller.userSearch != input.value) {
        controller.setPageNumber(1);
        controller.setType(type)
        view.reload("superDiv");
      }
      controller.setUserSearch(input.value);
      controller.movieSearch(container);
    }
  });

  button.addEventListener("click", (event) => {
    console.log("INPUT =>" + input.value)
    if (controller.userSearch != input.value) {
      controller.setPageNumber(1);
      controller.setType(type)
      view.reload("superDiv");
    }
    controller.setUserSearch(input.value);
    controller.movieSearch(container);
  });
}

function favButton(button, isClick) {
  // let isClick = true;
  button.addEventListener("click", (event) => {
    if (isClick) {
      console.log(button.parentNode.parentNode.childNodes[0].id);
      favMovies.push(button.parentNode.parentNode.childNodes[0].id)
      button.textContent = "★";
      localStorage.setItem("movie", JSON.stringify(favMovies));
      isClick = false;
    } else if (!isClick) {
      console.log("favButtom is false");
      let movieToDelete = favMovies.indexOf(button.parentNode.parentNode.childNodes[0].id);
      favMovies.splice(movieToDelete, 1);
      button.textContent = "☆";
      localStorage.setItem("movie", JSON.stringify(favMovies));
      isClick = true;
    }
  });
}

function reportButtonEvent(button) {
  let isclick = true;
  button.addEventListener("click", (event) => {
    if (isclick) {
      container.style.display = "none";
      // container.style.position = "static"
      ViewReport.loadingPreview(document.body);
      controller.hola();
      // view.report(isclick)
      isclick = false;
    } else {
      container.style.display = "grid";
      ViewReport.deleteElement("reportView");
      // for (let i = 0; i < pageNumber + 2; i++) {
      //   view.reload("reportView");
      // }
      isclick = true;
    }
  })
}

var translateFactor = 1;
var translate = 20;
var boolTranslaste = true;
console.log(translateFactor)
function carrouselRightButtom(button, id) {
  button.addEventListener("click", (event) => {
    let carrouselMovies = document.querySelector(`[id='${id}']`).childNodes;
    let lastCarrouselMovie = carrouselMovies[carrouselMovies.length - 1].getBoundingClientRect().right;
    if (lastCarrouselMovie > 1656) {
      loadMoviesCarrousel(id);
      console.log("boolTranslate is true", boolTranslaste)
      if (boolTranslaste) {
        translateFactor++;
        translateCarrouselElements(id);
      } else {
        boolTranslaste = true;
      }
    }

    // let lastCarrouselMovie = document.querySelectorAll(`[id='${id}']`)[document.querySelectorAll(`[id='${id}']`).length - 1];
    // let carrouselMovies = document.querySelector(`[id='${id}']`).childNodes;
    // let lastCarrouselMovie = carrouselMovies[carrouselMovies.length - 1].getBoundingClientRect().right;
    console.log("lastCarrouselMovie: ", lastCarrouselMovie);
  })
}

function carrouselLeftButtom(button, id) {
  button.addEventListener("click", (event) => {
    if ((-translate * translateFactor) < 5) {
      translateFactor--;
      if (translateFactor === 0) {
        translateFactor = -1;
      }

      translateCarrouselElements(id)
    }
  })
}

function translateCarrouselElements(id) {
  document.querySelectorAll(`[id='${id}']`).forEach((item) => {
    item.style.transform = `translateX(${-translate * translateFactor}%)`
  })
}

let bool = true;
async function loadMoviesCarrousel(id) {
  if (id == "movieCarrouseloffices") {
    if (bool) {
      bool = false;
      let votes = await Report.getReportOffices();
      console.log(votes);
      ViewReport.addMoreMoviesCarrosel(votes, id);
      bool = true;
      if (votes.length == 0) {
        boolTranslaste = false;
      } else if (votes.length > 0) { boolTranslaste = true; }
    }
  } else if (id == "movieCarrouselvotes") {

    if (bool) {
      bool = false;
      let votes = await Report.getReportVotes();
      console.log(votes);
      if (votes.length == 0) {
        ViewReport.addMoreMoviesCarrosel(votes, id);
        bool = true;
        if (votes.length == 0) {
          boolTranslaste = false;
        } else if (votes.length > 0) { boolTranslaste = true; }
      }
    }
  } else if (id == "movieCarrouselrankings") {

    if (bool) {
      bool = false;
      let votes = await Report.getReportRatings();
      console.log(votes);
      if (votes.length == 0) {
        ViewReport.addMoreMoviesCarrosel(votes, id);
        bool = true;
        if (votes.length == 0) {
          boolTranslaste = false;
        } else if (votes.length > 0) { boolTranslaste = true; }
      }
    }
    bool = true;
    console.log("El id del div del boton es: ", id);
  }
}

function favMoviesButton(button) {
  let isclick = true;
  button.addEventListener("click", (event) => {
    if (isclick) {
      container.style.display = "none";
      FavController.algo();
      isclick = false;
    } else if (!isclick) {
      let favView = document.getElementById("divFavView");
      favView.remove();
      container.style.display = "grid";
      isclick = true;
    }
  });
}
