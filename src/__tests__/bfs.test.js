import bfs from "../algorithms/bfs";

test("bfs with wall", () => {
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
    
    console.log("_____________START______________")
    const [vis, path] = bfs(grid, 0, 0, 10, 10);
    console.log(path);
    expect(path.length).toBe(15);
});



