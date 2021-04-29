//Este fichero va a contener la lógica del juego

//Movimientos permitidos dentro del juego
const MOVE_ROCK = "rock";
const MOVE_PAPER = "paper";
const MOVE_LIZARD = "lizard";
const MOVE_SPOCK = "spock";
const MOVE_SCISSORS = "scissors";

const moves = [
    MOVE_LIZARD,
    MOVE_ROCK,
    MOVE_PAPER,
    MOVE_SCISSORS,
    MOVE_SPOCK
]

export enum UserResponse {
    MOVE_LIZARD,
    MOVE_ROCK,
    MOVE_PAPER,
    MOVE_SCISSORS,
    MOVE_SPOCK
}

//Obtener movimiento del jugador
export function getMove(): UserResponse {
    // return moves[Math.floor(Math.random() * moves.length)];
    const values = Object.keys(UserResponse);
    const enumKey:string = values[Math.floor(Math.random() * values.length)];
    // @ts-ignore
    return UserResponse[enumKey];
}

//Posibles estados de la partida
export enum winnerSelection {
    TIE,
    P1,
    P2
}

export function getWinner(moveP1: UserResponse, moveP2: UserResponse): winnerSelection {
    //Hay empate?
    if (moveP1 === moveP2) {
        return winnerSelection.TIE
    }
    //Comprobar movimientos if true => Gana P1 if false => Gana P2
    return checkMove(moveP1, moveP2)? winnerSelection.P1: winnerSelection.P2;
}

export function checkMove(move1: UserResponse, move2: UserResponse): Boolean {
    switch (move1) {
        case UserResponse.MOVE_LIZARD:

            if (move2 === UserResponse.MOVE_SPOCK || move2 === UserResponse.MOVE_PAPER) {
                return true
            }
            break
        case UserResponse.MOVE_PAPER:
            if (move2 === UserResponse.MOVE_SPOCK || move2 === UserResponse.MOVE_ROCK) {
                return true
            }
            break
        case UserResponse.MOVE_ROCK:
            if (move2 === UserResponse.MOVE_LIZARD || move2 === UserResponse.MOVE_SCISSORS) {
                return true
            }
            break
        case UserResponse.MOVE_SCISSORS:
            if (move2 === UserResponse.MOVE_LIZARD || move2 === UserResponse.MOVE_PAPER) {
                return true
            }
            break
        case UserResponse.MOVE_SPOCK:
            if (move2 === UserResponse.MOVE_SCISSORS || move2 === UserResponse.MOVE_ROCK) {
                return true
            }
            break
    }
    return false
}

getWinner(UserResponse.MOVE_LIZARD, UserResponse.MOVE_LIZARD)
