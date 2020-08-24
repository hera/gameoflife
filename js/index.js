class Game {
    constructor (canvasId, cols=25, rows=25, cellSize=25) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        
        this.canvasElement = document.getElementById(canvasId);
        this.canvasElement.width = cols * cellSize;
        this.canvasElement.height = rows * cellSize;

        this.ctx = this.canvasElement.getContext("2d");

        this.clearGrid();
        this.displayGrid();
    }

    clearGrid () {
        this.grid = [];

        for (let r = 0; r < this.rows; r++) {
            this.grid[r] = []
            for (let c = 0; c < this.cols; c++) {
                this.grid[r][c] = false;
            }
        }
    }

    displayGrid () {
        // for each row
        for (let r = 0; r < this.grid.length; r++) {
            // draw all cells
            for (let c = 0; c < this.grid[r].length; c++) {
                // if a cell is alive
                if (this.grid[r][c] === true) {

                    this.ctx.fillRect(
                        this.cellSize * c,
                        this.cellSize * r,
                        this.cellSize,
                        this.cellSize
                    );

                } else {
                    // otherwise dead
                    
                    this.ctx.strokeRect(
                        this.cellSize * c,
                        this.cellSize * r,
                        this.cellSize,
                        this.cellSize
                    );
                }
            }
        }
    }
}

game = new Game("canvas");
