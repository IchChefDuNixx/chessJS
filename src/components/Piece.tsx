import { FaChessKing, FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight, FaChessPawn } from "react-icons/fa";
import "./Piece.css";


interface Props {
    type: string
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

    return(
        <div className="piece" data-type={type} draggable >
            { icon }
        </div>
    );
}


export default Piece;