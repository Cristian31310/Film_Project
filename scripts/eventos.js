
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
      // controller.movieSearch(container);
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

function reportButtonEvent(button) {
  let isclick = true;
  button.addEventListener("click", (event) => {
    if (isclick) {
      container.style.display = "none";
      // container.style.position = "static"
      controller.hola();
      // view.report(isclick)
      isclick = false;
    } else {
      container.style.display = "grid";
      // for (let i = 0; i < pageNumber + 2; i++) {
      //   view.reload("reportView");
      // }
      isclick = true;
    }
  })
}

var translateFactor = 1;
var translate = 20;
console.log(translateFactor)
function carrouselRightButtom(button, id) {
  button.addEventListener("click", (event) => {
    loadMoviesCarrousel(id);
    translateFactor++;
    translateCarrouselElements(id);
  })
}

function carrouselLeftButtom(button, id) {
  button.addEventListener("click", (event) => {
    translateFactor--;
    if (translateFactor === 0) {
      translateFactor = -1;
    }
    translateCarrouselElements(id)
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
    }
    console.log("El id del div del boton es: ", id);
  } else if (id == "movieCarrouselvotes") {

    if (bool) {
      bool = false;
      let votes = await Report.getReportVotes();
      ViewReport.addMoreMoviesCarrosel(votes, id);
      bool = true;
    }
  } else if (id == "movieCarrouselrankings") {

    if (bool) {
      bool = false;
      let votes = await Report.getReportRatings();
      ViewReport.addMoreMoviesCarrosel(votes, id);
      bool = true;
    }
    console.log("El id del div del boton es: ", id);
  }
}
