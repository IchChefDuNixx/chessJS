import axios from "axios";
import React, { PropsWithChildren } from "react";

import "./Square.css";


// only used for touch "click" inputs
let first: HTMLElement | null = null;
let second: HTMLElement | null = null;
// to remember the square we started dragging from
let holding: EventTarget & Element | null = null;

interface Props {
    black: boolean,
    position: number,
    handleMove: (start: number, end: number) => void,
    highlightMoves: (indeces: number[]) => void
}

// .currentTarget is always square
// .target is square or piece if there is one

function Square({ black, position, handleMove, highlightMoves, children } : PropsWithChildren<Props>) {

    const handleMouseDown = (e: React.MouseEvent): void => {
        if (holding) holding.classList.remove("holding"); // clears old stuck class
        if (e.button === 0) {
            let target = e.target as HTMLElement;
            if (target.classList.contains("piece")) {
                holding = e.currentTarget;
                holding.classList.add("holding");
                holding.classList.add("hovering");
            }
        } else if (e.button === 1) { // prevents "hovering" from sticking in edge-cases
            e.currentTarget.classList.remove("hovering");
        }
    }

    const handleMouseUp = (e: React.MouseEvent): void => {
        if (holding) holding.classList.remove("holding");
        e.currentTarget.classList.remove("hovering");
    }

    const handleOnMouseLeave = (e: React.MouseEvent): void => {
        e.currentTarget.classList.remove("hovering");
    }

    const handleDoubleClick = (e: React.MouseEvent): void => {
        const target = e.target as HTMLElement;
        const index: string = e.currentTarget.getAttribute("data-position")!;

        if (target.classList.contains('piece')) {
            axios.post('/api/possible_moves', { index })
                .then(response => highlightMoves(response.data))
                .catch(error => console.error('Error (from square.tsx):', error));
        }
        console.log('clickety-click!');
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
        // cleanup touch remains, this is the earliest possible point, for my surface at least
        if (first) {
            first.classList.remove("selected");
            first = null;
        }

        const startSquare = e.currentTarget;
        const startPosition: string|null = startSquare.getAttribute("data-position");
        // startPosition should never be null, but just in case
        if (startPosition) {
            e.dataTransfer.setData("startPosition", startPosition);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
        e.currentTarget.classList.add("hovering");
        e.preventDefault(); // enable drop
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
        e.currentTarget.classList.remove("hovering");
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
        if (holding) {
            holding.classList.remove("holding");
        }
        e.currentTarget.classList.remove("hovering");
        const startPosition: string = e.dataTransfer.getData("startPosition");
        const endPosition: string|null = e.currentTarget.getAttribute("data-position");
        // endPosition should never be null, but just in case
        if (endPosition && (startPosition != endPosition)) {
            handleMove(+startPosition, +endPosition);
        }
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
        let target = e.touches[0].target as HTMLElement;

        // prevent moving empty squares
        if (!first && target.classList.contains("piece")) {
            first = target.parentNode as HTMLElement;
            first.classList.add("selected");

        // allow deselecting current piece
        } else if (first && target.parentNode == first) {
            first.classList.remove("selected");
            first = null;

        // make move
        } else if (first) {
            if (target.classList.contains("piece"))
                second = target.parentNode as HTMLElement; // other piece
            else
                second = target; // empty square

            let startPosition = first.getAttribute("data-position");
            let endPosition = second.getAttribute("data-position");
            // should never be null but TypeScript likes this
            if (startPosition && endPosition)
                handleMove(+startPosition, +endPosition);

            first.classList.remove("selected");
            second.classList.remove("selected");
            first = second = null;
        }
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
            onTouchStart={e => handleTouchStart(e)}
        >
            { children }
        </div>
    );
}

export default Square;
