import React from 'react';
import Cell from '../Cell';
import './Grid.css'

var NODE_ROW = 10,
    START_NODE_COL=5,
    FINISH_NODE_COL=25;

interface Node{
    col:number,
      row:number,
      isStart: boolean,
      isFinish: boolean,
      isVisited: boolean,
      isWall: boolean,
      previousNode: Node|null,
}
//////////////////////////////////////////////////////////////
function getSizes():any{
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w/h>1){
      // wide screen
      return [60, 30, "1.75vw"]
  }else{
      //tall screen
      return [30, 50, "3.33vw"]
  }
}
const createNode = (col:number, row:number):Node => {
  return {
    col,
    row,
    isStart: row === NODE_ROW && col === START_NODE_COL,
    isFinish: row === NODE_ROW && col === FINISH_NODE_COL,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
const getInitialGrid = () => {
  // set size of the grid, depending on device
  const [width, height] = getSizes();

  NODE_ROW = Math.floor(height/2);    START_NODE_COL=Math.floor(width/10);    FINISH_NODE_COL=Math.floor(width*9/10);
  const grid = [];
  for (let row = 0; row < height; row++) {
    const currentRow = [];
    for (let col = 0; col < width; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
var grid = getInitialGrid();
var mPressed = [false];

function Grid() {

    // handle mouse up & down
    React.useEffect(() => {

        const mUP = (event:MouseEvent) => {
            mPressed[0]=false;
            event.preventDefault();
        };
        const mDW = (event:MouseEvent) => {
            mPressed[0]=true;
            event.preventDefault();
        };
      
        document.addEventListener('mouseup', mUP);
        document.addEventListener('mousedown', mDW);
        return () => {
            document.removeEventListener('mouseup', mUP);
            document.removeEventListener('mousedown', mDW);
        };
    }, []);
    
    // handle walls
    function handleMouseDown(row:number, col:number) {
        grid = ToggleWall(grid, row, col);
    }
    function handleMouseEnter(row:number, col:number) {
        if (!mPressed) return;
        grid = ToggleWall(grid, row, col);
    }
    
    return (
        <div className="Grid">
            <h1>|-{mPressed?"Y":"N"}-|</h1>
            {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                    const {row, col, isFinish, isStart, isWall} = node;
                    return (
                        <Cell
                            key={nodeIdx}
                            row={row}
                            mPressed={mPressed}
                            col={col}
                            isFinish={isFinish}
                            isStart={isStart}
                            isWall={isWall}
                            size="1.75vw"
                            onMouseDown={(row:number, col:number)  => handleMouseDown(row, col)}
                            onMouseEnter={(row:number, col:number) => handleMouseEnter(row, col)}
                        />
                    );
                })}
              </div>
            );
          })}
        </div>
    );
}


/**
 * 
 * @param grid old grid that must be updated
 * @param row row where to place/remove wall
 * @param col row where to place/remove wall
 */
const ToggleWall = (grid:Node[][], row:number, col:number) => {
  const node = grid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  grid[row][col] = newNode;
  return grid;
};




export default Grid;


