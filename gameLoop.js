import { rl } from "./startGame.js";
import { endGame } from "./endGame.js";

// function that represent a frame of the game
// inputs : the game object and a number
// special : 0 = normal, 1 = spare, 2 = strike

export function frame(game) {

    var currentPlayer = game.players[game.currentPlayer];

    breakme: {
        let extra = 0;
        if (game.currentFrame == 10) {
            for (let index = 0; index < game.players.length; index++) {
                if (game.players[index].special > 0) {
                    currentPlayer = game.players[index];
                    break breakme;
                } else {
                    continue
                }
            }
            if (extra == 0) {
                return endGame(game);
            }
        }
    }
    

    if (game.currentFrame > 10) {
        return endGame(game)
    }

    
    if (game.currentPlayer == 0 && currentPlayer.try == 0) {
        console.log(`Frame ${game.currentFrame + 1}, lancer ${game.currentTurn + 1}`);
    }
    if (currentPlayer.framesScore[game.currentFrame] == 10) {
        currentPlayer.try = 0;
        incrementValues(game);
        return frame(game, 0)
    }
    rl.question(`${currentPlayer.playerName}, combien de quilles avez-vous renversé ? `, (skittlesAmount) => {
        currentPlayer.try++;
        skittlesAmount = parseInt(skittlesAmount);
        if (isNaN(skittlesAmount)) {
            console.log("Veuillez entrer un nombre valide");
            return frame(game)
        } 
        if (skittlesAmount < 0 || skittlesAmount > (10 - currentPlayer.framesScore[game.currentFrame])) {
            console.log(`Veuillez entrer un nombre compris entre 0 et ${10 - (currentPlayer.framesScore[game.currentFrame])}`);
            return frame(game)
        } 

        breakme: {
            if (game.currentFrame == 3) {
                break breakme
            } else {
                currentPlayer.framesScore[game.currentFrame] += skittlesAmount;
            }
        }

        currentPlayer.try = 0;

        if (currentPlayer.special > 0) {
            currentPlayer.framesScore[game.currentFrame - 1] += skittlesAmount;
            currentPlayer.special--;
        }

        if (currentPlayer.framesScore[game.currentFrame] == 10 && game.currentTurn == 0) {
            console.log("strike");
            currentPlayer.special = 2;
            incrementValues(game);
            return frame(game)
        } 

        if (currentPlayer.framesScore[game.currentFrame] == 10) {
            console.log("spare");
            currentPlayer.special = 1;
            incrementValues(game);
            return frame(game)
        }

        incrementValues(game);
        return frame(game, 0)
    });

}

function incrementValues(game) {

    game.currentPlayer++;
    if (game.currentPlayer >= game.playerAmount) {
        console.log("");
        game.currentPlayer = 0;
        game.currentTurn++;
        if (game.currentTurn > 1) {

            console.log(`Score après le frame ${game.currentFrame + 1} : `)
            for (let index = 0; index < game.playerAmount; index++) {
                let sum = totalScore(game, index);
                console.log(`${game.players[index].playerName}: ${sum}`)
            }
            console.log("");

            game.currentTurn = 0;
            game.currentFrame++;
        }
    }

}

export function totalScore(game, player) {
    let sum = 0;
    for (let index = 0; index < game.players[player].framesScore.length; index++) {
        sum += game.players[player].framesScore[index];
    }
    return sum;
}
