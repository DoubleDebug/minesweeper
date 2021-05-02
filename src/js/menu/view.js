export class MenuView {
    constructor(parent, model)
    {
        this.container = document.createElement('div');
        this.container.className = 'menu animate__animated animate__fadeInDown';
        this.container.style.width = this.container.style.maxWidth = document.querySelector('.gameGrid').clientWidth + 'px';
        this.parent = parent;
        this.model = model;
    }

    draw()
    {
        this.timeLabel = document.createElement('label');
        this.timeLabel.id = 'labelTime';
        this.timeLabel.innerHTML = '00:00';
        this.container.appendChild(this.timeLabel);

        const iconSettings = document.createElement('img');
        iconSettings.src = '../../images/icons/cog.svg';
        iconSettings.id = 'iconSettings';
        iconSettings.onclick = () => {
            iconSettings.classList.toggle('toggleOn');
            setTimeout(() => {
                iconSettings.classList.toggle('toggleOff');
            }, 500);
            this.drawSettings();
        };
        this.container.appendChild(iconSettings);

        this.parent.appendChild(this.container);
    }

    increaseTime()
    {
        const seconds = Math.round(this.model.timePassed % 60);
        const minutes = Math.round(this.model.timePassed / 60);

        const secondsFormatted = seconds.toString().padStart(2, '0');
        const minutesFormatted = minutes.toString().padStart(2, '0');

        this.timeLabel.innerHTML = `${minutesFormatted}:${secondsFormatted}`;
    }

    drawSettings()
    {
        const btnSave = document.createElement('button');
        btnSave.id = 'btnSave';
        btnSave.innerHTML = 'Save';
        this.container.appendChild(btnSave);
    }
}