export { ViewReport };
import { view } from "./view.js";
import { carrouselLeftButtom, carrouselRightButtom, loadMoviesCarrousel } from "./eventos.js";
class ViewReport {

  static report(votes, offices, rankings) {
    this.deleteElement("loadingGif");
    let reportView = document.createElement("div");
    let votesDiv = document.createElement("div");
    let officesDiv = document.createElement("div");
    let rankingsDiv = document.createElement("div");
    reportView.setAttribute("id", "reportView");

    view.createElement("h1", votesDiv, "Más Votadas");
    votesDiv.appendChild(ViewReport.reportVotes(votes, "votes", votesDiv));
    reportView.appendChild(votesDiv);
    //Quitar este if cuando cambie como procesa los datos de las peliculas (las peliculas más algo viene de hacer la media de los resultados obtenidos y no mediante datos aleatorios harcodeados)
    // if (offices.length != 0) {
    //   officesDiv.appendChild((ViewReport.reportVotes(offices, "offices", officesDiv)));
    //   reportView.appendChild(officesDiv);
    // }


    view.createElement("h1", rankingsDiv, "Mejor Valoradas");
    rankingsDiv.appendChild(ViewReport.reportVotes(rankings, "rankings", rankingsDiv));
    reportView.appendChild(rankingsDiv);

    view.createElement("h1", officesDiv, "Más Taquilleras");
    officesDiv.appendChild((ViewReport.reportVotes(offices, "offices", officesDiv)));
    reportView.appendChild(officesDiv);
    console.log("office report: ", offices);
    document.body.appendChild(reportView);
    // console.log(votesDiv.getBoundingClientRect())
    // console.log(document.getElementById("carrouselElement").getBoundingClientRect())
  }

  static deleteElement(element) {
    let report = document.getElementById(element);
    if (report) {
      report.remove();
    }
  }

  static loadingPreview(div) {
    let loadingGif = view.createElement("img", div, null, "src", "img/loading-image.gif");
    loadingGif.setAttribute("id", "loadingGif");
  }
  static reportVotes(votes, id, buttomFather) {
    let div = document.createElement("div");
    div.setAttribute("id", `movieCarrousel${id}`);
    div.setAttribute("class", `movieCarrousel`);

    this.createCarrousel(votes, div);
    this.createMoveCorruselMoviesButtoms(votes, id, buttomFather);

    return div;
  }

  static async addMoreMoviesCarrosel(votes, id) {
    console.log("addMoreMoviesCarrosel, votes: ", await votes, " id: ", id);
    let carrousel = document.getElementById(id);
    this.createCarrousel(votes, carrousel)
  }

  static createCarrousel(votes, carrousel) {

    for (let i = 0; i < votes.length; i++) {
      console.log("FavMoviesArrayCreateCarrousel: " + votes);
      let div = document.createElement("div");
      div.setAttribute("id", "carrouselElement")
      let img = view.createElement("img", div, null, "src", votes[i][0].img);
      img.onerror = (e) => {
        e.target.setAttribute("src", "https://w.wallhaven.cc/full/3q/wallhaven-3qqlld.png");
      }
      view.createElement("p", div, votes[i][0].title);
      carrousel.appendChild(div);
    }
  }

  static createMoveCorruselMoviesButtoms(votes, id, buttomFather) {

    if (votes.length > 6) {
      let buttomRight = view.createElement("button", buttomFather, "button");
      let buttomLeft = view.createElement("button", buttomFather, "button");
      carrouselRightButtom(buttomLeft, `movieCarrousel${id}`);
      carrouselLeftButtom(buttomRight, `movieCarrousel${id}`);
    } else {
      loadMoviesCarrousel(id);
    }
  }
}
