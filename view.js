class view {

  img = document.getElementsByTagName("img");
  caratula;
  title;
  year;
  type;

  static createElements() {
    this.div = document.createElement("div");
    this.caratula = document.createElement("img");
    this.title = document.createElement("p");
    this.year = document.createElement("p");
    this.type = document.createElement("p");
  }


  static apendJsonElement(container) {
    this.div.appendChild(this.caratula);
    this.div.appendChild(this.title);
    this.div.appendChild(this.year);
    this.div.appendChild(this.type);
    container.appendChild(this.div);
  }

  static insertJsonContent(data, i) {
    this.title.textContent = data.Search[i].Title;
    this.year.textContent = data.Search[i].Year;
    this.type.textContent = data.Search[i].Type;

    this.caratula.setAttribute("src", data.Search[i].Poster);

    this.caratula.onerror = () => {
      this.caratula.setAttribute("src", "https://w.wallhaven.cc/full/3q/wallhaven-3qqlld.png");
      console.log("IMAGEN ERRROR => " + data.Search[i].Title);
    }
  }

  static reload() {
    let superDiv = document.getElementById("superDiv");
    while (superDiv.firstChild) {
      superDiv.removeChild(superDiv.firstChild);
    }
  }
  static displayFilms(dataFilms, container) {

    for (let i = 0; i < dataFilms.Search.length; i++) {
      this.createElements();
      this.insertJsonContent(dataFilms, i);
      this.apendJsonElement(container);
    }
  }
}
