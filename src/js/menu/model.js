export class MenuModel {
    constructor()
    {
        this.timePassed = 0;    // in seconds
    }

    increaseTime()
    {
        this.timePassed++;
    }
}

export function calculateMaxMines(width, height)
{
    return Math.floor((width * height) / 2) - 1;
}