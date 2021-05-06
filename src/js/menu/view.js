export class MenuView {
    constructor(parent, model)
    {
        const settingsWidth =  document.querySelector('.gameGrid').clientWidth + 'px';

        this.container = document.createElement('div');
        this.container.className = 'menu animate__animated animate__fadeInDown';
        this.container.style.width = this.container.style.maxWidth = settingsWidth;
        this.parent = parent;
        this.model = model;
        
        this.draw();

        // draw settings
        this.settingsContainer = document.createElement('div');
        this.settingsContainer.className = 'settingsContainer';
        this.settingsContainer.style.width = settingsWidth;
        this.container.appendChild(this.settingsContainer);
        this.drawSettings();
    }

    draw()
    {
        this.timeLabel = document.createElement('label');
        this.timeLabel.id = 'labelTime';
        this.timeLabel.innerHTML = '00:00';
        this.container.appendChild(this.timeLabel);

        const iconSettingsObject = document.createElement('object');
        iconSettingsObject.data = '../../images/icons/cog.svg';
        iconSettingsObject.type = 'image/svg+xml';
        iconSettingsObject.id = 'iconSettings';
        iconSettingsObject.addEventListener('load', () => {
            // defining the style of the settings icon
            const svg = iconSettingsObject.contentDocument.querySelector('svg');
            const path = iconSettingsObject.contentDocument.querySelector('path');
            svg.style.cursor = 'pointer';
            svg.onmouseover = () => path.style.fill = '#d5e0e9';
            svg.onmousedown = () => path.style.fill = '#adcfe7';
            svg.onmouseleave = () => path.style.fill = 'white';
            svg.onmouseup = () => {
                path.style.fill = '#d5e0e9';
                svg.style.transition = 'ease 0.5s';
                if (path.classList.contains('toggled'))
                    svg.style.transform = 'rotate(-90deg';
                else
                    svg.style.transform = 'rotate(90deg)';
                path.classList.toggle('toggled');

                // show settings
                this.settingsContainer.classList.toggle('show');
        }});
        this.container.appendChild(iconSettingsObject);

        this.parent.appendChild(this.container);
    }

    increaseTime()
    {
        const seconds = Math.floor(this.model.timePassed % 60);
        const minutes = Math.floor(this.model.timePassed / 60);

        const secondsFormatted = seconds.toString().padStart(2, '0');
        const minutesFormatted = minutes.toString().padStart(2, '0');

        this.timeLabel.innerHTML = `${minutesFormatted}:${secondsFormatted}`;
    }

    drawSettings()
    {
        // load difficulties
        fetch('../../config/difficulties.json')
        .then(d => d.json())
        .then(d => {

            // load edge values (min & max)
            fetch('../../config/edgeValues.json')
            .then(v => v.json())
            .then(v => {
                this.drawConfigurationUI(d, v);
            });
            this.drawDifficultyButtonGroup(d);
        });
    }

    drawDifficultyButtonGroup(difficulties)
    {
        const activateButton = (btn) => {
            btnGroup.childNodes.forEach(btn => btn.className = '');
            btn.className += ' active';
        };        

        const btnGroup = document.createElement('div');
        btnGroup.className = 'button-group';

        const btnEasy = document.createElement('button');
        btnEasy.className = 'active';
        btnEasy.id = 'btnEasy';
        btnEasy.innerHTML = 'Easy';
        btnEasy.onclick = () => {
            activateButton(btnEasy);

            // load easy difficulty settings
            document.querySelector('#inputWidth').value = difficulties['easy'].width;
            document.querySelector('#inputHeight').value = difficulties['easy'].height;
            document.querySelector('#inputMines').value = difficulties['easy'].numOfMines;
            document.querySelector('#inputWidth').disabled = true;
            document.querySelector('#inputHeight').disabled = true;
            document.querySelector('#inputMines').disabled = true;
            document.querySelector('#inputWidth').onchange();
        };
        btnGroup.appendChild(btnEasy);
        
        const btnMedium = document.createElement('button');
        btnMedium.id = 'btnMedium';
        btnMedium.innerHTML = 'Medium';
        btnMedium.onclick = () => {
            activateButton(btnMedium);

            // load medium difficulty settings
            document.querySelector('#inputWidth').value = difficulties['medium'].width;
            document.querySelector('#inputHeight').value = difficulties['medium'].height;
            document.querySelector('#inputMines').value = difficulties['medium'].numOfMines;
            document.querySelector('#inputWidth').disabled = true;
            document.querySelector('#inputHeight').disabled = true;
            document.querySelector('#inputMines').disabled = true;
            document.querySelector('#inputWidth').onchange();
        };
        btnGroup.appendChild(btnMedium);
        
        const btnHard = document.createElement('button');
        btnHard.id = 'btnHard';
        btnHard.innerHTML = 'Hard';
        btnHard.onclick = () => {
            activateButton(btnHard);
            
            // load hard difficulty settings
            document.querySelector('#inputWidth').value = difficulties['hard'].width;
            document.querySelector('#inputHeight').value = difficulties['hard'].height;
            document.querySelector('#inputMines').value = difficulties['hard'].numOfMines;
            document.querySelector('#inputWidth').disabled = true;
            document.querySelector('#inputHeight').disabled = true;
            document.querySelector('#inputMines').disabled = true;
            document.querySelector('#inputWidth').onchange();
        };
        btnGroup.appendChild(btnHard);
        
        const btnCustom = document.createElement('button');
        btnCustom.id = 'btnCustom';
        btnCustom.title = 'Custom';
        btnCustom.innerHTML = '<i class="far fa-edit"></i>';
        btnCustom.onclick = () => {
            activateButton(btnCustom);
            
            document.querySelector('#inputWidth').disabled = false;
            document.querySelector('#inputHeight').disabled = false;
            document.querySelector('#inputMines').disabled = false;
        };
        btnGroup.appendChild(btnCustom);
        this.settingsContainer.appendChild(btnGroup);
    }

    drawConfigurationUI(difficulties, edgeValues)
    {
        const configContainer = document.createElement('div');
        configContainer.className = 'configContainer';

        // row 1 - board size
        const row1 = document.createElement('div');
        row1.id = 'configRow1';
        row1.className = 'configContainerRow';

        const lblSize = document.createElement('label');
        lblSize.innerHTML = 'Board size:';
        lblSize.id = 'labelSize';
        row1.appendChild(lblSize);

        const inputWidth = document.createElement('input');
        inputWidth.id = 'inputWidth';
        inputWidth.type = 'number';
        inputWidth.max = edgeValues.width.max;
        inputWidth.min = edgeValues.width.min;
        inputWidth.title = `Range: ${inputWidth.min}-${inputWidth.max}`;
        inputWidth.disabled = true;
        inputWidth.onchange = () => {
            if (inputWidth.value < edgeValues.width.min)
                inputWidth.value = edgeValues.width.min;
            else if (inputWidth.value > edgeValues.width.max)
                inputWidth.value = edgeValues.width.max;

            inputMines.max = inputWidth.value * inputHeight.value - 1;
            inputWidth.title = `Range: ${inputWidth.min}-${inputWidth.max}`;
            inputMines.title = `Range: ${inputMines.min}-${inputMines.max}`;
        };
        row1.appendChild(inputWidth);

        const lblTimes = document.createElement('label');
        lblTimes.innerHTML = 'x';
        lblTimes.id = 'labelTimes';
        row1.appendChild(lblTimes);

        const inputHeight = document.createElement('input');
        inputHeight.id = 'inputHeight';
        inputHeight.type = 'number';
        inputHeight.max = edgeValues.height.max;
        inputHeight.min = edgeValues.height.min;
        inputHeight.title = `Range: ${inputHeight.min}-${inputHeight.max}`;
        inputHeight.disabled = true;
        inputHeight.onchange = () => {
            if (inputHeight.value < edgeValues.height.min)
                inputHeight.value = edgeValues.height.min;
            else if (inputHeight.value > edgeValues.height.max)
                inputHeight.value = edgeValues.height.max;

            inputMines.max = inputWidth.value * inputHeight.value - 1;
            inputHeight.title = `Range: ${inputHeight.min}-${inputHeight.max}`;
            inputMines.title = `Range: ${inputMines.min}-${inputMines.max}`;
        }
        row1.appendChild(inputHeight);

        // row 2 - number of mines
        const row2 = document.createElement('div');
        row2.id = 'configRow2';
        row2.className = 'configContainerRow';

        const lblMines = document.createElement('label');
        lblMines.innerHTML = 'Number of mines:';
        lblMines.id = 'labelMines';
        row2.appendChild(lblMines);

        const inputMines = document.createElement('input');
        inputMines.id = 'inputMines';
        inputMines.type = 'number';
        inputMines.disabled = true;
        inputMines.min = edgeValues.numOfMines.min;
        inputMines.onchange = () => {            
            if (inputMines.value < edgeValues.numOfMines.min)
                inputMines.value = edgeValues.numOfMines.min;
            else if (inputMines.value > (inputWidth.value * inputHeight.value - 1))
                inputMines.value = (inputWidth.value * inputHeight.value - 1);
        }
        row2.appendChild(inputMines);

        configContainer.appendChild(row1);
        configContainer.appendChild(row2);

        this.settingsContainer.appendChild(configContainer);

        // load initial EASY difficutly values
        inputWidth.value = difficulties['easy'].width;
        inputHeight.value = difficulties['easy'].height;
        inputMines.value = difficulties['easy'].numOfMines;
        inputMines.max = inputWidth.value * inputHeight.value - 1;
        inputMines.title = `Range: ${inputMines.min}-${inputMines.max}`;
    }
}