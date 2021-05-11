import { Fireworks } from 'fireworks-js';
import { GameController } from "./controller.js";
import { getSelectedOptions } from "../menu/view.js";

export class GameView {
    constructor(parent) {
        this.parent = parent;
        this.container = document.createElement('div');
        this.container.className = 'gameContainer';
        parent.appendChild(this.container);
    }

    gameOver(result) {
        const label = document.createElement('h1');
        if (result === 'success')
        {
            this.fireworks.start();
            label.innerHTML = 'You win!';
            label.className = 'animationYouWin label';
        }
        else if (result === 'failure')
        {
            label.innerHTML = 'You lose!';
            label.className = 'animationGameOver label';
        }
        label.id = 'youWin';
        this.container.querySelector('.gameGrid').appendChild(label);
    }

    prepareFireworks()
    {
        this.fireworks = new Fireworks({
            target: this.container,
            hue: 120,
            startDelay: 1,
            minDelay: 20,
            maxDelay: 30,
            speed: 5,
            acceleration: 1.15,
            friction: 0.88,
            gravity: 1,
            particles: 65,
            trace: 3,
            explosion: 6,
            boundaries: {
              top: 50,
              bottom: this.container.clientHeight,
              left: 50,
              right: this.container.clientWidth
            },
            sound: {
              enable: false }
        });
    }

    stopFireworks()
    {
        this.fireworks.stop();
    }

    drawFrontPage()
    {
        this.drawStartMenu();
        this.drawFooter();
    }

    drawStartMenu()
    {
        const startMenu = document.createElement('div');
        startMenu.className = 'animationFadeInDown';
        startMenu.id = 'startMenuContainer';

        const iconBomb = document.createElement('img');
        iconBomb.src = '../../images/icons/bomb.svg';
        iconBomb.id = 'iconBomb';
        startMenu.appendChild(iconBomb);

        const gameTitle = document.createElement('h1');
        gameTitle.innerHTML = 'minesweeper';
        gameTitle.className = 'label gameTitle';
        startMenu.appendChild(gameTitle);

        const btnStartGame = document.createElement('button');
        btnStartGame.id = 'btnPlay';
        btnStartGame.className = 'buttonBlue';
        btnStartGame.innerHTML = 'Play';
        btnStartGame.onclick = () => { GameController.getInstance().then((gc) => {
            
            // remove start menu
            this.container.removeChild(startMenu);
            const rulesContainer = document.querySelector('.collapseRules');
            if (rulesContainer) rulesContainer.remove();

            // start game            
            gc.initializeGame();

        })}
        startMenu.appendChild(btnStartGame);

        const btnGroup = document.createElement('div');
        btnGroup.className = 'button-group';
        btnGroup.id = 'btnGroupRules';
        
        const btnRules = document.createElement('button');
        btnRules.id = 'btnRules';
        btnRules.innerHTML = 'Rules';
        btnRules.onclick = () => {
            // hide options container
            if (settingsContainer != null && settingsContainer.className.includes('show'))
                settingsContainer.classList.toggle('show');


            if (!document.querySelector('.collapseRules'))
                this.drawRules();
            
            // janky solution mate (doesn't work without delay)
            setTimeout(() => {
                document.querySelector('.collapseRules').classList.toggle('show');
            }, 10);
        };
        btnGroup.appendChild(btnRules);

        const btnOptions = document.createElement('button');
        btnOptions.id = 'btnOptions';
        btnOptions.innerHTML = '<i class="fas fa-cog fa-lg" id="iconOptions"></i>';
        btnOptions.onclick = () => {
            // hide rules container
            const rulesContainer = document.querySelector('.collapseRules');
            if (rulesContainer != null && rulesContainer.className.includes('show'))
                rulesContainer.classList.toggle('show');
                
            // toggle options container
            settingsContainer.classList.toggle('show');
        };
        btnGroup.appendChild(btnOptions);
        startMenu.appendChild(btnGroup);

        // draw settings container
        const settingsContainer = document.createElement('div');
        settingsContainer.className = 'settingsContainer';
        settingsContainer.id = 'startMenuSettingsContainer';
        startMenu.appendChild(settingsContainer);
        GameController.getInstance().then((gc) => {
            gc.displaySettings(settingsContainer);
        
            // draw save button
            const btnContainer = document.createElement('div');
            btnContainer.id = 'btnSaveContainer';
            const btnSave = document.createElement('button');
            btnSave.className = 'buttonBlue';
            btnSave.innerHTML = 'Save';
            btnSave.onclick = () => {
                // apply selected options
                GameController.getInstance().then((gc) => gc.setOptions(getSelectedOptions()));

                // toggle options container
                settingsContainer.classList.toggle('show');
            };
            btnContainer.appendChild(btnSave);
            settingsContainer.appendChild(btnContainer);
        });

        this.container.appendChild(startMenu);
    }

    drawRules()
    {
        const rules = [
            ['Click on a block to open it.',
                'The first block you click will NEVER be a mine.'],
            ['The block can either:',
                'Be empty,',
                'Not have a mine, but have blocks around it with mines,',
                'Have a mine.'],
            ['Clicking on an empty block opens it and opens all surrounding blocks.',
                'Surrounding blocks are blocks that touch a block, including diagonals.'],
            ['Clicking on a block that doesn\'t have a mine opens it and displays a number of mines in blocks around it.'],
            ['Clicking a block with a mine means GAME OVER.'],
            ['Right-click a block to mark it if you believe that it has a mine.'],
            ['When you open all empty blocks, YOU WIN.']
        ];

        const card = document.createElement('div');
        card.className = 'collapseRules';

        let list = document.createElement('ul');
        for (let i=0; i<rules.length; i++)
        {
            const listItem = document.createElement('li');
            listItem.innerHTML = rules[i][0];

            if (rules[i].length > 1)
            {
                const subList = document.createElement('ul');
                for (let j=1; j<rules[i].length; j++)
                {
                    const subListItem = document.createElement('li');
                    subListItem.innerHTML = rules[i][j];
                    subList.appendChild(subListItem);
                }
                listItem.appendChild(subList);
            }
            
            list.appendChild(listItem);
        }

        card.appendChild(list);
        this.container.appendChild(card);
    }

    drawFooter()
    {
        const footer = document.createElement('div');
        footer.className = 'footer';

        const footerItems = [
        {
            className: 'fab fa-github fa-2x',
            id: 'iconGithub',
            tooltipName: 'GitHub',
            link: 'https://github.com/DoubleDebug/minesweeper'
        },
        {
            className: 'fab fa-youtube fa-2x',
            id: 'iconYoutube',
            tooltipName: 'YouTube',
            link: 'https://www.youtube.com/c/DoubleDYouTube'
        },
        {
            className: 'fab fa-itch-io fa-2x',
            id: 'iconItchio',
            tooltipName: 'Itch.io',
            link: 'https://notdoubled.itch.io'
        }];
        
        footerItems.forEach((itemProps) => {
            const item = this.createFooterItem(itemProps);
            footer.appendChild(item);
        });

        this.container.appendChild(footer);
    }

    createFooterItem(itemProps)
    {
        const icon = document.createElement('i');
        icon.className = itemProps.className + ' icon';
        icon.id = itemProps.id;
        icon.onmouseenter = () => {
            const tooltip = this.createTooltip(itemProps.tooltipName);
            icon.appendChild(tooltip);
        };
        icon.onmouseleave = () => {
            icon.removeChild(icon.querySelector('.tooltip'));
        };
        icon.onclick = () => {
            window.open(itemProps.link);
        };
        return icon;
    }

    createTooltip(text)
    {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';

        const tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'tooltipArrow';
        tooltip.appendChild(tooltipArrow);

        const label = document.createElement('label');
        label.innerHTML = text;
        tooltip.appendChild(label);

        return tooltip;
    }
}