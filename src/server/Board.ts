const createBoard = (): string[] => {
    const initialBoard: string[] = [
      "rook_b", "knight_b", "bishop_b", "king_b", "queen_b", "bishop_b", "knight_b", "rook_b",
      "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b",
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
      "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w",
      "rook_w", "knight_w", "bishop_w", "king_w", "queen_w", "bishop_w", "knight_w", "rook_w"
    ];
    return initialBoard;
  };

  const boardAsMatrix = (): Map<string, number> => {
    const boardAsMatrix: Map<string, number> = new Map<string, number>();
  
    let counter = 0;
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        boardAsMatrix.set(`${i},${j}`, counter);
        counter++;
      }
    }
    return boardAsMatrix;
  };