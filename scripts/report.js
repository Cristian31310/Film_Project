let pageVotes = 1;
let pageOffice = 1;
let pageRanking = 1;
var apikey = "496cdeca"
// var defaultApiURL = "https://www.omdbapi.com/?apikey=ca3a985&s=";
class Report {

  static async getReportInf(numPage) {
    // Repiter tantas veces como peticiones se hace en la vista principal
    var urlInfo = `https://www.omdbapi.com/?apikey=${apikey}&s=` + userSearch + page + numPage + "&type=" + type;
    const response = await fetch(urlInfo);
    const data = await response.json();
    const movies = data.Search;

    return movies;
  }

  static async getReportVotes() {
    let movies = await this.getReportInf(pageVotes);
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

    pageVotes++;
    return this.orderAndTruncateArray(movieVotes, 1000);
  }

  static async getReportOffices() {
    let movies = await this.getReportInf(pageOffice);
    let movieOffices = new Array();

    for (let i = 0; i < 10; i++) {
      let office = await this.movieOffice(movies[i].imdbID);
      let movie = {
        img: movies[i].Poster,
        title: movies[i].Title
      };
      pageOffice++;
      let officeArray = [movie, parseInt(office.slice(1).split(",").join(""))];
      movieOffices.push(officeArray);
    }

    return this.orderAndTruncateArray(movieOffices, 1000000);
  }

  static async getReportRatings() {
    let movies = await this.getReportInf(pageRanking);
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
    pageRanking++;
    return this.orderAndTruncateArray(movieRatings, 7);
  }
  static async orderAndTruncateArray(array, truncValue) {
    let order = array.filter((item) => item[1] >= truncValue);
    // console.log("order: ", order);
    return order;
  }
  static async movieRating(id) {
    defaultApiURL = `https://www.omdbapi.com/?apikey=${apikey}&i=` + id;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    return data.imdbRating;
  }

  static async movieVotes(id) {
    defaultApiURL = `https://www.omdbapi.com/?apikey=${apikey}&i=` + id;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    return data.imdbVotes;
  }

  static async movieOffice(id) {
    defaultApiURL = `https://www.omdbapi.com/?apikey=${apikey}&i=` + id;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    return data.BoxOffice;
  }
}
