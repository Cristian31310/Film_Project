
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
