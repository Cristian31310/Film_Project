
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
      controller.reportController(isclick);
      isclick = false;
    } else {
      container.style.display = "grid";
      for (let i = 0; i < pageNumber + 2; i++) {
        view.reload("reportView");
      }
      isclick = true;
    }
  })
}
