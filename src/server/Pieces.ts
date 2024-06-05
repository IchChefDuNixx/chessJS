type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'king' | 'queen';
type PieceColor = 'w' | 'b';

interface PieceProps {
    type: PieceType;
    color: PieceColor;
    positionX: number;
    positionY: number;
    hasMoved: boolean;
}

export class Piece {
    type: PieceType;
    color: PieceColor;
    positionX: number;
    positionY: number;
    hasMoved: boolean;

    constructor(props: PieceProps) {
        this.type = props.type;
        this.color = props.color;
        this.positionX = props.positionX;
        this.positionY = props.positionY;
        this.hasMoved = false;
    }

    protected setHasMoved(): void {
        this.hasMoved = true;
    }

    public getPosition(): any {
        return [this.positionX, this.positionY];
    }

    protected setPosition(positionX: number, positionY: number): void {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    public getColor(): PieceColor {
        return this.color;
    }

    public getType(): PieceType {
        return this.type;
    }

    public isInBounds(x:number, y:number): boolean {
        return (x > 0 && x< 9 && y > 0 && y < 9)
    }
}

class Pawn extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'pawn' });
    }

    //Capturing movement logic is missing
    public getPossibleMoves(): number[][] {
        let moveSet: number[][] = [];
        if(this.color == 'w' && this.isInBounds(this.positionX, this.positionY + 1)) {
            moveSet.push([this.positionX, this.positionY+1]);
            if(this.hasMoved == false && this.isInBounds(this.positionX, this.positionY + 2)) {
                moveSet.push([this.positionX, this.positionY+2]);
            }
        } else {
            if(this.isInBounds(this.positionX, this.positionY - 1)) {
                moveSet.push([this.positionX, this.positionY-1]);
                if(this.hasMoved == false  && this.isInBounds(this.positionX, this.positionY - 2)) {
                    moveSet.push([this.positionX, this.positionY-2]);
                }
            } 
        }
        return moveSet;
    }
}

class Knight extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'knight' });
    }

    public getPossibleMoves(): number[][] {
        let moveSet: number[][] = [];
        if(this.isInBounds(this.positionX+2, this.positionY+1)){moveSet.push([this.positionX+2, this.positionY+1])}
        if(this.isInBounds(this.positionX+2, this.positionY-1)){moveSet.push([this.positionX+2, this.positionY-1])}
        if(this.isInBounds(this.positionX+1, this.positionY-2)){moveSet.push([this.positionX+1, this.positionY-2])}
        if(this.isInBounds(this.positionX+1, this.positionY+2)){moveSet.push([this.positionX+1, this.positionY+2])}
        if(this.isInBounds(this.positionX-1, this.positionY-2)){moveSet.push([this.positionX-1, this.positionY-2])}
        if(this.isInBounds(this.positionX-1, this.positionY+2)){moveSet.push([this.positionX-1, this.positionY+2])}
        if(this.isInBounds(this.positionX-2, this.positionY+1)){moveSet.push([this.positionX-2, this.positionY+1])}
        if(this.isInBounds(this.positionX-2, this.positionY-1)){moveSet.push([this.positionX-2, this.positionY-1])}
        return moveSet;
    }
}

class Bishop extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'bishop' });
    }

    public getPossibleMoves(): number[][] {
        let moveSet: number[][] = [];
        // Diagonal moves
        for (let i = 1; i < 8; i++) {
            if (this.isInBounds(this.positionX + i, this.positionY + i)) moveSet.push([this.positionX + i, this.positionY + i]);
            if (this.isInBounds(this.positionX - i, this.positionY + i)) moveSet.push([this.positionX - i, this.positionY + i]);
            if (this.isInBounds(this.positionX + i, this.positionY - i)) moveSet.push([this.positionX + i, this.positionY - i]);
            if (this.isInBounds(this.positionX - i, this.positionY - i)) moveSet.push([this.positionX - i, this.positionY - i]);
        }
        return moveSet;
    }
}

class Rook extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'rook' });
    }

    public getPossibleMoves(): number[][] {
        let moveSet: number[][] = [];
        // Horizontal and vertical moves
        for (let i = 1; i < 8; i++) {
            if (this.isInBounds(this.positionX + i, this.positionY)) moveSet.push([this.positionX + i, this.positionY]);
            if (this.isInBounds(this.positionX - i, this.positionY)) moveSet.push([this.positionX - i, this.positionY]);
            if (this.isInBounds(this.positionX, this.positionY + i)) moveSet.push([this.positionX, this.positionY + i]);
            if (this.isInBounds(this.positionX, this.positionY - i)) moveSet.push([this.positionX, this.positionY - i]);
        }
        return moveSet;
    }
}

class Queen extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'queen' });
    }

    public getPossibleMoves(): number[][] {
        let moveSet: number[][] = [];
        // Combine Bishop and Rook moves
        // Diagonal moves (Bishop part)
        for (let i = 1; i < 8; i++) {
            if (this.isInBounds(this.positionX + i, this.positionY + i)) moveSet.push([this.positionX + i, this.positionY + i]);
            if (this.isInBounds(this.positionX - i, this.positionY + i)) moveSet.push([this.positionX - i, this.positionY + i]);
            if (this.isInBounds(this.positionX + i, this.positionY - i)) moveSet.push([this.positionX + i, this.positionY - i]);
            if (this.isInBounds(this.positionX - i, this.positionY - i)) moveSet.push([this.positionX - i, this.positionY - i]);
        }
        // Horizontal and vertical moves (Rook part)
        for (let i = 1; i < 8; i++) {
            if (this.isInBounds(this.positionX + i, this.positionY)) moveSet.push([this.positionX + i, this.positionY]);
            if (this.isInBounds(this.positionX - i, this.positionY)) moveSet.push([this.positionX - i, this.positionY]);
            if (this.isInBounds(this.positionX, this.positionY + i)) moveSet.push([this.positionX, this.positionY + i]);
            if (this.isInBounds(this.positionX, this.positionY - i)) moveSet.push([this.positionX, this.positionY - i]);
        }
        return moveSet;
    }
}

class King extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'king' });
    }

    public getPossibleMoves(): number[][] {
        let moveSet: number[][] = [];
        // Moves one square in any direction
        const kingMoves = [
            [1, 0], [-1, 0], [0, 1], [0, -1],
            [1, 1], [-1, -1], [1, -1], [-1, 1]
        ];
        for (let move of kingMoves) {
            let newX = this.positionX + move[0];
            let newY = this.positionY + move[1];
            if (this.isInBounds(newX, newY)) moveSet.push([newX, newY]);
        }
        return moveSet;
    }
}
