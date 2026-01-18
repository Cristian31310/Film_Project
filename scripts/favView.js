class FavView {
  static createView(movieData) {
    // console.log(movieData.Poster);
    let div = document.createElement("div");
    let divCarrousel = document.createElement("div");
    div.setAttribute("id", "divFavView");
    view.createElement("h1", div, "Peliculas Favoritas");
    divCarrousel.setAttribute("id", "divFavViewCarrousel");
    this.createCarrousel(movieData, divCarrousel);
    this.createMoveCorruselMoviesButtoms(movieData, "favButtomCarrousel", div);
    div.appendChild(divCarrousel);
    document.body.appendChild(div);
  }


  static createCarrousel(movieData, container) {
    for (let i = 0; i < movieData.length; i++) {
      console.log("FavMoviesArrayCreateCarrousel: " + movieData);
      let div = document.createElement("div");
      div.setAttribute("id", "carrouselElement")

      let img = view.createElement("img", div, null, "src", movieData[i].Poster);
      img.onerror = (e) => {
        e.target.setAttribute("src", "https://w.wallhaven.cc/full/3q/wallhaven-3qqlld.png");
      }
      view.createElement("p", div, movieData[i].Title);
      container.appendChild(div);
    }
  }
  static createMoveCorruselMoviesButtoms(votes, id, buttomFather) {

    if (votes.length > 4) {
      let buttomRight = view.createElement("button", buttomFather, "button");
      let buttomLeft = view.createElement("button", buttomFather, "button");
      carrouselRightButtom(buttomLeft, `divFavViewCarrousel`);
      carrouselLeftButtom(buttomRight, `divFavViewCarrousel`);
    }// else {
    //   loadMoviesCarrousel(id);
    // }
  }
}
