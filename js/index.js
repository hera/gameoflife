let game = function (canvasId, generationCounterId, timeIntervalId, presetId) {

    // canvas
    let cols = 25;
    let rows = 25;
    let cellSize = 25;

    const canvas = document.getElementById(canvasId);
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;
    canvas.addEventListener("click", cellClickHandler);
    const ctx = canvas.getContext("2d");

    // grid
    let grid = [];
    let gridTwo = [];

    // gen counter
    const generationCounter = document.getElementById(generationCounterId);

    // Timer
    const intervalSelect = document.getElementById(timeIntervalId);
    let intervalId;
    let timerActive = false;

    // Presets
    const preset = document.getElementById(presetId);
    preset.addEventListener("change", presetHandler);


    reset();

    /*
        Set all cells to false
    */
    function reset () {
        clearInterval(intervalId);
        timerActive = false;
        generationCounter.innerHTML = 1
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

    /*
        Flip the value of a cell (true/false) and display the change on canvas
    */
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

        // Can't click while playing
        if (timerActive) {
            return false;
        }

        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left; // x position within the element.
        const y = event.clientY - rect.top;  // y position within the element.
        
        // find the cell location on grid
        let row = Math.floor(y / cellSize);
        let col = Math.floor(x / cellSize);

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

    /*
        Generate gridTwo according to the values of the first grid

        Rules:
        * If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
        * If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
    */
    function generateGridTwo () {

        gridTwo = [];

        // create cells for gridTwo (all false)
        initGrid(gridTwo);

        // for each row in grid
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // if cell is alive
                if (grid[row][col]) {
                    
                    const numNeighbors = countNeighbors(row, col);

                    if (numNeighbors === 2 || numNeighbors === 3) {
                        gridTwo[row][col] = true; // stays alive
                    } else {
                        gridTwo[row][col] = false; // dies
                    }

                } else {
                    // if the cell is dead

                    // if the cell has exactly 3 neighbors, it comes to life
                    if (countNeighbors(row, col) === 3) {
                        gridTwo[row][col] = true;
                    }
                }

            }
        }
    }

    function incrementGenerationCounter () {
        counter = Number(generationCounter.innerHTML);
        counter++;
        generationCounter.innerHTML = counter;
    }

    function next () {
        generateGridTwo();
        grid = gridTwo;
        clearCanvas();
        displayGrid(grid);
        incrementGenerationCounter();
    }

    function play () {
        const ms = Number(intervalSelect.options[intervalSelect.selectedIndex].value) * 1000;
        intervalId = setInterval(next, ms);
        timerActive = true;
    }

    function stop () {
        clearInterval(intervalId);
        timerActive = false;
    }

    function pulsar () {
        reset();

        toggleCell(6, 8);
        toggleCell(6, 9);
        toggleCell(6, 10);

        toggleCell(6, 14);
        toggleCell(6, 15);
        toggleCell(6, 16);

        toggleCell(8, 6);
        toggleCell(8, 11);
        toggleCell(8, 13);
        toggleCell(8, 18);

        toggleCell(9, 6);
        toggleCell(9, 11);
        toggleCell(9, 13);
        toggleCell(9, 18);

        toggleCell(10, 6);
        toggleCell(10, 11);
        toggleCell(10, 13);
        toggleCell(10, 18);

        toggleCell(11, 8);
        toggleCell(11, 9);
        toggleCell(11, 10);

        toggleCell(11, 14);
        toggleCell(11, 15);
        toggleCell(11, 16);
        
        // -----

        toggleCell(13, 8);
        toggleCell(13, 9);
        toggleCell(13, 10);
        
        toggleCell(13, 14);
        toggleCell(13, 15);
        toggleCell(13, 16);

        toggleCell(14, 6);
        toggleCell(14, 11);
        toggleCell(14, 13);
        toggleCell(14, 18);

        toggleCell(15, 6);
        toggleCell(15, 11);
        toggleCell(15, 13);
        toggleCell(15, 18);

        toggleCell(16, 6);
        toggleCell(16, 11);
        toggleCell(16, 13);
        toggleCell(16, 18);
        
        toggleCell(18, 8);
        toggleCell(18, 9);
        toggleCell(18, 10);

        toggleCell(18, 14);
        toggleCell(18, 15);
        toggleCell(18, 16);
    }

    function changePreset (id) {
        switch (id) {
            case 1:
                pulsar();
                break;
            default:
                reset();
                break;
        }
    }

    function presetHandler (event) {
        console.log('asdf')
        // Can't set while playing
        if (timerActive) {
            return false;
        }

        id = Number(preset.options[preset.selectedIndex].value);
        
        changePreset(id);
    }

    return {
        reset,
        next,
        play,
        stop
    }

} // end

const myGame = game("canvas", "gen", "timeInterval", "preset");



const btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", myGame.reset);

const btnNext = document.getElementById("btnNext");
btnNext.addEventListener("click", myGame.next);

const btnPlay = document.getElementById("btnPlay");
btnPlay.addEventListener("click", myGame.play);

const btnStop = document.getElementById("btnStop");
btnStop.addEventListener("click", myGame.stop);