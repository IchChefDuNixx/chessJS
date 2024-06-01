import React from "react";
import { PropsWithChildren } from "react";
import "./Square.css";
import axios from "axios";

// only used for touch "click" inputs
let first: HTMLElement | null = null;
let second: HTMLElement | null = null;

interface Props {
    black: boolean,
    position: number,
    handleMove: (start: number, end: number) => void
}


function Square({ black, position, handleMove, children } : PropsWithChildren<Props>) {

    const handleMouseDown = (e: React.MouseEvent): void => {
        if (e.button === 0) {
            e.currentTarget.classList.add("hovering");
        } else if (e.button === 1) { // prevents "hovering" from sticking in edge-cases
            e.currentTarget.classList.remove("hovering");
        }
    }

    const handleMouseUp = (e: React.MouseEvent): void => {
        e.currentTarget.classList.remove("hovering");
    }

    const handleOnMouseLeave = (e: React.MouseEvent): void => {
        e.currentTarget.classList.remove("hovering");
    }

    const handleDoubleClick = (e: React.MouseEvent): void => {
        // TODO: find and highlight all valid positions of current piece
        // this might break touch dragging functionality, which currently relies on a double click
        // axios.get().then().catch();
        console.log("clickety-click!");
        console.log(e.currentTarget);
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
        // cleanup touch remains, this is the earliest possible point, for my surface at least
        if (first) {
            first.classList.remove("selected");
            first = null;
        }

        const startSquare = e.currentTarget;
        const startPosition: string|null = startSquare.getAttribute("data-position");
        // startPosition should never be null, but just in case
        if (startPosition)
            e.dataTransfer.setData("startPosition", startPosition);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
        e.currentTarget.classList.add("hovering");
        e.preventDefault(); // enable drop
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
        e.currentTarget.classList.remove("hovering");
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
        e.currentTarget.classList.remove("hovering");
        const startPosition: string = e.dataTransfer.getData("startPosition");
        const endPosition: string|null = e.currentTarget.getAttribute("data-position");
        // endPosition should never be null, but just in case
        if (endPosition && (startPosition != endPosition))
            handleMove(+startPosition, +endPosition);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
        let target = e.touches[0].target as HTMLElement;
        // ignore inputs on empty squares
        if (target.classList.contains("piece")) {
            if (!first) {
                first = target.parentNode as HTMLElement;
                first.classList.add("selected");
            } else if (target == first) {
                first.classList.remove("selected");
                first = null;
            } else {
                second = target.parentNode as HTMLElement;

                let startPosition = first.getAttribute("data-position");
                let endPosition = second.getAttribute("data-position");
                // should never be null but TypeScript like this
                if (startPosition && endPosition)
                    handleMove(+startPosition, +endPosition);

                first.classList.remove("selected");
                second.classList.remove("seleceted");
                first = second = null;
            }
        }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
        // e.preventDefault();
    };

    const handleTouchCancel = (e: React.TouchEvent<HTMLDivElement>): void => {
        // e.preventDefault();
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>): void => {
        // e.preventDefault();
        // console.log(e);
        // handleMove(50, 42)
    }

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
            onTouchMove={e => handleTouchMove(e)}
            onTouchCancel={e => handleTouchCancel(e)}
            onTouchEnd={e => handleTouchEnd(e)}
        >
            { children }
        </div>
    );
}

export default Square;
