import { describe, expect, it } from "vitest";

import { Bishop, King, Knight, Pawn, Piece, Queen, Rook } from '../server/Pieces';


describe("piece initialization", () => {
    it("creates a bishop", () => {
        const bishop = new Bishop({ X: 0, Y: 0, color: "w" });
        expect(bishop.hasMoved).toBe(false);
        expect(bishop.getType()).toBe("bishop");
    });
    it("creates a king", () => {
        const king = new King({ X: 0, Y: 0, color: "w" });
        expect(king.hasMoved).toBe(false);
        expect(king.getType()).toBe("king");
    });
    it("creates a knight", () => {
        const knight = new Knight({ X: 0, Y: 0, color: "w" });
        expect(knight.hasMoved).toBe(false);
        expect(knight.getType()).toBe("knight");
    });
    it("creates a pawn", () => {
        const pawn = new Pawn({ X: 0, Y: 0, color: "w" });
        expect(pawn.hasMoved).toBe(false);
        expect(pawn.getType()).toBe("pawn");
    });
    it("creates a queen", () => {
        const queen = new Queen({ X: 0, Y: 0, color: "w" });
        expect(queen.hasMoved).toBe(false);
        expect(queen.getType()).toBe("queen");
    });
    it("creates a rook", () => {
        const rook = new Rook({ X: 0, Y: 0, color: "w" });
        expect(rook.hasMoved).toBe(false);
        expect(rook.getType()).toBe("rook");
    });
    it("creates a custom piece", () => {
        const piece1 = new Piece({ X: 0, Y: 0, type: "king", color: "b", hasMoved: true});
        expect(Piece.isInBounds(piece1.X, piece1.Y)).toBe(true);
        const piece2 = new Piece({ X: 8, Y: 0, type: "king", color: "b", hasMoved: true});
        expect(Piece.isInBounds(piece2.X, piece2.Y)).toBe(false);
        const piece3 = new Piece({ X: 0, Y: 8, type: "king", color: "b", hasMoved: true});
        expect(Piece.isInBounds(piece3.X, piece3.Y)).toBe(false);
        const piece4 = new Piece({ X: 8, Y: 8, type: "king", color: "b", hasMoved: true});
        expect(Piece.isInBounds(piece4.X, piece4.Y)).toBe(false);
    });
});

// describe("x");
// // piece movement here or in board.test?
// describe("y");
