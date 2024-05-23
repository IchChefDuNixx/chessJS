import { FaChessKing, FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight, FaChessPawn } from "react-icons/fa";
import { Tooltip, Zoom } from "@mui/material";
import "./Piece.css";

export type PieceType = 'Pawn' | 'Knight' | 'Bishop' | 'Rook' | 'King' | 'Queen';
export type PieceColor = 'white' | 'black';


interface Props {
    type: string
}


interface PieceProps {
    type: PieceType;
    color: PieceColor;
    position: number;
}

export class Pieces {
    type: PieceType;
    color: PieceColor;
    position: number;

    constructor(props: PieceProps) {
        this.type = props.type;
        this.color = props.color;
        this.position = props.position;
    }
}

export class Pawn extends Pieces {
    hasMoved: boolean;

    constructor(props: PieceProps) {
        super(props);
        this.hasMoved = false;
    }

    public setHasMoved = () => {
        this.hasMoved = true;
    }
}

export class Knight extends Pieces {
    constructor(props: PieceProps) {
        super(props);
    }
}

export class Bishop extends Pieces {
    constructor(props: PieceProps) {
        super(props);
    }
}

export class Rook extends Pieces {
    hasMoved: boolean;
    constructor(props: PieceProps) {
        super(props);
        this.hasMoved = false;
    }
    public setHasMoved = () => {
        this.hasMoved = true;
    }
}

export class King extends Pieces {
    hasMoved: boolean;

    constructor(props: PieceProps) {
        super(props);
        this.hasMoved = false;
    }

    public setHasMoved = () => {
        this.hasMoved = true;
    }
}

export class Queen extends Pieces {
    constructor(props: PieceProps) {
        super(props);
    }
}


// this could be a lot nicer I guess
function getIcon(type: string) {
    const [piece, color] = type.split("_");
    const styleColor = color === "b" ? "black" : "white";

    switch (piece) {
        case "king":
            return <FaChessKing className="icon" color={styleColor} />;
        case "queen":
            return <FaChessQueen className="icon" color={styleColor} />;
        case "rook":
            return <FaChessRook className="icon" color={styleColor} />;
        case "bishop":
            return <FaChessBishop className="icon" color={styleColor} />;
        case "knight":
            return <FaChessKnight className="icon" color={styleColor} />;
        case "pawn":
            return <FaChessPawn className="icon" color={styleColor} />;
    }
}


function Piece({ type } : Props) {
    const icon = getIcon(type);

    // TODO: add user-specific setting
    let show_tooltips: boolean = true;
    if (show_tooltips) {
        return(
            <Tooltip
                title={type}
                arrow
                disableInteractive
                TransitionComponent={Zoom}
                enterDelay={1000}
                >
                <div className="piece" data-type={type} draggable >
                    { icon }
                </div>
            </Tooltip>
        );
    } else {
        return(
            <div className="piece" data-type={type} draggable >
                { icon }
            </div>
        );
    }
}


export default Piece;
