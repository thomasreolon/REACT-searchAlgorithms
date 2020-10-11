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

function bfs(grid:Node[][], startRow:number, startCol:number, nRow:number, nCol:number){
    const stack:Coord[] = [{x:startRow, y:startCol}], 
        visited:Coord[]=[], 
        path:Coord[]=[];
    grid[startRow][startCol].isVisited = true;

    while(!!stack.length){
        const cd = stack.shift();
        if (cd){

            for (let i=0; i<4; i++){ // foreach adj node
                const x=cd.x+adj[i].x,
                    y=cd.y+adj[i].y;
                if (x>=0 && x<nRow && y>=0 && y<nCol){

                    const node = grid[x][y];
                    if (node.isFinish){
                        visited.push({x,y});        // add to visited
                        node.previousNode = grid[cd.x][cd.y];
                        rightPath(grid, x,y,path);  // calc found path
                        return [visited, path]
                    }else if (!node.isWall && !node.isVisited){
                        stack.push({x,y})
                        visited.push({x,y});
                        node.previousNode = grid[cd.x][cd.y];
                        node.isVisited=true;
                    }
                }
            }
        }
    }
    return [visited, undefined]
}



export default bfs;
