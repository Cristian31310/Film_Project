
var pageNumber = 1;

var petecionEnCurso;

var page = "&page=";
var userSearch = "star";
var apiURL = "https://www.omdbapi.com/?apikey=ca3a985&s=";
var type = "movie"
var defaultApiURL = "https://www.omdbapi.com/?apikey=ca3a985&s=" + userSearch + page + pageNumber + "&type=" + type;

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
    defaultApiURL = "https://www.omdbapi.com/?apikey=ca3a985&s=" + userSearch + page + pageNumber + "&type=" + type;
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

  static async getReportInf() {
    // Repiter tantas veces como peticiones se hace en la vista principal
    defaultApiURL = "https://www.omdbapi.com/?apikey=ca3a985&s=" + userSearch + page + pageNumber + "&type=" + type;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    const movies = data.Search;

    return movies;
  }

  static async getReportVotes() {
    let movies = await this.getReportInf();
    let movieVotes = new Array();

    for (let i = 0; i < 10; i++) {
      let votes = await this.movieVotes(movies[i].imdbID);
      let movie = {
        img: movies[i].Poster,
        title: movies[i].Title
      };
      let votesArray = [movie, parseInt(votes.split(",").join(""))];
      movieVotes.push(votesArray);
    }

    return this.orderAndTruncateArray(movieVotes, 4000);
  }

  static async getReportOffices() {
    let movies = await this.getReportInf();
    let movieOffices = new Array();

    for (let i = 0; i < 10; i++) {
      let office = await this.movieVotes(movies[i].imdbID);
      let movie = {
        img: movies[i].Poster,
        title: movies[i].Title
      };
      let officeArray = [movie, parseInt(office.slice(1).split(",").join(""))];
      movieOffices.push(officeArray);
    }
    return this.orderAndTruncateArray(movieOffices, 10000000);
  }

  static async getReportRatings() {
    let movies = await this.getReportInf();
    let movieRatings = new Array();

    for (let i = 0; i < 10; i++) {
      // let votes = await this.movieVotes(movies[i].imdbID);
      let movie = {
        img: movies[i].Poster,
        title: movies[i].Title
      };
      let ratingArray = [movie, await this.movieRating(movies[i].imdbID)];
      movieRatings.push(ratingArray);
    }
    return this.orderAndTruncateArray(movieRatings, 7);
  }
  static async hola() {
    ViewReport.report(await Report.getReportVotes(),
      await Report.getReportOffices(),
      await Report.getReportRatings())
    // view.report(await Report.getReportVotes(),
    //   await Report.getReportOffices(),
    //   await Report.getReportRatings())
  }
  static async orderAndTruncateArray(array, truncValue) {
    let order = array.filter((item) => item[1] >= truncValue);
    // console.log("order: ", order);
    return order;
  }
  static async movieRating(id) {
    defaultApiURL = "https://www.omdbapi.com/?apikey=ca3a985&i=" + id;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    return data.imdbRating;
  }

  static async movieVotes(id) {
    defaultApiURL = "https://www.omdbapi.com/?apikey=ca3a985&i=" + id;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    return data.imdbVotes;
  }

  static async movieOffice(id) {
    defaultApiURL = "https://www.omdbapi.com/?apikey=ca3a985&i=" + id;
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
    defaultApiURL = "https://www.omdbapi.com/?apikey=ca3a985&i=" + id;
    if (!petecionEnCurso) {
      petecionEnCurso = true;
      fetch(defaultApiURL)
        .then((response) => response.json())
        .then((data) => view.itemDetail(id, data));
      petecionEnCurso = false;
    }
  }
}
