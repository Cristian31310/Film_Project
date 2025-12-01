
var pageNumber = 1;

var petecionEnCurso;

var page = "&page=";
var userSearch = "pink+floyd";
var apiURL = "http://www.omdbapi.com/?apikey=496cdeca&s=";
var defaultApiURL = "http://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + pageNumber;

class controller {

  static setUserSearch(search) {
    userSearch = search;
  }

  static setPageNumber(number) {
    pageNumber = number;
  }

  static movieSearch(container) {
    defaultApiURL = "http://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + pageNumber;
    if (!petecionEnCurso) {
      petecionEnCurso = true;
      fetch(defaultApiURL)
        .then((response) => response.json())
        .then((data) => view.displayFilms(data, container));
      petecionEnCurso = false;
      console.log(defaultApiURL);
      pageNumber++;
    }
  }
}
