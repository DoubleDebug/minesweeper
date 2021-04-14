export class GameModel {
    constructor()
    {
        this.state = 'none';
    }

    startGame() {
        this.state = 'ongoing';
    }

    gameOver() {
        this.state = 'over';
    }
}