import React, {useEffect, useState} from "react";
import {Avatar, Button, Container, Grid, Modal, Paper, Typography} from "@material-ui/core";
import {getMove, getWinner, MovesEnum, winnerSelection} from "../services/game";
import rules from "../assets/images/image-rules.svg"
import Player from "../components/Player";
import TimelineGame, {getWinnerText} from "../components/Timeline";
import Badge from "@material-ui/core/Badge";

export interface IPlayer {
    points: number
    currentMove: MovesEnum | null
    image: string | null
}

interface IGame {
    history: IHistory[]
    counter: number
    winner: winnerSelection | null
    playing: boolean
}

export interface IHistory {
    p1: MovesEnum
    p2: MovesEnum
    winner: number
    img: string
}

let firstLoad = true

function Game() {
    //Jugador 1
    const [p1, setP1] = useState<IPlayer>({
        points: 0,
        currentMove: null,
        image: null
    })
    //Jugador 2
    const [p2, setP2] = useState<IPlayer>({
        points: 0,
        currentMove: null,
        image: null
    })
    //Juego
    const [game, setGame] = useState<IGame>({
        counter: 0,
        history: [],
        winner: null,
        playing: false
    })
    // Modal
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        if (firstLoad) {
            // En primera carga obtenemos el juego guardado
            firstLoad = false;
            let gameState = localStorage.getItem("gameState")
            if (gameState != null && gameState !== "{}") {
                let data = JSON.parse(gameState);
                setP1(data.p1)
                setP2(data.p2)
                setGame(data.game)
            }
        } else {
            // Guardamos el estado modificado
            localStorage.setItem("gameState", JSON.stringify({
                p1,
                p2,
                game
            }));
        }
    },);


    const handleClick = () => {
        // Si no esta jugando y empieza a jugar
        if (!game.playing) {
            setP1({
                ...p1,
                image: "https://placekitten.com/100/" + (100 + Math.floor(Math.random() * 50)).toString()
            });
            setP2({
                ...p2,
                image: "https://placekitten.com/125/" + (100 + Math.floor(Math.random() * 50)).toString()
            });
            setGame({
                counter: 0,
                history: [],
                winner: null,
                playing: true
            })
        }

        // Si esta jugando y tiene menos de 5 partidas
        if (game.playing && game.counter < 5) {

            const _p1 = getMove()
            const _p2 = getMove()
            const _winner = getWinner(_p1, _p2)

            let numWinner = 0;
            let imgWinner = "";
            let pointsPlayer1 = p1.points;
            let pointsPlayer2 = p2.points;

            if (_winner === winnerSelection.TIE) {
                numWinner = 0;
            } else if (_winner === winnerSelection.P1) {
                numWinner = 1;
                imgWinner = p1.image ?? "";
                pointsPlayer1 += 1
            } else if (_winner === winnerSelection.P2) {
                numWinner = 2;
                imgWinner = p2.image ?? "";
                pointsPlayer2 += 1
            }

            setP1({
                ...p1,
                points: pointsPlayer1,
                currentMove: _p1
            });
            setP2({
                ...p2,
                points: pointsPlayer2,
                currentMove: _p2
            });
            setGame({
                ...game,
                history: [...game.history, {p1: _p1, p2: _p2, winner: numWinner, img: imgWinner}],
                counter: game.counter + 1,
                winner: _winner
            });

        }

        //si el contados sobrepasa llega a las 5 partidas
        if (game.counter >= 5) {
            setP1({
                points: 0,
                currentMove: null,
                image: null
            })
            setP2({
                points: 0,
                currentMove: null,
                image: null
            })
            setGame({
                counter: 0,
                history: [],
                winner: null,
                playing: false
            })
        }

    }

    function initialCard() {
        if (!game.playing && game.counter < 5) {
            return (
                <Grid container direction="column" justify="center" alignItems="center" className="content-centered">
                    <Paper elevation={3} className="card card-start">
                        <Typography variant="h2" component="h2">
                            Rock, Paper, Scissors, Lizard, Spock
                        </Typography>
                        <div className="card-start__img">
                            <img src={rules} alt={''}/>
                        </div>
                        <div>
                            <Button variant="outlined" color="primary" onClick={handleClick} className="btn-base">
                                Start Playing
                            </Button>
                        </div>

                    </Paper>
                </Grid>
            )
        } else if (game.playing && game.counter < 5) {
            return (

                <Grid container direction="column" justify="center" alignItems="center" className="content-centered">
                    <Paper elevation={3} className="card card-game">
                        <div>
                            <h2>Round: {game.counter}</h2>
                        </div>
                        <Grid container direction="row" justify="center" alignItems="center"
                              className="card-game__points">
                            <div>Points Player 1 : {p1.points}</div>
                            <div>Points Player 2 : {p2.points}</div>
                        </Grid>
                        <Grid container direction="row" justify="space-between" alignItems="center"
                              className="card-game__players">
                            <Player horizontalPosition={"left"} player={p1}/>
                            <div className="card-game__wins">
                                <h3>{getWinnerText(game.history.slice(-1)[0])}</h3>
                                <Button variant="outlined" color="primary" onClick={handleClick} className="btn-base">
                                    {game.playing ? "Now" : "Start Playing"}
                                </Button>
                            </div>
                            <Player horizontalPosition={"right"} player={p2}/>
                        </Grid>
                    </Paper>
                </Grid>
            )
        }
    }


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function restartGame() {

        let img = ""
        let textWinner = ""
        let pointsWinner = 0
        if (p1.points > p2.points) {
            img = p1.image ?? ""
            textWinner = "Player 1 Wins"
            pointsWinner = p1.points
        } else if (p2.points > p1.points) {
            img = p2.image ?? ""
            textWinner = "Player 2 Wins"
            pointsWinner = p2.points
        } else {
            textWinner = "Nobody Wins the game"
        }

        if (game.counter >= 5) {
            return (
                <Grid container direction="column" justify="center" alignItems="center" className="content-centered">
                    <Paper elevation={3} className="card card-winner">
                        <Badge
                            overlap="circle">
                            <Avatar alt="Travis Howard" src={img} className="card-winner__img"/>
                        </Badge>
                        <h2>{textWinner}</h2>
                        <p>Score: {pointsWinner}</p>
                        <Button variant="outlined" color="primary" onClick={handleClick} className="btn-base">
                            Restart Game
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleOpen} className="btn-secondary">
                            DETALLES
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}>
                            <Paper elevation={3} className="card card-winner__timeline">
                                <TimelineGame history={game.history}/>
                            </Paper>
                        </Modal>
                    </Paper>
                </Grid>
            )
        }
    }

    return (
        <Container fixed>
            {/*// @ts-ignore*/}
            {initialCard()}
            {/*// @ts-ignore*/}
            {restartGame()}
        </Container>
    );
}

export default Game;
