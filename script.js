window.onload = function(){
const map = document.getElementById('map');

var girl = {
    element: document.getElementById('girl'),
    col: 0,
    row: 0,
};

var tree = {
    element: document.getElementById('tree'),
    col: 0,
    row: 0,
};

var stone = {
    element: document.getElementById('stone'),
    col: 0,
    row: 0,
};

var mushy = {
    element: document.getElementById('mushy'),
    col: 0,
    row: 0,
};

const fiftyPixels = 50


function randomizer(min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

//GRID CONSTRUCTOR
const gridSize = 20;
let gameGrid = [];

for (let row = 0; row < gridSize; row++) {
    gameGrid[row] = [];
    for (let col = 0; col < gridSize; col++) {
        gameGrid[row][col] = null;
    }
}
//ITEM PLACEMENT FUNCTION
// Example item placement: placeItemAt(3, 4, { type: 'character', id: 'player1' });
function placeItemOnMap(row, col, itemTemplate, type) {
    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize && gameGrid[row][col] === null) {
        // clones "original", strips its ID, makes it visible and places it on the map.
        const newItem = itemTemplate.cloneNode(true);
        newItem.removeAttribute('id');
        newItem.style.display = 'block';
        newItem.style.left = `${col * fiftyPixels}px`;
        newItem.style.top = `${row * fiftyPixels}px`;

        // adds clone to the DOM HTML
        map.appendChild(newItem);

        //updates the 2d array with the position specified at col and row as an object containing both the clone and its type (label for id)
        gameGrid[row][col] = { type: type, element: newItem };
    }
}


function plantMultiples(itemTemplate, count, type) {
    let planted = 0;
    while (planted < count) {
        const row = randomizer(0, gridSize - 1);
        const col = randomizer(0, gridSize - 1);

        if (gameGrid[row][col] === null) {
            placeItemOnMap(row, col, itemTemplate, type);
            planted++;
        }
    }
}

plantMultiples(tree.element, 35, 'tree');
plantMultiples(mushy.element, 10, 'mushy');
plantMultiples(stone.element, 15, 'stone');

function move(character, direction) {
    let newRow = character.row;
    let newCol = character.col;

    switch (direction) {
        case "up":
            newRow -= 1;
            break;
        case "down":
            newRow += 1;
            break;
        case "left":
            newCol -= 1;
            break;
        case "right":
            newCol += 1;
            break;
    }

    //run only if the position is within bounds and on an empty cell
    if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && gameGrid[newRow][newCol] === null) {
        //replaces current character coordinates with new ones, then clears original cell
        gameGrid[newRow][newCol] = gameGrid[character.row][character.col];
        gameGrid[character.row][character.col] = null;
        //updates the character object's row and col values with the new ones
        character.row = newRow;
        character.col = newCol;

   //camera offset     
   var viewport_left = 20;
   var viewport_top = 20;

        //updates character sprite position, shifts map to simulate camera effect
        character.element.style.transform = `translate3d(${newCol * fiftyPixels}px, ${newRow * fiftyPixels}px, 0)`;
        map.style.transform = `translate3d(${-newCol * fiftyPixels+viewport_left}px, ${-newRow * fiftyPixels+viewport_top}px, 0)`;
    }
}

function moveUp() {
    move(girl, "up");
}

function moveDown() {
    move(girl, "down");
}

function moveLeft() {
    move(girl, "left");
}

function moveRight() {
    move(girl, "right");
}

//fires the above functions when a key is pressed, then unpressed
document.addEventListener("keyup", function(e) {
    switch (e.key) {
        case "ArrowDown":
        case "s":
            moveDown();
            break;
        case "ArrowUp":
        case "w":
            moveUp();
            break;
        case "ArrowLeft":
        case "a":
            moveLeft();
            break;
        case "ArrowRight":
        case "d":
            moveRight();
            break;
    }
});






//END OF CODE
};