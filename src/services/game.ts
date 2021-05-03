//Este fichero va a contener la lógica del juego

//Movimientos permitidos dentro del juego
export enum MovesEnum {
    MOVE_LIZARD= 'lizard',
    MOVE_ROCK = 'rock',
    MOVE_PAPER ='paper',
    MOVE_SCISSORS ='scissors',
    MOVE_SPOCK = 'spock'
}

//Obtener movimiento del jugador
export function getMove(): MovesEnum {
    const x = Object.keys(MovesEnum).length;
    return Object.keys(MovesEnum)[Math.floor(Math.random() * x)] as MovesEnum;
}

//Posibles estados de la partida
export enum winnerSelection {
    TIE,
    P1,
    P2
}

export function getWinner(moveP1: string, moveP2: string): winnerSelection {
    //Hay empate?
    if (moveP1 === moveP2) {
        return winnerSelection.TIE
    }
    if (checkMove(moveP1, moveP2)){
        return winnerSelection.P1
    }
    if( checkMove(moveP2, moveP1)){
        return winnerSelection.P2
    }
    return winnerSelection.TIE
}

export function checkMove(move1: string, move2: string): Boolean {
    // @ts-ignore
    move2 = MovesEnum[move2]
    // @ts-ignore
    switch (MovesEnum[move1]) {
        case MovesEnum.MOVE_LIZARD:
                return (move2 === MovesEnum.MOVE_SPOCK || move2 === MovesEnum.MOVE_PAPER)
        case MovesEnum.MOVE_PAPER:
                return (move2 === MovesEnum.MOVE_SPOCK || move2 === MovesEnum.MOVE_ROCK)
        case MovesEnum.MOVE_ROCK:
                return (move2 === MovesEnum.MOVE_LIZARD || move2 === MovesEnum.MOVE_SCISSORS)
        case MovesEnum.MOVE_SCISSORS:
                return (move2 === MovesEnum.MOVE_LIZARD || move2 === MovesEnum.MOVE_PAPER)
        case MovesEnum.MOVE_SPOCK:
                return (move2 === MovesEnum.MOVE_SCISSORS || move2 === MovesEnum.MOVE_ROCK)
        default:
            console.error(`Error Movimientos`)
    }
    return false
}

getWinner(MovesEnum.MOVE_LIZARD, MovesEnum.MOVE_LIZARD)
