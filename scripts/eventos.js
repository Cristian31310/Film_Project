/// import { FavController } from "./favController.js";
import { controller } from "./controller.js";
import { view } from "./view.js";
import { ViewReport } from "./viewReport.js"
import { Report } from "./report.js"
import { FavController } from "./favController.js"
import { container } from "./script.js";
export {
  searchButtom, reportButtonEvent, favMoviesButton, imageClick,
  favButton, carrouselLeftButtom, carrouselRightButtom, closeDetail,
  loadMoviesCarrousel
}
//TODO
// refactorizar todo
// Arreglar el elimar el div del report y la carga
// documentar 
var favMovies = [];
if (JSON.parse(localStorage.getItem("movie"))) {
  favMovies = JSON.parse(localStorage.getItem("movie"));
}
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
      favMovies.push(button.parentNode.parentNode.childNodes[0].id)
      button.textContent = "★";
      localStorage.setItem("movie", JSON.stringify(favMovies));
      isClick = false;
    } else if (!isClick) {
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
    let favView = document.getElementById("divFavView");
    if (favView) {
      favView.remove();
    }
    if (isclick) {
      container.style.display = "none";
      // container.style.position = "static"
      let eventTarget = event.target;
      ViewReport.loadingPreview(document.body);
      controller.hola(eventTarget);
      // view.report(isclick)
      isclick = false;
    } else if (!isclick) {
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
var translate = 10;
var boolTranslaste = true;
function carrouselRightButtom(button, id) {
  button.addEventListener("click", (event) => {
    let carrouselMovies = document.querySelector(`[id='${id}']`).childNodes;
    let lastCarrouselMovie = carrouselMovies[carrouselMovies.length - 1].getBoundingClientRect().right;
    if (lastCarrouselMovie > 1956) {
      loadMoviesCarrousel(id);
      if (boolTranslaste) {
        translateFactor++;
        translateCarrouselElements(id);
      } else {
        boolTranslaste = true;
      }
    }

  })
}

function carrouselLeftButtom(button, id) {
  button.addEventListener("click", (event) => {
    let carrouselMovies = document.querySelector(`[id='${id}']`).childNodes;
    let lastCarrouselMovie = carrouselMovies[0].getBoundingClientRect().left;
    if (lastCarrouselMovie < 0) {
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
      if (votes.length == 0) {
        ViewReport.addMoreMoviesCarrosel(votes, id);
        bool = true;
        if (votes.length == 0) {
          boolTranslaste = false;
        } else if (votes.length > 0) { boolTranslaste = true; }
      }
    }
    bool = true;
  }
}

function favMoviesButton(button) {
  let isclick = true;
  button.addEventListener("click", (event) => {
    let report = document.getElementById("reportView");
    if (report) {
      report.remove();
    }
    if (isclick) {
      container.style.display = "none";
      FavController.algo();
      isclick = false;
    } else if (!isclick) {
      let favView = document.getElementById("divFavView");
      if (favView) {
        favView.remove();
      }
      container.style.display = "grid";
      isclick = true;
    }
  });
}
