//You can edit ALL of the code here

let allEpisodes = getAllEpisodes();
// let episode = document.createElement("div");

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

    // Adds search feature
    // This function was working just fine but suddlenly the search box kind
    // of become "slow" for example if I am typing "king" it shows k and then
    // it takes ages for the other letters to appear. I am sure I didn't change
    // anything but not sure what messed it up :(

    const searchBox = document.forms["search-episodes"].querySelector("input");
    searchBox.addEventListener("keyup", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      let searchResults = document.getElementById("searchResult");
      let episodes = document.querySelectorAll(".card");

      let newArrayOfEpisodes = Array.from(episodes);

      newArrayOfEpisodes.forEach(function (episode) {
        if (episode.innerText.toLowerCase().includes(searchTerm)) {
          episode.style.display = "block";
        } else {
          episode.style.display = "none";
        }
      });
      let filteredListOfEpisodes = newArrayOfEpisodes.filter(
        (item) => (item.style.display = "block")
      );
      searchResults.innerText = `Displaying ${filteredListOfEpisodes.length}/${episodes.length} episodes`;
    });
  });

  // Adds an Episode Selector

  let selectInput = document.getElementById("selectedEpisode");

  selectInput.addEventListener("click", function () {
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
  });

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
