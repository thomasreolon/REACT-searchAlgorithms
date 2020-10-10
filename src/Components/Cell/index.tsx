import React from 'react';
import "./Cell.css";

const a = ()=>{}
interface CellProps{
    row:number,
    col:number,
    isFinish:boolean,
    isStart:boolean,
    isWall:boolean,
    onMouseDown:(row:number,col:number)=>void,
    onMouseEnter:(row:number,col:number)=>void,
    size:string,
}


function Cell(props:CellProps) {
    return (
        <div
            id={`cell-${props.row}-${props.col}`}
            className="cell"
            onMouseDown={(event) => {props.onMouseDown(props.row, props.col);event.preventDefault();}}
            onMouseEnter={(event) => {props.onMouseEnter(props.row, props.col);event.preventDefault();}}
            style={{'width':props.size, 'height':props.size,}}>
            
            {props.isWall && <div className="wall"></div>}
            {props.isStart && <div className="start"></div>}
            {props.isFinish && <div className="finish"></div>}

        </div>
    );
}

export default Cell;