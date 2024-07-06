import { rl } from "./startGame.js";
import { endGame } from "./endGame.js";

export function frame(game) {
    if (game.currentFrame == 10) {
        return endGame(game)
    }

    var currentPlayer = game.players[game.currentPlayer];
    if (game.currentPlayer == 0 && currentPlayer.try == 0) {
        console.log(`Frame ${game.currentFrame + 1}, lancer ${game.currentTurn + 1}`);
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
        } else {
            currentPlayer.framesScore[game.currentFrame] += skittlesAmount;
            currentPlayer.try = 0;
            incrementValues(game);
            return frame(game)
        }
    });
}

function totalScore(game) {
    
}

function incrementValues(game) {

    game.currentPlayer++;
    if (game.currentPlayer >= game.playerAmount) {
        console.log("");
        game.currentPlayer = 0;
        game.currentTurn++;
        if (game.currentTurn > 1) {

            console.log(`Score après le frame ${game.currentFrame} : `)
            for (let index = 0; index < game.playerAmount; index++) {
                console.log(`${game.players[index].playerName}: ${game.players[index].framesScore[game.currentFrame]}`)
            }
            console.log("");

            game.currentTurn = 0;
            game.currentFrame++;
        }
    }

}