//TV Show Project
const allShows = getAllShows();
let allEpisodes;

const api_url = "https://api.tvmaze.com/shows/179/episodes";
const episodeContainer = document.getElementById("cardContainer");
const rootElem = document.getElementById("root");
const searchEpisodeInput = document.getElementById("searchEpisode");
const searchShowInput = document.getElementById("searchShow");
const showCount = document.getElementById("searchResultShows");
const episodesCount = document.getElementById("searchResultEpisodes");
const viewAllShowsButton = document.getElementById("viewAllShows");
const viewAllEpisodes = document.getElementById("viewAllEpisodes");
const showDropdown = document.getElementById("showDropdown");
let episodeDropdown = document.getElementById("selectedEpisode");

//--------------------Sort shows alphabetically----------------

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

// ------------------Fetch data from API--------------------------

function loadShows(url) {
  return fetch(url).then((response) => response.json());
}

//-------------------Setup the page onload------------------------

function setup() {
  hideEpisodeParts();
  makePageForShows(allShows);
  makeTvShowDropdownMenu();
}

// -----------------Display all shows-----------------------------

const imageNotAvailable =
  "https://sainfoinc.com/wp-content/uploads/2018/02/image-not-available.jpg";

function makePageForShows(showList) {
  rootElem.innerHTML = "";

  showCount.innerText = `Displaying ${showList.length} shows`;
  showCount.style.color = "white";
  showCount.style.padding = "20px";

  showList.forEach(function (show) {
    const showCard = document.createElement("div");
    const showCardHeader = document.createElement("div");
    showCard.appendChild(showCardHeader);

    let showTitle = document.createElement("h2");
    showTitle.classList.add("showTitle");
    const showLink = document.createElement("a");
    showLink.classList.add("showLink");
    showLink.href = "#";
    showLink.textContent = show.name;
    showLink.id = show.id;

    showTitle.appendChild(showLink);
    showCardHeader.appendChild(showTitle);

    const showImage = document.createElement("img");
    showImage.setAttribute(
      "src",
      show.image ? show.image.medium : imageNotAvailable
    );
    showCard.appendChild(showImage);
    showInfo = document.createElement("div");
    showInfo.innerHTML = `<strong><p>${show.genres} | Rating:
    ${show.rating.average} | ${show.runtime}min | ${show.status}</p></strong>`;
    showCard.appendChild(showInfo);

    const showSummary = document.createElement("p");
    showSummary.innerHTML = show.summary;
    showCard.appendChild(showSummary);

    rootElem.appendChild(showCard);
  });

  linksCliked = document.querySelectorAll(".showLink");
  linksCliked.forEach((link) => link.addEventListener("click", showCliked));
}
//  ----------Display Episodes when show is clicked---------

function showCliked(event) {
  episodeDropdown.innerHTML = "";
  let showId = event.target.id;
  // console.log(showId);
  loadShows(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(data);
      makeEpisodeMenu(data);
      displayEpisodeParts();
      hideShowParts();
    })
    .catch((error) => console.log(error));
  episodeDropdown.value = showId;
}

// ----------------Make page for episodes----------------------------

function makePageForEpisodes(episodes) {
  rootElem.innerHTML = "";
  episodes.forEach((episode) => createCard(episode));
  episodesCount.innerText = `Displaying ${episodes.length}/${allEpisodes.length} episodes`;
  episodesCount.style.color = "white";
  episodesCount.style.padding = "20px";
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
    loadShows(url)
      .then((data) => {
        allEpisodes = data;
        makePageForEpisodes(data);
        makeEpisodeMenu(data);
        hideShowParts();
        displayEpisodeParts();
      })
      .catch((error) => console.log(error));
  });
}

// -------------hide shows button -----------------------------------------

function hideShowParts() {
  showDropdown.style.display = "none";
  searchShowInput.style.display = "none";
  showCount.style.diplay = "none";
}

// //--------------hide episodes select and search ----------------------

function hideEpisodeParts() {
  episodeDropdown.style.display = "none";
  searchEpisodeInput.style.display = "none";
  episodesCount.style.display = "none";
}

// //--------------display episodes select and search --------------------

function displayEpisodeParts() {
  episodeDropdown.style.display = "";
  searchEpisodeInput.style.display = "";
  episodesCount.style.display = "";
}
// //--------------display shows select and search ------------------------

function displayShowsParts() {
  showDropdown.style.display = "";
  searchShowInput.style.display = "";
  showCount.style.display = "";
}

// -------------------create card for episodes -----------------------------

function createCard(episode) {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("cardDiv");
  let cardHeader = document.createElement("div");
  cardHeader.classList.add("cardHeader");
  let episodeTitle = document.createElement("h3");
  let episodeSeason = document.createElement("h3");
  let cardImg = document.createElement("img");
  let summary = document.createElement("p");
  episodeTitle.textContent = episode.name;
  episodeSeason.textContent = `${formatedEpisodeNum(
    episode.season,
    episode.number
  )}`;
  // cardImg.src = episode.image.medium;
  cardImg.setAttribute(
    "src",
    episode.image ? episode.image.medium : imageNotAvailable
  );
  summary.innerHTML = episode.summary;
  cardHeader.appendChild(episodeTitle);
  cardHeader.appendChild(episodeSeason);
  cardDiv.appendChild(cardHeader);
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(summary);
  rootElem.appendChild(cardDiv);
}

//--------Format season and episode numbers to 2 digits-------

function formatedEpisodeNum(season, episode) {
  if (season.toString().length < 2) {
    season = "0" + season;
  }
  if (episode.toString().length < 2) {
    episode = "0" + episode;
  }
  return `S${season}E${episode}`;
}

// ------------search for shows-------------------------------

searchShowInput.addEventListener("input", searchShow);

function searchShow(e) {
  const searchBoxValue = e.target.value.toLowerCase();
  let matchingShows = allShows.filter((show) => {
    return (show.name + show.genre + show.summary)
      .toLowerCase()
      .includes(searchBoxValue);
  });
  makePageForShows(matchingShows);
}

//------------Search for episodes--------------------------------------

searchEpisodeInput.addEventListener("input", searchEpisode);

function searchEpisode() {
  let termSearched = searchEpisodeInput.value.toLowerCase();
  let matchingEpisodes = allEpisodes.filter((episode) => {
    return (episode.summary + episode.name)
      .toLowerCase()
      .includes(termSearched);
  });
  makePageForEpisodes(matchingEpisodes);
}

// ----------Add dropdown menu to select an episode--------------------

function makeEpisodeMenu(data) {
  episodeDropdown.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let dropDownList = document.createElement("option");

    episodeDropdown.appendChild(dropDownList);
    Option.value = `S${data[i].season.toString().padStart(2, "0")}E${data[
      i
    ].number
      .toString()
      .padStart(2, "0")} - ${data[i].name}`;
    dropDownList.innerText = Option.value;
  }
}

//-----Displays the selected episode from the dropdown menu-------

episodeDropdown.addEventListener("change", function (e) {
  theEpisode = e.target.value;
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

//------------add button to go back to all shows-------------------

viewAllShowsButton.addEventListener("click", viewAllShows);

function viewAllShows() {
  makePageForShows(allShows);
  hideEpisodeParts();
  displayShowsParts();
}
// -------------- add button to go back to all episodes---------------

viewAllEpisodes.addEventListener("click", viewEpisodes);

function viewEpisodes() {
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;
