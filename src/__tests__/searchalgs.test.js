import bfs from "../algorithms/bfs";
import astar from "../algorithms/astar";

function getGrid1(){
    const grid = [];
    for (let i=0;i<10;i++){
        const tmp = [];
        for (let j=0; j<10; j++){
            tmp.push({
                row:i,
                col:j,
                isStart: false,
                isFinish: false,
                isVisited: false,
                isWall: false,
                previousNode: null,
              })
        }
        grid.push(tmp);
    }
    grid[0][0].isStart = true;
    grid[7][1].isFinish = true;
    grid[3][0].isWall = true;
    grid[3][1].isWall = true;
    grid[3][2].isWall = true;
    grid[3][3].isWall = true;
    return grid;
}




test("BFS with wall", () => {
    const grid = getGrid1();
    const [, path] = bfs(grid, 0, 0, 10, 10);
    expect(path.length).toBe(15);
});


test("A* with wall", () => {
    const grid = getGrid1();
    const [, path] = astar(grid, 0, 0, 7, 1, 10, 10);
    expect(path.length).toBe(15);
});

test("A* faster than BFS", ()=>{
    const grid1 = getGrid1();
    const [vis1, path1] = bfs(grid1, 0, 0, 10, 10);

    const grid2 = getGrid1();
    const [vis2, path2] = astar(grid2, 0, 0, 7, 1, 10, 10);

    expect(path1.length).toBe(path2.length);
    expect(vis1.length>=vis2.length).toBe(true);
});



