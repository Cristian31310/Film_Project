export { FavController };
import { FavView } from "./favView.js";
import { apikey } from "./controller.js";
class FavController {
  static obtainLocalStorageData() {
    return JSON.parse(localStorage.getItem("movie"));
  }

  static async obtainMovieData(id, container) {
    let defaultApiURL = `https://www.omdbapi.com/?apikey=${apikey}&i=` + id;
    fetch(defaultApiURL)
      .then((response) => response.json())
      .then((movie) => {
        FavView.createCarrousel(movie, container)
      })
  }

  static async algo() {
    let div = FavView.createView();

    for (let i = 0; i < this.obtainLocalStorageData().length; i++) {
      this.obtainMovieData(this.obtainLocalStorageData()[i], div);
    }

  }
}
