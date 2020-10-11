import Heap from "./heap";

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
const adj:Coord[] = [
    {x:1,y:0},
    {x:0,y:1},
    {x:-1,y:0},
    {x:0,y:-1},
]

function rightPath(grid:Node[][], endRow:number, endCol:number, path:Coord[]){
    path.push({x:endRow, y:endCol});
    var node:Node = grid[endRow][endCol],
         isStart = false;
    while(!isStart){
        isStart = node.isStart;
        if (node.previousNode){
            node = node.previousNode;
            path.push({x:node.row, y:node.col})
        }
    }
}

function astar(grid:Node[][], startRow:number, startCol:number, endRow:number, endCol:number, nRow:number, nCol:number){
    const hp = new Heap<Coord>(100), 
        visited:Coord[]=[], 
        path:Coord[]=[];
    const costs = Array(nRow);
    for (let i=0;i<nRow;i++)
        costs[i] = Array(nCol);
    costs[startRow][startCol] = 0;
    grid[startRow][startCol].isVisited = true;
    hp.add({id:1, priority:0,content:{x:startRow,y:startCol}});

    while(!!hp.v.len){
        const cd = hp.get();
        if (cd){
            const actual = grid[cd.x][cd.y];
            visited.push({x:cd.x,y:cd.y});    // add to visited
            actual.isVisited = true;
            if (actual.isFinish){
                rightPath(grid, cd.x,cd.y,path);  // calc found path
                return [visited, path]
            }

            for (let i=0; i<4; i++){ // foreach adj node
                const x=cd.x+adj[i].x,
                    y=cd.y+adj[i].y;
                if (x>=0 && x<nRow && y>=0 && y<nCol){
                    const adjNode = grid[x][y];
                    if (!adjNode.isWall && !adjNode.isVisited){
                        const heuristic = Math.abs(x-endRow)+Math.abs(y-endCol)
                        const cost = costs[cd.x][cd.y]+1;
                        const changed = hp.add({id:(x*100+y), priority:heuristic+cost, content:{x,y}})
                        if (changed) {
                            adjNode.previousNode = actual;
                            costs[x][y] = cost;
                        }
                    }
                }
            }
        }
    }
    return [visited, undefined]
}









export default astar;