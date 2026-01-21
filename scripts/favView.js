export { FavView }
import { view } from "./view.js";
import { carrouselLeftButtom, carrouselRightButtom } from "./eventos.js";
class FavView {
  div;
  divCarrousel;
  static createView() {
    // console.log(movieData.Poster);
    this.div = document.createElement("div");
    this.divCarrousel = document.createElement("div");
    this.div.setAttribute("id", "divFavView");
    view.createElement("h1", this.div, "Peliculas Favoritas");
    this.divCarrousel.setAttribute("id", "divFavViewCarrousel");
    // this.createCarrousel(movieData, divCarrousel);
    this.createMoveCorruselMoviesButtoms("divFavViewCarrousel", this.div);
    this.div.appendChild(this.divCarrousel);
    document.body.appendChild(this.div);
    return this.divCarrousel;
  }

  static createCarrousel(movieData, container) {
    // for (let i = 0; i < movieData.length; i++) {
    console.log("FavMoviesArrayCreateCarrousel: " + movieData);
    let div = document.createElement("div");
    div.setAttribute("id", "carrouselElement")

    let img = view.createElement("img", div, null, "src", movieData.Poster);
    img.onerror = (e) => {
      e.target.setAttribute("src", "https://w.wallhaven.cc/full/3q/wallhaven-3qqlld.png");
    }
    view.createElement("p", div, movieData.Title);
    container.appendChild(div);
    // }
  }
  static createMoveCorruselMoviesButtoms(id, buttomFather) {

    let buttomRight = view.createElement("button", buttomFather, "button");
    let buttomLeft = view.createElement("button", buttomFather, "button");
    carrouselRightButtom(buttomLeft, id);
    carrouselLeftButtom(buttomRight, id);
  }
}
