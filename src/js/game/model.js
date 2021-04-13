export class GameModel {
    constructor()
    {
        this.state = 'none';
    }

    startGame() {
        this.state = 'started';
    }

    gameOver() {
        this.state = 'over';
    }
}