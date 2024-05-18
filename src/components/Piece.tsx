import { FaChessKing, FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight, FaChessPawn } from "react-icons/fa";
import { Tooltip, Zoom } from "@mui/material";
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