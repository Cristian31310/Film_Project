console.log(peliculas);


const container = document.createElement("div");
container.style.display = "grid";
container.style.gridTemplateColumns = "1fr 1fr 1fr";
container.style.color = "white";
for (let i = 0; i < peliculas.Search.length; i++) {
    const div = document.createElement("div");
    const caratula = document.createElement("img");
    const title = document.createElement("p");
    const year = document.createElement("p");
    const type = document.createElement("p");
    title.textContent = peliculas.Search[i].Title;
    year.textContent = peliculas.Search[i].Year;
    type.textContent = peliculas.Search[i].Type;
    caratula.setAttribute("src", peliculas.Search[i].Poster);
    caratula.style.height = "500px";
    caratula.style.width = "340px";
    caratula.style.margin = "25px";
    div.style.textAlign = "center";
    div.appendChild(caratula);
    div.appendChild(title);
    div.appendChild(year);
    div.appendChild(type);
    container.appendChild(div);
    
}

document.body.appendChild(container);
document.body.style.backgroundImage = "url(./img/spaceBG.jpg)";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "100%";
document.body.style.backgroundSize = "100%";
document.body.style.backgroundAttachment = "fixed";