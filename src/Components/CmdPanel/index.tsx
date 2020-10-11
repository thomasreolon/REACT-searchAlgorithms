import React from 'react';
import bfs from "../../algorithms/bfs";
import "./CmdPanel.css";

interface Coord{
    x:number,
    y:number,
}
interface Node{
    col:number,
    row:number,
    isStart: boolean,
    isFinish: boolean,
    isVisited: boolean,
    isWall: boolean,
    previousNode: Node|null,
}
function unvisitGrid(grid:Node[][]){
    const nRow=grid.length, nCol=grid[0].length;
    
    for(let i=0; i<nRow; i++){
        for (let j=0; j<nCol; j++){
            const cell = grid[i][j];
            grid[i][j] = {...cell, isVisited:false, previousNode:null};
            document.getElementById(`cell-${i}-${j}`)!.className = 'cell';
        }
    }
}
var activeshow = {actual:0};
function animateShortestPath(reversedPath:Coord[], showid:number) {
    for (let i = reversedPath.length-1; i >=0; i--) {
      setTimeout(() => {
        const node = reversedPath[i];
        if (node && showid===activeshow.actual)
            document.getElementById(`cell-${node.x}-${node.y}`)!.className = 'cell cell-path';
      }, 50 * i);
    }
}
function animateAlg(visited:Coord[]|undefined, reversedPath:Coord[]|undefined, showid:number) {
    console.log('ANIMATE', visited?.length)
    if (visited && visited.length>0){
        for (let i = 0; i <= visited.length; i++) {
            if (reversedPath && i === visited.length) {
                setTimeout(() => {
                    animateShortestPath(reversedPath, showid);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visited[i];
                if (node && showid===activeshow.actual)
                    document.getElementById(`cell-${node.x}-${node.y}`)!.className = 'cell cell-visited';
            }, 10 * i);
        }
    } else{
        // should never happen
        console.log("couldn't explore");
    }
    
}


function CmdPanel({grid, start, nRow, nCol}:{grid:Node[][], start:Coord, nRow:number, nCol:number}) {
    const description=`drag the mouse in the grid to create walls. Select the search algorithm. Press play`;
    const wide = window.innerWidth>700;


    const selectAlg = (id:number) =>{
        var res;
        activeshow.actual++;
        const showid = activeshow.actual;
        unvisitGrid(grid);
        switch(id){
            case 0:
                res = bfs(grid, start.x, start.y, nRow, nCol); break;
            default:
                res = bfs(grid, start.x, start.y, nRow, nCol); break;
        }
        animateAlg(res[0], res[1], showid);
    }

    const [alg, setAlg] = React.useState<number>(0);
    return (
        <>
            <div className="htop"></div>
            <div className="panel">
                {wide && <div className="description">{description}</div>}
                <div>
                    <button className="btn btn-alg" onClick={()=>setAlg(0)}>DFS</button>
                </div>
                <div>
                    <button className="btn btn-start" onClick={() => selectAlg(alg)}>START</button>
                </div>
            </div>
        </>
    );
}

export default CmdPanel;