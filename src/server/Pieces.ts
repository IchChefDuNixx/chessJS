type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'king' | 'queen';
type PieceColor = 'w' | 'b';

interface PieceProps {
    type: PieceType;
    color: PieceColor;
    X: number;
    Y: number;
    hasMoved: boolean;
}

class Piece {
    type: PieceType;
    color: PieceColor;
    X: number;
    Y: number;
    hasMoved: boolean;

    constructor(props: PieceProps) {
        this.type = props.type;
        this.color = props.color;
        this.X = props.X;
        this.Y = props.Y;
        this.hasMoved = false;
    }

    public getType(): PieceType {
        return this.type;
    }

    public getColor(): PieceColor {
        return this.color;
    }

    // see whether list or dict would be better later on
    public getPosition(): [number, number] {
        return [this.X, this.Y];
    }

    protected setPosition(newX: number, newY: number): void {
        this.X = newX;
        this.Y = newY;
    }
    
    protected setHasMoved(): void {
        this.hasMoved = true;
    }

    public static isInBounds(x: number, y: number): boolean {
        return (x >= 0 && x <= 7 && y >= 0 && y <= 7);
    }

    // Horizontal + Vertical
    public static getOrthogonalMoves(x: number, y: number): {[key: string]: number[][]} {
        const moveSet: {[key: string]: number[][]} = {
            "up": [],
            "down": [],
            "left": [],
            "right": []
        };
        // Horizontal and vertical moves
        for (let i = 1; i < 8; i++) {
            if (Piece.isInBounds(x + i, y)) moveSet["right"].push([x + i, y]);
            if (Piece.isInBounds(x - i, y)) moveSet["left"].push([x - i, y]);
            if (Piece.isInBounds(x, y + i)) moveSet["up"].push([x, y + i]);
            if (Piece.isInBounds(x, y - i)) moveSet["down"].push([x, y - i]);
        }
        return moveSet;
    }

    public static getDiagonalMoves(x: number, y: number): {[key: string]: number[][]} {
        const moveSet: {[key: string]: number[][]} = {
            "up-left": [],
            "up-right": [],
            "down-left": [],
            "down-right": []
        };
        // Diagonal moves
        for (let i = 1; i < 8; i++) {
            if (Piece.isInBounds(x + i, y + i)) moveSet["up-right"].push([x + i, y + i]);
            if (Piece.isInBounds(x - i, y + i)) moveSet["up-left"].push([x - i, y + i]);
            if (Piece.isInBounds(x + i, y - i)) moveSet["down-right"].push([x + i, y - i]);
            if (Piece.isInBounds(x - i, y - i)) moveSet["down-left"].push([x - i, y - i]);
        }
        return moveSet
    }
}

class Pawn extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'pawn', hasMoved: false });
    }

    //Capturing movement logic is missing
    public getPossibleMoves(): number[][] {
        const moveSet: number[][] = [];
        if (this.color == 'b' && Piece.isInBounds(this.X, this.Y + 1)) {
            moveSet.push([this.X, this.Y+1]);
            if (this.hasMoved == false && Piece.isInBounds(this.X, this.Y + 2)) {
                moveSet.push([this.X, this.Y+2]);
            }
        } else {
            if (Piece.isInBounds(this.X, this.Y - 1)) {
                moveSet.push([this.X, this.Y-1]);
                if (this.hasMoved == false  && Piece.isInBounds(this.X, this.Y - 2)) {
                    moveSet.push([this.X, this.Y-2]);
                }
            }
        }
        return moveSet;
    }
}

class Knight extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'knight', hasMoved: false });
    }

    public getPossibleMoves(): number[][] {
        let moveSet: number[][] = [];
        if (Piece.isInBounds(this.X+2, this.Y+1)){moveSet.push([this.X+2, this.Y+1])}
        if (Piece.isInBounds(this.X+2, this.Y-1)){moveSet.push([this.X+2, this.Y-1])}
        if (Piece.isInBounds(this.X+1, this.Y-2)){moveSet.push([this.X+1, this.Y-2])}
        if (Piece.isInBounds(this.X+1, this.Y+2)){moveSet.push([this.X+1, this.Y+2])}
        if (Piece.isInBounds(this.X-1, this.Y-2)){moveSet.push([this.X-1, this.Y-2])}
        if (Piece.isInBounds(this.X-1, this.Y+2)){moveSet.push([this.X-1, this.Y+2])}
        if (Piece.isInBounds(this.X-2, this.Y+1)){moveSet.push([this.X-2, this.Y+1])}
        if (Piece.isInBounds(this.X-2, this.Y-1)){moveSet.push([this.X-2, this.Y-1])}
        return moveSet;
    }
}

class Bishop extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'bishop', hasMoved: false });
    }

    public getPossibleMoves(): {[key: string]: number[][]} {
        return Piece.getDiagonalMoves(this.X, this.Y);
    }
}

class Rook extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'rook', hasMoved: false });
    }

    public getPossibleMoves(): {[key: string]: number[][]} {
        return Piece.getOrthogonalMoves(this.X, this.Y);
    }
}

class Queen extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'queen', hasMoved: false });
    }

    public getPossibleMoves(): {[key: string]: number[][]} {
        return {...Piece.getOrthogonalMoves(this.X, this.Y), ...Piece.getDiagonalMoves(this.X, this.Y)}         
    }
}

class King extends Piece {
    constructor(props: Omit<PieceProps, "type"|"hasMoved">) {
        super({ ...props, type: 'king', hasMoved: false});
    }

    public getPossibleMoves(): number[][] {
        const moveSet: number[][] = [];
        // Moves one square in any direction
        const kingMoves = [
            [1, 0], [-1, 0], [0, 1], [0, -1],
            [1, 1], [-1, -1], [1, -1], [-1, 1]
        ];
        for (const [newX, newY] of kingMoves) {
            if (Piece.isInBounds(newX, newY)) moveSet.push([this.X + newX, this.Y + newY]);
        }
        return moveSet;
    }
}

export {Bishop, King, Knight, Pawn, Piece, type PieceType, Queen, Rook};
