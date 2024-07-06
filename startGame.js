import readline from 'readline';
import { frame } from './gameLoop.js';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// create a variable that represent the game
// output : game object
export function createGame() {
    return {
        players: [],
        playerAmount: 0,
        currentFrame: 0,
        currentTurn: 0,
        currentPlayer: 0
    }    
}

// function that allow to start the game
// input : game object
export function startGame(game) {

    console.log("\n\n\nDémarrez une nouvelle partie de bowling.");
    rl.question('Entrez le nombre de joueurs : ', (playerAmount) => {

        game.playerAmount = parseInt(playerAmount);

        if (game.playerAmount < 1) {
            console.log("Il n'y a pas assez de joueurs, entrez un nombre de joueurs compris entre 1 et 6");
            return startGame(game)
        } else if (game.playerAmount > 6) {
            console.log("Il y a trop de joueurs, entrez un nombre de joueurs compris entre 1 et 6");
            return startGame(game)
        } else if (isNaN(game.playerAmount)) {
            console.log("Veuillez entrer un nombre");
            return startGame(game)
        }

        console.log("");
        addPlayer(game, 1);

    });

}

// create a player
// input : name
// output : player object
function createPlayer(playerName) {

    return {
        playerName : playerName,
        try: 0,
        framesScore : Array(10).fill(0),
        totalScore : 0
    }

}

// add player to the game
// input : game object, the actual player index and the amount of players
function addPlayer(game, actualPlayer) {

    rl.question(`Entrez le nom du joueur ${actualPlayer} : `, (playerName) => {
        game.players.push(createPlayer(playerName));
        actualPlayer++;
        if (actualPlayer > game.playerAmount) {
            console.log("");
            frame(game);
        } else {
            addPlayer(game, actualPlayer);
        }
    })

}