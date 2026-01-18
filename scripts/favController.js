// export { FavController };
class FavController {
  static obtainLocalStorageData() {
    // let storage = localStorage.getItem("movie");
    return JSON.parse(localStorage.getItem("movie"));
  }

  static async obtainMovieData(id) {
    defaultApiURL = `https://www.omdbapi.com/?apikey=${apikey}&i=` + id;
    const response = await fetch(defaultApiURL);
    const data = await response.json();
    return data;
  }

  static async algo() {
    let movies = [];
    for (let i = 0; i < this.obtainLocalStorageData().length; i++) {
      movies.push(await this.obtainMovieData(this.obtainLocalStorageData()[i]));
    }

    console.log(movies);
    FavView.createView(movies);
    console.log(movies);
  }
}
