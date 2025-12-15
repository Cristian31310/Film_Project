
var pageNumber = 1;

var petecionEnCurso;

var page = "&page=";
var userSearch = "Godzilla";
var apiURL = "https://www.omdbapi.com/?apikey=496cdeca&s=";
var type = "movie"
var defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + pageNumber + "&type=" + type;
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
    defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + pageNumber + "&type=" + type;
    if (!petecionEnCurso) {
      petecionEnCurso = true;
      fetch(defaultApiURL)
        .then((response) => response.json())
        .then((data) => view.displayFilms(data, container));
      petecionEnCurso = false;
      pageNumber++;
    }
  }


  static imdbData(id) {
    defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&i=" + id;
    if (!petecionEnCurso) {
      petecionEnCurso = true;
      fetch(defaultApiURL)
        .then((response) => response.json())
        .then((data) => view.itemDetail(id, data));
      petecionEnCurso = false;
    }
  }
}
