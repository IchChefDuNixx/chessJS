type PieceType = 'Pawn' | 'Knight' | 'Bishop' | 'Rook' | 'King' | 'Queen';
type PieceColor = 'white' | 'black';

interface PieceProps {
    type: PieceType;
    color: PieceColor;
    position: number;
    hasMoved: boolean;
}

export class Piece {
    type: PieceType;
    color: PieceColor;
    position: number;
    hasMoved: boolean;

    constructor(props: PieceProps) {
        this.type = props.type;
        this.color = props.color;
        this.position = props.position;
        this.hasMoved = false;
    }

    public setHasMoved = () => {
        this.hasMoved = true;
    }
}