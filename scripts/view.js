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
    let numDataMovie = ["Title", "Year", "Director", "Actors", "Plot", "Ratings"];
    let detailView = document.createElement("div");
    let movieData = document.createElement("div");

    this.createElement("img", detailView, null, "src", data.Poster);

    for (let i = 0; i < numDataMovie.length; i++) {
      if (i == 0) {
        this.createElement("h1", movieData, data[numDataMovie[i]]);

      } else if (i == numDataMovie.length - 1) {
        for (let j = 0; j < data.Ratings.length; j++) {
          this.createElement("p", movieData, data.Ratings[j].Source + ": " + data.Ratings[j].Value);
        }

      } else {
        this.createElement("p", movieData, numDataMovie[i] + ": " + data[numDataMovie[i]], movieData);
      }
    }

    let closeDetailButtom = this.createElement("button", detailView, "X", "id", "closeDetail")
    closeDetail(closeDetailButtom);

    detailView.setAttribute("id", "itemDetail");
    detailView.appendChild(movieData);
    document.body.appendChild(detailView);
  }

  static report(votes, offices, rankings) {
    let reportView = document.createElement("div");
    let votesDiv = document.createElement("div");
    let officesDiv = document.createElement("div");
    let rankingsDiv = document.createElement("div");
    reportView.setAttribute("id", "reportView");

    this.createElement("h1", votesDiv, "Más Votadas");
    votesDiv.appendChild(this.reportVotes(votes, "votes", votesDiv));
    reportView.appendChild(votesDiv);

    this.createElement("h1", officesDiv, "Más Taquilleras");
    //Quitar este if cuando cambie como procesa los datos de las peliculas (las peliculas más algo viene de hacer la media de los resultados obtenidos y no mediante datos aleatorios harcodeados)
    if (offices.length != 0) {
      officesDiv.appendChild((this.reportVotes(offices, "offices", officesDiv)));
      reportView.appendChild(officesDiv);
    }

    this.createElement("h1", rankingsDiv, "Mejor Valoradas");
    rankingsDiv.appendChild(this.reportVotes(rankings, "rankings", rankingsDiv));
    reportView.appendChild(rankingsDiv);
    document.body.appendChild(reportView);
    // console.log(votesDiv.getBoundingClientRect())
    console.log(document.getElementById("carrouselElement").getBoundingClientRect())
  }

  static reportVotes(votes, id, buttomFather) {
    console.log("reportvotes: ", votes)
    let votesDiv = document.createElement("div");
    votesDiv.setAttribute("id", `movieCarrousel${id}`);
    votesDiv.setAttribute("class", `movieCarrousel`);
    for (let i = 0; i < votes.length; i++) {
      let div = document.createElement("div", `movieCarrousel${id}`);
      div.setAttribute("id", "carrouselElement")
      this.createElement("img", div, null, "src", votes[i][0].img);
      this.createElement("p", div, votes[i][0].title);
      console.log(votes[i][0].title);
      votesDiv.appendChild(div);
    }

    if (votes.length > 8) {
      let buttomRight = this.createElement("button", buttomFather, "button", "id", "carrouselRightButtom");
      let buttomLeft = this.createElement("button", buttomFather, "button", "id", "corrouselLeftButtom");
      carrouselRightButtom(buttomLeft, `movieCarrousel${id}`);
      carrouselLeftButtom(buttomRight, `movieCarrousel${id}`);
    }
    return votesDiv;
  }

  static createElement(tagName, father, content = null, attribute = null, attributeValue = null) {
    let element = document.createElement(tagName);
    father.appendChild(element);
    if (content != null) {
      element.textContent = content;
    } else if (attribute != null) {
      element.setAttribute(attribute, attributeValue)
    }

    return element;
  }
} 
