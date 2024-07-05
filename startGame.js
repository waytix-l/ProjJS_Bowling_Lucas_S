import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// create a variable that represent the game
// output : game object
export function createGame() {
    return {
        players: []
    }    
}

// function that allow to start the game
// input : game object
export function startGame(game) {

    console.log("Démarrez une nouvelle partie de bowling.");
    rl.question('Entrez le nombre de joueurs : ', (playerAmount) => {

        playerAmount = parseInt(playerAmount);
        if (playerAmount < 1) {
            console.log("Il n'y a pas assez de joueurs, entrez un nombre de joueurs compris entre 1 et 6");
            return startGame(game)
        } else if (playerAmount > 6) {
            console.log("Il y a trop de joueurs, entrez un nombre de joueurs compris entre 1 et 6");
            return startGame(game)
        }

        addPlayer(game, 1, playerAmount);

    });

}

// create a player
// input : name
// output : player object
function createPlayer(playerName) {

    return {
        playerName : playerName,
        framesScore : Array.from({length: 10}, () => []),
        totalScore : 0
    }

}

// add player to the game
// input : game, the actual player and the amount of players
function addPlayer(game, actualPlayer, playerAmount) {

    rl.question(`Entrez le nom du joueur ${actualPlayer} : `, (playerName) => {
        game.players.push(createPlayer(playerName));
        actualPlayer++;
        if (actualPlayer > playerAmount) {
            console.log(game);
        } else {
            addPlayer(game, actualPlayer, playerAmount);
        }
    })

}