
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
var translate = 50;
console.log(translateFactor)
function carrouselRightButtom(button) {
  button.addEventListener("click", (event) => {
    translateFactor++;
    // button.style.transform = `translateX( ${-translate} %)`;
    document.querySelectorAll("[id='carrouselElement']").forEach((item) => {
      item.style.transform = `translateX(${-translate * translateFactor}%)`
    })
  })
}

function carrouselLeftButtom(button) {
  button.addEventListener("click", (event) => {
    translateFactor--;
    document.querySelectorAll("[id='carrouselElement']").forEach((item) => {
      item.style.transform = `translateX(${-translate * translateFactor}%)`
    })
  })
}
