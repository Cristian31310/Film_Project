
var pageNumber = 1;

var petecionEnCurso;

var page = "&page=";
var userSearch = "Godzilla";
var apiURL = "http://www.omdbapi.com/?apikey=496cdeca&s=";
var type = "movie"
var defaultApiURL = "http://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + pageNumber + "&type=" + type;

class controller {

  static setType(search) {
    type = search;
  }

  static setUserSearch(search) {
    userSearch = search;
  }

  static setPageNumber(number) {
    pageNumber = number;
  }

  static movieSearch(container) {
    defaultApiURL = "http://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + pageNumber + "&type=" + type;
    if (!petecionEnCurso) {
      petecionEnCurso = true;
      fetch(defaultApiURL)
        .then((response) => response.json())
        .then((data) => view.displayFilms(data, container));
      petecionEnCurso = false;
      pageNumber++;
    }
  }
}
