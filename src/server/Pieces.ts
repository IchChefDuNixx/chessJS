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

    protected getPosition(): any {
        return [this.positionX, this.positionY];
    }

    protected setPosition(positionX: number, positionY: number): void {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    protected getColor(): PieceColor {
        return this.color;
    }

    protected getType(): PieceType {
        return this.type;
    }

    protected isNotOutOfBounds(x:number, y:number): boolean {
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
        if(this.color == 'w' && this.isNotOutOfBounds(this.positionX, this.positionY + 1)) {
            moveSet.push([this.positionX, this.positionY+1]);
            if(this.hasMoved == false && this.isNotOutOfBounds(this.positionX, this.positionY + 2)) {
                moveSet.push([this.positionX, this.positionY+2]);
            }
        } else {
            if(this.isNotOutOfBounds(this.positionX, this.positionY - 1)) {
                moveSet.push([this.positionX, this.positionY-1]);
                if(this.hasMoved == false  && this.isNotOutOfBounds(this.positionX, this.positionY - 2)) {
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
        return moveSet;
    }
}

class Bishop extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'bishop' });
    }

    public getPossibleMoves(): number[][] {
        let moveSet: number[][] = [];
        return moveSet;
    }
}

class Rook extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'rook' });
    }

    public getPossibleMoves(): number[][] {
        let moveSet: number[][] = [];
        return moveSet;
    }
}

class Queen extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'queen' });
    }

    public getPossibleMoves(): number[][] {
        let moveSet: number[][] = [];
        return moveSet;
    }
}

class King extends Piece {
    constructor(props: PieceProps) {
        super({ ...props, type: 'king' });
    }

    public getPossibleMoves(): number[][] {
        let moveSet: number[][] = [];
        return moveSet;
    }
}
