//TV Show Project
const allShows = getAllShows();
// console.log(allShows);
let allEpisodes = [];
const api_url = "https://api.tvmaze.com/shows/179/episodes";
const episodeContainer = document.getElementById("cardContainer");
const rootElem = document.getElementById("root");
const searchInput = document.getElementById("searchEpisode");
const episodesCount = document.getElementById("searchResult");
const viewAllEpisodesButton = document.getElementById("viewAllEpisodes");
const showDropdown = document.getElementById("showDropdown");

//--------------------sort shows alphabetically----------------

allShows.sort((a, b) => {
  let showA = a.name.toLowerCase();
  let showB = b.name.toLowerCase();
  if (showA < showB) {
    return -1;
  }
  if (showA > showB) {
    return 1;
  }
  return 0;
});
// console.log(allShows);

// ------------------Fetch data from API----------------------------

function getAllEpisodes(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allEpisodes = Array.from(data);
      makePageForEpisodes(data);
      makeEpisodeMenu(data); //(allEpisodes);
    })
    .catch((error) => console.log(error));
}

function setup() {
  makePageForEpisodes(allEpisodes);
  makeTvShowDropdownMenu();
}

// -----------------display all episodes-----------------------------

function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";
  episodeList.forEach((episode) => createCard(episode));
  episodesCount.innerText = `Displaying ${episodeList.length}/${allEpisodes.length}`;
}
//--------------- creates show dropdown menu-------------------------
function makeTvShowDropdownMenu() {
  allShows.forEach((show) => {
    const showOption = document.createElement("option");
    showOption.textContent = show.name;
    showOption.value = show.id;
    showDropdown.appendChild(showOption);
  });

  showDropdown.addEventListener("change", function (e) {
    let showId = e.target.value;
    const url = `https://api.tvmaze.com/shows/${showId}/episodes`;
    getAllEpisodes(url);
  });
}
// -------------------create card //--------------------------------

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

//--------Format season and episode numbers to 2 digits---------------

function formatedEpisodeNum(season, episode) {
  if (season.toString().length < 2) {
    season = "0" + season;
  }
  if (episode.toString().length < 2) {
    episode = "0" + episode;
  }
  return `S${season}E${episode}`;
}

// ------------Add search functionality //----------------------------

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

// ------Add dropdown menu to select an episode---------------

let episodeDropdown = document.getElementById("selectedEpisode");

function makeEpisodeMenu() {
  for (let i = 0; i < allEpisodes.length; i++) {
    let dropDownList = document.createElement("option");

    episodeDropdown.appendChild(dropDownList);
    Option.value = `S${allEpisodes[i].season
      .toString()
      .padStart(2, "0")}E${allEpisodes[i].number
      .toString()
      .padStart(2, "0")} - ${allEpisodes[i].name}`;
    dropDownList.innerText = Option.value;
  }
}
makeEpisodeMenu();

//-----Displays the selected episode from the dropdown menu-------

episodeDropdown.addEventListener("change", function (e) {
  let theEpisode = e.target.value;
  console.log(episodeDropdown);
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
//------------add button to go back to all episodes-------------------

viewAllEpisodesButton.addEventListener("click", (e) => {
  makePageForEpisodes(allEpisodes);
});

window.onload = setup;
