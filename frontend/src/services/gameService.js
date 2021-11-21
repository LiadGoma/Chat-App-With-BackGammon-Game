
const gameBoard = [
    { place: 12, pieces: [{ color: "white", id: 2 }, { color: "white", id: 4 }, { color: "white", id: 6 }, { color: "white", id: 8 }, { color: "white", id: 10 },] },
    { place: 11, pieces: [] },
    { place: 10, pieces: [] },
    { place: 9, pieces: [] },
    { place: 8, pieces: [{ color: "black", id: 1 }, { color: "black", id: 3 }, { color: "black", id: 5 }] },
    { place: 7, pieces: [] },
    { place: 6, pieces: [{ color: "black", id: 7 }, { color: "black", id: 9 }, { color: "black", id: 11 }, { color: "black", id: 13 }, { color: "black", id: 15 }] },
    { place: 5, pieces: [] },
    { place: 4, pieces: [] },
    { place: 3, pieces: [] },
    { place: 2, pieces: [] },
    { place: 1, pieces: [{ color: "white", id: 12 }, { color: "white", id: 14 }] },
    { place: 13, pieces: [{ color: "black", id: 17 }, { color: "black", id: 19 }, { color: "black", id: 21 }, { color: "black", id: 23 }, { color: "black", id: 25 }] },
    { place: 14, pieces: [] },
    { place: 15, pieces: [] },
    { place: 16, pieces: [] },
    { place: 17, pieces: [{ color: "white", id: 16 }, { color: "white", id: 18 }, { color: "white", id: 20 }] },
    { place: 18, pieces: [] },
    { place: 19, pieces: [{ color: "white", id: 22 }, { color: "white", id: 24 }, { color: "white", id: 26 }, { color: "white", id: 28 }, { color: "white", id: 30 }] },
    { place: 20, pieces: [] },
    { place: 21, pieces: [] },
    { place: 22, pieces: [] },
    { place: 23, pieces: [] },
    { place: 24, pieces: [{ color: "black", id: 27 }, { color: "black", id: 29 }] }
];


const gameBoardMock = [
    { place: 12, pieces: [{ color: "white", id: 2 }, { color: "white", id: 4 }, { color: "white", id: 6 }, { color: "white", id: 8 }, { color: "white", id: 10 },] },
    { place: 11, pieces: [] },
    { place: 10, pieces: [] },
    { place: 9, pieces: [] },
    { place: 8, pieces: [] },
    { place: 7, pieces: [{ color: "black", id: 7 }] },
    { place: 6, pieces: [{ color: "black", id: 9 }, { color: "black", id: 11 }, { color: "black", id: 13 }, { color: "black", id: 15 }] },
    { place: 5, pieces: [] },
    { place: 4, pieces: [] },
    { place: 3, pieces: [{ color: "black", id: 1 }, { color: "black", id: 3 }, { color: "black", id: 5 }] },
    { place: 2, pieces: [{ color: "black", id: 17 }, { color: "black", id: 19 }, { color: "black", id: 21 }, { color: "black", id: 23 }, { color: "black", id: 25 }] },
    { place: 1, pieces: [{ color: "black", id: 27 }, { color: "black", id: 29 }] },
    { place: 13, pieces: [] },
    { place: 14, pieces: [] },
    { place: 15, pieces: [] },
    { place: 16, pieces: [{ color: "white", id: 12 }, { color: "white", id: 14 }] },
    { place: 17, pieces: [{ color: "white", id: 16 }, { color: "white", id: 18 }, { color: "white", id: 20 }] },
    { place: 18, pieces: [] },
    { place: 19, pieces: [{ color: "white", id: 22 }, { color: "white", id: 24 }, { color: "white", id: 26 }, { color: "white", id: 28 }, { color: "white", id: 30 }] },
    { place: 20, pieces: [] },
    { place: 21, pieces: [] },
    { place: 22, pieces: [] },
    { place: 23, pieces: [] },
    { place: 24, pieces: [] }
];


const whitePiecesBox = [];
const blackPiecesBox = [];
const jail = { pieces: []};


export const addPieceToBox = (movedPiece) => {
    const dieValue1 = localStorage.getItem("value1");
    const dieValue2 = localStorage.getItem("value2");
    const dieValue3 = localStorage.getItem("value3");
    const dieValue4 = localStorage.getItem("value4");
    const oldPlaceIndex = gameBoard.findIndex((row) => row.pieces.find((piece) => piece.id === movedPiece.id));
    if (movedPiece.color == "white") {
        if (canPlayerDropToBox(movedPiece.color)) {
            if (isRemovePieceEligible(dieValue1, dieValue2, dieValue3, dieValue4, oldPlaceIndex, 24)) {
                gameBoard[oldPlaceIndex].pieces = gameBoard[oldPlaceIndex].pieces?.filter((piece) => piece.id !== movedPiece.id);
                whitePiecesBox.push(movedPiece);
            }
        }
    }
    if (movedPiece.color == "black") {
        if (canPlayerDropToBox(movedPiece.color)) {
            if (isRemovePieceEligible(dieValue1, dieValue2, dieValue3, dieValue4, oldPlaceIndex, 12)) {
                gameBoard[oldPlaceIndex].pieces = gameBoard[oldPlaceIndex].pieces?.filter((piece) => piece.id !== movedPiece.id);
                blackPiecesBox.push(movedPiece);
            }
        }
    }

}

const isRemovePieceEligible = (dieValue1, dieValue2, dieValue3, dieValue4, oldPlaceIndex, gameNumber) => {

    const oldPlace = gameNumber - oldPlaceIndex;

    if (dieValue1 >= oldPlace) {
        localStorage.removeItem("value1");
        return true;
    }
    else if (dieValue2 >= oldPlace) {
        localStorage.removeItem("value2");
        return true;
    }
    else if (dieValue3 >= oldPlace) {
        localStorage.removeItem("value3");
        return true;
    }
    else if (dieValue4 >= oldPlace) {
        localStorage.removeItem("value4");
        return true;
    }
    return false;
}

const canPlayerDropToBox = (color) => {
    if (color == "white") {
        for (let index = 0; index < 18; index++) {
            if (gameBoard[index].pieces[0]?.color === color) {
                return false;
            }
        }
    }
    else {
        for (let index = 0; index < 6; index++) {
            if (gameBoard[index].pieces[0]?.color === color) {
                return false;
            }
        }
        for (let index = 12; index < 24; index++) {
            if (gameBoard[index].pieces[0]?.color === color) {
                return false;
            }
        }
    }
    return true;
}
const hasPieceinJail =(color)=>{
    if(jail.pieces.length === 0) return false;
    for (let index = 0; index < jail.pieces.length; index++) {
        if(jail.pieces[index].color===color)return true;
    }
    return false;
}

export const movePiece = (movedPiece, newPlace, myTurn) => {
    if (!myTurn) return;
    const newPlaceIndex = gameBoard.findIndex((row) => row.place === newPlace);
    const dieValue1 = localStorage.getItem("value1");
    const dieValue2 = localStorage.getItem("value2");
    const dieValue3 = localStorage.getItem("value3");
    const dieValue4 = localStorage.getItem("value4");
    console.log("whayyy");

    if (isPieceInJail(movedPiece)) {
        console.log("ispieceinjail");
        if (noMorethanOneOpp(newPlaceIndex, movedPiece)) {
            console.log("nomorethanone");
            if (moveMatchDiceValuesOfJail(dieValue1, dieValue2, dieValue3, dieValue4, newPlace, movedPiece)) {
                console.log("mobemathcdicebalue");
                jail.pieces = jail.pieces.filter((piece) => piece.id !== movedPiece.id);
                gameBoard[newPlaceIndex].pieces.push(movedPiece);
                return;
            }
        }
        if (isMoveEating(newPlaceIndex, movedPiece)) {
            if (moveMatchDiceValuesOfJail(dieValue1, dieValue2, dieValue3, dieValue4, newPlace, movedPiece)) {
                jail.pieces.push(gameBoard[newPlaceIndex].pieces.pop());
                jail.pieces = jail.pieces.filter((piece) => piece.id !== movedPiece.id);
                gameBoard[newPlaceIndex].pieces.push(movedPiece);
                return;
            }
        }
        return;
    }
    if (isPieceInJail(movedPiece)) return;
    if(hasPieceinJail(movedPiece.color))return;
    const oldPlaceIndex = gameBoard.findIndex((row) => row.pieces.find((piece) => piece.id === movedPiece.id));
    const oldPlace = gameBoard[oldPlaceIndex]?.place;
    if (isMoveValid(newPlaceIndex, newPlace, movedPiece, dieValue1, dieValue2, dieValue3, dieValue4, oldPlace)) {
        gameBoard[oldPlaceIndex].pieces = gameBoard[oldPlaceIndex].pieces.filter((piece) => piece.id !== movedPiece.id);
        gameBoard[newPlaceIndex].pieces.push(movedPiece);
    }
    else if (isMoveEating(newPlaceIndex, movedPiece)) {
        if (moveMatchDiceValue(dieValue1, dieValue2, dieValue3, dieValue4, oldPlace, newPlace)) {
            jail.pieces.push(gameBoard[newPlaceIndex].pieces[0])
            gameBoard[newPlaceIndex].pieces.pop();
            gameBoard[oldPlaceIndex].pieces = gameBoard[oldPlaceIndex].pieces.filter((piece) => piece.id !== movedPiece.id);
            gameBoard[newPlaceIndex].pieces.push(movedPiece);
        }
    }
}

const moveMatchDiceValuesOfJail = (dieValue1, dieValue2, dieValue3, dieValue4, newPlace, movedPiece) => {
    if (movedPiece.color == "white") {
        if (newPlace == dieValue2 || newPlace == dieValue1 || newPlace == dieValue3 || newPlace == dieValue4) {
            removeDieValueFromStorage(dieValue1, dieValue2, dieValue3, dieValue4, newPlace);
            return true;
        }
    }
    if (movedPiece.color == "black") {
        if (newPlace == 25 - dieValue2 || newPlace == 25 - dieValue1 || newPlace == 25 - dieValue3 || newPlace == 25 - dieValue4) {
            removeDieValueFromStorage(dieValue1, dieValue2, dieValue3, dieValue4, 25 - newPlace);
            return true;
        }
    }
    return false;
}
const isPieceInJail = (movedPiece) => {
    for (let index = 0; index < jail.pieces.length; index++) {
        if(jail.pieces[index].id===movedPiece.id){
            return true;
        }
    }
    return false;
}
const isMoveEating = (newPlaceIndex, movedPiece) => {
    if (gameBoard[newPlaceIndex].pieces.length === 1 && gameBoard[newPlaceIndex].pieces[0]?.color != movedPiece.color) {
        return true;
    }
    return false;
}
const isMoveValid = (newPlaceIndex, newPlace, movedPiece, dieValue1, dieValue2, dieValue3, dieValue4, oldPlace) => {
    const isNoMoreThanOneOpp = noMorethanOneOpp(newPlaceIndex, movedPiece);
    const isMoveMatchDiceValue = moveMatchDiceValue(dieValue1, dieValue2, dieValue3, dieValue4, oldPlace, newPlace);

    return isNoMoreThanOneOpp && isMoveMatchDiceValue;
}

const removeDieValueFromStorage = (dieValue1, dieValue2, dieValue3, dieValue4, diff) => {
    if (dieValue1 == diff) localStorage.removeItem("value1")
    else if (dieValue2 == diff) localStorage.removeItem("value2")
    else if (dieValue3 == diff) localStorage.removeItem("value3")
    else if (dieValue4 == diff) localStorage.removeItem("value4")
}

const moveMatchDiceValue = (dieValue1, dieValue2, dieValue3, dieValue4, oldPlace, newPlace) => {
    const diff = Math.abs(newPlace - oldPlace);
    if (diff == dieValue2 || diff == dieValue1 || diff == dieValue3 || diff == dieValue4) {
        removeDieValueFromStorage(dieValue1, dieValue2, dieValue3, dieValue4, diff);
        return true;
    }
    return false;
}
const noMorethanOneOpp = (newPlaceIndex, movedPiece) => {
    if (gameBoard[newPlaceIndex].pieces.length === 0) return true;
    return !(gameBoard[newPlaceIndex].pieces[0]?.color !== movedPiece.color)
}



export default {
    gameBoard,
    movePiece,
    whitePiecesBox,
    blackPiecesBox,
    jail,
    addPieceToBox
}