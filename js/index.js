let game = function (canvasId) {
    let cols = 25;
    let rows = 25;
    let cellSize = 25;

    const grid = [];
    const gridTwo = [];

    const canvas = document.getElementById(canvasId);
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;
    canvas.addEventListener("click", cellClickHandler);

    const ctx = canvas.getContext("2d");

    reset();

    // Set all cells to false
    function reset () {
        initGrid(grid);
        initGrid(gridTwo);
        clearCanvas();
        displayGrid(grid);
    }
    
    /*
        Set grid cells to false. Canvas remains untouched.
    */
    function initGrid (gridRef) {
        // truncate
        gridRef.length = 0;

        for (let r = 0; r < rows; r++) {
            gridRef[r] = [];

            for (let c = 0; c < cols; c++) {
                gridRef[r][c] = false;
            }
        }
    }


    function clearCanvas () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    function displayGrid (gridRef) {
        // for each row
        for (let r = 0; r < gridRef.length; r++) {
            // draw all cells
            for (let c = 0; c < gridRef[r].length; c++) {
                // if a cell is alive
                if (grid[r][c] === true) {

                    ctx.fillRect(
                        cellSize * c,
                        cellSize * r,
                        cellSize,
                        cellSize
                    );

                } else {
                    // otherwise dead
                    
                    ctx.strokeRect(
                        cellSize * c,
                        cellSize * r,
                        cellSize,
                        cellSize
                    );
                }
            }
        }
    }

    function toggleCell (row, col) {
        // calculate the position of a cell on canvas
        const x = col * cellSize;
        const y = row * cellSize;

        // if alive
        if (grid[row][col]) {

            // clear cell on canvas
            ctx.clearRect(x, y, cellSize, cellSize);
            
            // Draw an empty cell in that space
            ctx.strokeRect(x, y, cellSize, cellSize);
            
            // mark as dead
            grid[row][col] = false;
        } else {
            ctx.fillRect(x, y, cellSize, cellSize);

            // mark as alive
            grid[row][col] = true;
        }
    }


    function cellClickHandler (event) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left; // x position within the element.
        const y = event.clientY - rect.top;  // y position within the element.
        
        // find the cell location on grid
        let row = Math.floor(y / 25);
        let col = Math.floor(x / 25);

        if (row < 0) {
            row = 0;
        }

        if (col < 0) {
            col = 0;
        }

        toggleCell(row, col);
    }

    function countNeighbors (row, col) {
        let counter = 0;

        // to the left
        if (grid[row][col - 1]) {
            counter++;
        }

        // right
        if (grid[row][col + 1]) {
            counter++;
        }

        // top:
        if (grid[row - 1]) {

            if (grid[row - 1][col]) {
                counter++;
            }

            // top left neighbor
            if (grid[row - 1][col - 1]) {
                counter++;
            }

            // top right neighbor
            if (grid[row - 1][col + 1]) {
                counter++;
            }
        }

        // bottom:
        if (grid[row + 1]) {

            if (grid[row + 1][col]) {
                counter++;
            }

            // bottom left neighbor
            if (grid[row + 1][col - 1]) {
                counter++;
            }

            // bottom right neighbor
            if (grid[row + 1][col + 1]) {
                counter++;
            }
        }

        return counter;
    }

    return {
        reset
    }

} // end

const myGame = game("canvas");



const btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", myGame.reset);