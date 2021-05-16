import { GameController } from "../game/controller.js";
import { calculateMaxMines } from "./model.js";

export class MenuView {
    constructor(parent, model, config)
    {
        const settingsWidth =  document.querySelector('.gameGrid').clientWidth + 'px';

        this.container = document.createElement('div');
        this.container.className = 'menu animationFadeInDown';
        this.container.style.width = this.container.style.maxWidth = settingsWidth;
        this.parent = parent;
        this.model = model;

        this.draw(config.options.numOfMines);

        // draw settings
        this.settingsContainer = document.createElement('div');
        this.settingsContainer.className = 'settingsContainer';
        this.settingsContainer.style.width = settingsWidth;
        this.container.appendChild(this.settingsContainer);
        drawSettings(config, this.settingsContainer);

        // draw new game menu
        drawNewGameMenu(this.settingsContainer);
    }

    draw(numOfMines)
    {
        this.timeLabel = document.createElement('label');
        this.timeLabel.id = 'labelTime';
        this.timeLabel.innerHTML = '00:00';
        this.container.appendChild(this.timeLabel);

        const labelMinesLeft = document.createElement('label');
        labelMinesLeft.minesLeft = numOfMines;
        labelMinesLeft.id = 'labelMinesLeft';
        labelMinesLeft.innerHTML = `| ${numOfMines} mines left`;
        this.container.appendChild(labelMinesLeft);

        const iconSettingsObject = document.createElement('object');
        iconSettingsObject.data = '../../../res/images/icons/cog.svg';
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
}


export function drawSettings(config, myContainer)
{        
    // draw difficulty group
    drawDifficultyButtonGroup(config.difficulties, config.options.difficulty, myContainer);

    // draw game options (board width/height/mines)
    drawConfigurationUI(config.edgeValues, config.options, myContainer);
}

function drawDifficultyButtonGroup(difficulties, currentDifficulty, myContainer)
{
    const lblDifficulty = document.createElement('label');
    lblDifficulty.innerHTML = 'Difficulty:';
    lblDifficulty.className = 'labelSettings';
    myContainer.appendChild(lblDifficulty);

    const activateButton = (btn) => {
        btnGroup.childNodes.forEach(btn => btn.className = '');
        btn.className = 'active';
    };

    const loadDifficultySettings = (diff) => {
        const inputMines = document.querySelector('#inputMines');
        const inputWidth = document.querySelector('#inputWidth');
        const inputHeight = document.querySelector('#inputHeight');
        if (diff === 'custom')
        {
            inputWidth.disabled = false;
            inputHeight.disabled = false;
            inputMines.disabled = false;
        }
        else
        {
            inputWidth.value = difficulties[diff].width;
            inputHeight.value = difficulties[diff].height;
            inputMines.value = difficulties[diff].numOfMines;
            
            inputWidth.disabled = true;
            inputHeight.disabled = true;
            inputMines.disabled = true;
        }

        inputMines.max = calculateMaxMines(inputWidth.value, inputHeight.value);
        inputMines.title = `Range: ${inputMines.min}-${inputMines.max}`;
    };

    const btnGroup = document.createElement('div');
    btnGroup.className = 'button-group';
    btnGroup.id = 'btnGroupDifficulty';

    const btnEasy = document.createElement('button');
    if (currentDifficulty === 'easy')
        btnEasy.className = 'active';
    btnEasy.id = 'btnEasy';
    btnEasy.innerHTML = 'Easy';
    btnEasy.onclick = () => {
        activateButton(btnEasy);
        loadDifficultySettings('easy');            
    };
    btnGroup.appendChild(btnEasy);
    
    const btnMedium = document.createElement('button');
    if (currentDifficulty === 'medium')
        btnMedium.className = 'active';
    btnMedium.id = 'btnMedium';
    btnMedium.innerHTML = 'Medium';
    btnMedium.onclick = () => {
        activateButton(btnMedium);
        loadDifficultySettings('medium');   
    };
    btnGroup.appendChild(btnMedium);
    
    const btnHard = document.createElement('button');
    if (currentDifficulty === 'hard')
        btnHard.className = 'active';
    btnHard.id = 'btnHard';
    btnHard.innerHTML = 'Hard';
    btnHard.onclick = () => {
        activateButton(btnHard);
        loadDifficultySettings('hard');
    };
    btnGroup.appendChild(btnHard);
    
    const btnCustom = document.createElement('button');
    if (currentDifficulty === 'custom')
        btnCustom.className = 'active';
    btnCustom.id = 'btnCustom';
    btnCustom.title = 'Custom';
    btnCustom.innerHTML = '<i class="far fa-edit"></i>';
    btnCustom.onclick = () => {
        activateButton(btnCustom);
        loadDifficultySettings('custom');
    };
    btnGroup.appendChild(btnCustom);
    myContainer.appendChild(btnGroup);
}

function drawConfigurationUI(edgeValues, options, myContainer)
{
    const configContainer = document.createElement('div');
    configContainer.className = 'configContainer';

    // row 1 - board size
    const row1 = document.createElement('div');
    row1.id = 'configRow1';
    row1.className = 'configContainerRow';

    const lblSize = document.createElement('label');
    lblSize.innerHTML = 'Board size:';
    lblSize.className = 'labelSettings';
    row1.appendChild(lblSize);

    const inputWidth = document.createElement('input');
    inputWidth.id = 'inputWidth';
    inputWidth.type = 'number';
    inputWidth.max = edgeValues.width.max;
    inputWidth.min = edgeValues.width.min;
    inputWidth.title = `Range: ${inputWidth.min}-${inputWidth.max}`;
    inputWidth.disabled = (options.difficulty !== 'custom');
    inputWidth.onchange = () => {
        if (Number(inputWidth.value) < edgeValues.width.min)
            inputWidth.value = edgeValues.width.min;
        else if (Number(inputWidth.value) > edgeValues.width.max)
            inputWidth.value = edgeValues.width.max;

        inputMines.max = calculateMaxMines(Number(inputWidth.value), Number(inputHeight.value));
        inputMines.title = `Range: ${inputMines.min}-${inputMines.max}`;
        if (Number(inputMines.value) > Number(inputMines.max)) inputMines.value = inputMines.max;
        inputWidth.title = `Range: ${inputWidth.min}-${inputWidth.max}`;
        inputMines.title = `Range: ${inputMines.min}-${inputMines.max}`;
    };
    row1.appendChild(inputWidth);

    const lblTimes = document.createElement('label');
    lblTimes.innerHTML = 'x';
    lblTimes.id = 'labelTimes';
    lblTimes.className = 'labelSettings';
    row1.appendChild(lblTimes);

    const inputHeight = document.createElement('input');
    inputHeight.id = 'inputHeight';
    inputHeight.type = 'number';
    inputHeight.max = edgeValues.height.max;
    inputHeight.min = edgeValues.height.min;
    inputHeight.title = `Range: ${inputHeight.min}-${inputHeight.max}`;
    inputHeight.disabled = (options.difficulty !== 'custom');
    inputHeight.onchange = () => {
        if (Number(inputHeight.value) < edgeValues.height.min)
            inputHeight.value = edgeValues.height.min;
        else if (Number(inputHeight.value) > edgeValues.height.max)
            inputHeight.value = edgeValues.height.max;

        inputMines.max = calculateMaxMines(Number(inputWidth.value), Number(inputHeight.value));
        inputMines.title = `Range: ${inputMines.min}-${inputMines.max}`;
        if (Number(inputMines.value) > Number(inputMines.max)) inputMines.value = inputMines.max;
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
    lblMines.className = 'labelSettings';
    row2.appendChild(lblMines);

    const inputMines = document.createElement('input');
    inputMines.id = 'inputMines';
    inputMines.type = 'number';
    inputMines.disabled = (options.difficulty !== 'custom');
    inputMines.min = edgeValues.numOfMines.min;
    inputMines.onchange = () => {
        inputMines.max = calculateMaxMines(Number(inputWidth.value), Number(inputHeight.value));
        inputMines.title = `Range: ${inputMines.min}-${inputMines.max}`;
         
        if (Number(inputMines.value) < edgeValues.numOfMines.min)
            inputMines.value = edgeValues.numOfMines.min;
        else if (Number(inputMines.value) > inputMines.max)
            inputMines.value = inputMines.max;
    }
    row2.appendChild(inputMines);

    configContainer.appendChild(row1);
    configContainer.appendChild(row2);

    myContainer.appendChild(configContainer);

    // load current difficutly values
    inputWidth.value = options.width;
    inputHeight.value = options.height;
    inputMines.value = options.numOfMines;
    inputMines.max = calculateMaxMines(Number(inputWidth.value), Number(inputHeight.value));
    inputMines.title = `Range: ${inputMines.min}-${inputMines.max}`;
}

function drawNewGameMenu(myContainer)
{
    const btnGroup = document.createElement('div');
    btnGroup.className = 'button-group';
    btnGroup.id = 'btnGroupNewGame';

    const btnHome = document.createElement('button');
    btnHome.innerHTML = '<i class="fas fa-home"></i>';
    btnHome.id = 'btnHome';
    btnHome.onclick = () => {
        // update selected options and display start menu
        GameController.getInstance().then((c) => c.restartGame(getSelectedOptions(), c.displayStartMenu));
    }
    btnGroup.appendChild(btnHome);

    const btnNewGame = document.createElement('button');
    btnNewGame.className = 'buttonBlue';
    btnNewGame.innerHTML = 'New game';
    btnNewGame.onclick = () => {            
        // take selected options and pass them to game controller
        GameController.getInstance().then((c) => c.restartGame(getSelectedOptions(), c.initializeGame));
    };
    btnGroup.appendChild(btnNewGame);
    myContainer.appendChild(btnGroup);
}

export function getSelectedOptions()
{
    const currentOptions = {};
    currentOptions.difficulty = (document.getElementById('btnEasy').className === 'active' ? 'easy' :
                                (document.getElementById('btnMedium').className === 'active' ? 'medium' :
                                (document.getElementById('btnHard').className === 'active' ? 'hard' : 'custom')));            
    currentOptions.width = document.getElementById('inputWidth').value;
    currentOptions.height = document.getElementById('inputHeight').value;
    currentOptions.numOfMines = document.getElementById('inputMines').value;
    return currentOptions;
}