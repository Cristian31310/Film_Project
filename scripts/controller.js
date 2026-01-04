
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
        });
      petecionEnCurso = false;
      pageNumber++;
    }
  }

  static async getReportInf(page) {

  }
  static async hola() {
    // page == null ? page = 1;
    // Repiter tantas veces como peticiones se hace en la vista principal
    defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + pageNumber + "&type=" + type;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    const movies = data.Search;
    let movieVotes = new Array();
    let movieRatings = new Array();
    let movieOffices = new Array();

    for (let i = 0; i < 10; i++) {
      let votes = await this.movieVotes(movies[i].imdbID);
      let office = await this.movieOffice(movies[i].imdbID);
      let movie = {
        img: movies[i].Poster,
        title: movies[i].Title
      };
      let votesArray = [movie, parseInt(votes.split(",").join(""))];
      let officeArray = [movie, parseInt(office.slice(1).split(",").join(""))];
      let ratingArray = [movie, await this.movieRating(movies[i].imdbID)];
      movieVotes.push(votesArray);
      movieOffices.push(officeArray);
      movieRatings.push(ratingArray);
      // movieVotes.set(movie.img, parseInt(votes.split(",").join("")));
      // movieOffices.set(movies[i].imdbID, parseInt(office.slice(1).split(",").join("")));
      // movieRatings.set(movies[i].imdbID, await this.movieRating(movies[i].imdbID));
    }
    // console.log(movieVotes);
    // console.log(movieOffices);
    // console.log(movieRatings);

    this.orderAndTruncateArray(movieVotes, 4000);
    this.orderAndTruncateArray(movieOffices, 10000000);
    this.orderAndTruncateArray(movieRatings, 7);

    view.report(await this.orderAndTruncateArray(movieVotes, 4000),
      await this.orderAndTruncateArray(movieOffices, 10000000),
      await this.orderAndTruncateArray(movieRatings, 7));
  }
  static async orderAndTruncateArray(array, truncValue) {
    let order = array.filter((item) => item[1] >= truncValue);
    // console.log("order: ", order);
    return order;
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

  // static reportController() {
  //
  //   // console.log(this.hola());
  //
  //   for (let i = 0; i < 5; i++) {
  //     defaultApiURL = "https://www.omdbapi.com/?apikey=496cdeca&s=" + userSearch + page + i + "&type=" + type;
  //     if (!petecionEnCurso) {
  //       petecionEnCurso = true;
  //       fetch(defaultApiURL)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           // view.report(data, true);
  //           // console.log(data)
  //         });
  //       petecionEnCurso = false;
  //     }
  //   }
  // }

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
