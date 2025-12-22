
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
        .then((data) => {
          view.displayFilms(data, container);
          // console.log(data)
        });
      petecionEnCurso = false;
      pageNumber++;
    }
  }
  static async hola() {
    defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + pageNumber + "&type=" + type;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    const movies = data.Search;
    let movieRatings = new Map();
    movieRatings.set(movies[4].imdbID, await this.movieData(movies[4].imdbID).imdbRating);
    console.log(await this.movieData(movies[4].imdbID).imdbRating);
    return movies;
  }

  static async movieData(id) {
    defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&i=" + id;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    console.log("Moviedata: ", data.imdbRating);
    console.log("Moviedata: ", data.imdbVotes);
    console.log("Moviedata: ", data.BoxOffice);
    // return [data.imdbRating, data.imdbVotes, data.BoxOffice]
    return data;
  }
  //Obtener las peliculas mejor valoradas
  static getBestRatings(movies) {
    movies
  }

  static reportController() {

    console.log(this.hola());

    console.log(pageNumber);
    for (let i = 0; i < 5; i++) {
      console.log("PALOMITO");
      defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + i + "&type=" + type;
      if (!petecionEnCurso) {
        petecionEnCurso = true;
        fetch(defaultApiURL)
          .then((response) => response.json())
          .then((data) => {
            // view.report(data, true);
            console.log(data)
          });
        petecionEnCurso = false;
      }
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
