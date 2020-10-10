import React from 'react';
import "./Cell.css";

const a = ()=>{}
interface CellProps{
    row:number,
    col:number,
    isFinish:boolean,
    isStart:boolean,
    isWall:boolean,
    mPressed:boolean[],
    onMouseDown:(row:number,col:number)=>void,
    onMouseEnter:(row:number,col:number)=>void,
    size:string,
}


function Cell(props:CellProps) {
    const [isWall, setIsWall] = React.useState(false);

    const setWall = (pressedNow:boolean) =>{
        if (pressedNow || props.mPressed[0]){// check user wanted to draw a wall
            if (!props.isStart && !props.isFinish){// check that it was a feasible cell
                if (pressedNow)
                    props.onMouseDown(props.row, props.col);
                else
                    props.onMouseEnter(props.row, props.col);
                setIsWall(!isWall)
            }
        }
    }

    return (
        <div
            id={`cell-${props.row}-${props.col}`}
            className="cell"
            onMouseDown={(event) => {setWall(true);event.preventDefault();}}
            onMouseEnter={(event) => {setWall(false);event.preventDefault();}}
            style={{'width':props.size, 'height':props.size,}}>
            
            {isWall && <div className="wall"></div>}
            {props.isStart && <div className="start"></div>}
            {props.isFinish && <div className="finish"></div>}

        </div>
    );
}

export default Cell;