const initialBoard: string[] = [
    "rook_b", "knight_b", "bishop_b", "queen_b", "king_b", "bishop_b", "knight_b", "rook_b",
    "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b", "pawn_b",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w", "pawn_w",
    "rook_w", "knight_w", "bishop_w", "queen_w", "king_w", "bishop_w", "knight_w", "rook_w"
];

function getInitialBoard(): string[] {
    return [...initialBoard];
}

export { getInitialBoard };
