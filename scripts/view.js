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

