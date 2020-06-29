//You can edit ALL of the code here
let allEpisodes = getAllEpisodes();
let episodes = document.querySelectorAll(".card");
const searchBox = document.forms["search-episodes"].querySelector("input");
let searchResults = document.getElementById("searchResult");

let goBack = document.querySelector("#go-back");
goBack.addEventListener("click", () => {
  makePageForEpisodes(allEpisodes);
});

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// display all episodes

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  getAllEpisodes().forEach((episode) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardHeader = document.createElement("div");
    const title = document.createElement("h3");
    const season = document.createElement("h4");
    const image = document.createElement("img");
    const summary = document.createElement("p");
    summary.style.textAlign = "justify";

    title.textContent = episode.name;
    season.textContent = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

    image.src = episode.image.medium;
    summary.innerHTML = episode.summary;

    cardHeader.appendChild(title);
    cardHeader.appendChild(season);
    cardHeader.classList.add("header-title");
    card.appendChild(cardHeader);
    card.appendChild(image);
    card.appendChild(summary);
    rootElem.appendChild(card);
  });

  // ADDS SEARCH FEATURE
  // stugglinh with this function. It was working fine at some point.
  // Then I dont know waht happened and the letters would take ages to appear when I type
  // I keep changing the code. When I fix one part the other
  //  part does not work and vice-versa.

  searchBox.addEventListener("keyup", function (e) {
    const searchTerm = e.target.value.toLowerCase();

    let episodes = document.querySelectorAll(".card");
    newArrayOfEpisodes = Array.from(episodes);

    newArrayOfEpisodes.forEach(function (episode) {
      if (episode.innerText.toLowerCase().includes(searchTerm)) {
        episode.style.display = "block";
      } else {
        episode.style.display = "none";
      }
      let filteredEpisodes = newArrayOfEpisodes.filter(function (element) {
        element.style.display === "block";
      });

      searchResults.innerText = `Displaying ${filteredEpisodes.length}/${episodes.length} episodes`;
    });
  });

  // ADDS AN EPISODE SELECTOR

  let selectInput = document.getElementById("selectedEpisode");

  for (let i = 0; i < allEpisodes.length; i++) {
    let dropDownList = document.createElement("option");

    selectInput.appendChild(dropDownList);
    Option.value = `S${allEpisodes[i].season
      .toString()
      .padStart(2, "0")}E${allEpisodes[i].number
      .toString()
      .padStart(2, "0")} - ${allEpisodes[i].name}`;

    dropDownList.innerText = Option.value;
  }

  selectInput.addEventListener("change", function (e) {
    let theEpisode = e.target.value;

    theEpisode = theEpisode.slice(0, 6);
    let episodes = document.querySelectorAll(".card");

    Array.from(episodes).forEach(function (episode) {
      if (episode.innerText.includes(theEpisode)) {
        episode.style.display = "block";
      } else {
        episode.style.display = "none";
      }
    });
  });
}

window.onload = setup;
