class view {

  img = document.getElementsByTagName("img");
  caratula;
  title;
  year;
  type;
  divP;

  static createElements() {
    this.div = document.createElement("div");
    this.caratula = document.createElement("img");
    this.divP = document.createElement("div");
    this.title = document.createElement("p");
    this.year = document.createElement("p");
    // this.type = document.createElement("p");
    this.addAttribute(this.divP);
  }


  static addAttribute(item) {
    item.setAttribute("id", "movInf");
  }

  static apendJsonElement(container) {
    this.div.appendChild(this.caratula);
    this.divP.appendChild(this.title);
    this.divP.appendChild(this.year);
    // this.divP.appendChild(this.type);
    this.div.appendChild(this.divP);
    container.appendChild(this.div);
  }


  static insertJsonContent(data, i) {
    this.title.textContent = data.Search[i].Title;
    this.year.textContent = data.Search[i].Year;
    // this.type.textContent = data.Search[i].Type;

    this.caratula.setAttribute("src", data.Search[i].Poster);
    this.caratula.setAttribute("id", data.Search[i].imdbID);

    this.caratula.onerror = (e) => {
      e.target.setAttribute("src", "https://w.wallhaven.cc/full/3q/wallhaven-3qqlld.png");
    }

    let caratula = this.caratula;
    imageClick(caratula, data);
  }

  static reload(id) {
    let superDiv = document.getElementById(id);

    if (superDiv != null) {
      while (superDiv.firstChild) {
        superDiv.removeChild(superDiv.firstChild);
      }
      if (id !== "superDiv")
        superDiv.remove();
    }

  }

  static displayFilms(dataFilms, container) {
    if (dataFilms.Response !== "False") {
      for (let i = 0; i < dataFilms.Search.length; i++) {
        this.createElements();
        this.insertJsonContent(dataFilms, i);
        this.apendJsonElement(container);
      }
    }
  }

  static itemDetail(id, data) {
    let detailView = document.createElement("div");
    let movieData = document.createElement("div");
    let img = document.createElement("img");

    let title = document.createElement("h2");
    let year = document.createElement("p");
    let director = document.createElement("p");
    let actors = document.createElement("p");
    let sinopsis = document.createElement("p");

    let closeDetailButtom = document.createElement("button");
    closeDetailButtom.textContent = "X";
    closeDetailButtom.setAttribute("id", "closeDetail");
    closeDetail(closeDetailButtom);

    movieData.appendChild(title);
    movieData.appendChild(year);
    movieData.appendChild(director);
    movieData.appendChild(actors);
    movieData.appendChild(sinopsis);

    title.textContent = "Title: " + data.Title;
    year.textContent = "Year: " + data.Year;
    director.textContent = "Director: " + data.Director;
    actors.textContent = "Actors: " + data.Actors;
    sinopsis.textContent = "Plot: " + data.Plot;
    // Esto es del div
    detailView.setAttribute("id", "itemDetail");
    console.log(data);

    for (let i = 0; i < data.Ratings.length; i++) {
      let rating = document.createElement("p");
      movieData.appendChild(rating);
      rating.textContent = data.Ratings[i].Source + ": " + data.Ratings[i].Value;
      console.log(data.Ratings[i].Source, data.Ratings[i].Value);
    }
    // Esto es de la imagen
    img.setAttribute("src", data.Poster);

    detailView.appendChild(img);
    detailView.appendChild(movieData);
    detailView.appendChild(closeDetailButtom);
    document.body.appendChild(detailView);
  }
} 
