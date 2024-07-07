import { totalScore } from "./gameLoop.js";

// function that display the end of the game with the points and the winner
// input : game object

export function endGame(game) {
    console.log("Score final : ")
    let score = 0;
    let player = 0;
    for (let index = 0; index < game.playerAmount; index++) {
        let scorePlayer = totalScore(game, index);
        if (scorePlayer > score) {
            player = index;
            score = scorePlayer;
        }
    }
    console.log("");
    console.log(`${game.players[player].playerName} est le/la gagnant(e) !`)
}