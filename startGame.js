import readline from 'readline';

export function startGame() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('Entrez votre texte : ', (answer) => {
        console.log(`${answer}`);
        rl.close();
    });

}
