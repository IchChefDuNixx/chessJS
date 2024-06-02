type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'king' | 'queen';
type PieceColor = 'w' | 'b';

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

    public setHasMoved(): void {
        this.hasMoved = true;
    }

    public getPosition(): number {
        return this.position;
    }

    public setPosition(position: number): void {
        this.position = position
    }

    public getColor(): PieceColor {
        return this.color;
    }

    public getType(): PieceType {
        return this.type;
    }

}

class Pawn extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'pawn' });
    }
}

class Knight extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'knight' });
    }
}

class Bishop extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'bishop' });
    }
}

class Rook extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'rook' });
    }
}

class Queen extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'queen' });
    }
}

class King extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'king' });
    }
}
