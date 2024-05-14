import React from "react";
import { PropsWithChildren } from "react";
import "./Square.css";


interface Props {
    black: boolean,
    position: number,
    handleMove: (start: number, end: number) => void
}


function Square({ black, position, handleMove, children } : PropsWithChildren<Props>) {

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 0) {
            e.currentTarget.classList.add("hovering");
        } else if (e.button === 1) { // prevents "hovering" from sticking in edge-cases
            e.currentTarget.classList.remove("hovering");
        }
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        e.currentTarget.classList.remove("hovering");
    }

    const handleOnMouseLeave = (e: React.MouseEvent) => {
        e.currentTarget.classList.remove("hovering");
    }

    const handleDoubleClick = (e: React.MouseEvent) => {
        // TODO: find and highlight all valid positions of current piece
        console.log("clickety-click!");
        console.log(e.currentTarget);
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const startSquare = e.currentTarget;
        const startPosition = startSquare.getAttribute("data-position");
        // startPosition should never be null, but just in case
        if (startPosition)
            e.dataTransfer.setData("startPosition", startPosition);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add("hovering");
        e.preventDefault(); // enable drop
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove("hovering");
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove("hovering");
        const startPosition = e.dataTransfer.getData("startPosition");
        const endPosition = e.currentTarget.getAttribute("data-position");
        // endPosition should never be null, but just in case
        if (endPosition)
            handleMove(+startPosition, +endPosition);
    };

    return(
        <div
            className={`square ${black ? "brown" : "beige"}`}
            data-position={position}
            onMouseDown={e => handleMouseDown(e)}
            onMouseUp={e => handleMouseUp(e)}
            onMouseLeave={e => handleOnMouseLeave(e)}
            onDoubleClick={e => handleDoubleClick(e)}
            onDragStart={e => handleDragStart(e)}
            onDragOver={e => handleDragOver(e)}
            onDragLeave={e => handleDragLeave(e)}
            onDrop={e => handleDrop(e)}
        >
            { children }
        </div>
    );
}


export default Square;