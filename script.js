//TV Show Project
let allEpisodes = [];
const api_url = "https://api.tvmaze.com/shows/179/episodes";

function getAllEpisodes() {
  fetch(api_url)
    .then((response) => response.json())
    .then((episodesArray) => {
      allEpisodes = Array.from(episodesArray);
      makePageForEpisodes(episodesArray);
      makeDropdownMenu(allEpisodes);
    })
    .catch((error) => console.log(error));
}

const episodeContainer = document.getElementById("cardContainer");
const rootElem = document.getElementById("root");
const searchInput = document.getElementById("searchEpisode");
const episodesCount = document.getElementById("searchResult");
const viewAllEpisodesButton = document.getElementById("viewAllEpisodes");
const selectOption = document.getElementById("selectOption");

function setup() {
  makePageForEpisodes(allEpisodes);
}

// display all episodes //

function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";
  episodeList.forEach((episode) => createCard(episode));
  episodesCount.innerText = `Displaying ${episodeList.length}/${allEpisodes.length}`;
}

// create card //

function createCard(episode) {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("cardDiv");
  let cardHeader = document.createElement("div");
  cardHeader.classList.add("cardHeader");
  let episodeTitle = document.createElement("h2");
  let episodeSeason = document.createElement("h3");
  let cardImg = document.createElement("img");
  let summary = document.createElement("p");
  episodeTitle.textContent = episode.name;
  episodeSeason.textContent = `${formatedEpisodeNum(
    episode.season,
    episode.number
  )}`;
  cardImg.src = episode.image.medium;
  summary.innerHTML = episode.summary;
  cardHeader.appendChild(episodeTitle);
  cardHeader.appendChild(episodeSeason);
  cardDiv.appendChild(cardHeader);
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(summary);
  rootElem.appendChild(cardDiv);
}

// Format season and episode numbers to 2 digits //

function formatedEpisodeNum(season, episode) {
  if (season.toString().length < 2) {
    season = "0" + season;
  }
  if (episode.toString().length < 2) {
    episode = "0" + episode;
  }
  return `S${season}E${episode}`;
}

// Add search functionality //

searchInput.addEventListener("keyup", searchTerm);

function searchTerm() {
  let termSearched = searchInput.value.toLowerCase();
  let matchingEpisodes = allEpisodes.filter((episode) => {
    return (episode.summary + episode.name)
      .toLowerCase()
      .includes(termSearched);
  });
  makePageForEpisodes(matchingEpisodes);
}

// Add dropdown menu //

let selectDropdown = document.getElementById("selectedEpisode");
console.log(allEpisodes);

function makeDropdownMenu() {
  for (let i = 0; i < allEpisodes.length; i++) {
    let dropDownList = document.createElement("option");

    selectDropdown.appendChild(dropDownList);
    Option.value = `S${allEpisodes[i].season
      .toString()
      .padStart(2, "0")}E${allEpisodes[i].number
      .toString()
      .padStart(2, "0")} - ${allEpisodes[i].name}`;
    dropDownList.innerText = Option.value;
  }
}
makeDropdownMenu();

//Displays the selected episode from the dropdown menu//

selectDropdown.addEventListener("change", function (e) {
  let theEpisode = e.target.value;
  console.log(selectDropdown);
  theEpisode = theEpisode.slice(0, 6);
  let episodes = document.querySelectorAll(".cardDiv");

  Array.from(episodes).forEach(function (episode) {
    if (episode.innerText.includes(theEpisode)) {
      episode.style.display = "block";
    } else {
      episode.style.display = "none";
    }
  });
});
// add button to go back to all episodes //

viewAllEpisodesButton.addEventListener("click", (e) => {
  makePageForEpisodes(allEpisodes);
});

window.onload = getAllEpisodes();
