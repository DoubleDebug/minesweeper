# minesweeper
 Simple MineSweeper game using vanilla JavaScript
_______________________________________________________________________________________________________________

![Game preview](./previews/gamePreview.png)

GAME RULES:
1. Click on a block to open it.
  * The first block you click will NEVER be a mine.
2. The block can either:
  * Be empty,
  * Not have a mine, but have blocks around it with mines,
  * Have a mine.
3. Clicking on an empty block opens it and opens all surrounding blocks.
  * Surrounding blocks are blocks that touch a block, including diagonals.
4. Clicking on a block that doesn't have a mine opens it and displays a number of mines in blocks around it
5. Clicking a block with a mine in it means GAME OVER.
6. Right-click a block to mark it if you believe that it has a mine.
7. When you open all blocks without mines, YOU WIN.
_______________________________________________________________________________________________________________

![Game settings preview](./previews/gameSettings.png)

GAME SETTINGS:
The game is designed dynamically and allows changing certain game parameters.
The configuration is stored in a fake JSON database (file ./config/config.json)
and can be changed either manually or using the game's interface.

1. Board WIDTH
  * number of blocks horizontally
2. Board HEIGHT
  * number of blocks vertically
3. Number of mines
  * number of mines within the board determines the difficulty of solving the game
_______________________________________________________________________________________________________________

![Game design diagram](./previews/gameDesign.png)

GAME DESIGN:
The game follows the MVC (model-view-controller) structure model.
Every component has a:
1. model
  * handles game logic
2. view
  * handles game interface/drawing/DOM
3. controller
  * utilizes both the model and the view and enables communication between them

Main game components are:
1. block
2. table
3. game menu

Technical information:
  * written is plain/vanilla HTML/CSS/JavaScript
  * uses a fake JSON database to read game settings
  * no 3rd party frameworks

_______________________________________________________________________________________________________________

NOTES:
1. For a simple project like this, perhaps there's no need for a complex structure like MVC,
but this was a practice project and the goal was to build a scalable/expandable game.
2. Generally in the MVC model, the view isn't supposed to have direct contact with the model.
The communication is supposed to happen using the controller. However, in this project,
I didn't always follow this rule for simplicity reasons.