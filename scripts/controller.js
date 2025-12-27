
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
    // Repiter tantas veces como peticiones se hace en la vista principal
    defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + pageNumber + "&type=" + type;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    const movies = data.Search;
    let movieRatings = new Map();
    let movieVotes = new Map();
    let movieOffices = new Map();

    for (let i = 0; i < 10; i++) {
      let votes = await this.movieVotes(movies[i].imdbID);
      let office = await this.movieOffice(movies[i].imdbID);
      movieVotes.set(movies[i].imdbID, parseInt(votes.split(",").join("")));
      movieOffices.set(movies[i].imdbID, parseInt(office.slice(1).split(",").join("")));
      movieRatings.set(movies[i].imdbID, await this.movieRating(movies[i].imdbID));
    }

    console.log("Votos Ordenados: ", await this.orderAndTruncateMap(movieVotes, 4000));
    console.log("Ratings Ordenados: ", await this.orderAndTruncateMap(movieRatings, 7));
    console.log("BoxOffice Ordenados: ", await this.orderAndTruncateMap(movieOffices, 20000000));
    return movies;
  }

  static async orderAndTruncateMap(map, truncValue) {
    let orderMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    let truncMap = new Map();
    // Este try catch existe para parar de iterar el for each.
    // Solo quiero todas las peliculas con calificaciones mayores a 7. Iterar más alla de eso me parece un código poco optimizado
    try {
      // movieRatings.clear();
      orderMap.forEach((movie, key) => {
        if (movie >= truncValue) {
          truncMap.set(key, movie);
        } else if (movie < truncValue) {
          throw new Error("The rest of the movies are bad");
        }
      });
    } catch (error) {
      console.log();
    }
    return truncMap;
  }
  static async movieRating(id) {
    defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&i=" + id;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    return data.imdbRating;
  }

  static async movieVotes(id) {
    defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&i=" + id;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    return data.imdbVotes;
  }

  static async movieOffice(id) {
    defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&i=" + id;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    return data.BoxOffice;
  }

  static reportController() {

    console.log(this.hola());

    for (let i = 0; i < 5; i++) {
      defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + i + "&type=" + type;
      if (!petecionEnCurso) {
        petecionEnCurso = true;
        fetch(defaultApiURL)
          .then((response) => response.json())
          .then((data) => {
            // view.report(data, true);
            // console.log(data)
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
