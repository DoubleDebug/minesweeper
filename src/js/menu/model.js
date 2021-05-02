export class MenuModel {
    constructor()
    {
        this.timePassed = 0;    // in seconds
        this.menuToggled = false;
    }

    increaseTime()
    {
        this.timePassed++;
    }
}