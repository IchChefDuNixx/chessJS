import React from "react";
import { PropsWithChildren } from "react";
import "./Square.css";


interface Props {
    black: boolean,
    position: number,
    handleMove: (start: number, end: number) => void
}


function Square({ black, position, handleMove, children } : PropsWithChildren<Props>) {

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const startSquare = e.currentTarget;
        const startPosition = startSquare.getAttribute("data-position");
        // startPosition should never be null, but just in case
        if (startPosition)
            e.dataTransfer.setData("startPosition", startPosition);
    };

    const enableDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
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
            onDragStart={e => handleDragStart(e)}
            onDragOver={e => enableDrop(e)}
            onDrop={e => handleDrop(e)}
        >
            { children }
        </div>
    );
}


export default Square;