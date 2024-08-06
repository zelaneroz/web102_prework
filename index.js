/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    //document.createElement()
    //element.innerHTML
    //element.classList.add()
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML='';

    for(let i=0;i<games.length; i++){
        const game = games[i];
        const gameElement = document.createElement('div');
        gameElement.classList.add('game-card');
        gameElement.innerHTML= `
            <img class="game-img" src="${game.img}">
            <h2>${game.name}</h2>
            <p>${game.description}</p>
        `;
        gamesContainer.appendChild(gameElement);
    }
}
addGamesToPage(GAMES_JSON)

const totalGames = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

const totalRaised = GAMES_JSON.reduce((total_pledges, game) => {
    return total_pledges + game.pledged;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;
raisedCard.innerHTML = `${totalRaised.toLocaleString()}`;
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter( (game) => {return game.pledged < game.goal});
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter( (game) => {return game.pledged >= game.goal});
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click',filterUnfundedOnly);
fundedBtn.addEventListener('click',filterFundedOnly);
allBtn.addEventListener('click',showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

const descriptionContainer = document.getElementById("description-container");

// Calculate total amount pledged
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const totalPledged = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
const totalGamesCount = GAMES_JSON.length;

const summary = `
    A total of $${totalPledged.toLocaleString()} has been raised for ${totalGamesCount} game${totalGamesCount !== 1 ? 's' : ''}.
    Currently, ${unfundedGamesCount} game${unfundedGamesCount !== 1 ? 's' : ''} remain unfunded. We need your help to fund these amazing games.
`;

const paragraph = document.createElement('p');
paragraph.innerHTML = summary;
descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [{ name: name1}, { name: name2}] = sortedGames;

// Create and set up the second game element
const secondGame = document.createElement('div');


const firstGame = document.createElement('div');
firstGame.innerHTML = `
    <h4>${name1}</h4>
`;

secondGame.innerHTML = `
    <h4>${name2}</h4>
`;


firstGameContainer.appendChild(firstGame);
secondGameContainer.appendChild(secondGame);

