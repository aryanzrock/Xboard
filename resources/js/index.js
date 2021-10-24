let ID = () => Math.random().toString(36).substr(2, 9);

let createCard = (item) =>
  $(
    `<a href="${item["link"]}"  target="_blank">
    <div class="card d-block">
  <img class="card-img-top img-fluid" src="${
    item["enclosure"]["link"]
  }" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${item["title"]}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${
      item["author"]
    } <i class="fas fa-circle" id = "circle"></i>${
      item["pubDate"].split(" ")[0]
    }</h6>
    <p class="card-subtitle text-secondary"></p>
    <p class="card-text">${item["description"]}</p>
    
  </div>
  </div>
  </a>`
  );
let createAccordion = (title, id) =>
  $(
    `<button onclick = "myFunc()" class="btn my-2 " data-toggle="collapse" data-target="#${id}"><i class ="fas fa-angle-up" ></i> ${title}</button>
  <div id="${id}" class="collapse show">
  </div>`
  );
let myFunc = () => {
  let data = Array.from(document.getElementsByTagName("i"));
  console.log(data);
  data.forEach((ele) => {
    if (ele.className === "fas fa-angle-up") {
      ele.className = "fas fa-angle-down";
    } else {
      ele.className = "fas fa-angle-up";
    }
  });
};

let createCarouselOuter = (id, innerId) =>
  $(
    `<div id="${id}" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner" id="${innerId}">
  </div>
  <a class="carousel-control-prev" href="#${id}" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#${id}" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  </div>`
  );

let createCarouselInner = (id, active) =>
  $(
    `<div class="carousel-item ${active ? "active" : ""}" id="${id}">
  </div>`
  );

for (i in magazines) {
  let url = magazines[i];
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Create accordion
      let accordionId = ID();
      let accordion = createAccordion(data["feed"]["title"], accordionId);
      $("#feedData").append(accordion);

      // Create carousel
      let carouselId = ID();
      let carouselInnerId = ID();
      let carousel = createCarouselOuter(carouselId, carouselInnerId);
      $(`#${accordionId}`).append(carousel);

      // Add the cards in the carousel
      let items = data["items"];
      for (j in items) {
        let card = createCard(items[j]);
        let innerCarouselCardId = ID();
        let innerCarouselCard = createCarouselInner(
          innerCarouselCardId,
          j == 0
        );
        $(`#${carouselInnerId}`).append(innerCarouselCard);
        $(`#${innerCarouselCardId}`).append(card);
      }
    });
}
