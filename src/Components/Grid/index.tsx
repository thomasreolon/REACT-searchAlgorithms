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



function Grid() {
    const [width, height, perc] = getSizes();
    NODE_ROW = Math.floor(height/2);    START_NODE_COL=Math.floor(width/10);    FINISH_NODE_COL=Math.floor(width*9/10);
    const [mPressed, setMpressed] = React.useState(false);
    const [grid, setGrid] = React.useState<Node[][]>(getInitialGrid(width, height));

    // handle mouse up & down
    React.useEffect(() => {
        const mUP = (event:MouseEvent) => {
          if (event.button !== 2) {
            setTimeout(() => setMpressed(false), 10);
          }
        };
        const mDW = (event:MouseEvent) => {
            if (event.button !== 2) {
                setMpressed(true);
                event.preventDefault();
            }
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
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    }
    function handleMouseEnter(row:number, col:number) {
        if (!mPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
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
                            col={col}
                            isFinish={isFinish}
                            isStart={isStart}
                            isWall={isWall}
                            size={perc}
                            onMouseDown={(row:number, col:number) => handleMouseDown(row, col)}
                            onMouseEnter={(row:number, col:number) =>handleMouseEnter(row, col)}
                        />
                    );
                })}
              </div>
            );
          })}
        </div>
    );
}

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




export default Grid;




const getInitialGrid = (width:number, height:number) => {
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


const createNode = (col:number, row:number) => {
    return {
      col,
      row,
      isStart: row === NODE_ROW && col === START_NODE_COL,
      isFinish: row === NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };
  
  const getNewGridWithWallToggled = (grid:Node[][], row:number, col:number) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };