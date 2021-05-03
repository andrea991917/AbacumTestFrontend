import React, {useEffect, useState} from "react";
import {Avatar, Button, Container, Grid, Modal, Paper, Typography} from "@material-ui/core";
import {getMove, getWinner, MovesEnum, winnerSelection} from "../services/game";
import rules from "../assets/images/image-rules.svg"
import Player from "../components/Player";
import TimelineGame, {getWinnerText} from "../components/Timeline";
import Badge from "@material-ui/core/Badge";

interface IPlayer {
    points: number
    currentMove: MovesEnum | null
    image: string | null
}

interface IGame {
    history: IHistory[],
    counter: number,
}

export interface IHistory {
    p1: MovesEnum
    p2: MovesEnum
    winner: number
    img: string
}


function Game() {
    useEffect(() => {
        let gameState = localStorage.getItem("gameState")
        if (gameState != null && gameState !== "{}") {
            let data = JSON.parse(gameState);
            setPlaying(true)
            setP1(data.p1)
            setP2(data.p2)
            setGame(data.game)
            setWinner(data.winner)

        }

    },[]);

    //variables p1
    const [p1, setP1] = useState<IPlayer>({
        points: 0,
        currentMove: null,
        image: null
    })
    //variables p2
    const [p2, setP2] = useState<IPlayer>({
        points: 0,
        currentMove: null,
        image: null
    })

    const [game, setGame] = useState<IGame>({
        counter: 0,
        history: []
    })

    //State para el ganador
    const [winner, setWinner] = useState<winnerSelection | null>(null)
    //State para la partida
    const [playing, setPlaying] = useState<Boolean>(false)

    const handleClick = () => {
        let persistentData: any = {}

        if (playing && game.counter < 5) {

            const _p1 = getMove()
            const _p2 = getMove()
            const winner = getWinner(_p1, _p2)

            let currentWinner = 0;
            let currentWinnerImg = "";
            let pointsPlayer1 = p1.points;
            let pointsPlayer2 = p2.points;

            if (winner === winnerSelection.TIE) {
                currentWinner = 0;
            } else if (winner === winnerSelection.P1) {
                currentWinner = 1;
                currentWinnerImg = p1.image ?? "";
                pointsPlayer1 += 1
            } else if (winner === winnerSelection.P2) {
                currentWinner = 2;
                currentWinnerImg = p2.image ?? "";
                pointsPlayer2 += 1
            }

            setP1({
                ...p1,
                points: pointsPlayer1,
                currentMove: _p1
            });
            persistentData.p1 = {
                ...p1,
                points: pointsPlayer1,
                currentMove: _p1
            }
            setP2({
                ...p2,
                points: pointsPlayer2,
                currentMove: _p2
            });
            persistentData.p2 = {
                ...p2,
                points: pointsPlayer2,
                currentMove: _p2
            }
            setWinner(winner)
            persistentData.winner = setWinner(winner)
            setGame({
                history: [...game.history, {p1: _p1, p2: _p2, winner: currentWinner, img: currentWinnerImg}],
                counter: game.counter + 1

            });
            persistentData.game = {
                history: [...game.history, {p1: _p1, p2: _p2, winner: currentWinner, img: currentWinnerImg}],
                counter: game.counter + 1

            }
            } else if(game.counter >= 5){
            setPlaying(false)
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
                history: []
            })
            setWinner(null)
        } else {
            setPlaying(true)
            setP1({
                ...p1,
                image: "https://placekitten.com/100/120"
            });
            setP2({
                ...p2,
                image: "https://placekitten.com/100/121"
            });
        }
        let data = JSON.stringify(persistentData);
        localStorage.setItem("gameState", data);

    }

    function initialCard(){
        if(playing === false && game.counter < 5){
            return(
                <Grid container direction="column" justify="center" alignItems="center" className="content-centered">
                    <Paper elevation={3} className="card card-start">
                        <Typography variant="h2" component="h2">
                            Rock, Paper, Scissors, Lizard, Spock
                        </Typography>
                        <div className="card-start__img">
                            <img src={rules} alt={''} />
                        </div>
                        <div>
                            <Button variant="outlined" color="primary" onClick={handleClick} className="btn-base">
                                Start Playing
                            </Button>
                        </div>

                    </Paper>
                </Grid>
            )
        }else if(playing === true && game.counter<5){
            return(

                    <Grid container direction="column" justify="center" alignItems="center" className="content-centered">
                        <Paper elevation={3} className="card card-game">
                        <div>
                            <h2>Round: {game.counter}</h2>
                        </div>
                        <Grid container direction="row" justify="center" alignItems="center" className="card-game__points">
                            <div>Points Player 1 : {p1.points}</div>
                            <div>Points Player 2 : {p2.points}</div>
                        </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center" className="card-game__players">
                        <Player horizontalPosition={"left"} moveImg={p1.currentMove}/>
                        <div className="card-game__wins">
                            <h3>{getWinnerText(game.history.slice(-1)[0])}</h3>
                            <Button variant="outlined" color="primary" onClick={handleClick} className="btn-base">
                                {playing ? "Now" : "Start Playing"}
                            </Button>
                        </div>
                        <Player horizontalPosition={"right"} moveImg={p2.currentMove}/>
                    </Grid>
                        </Paper>
                    </Grid>
            )
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function restartGame(){

        let img = ""
        let textWinner = ""
        let pointsWinner = 0
        if(p1.points > p2.points){
            img = p1.image ?? ""
            textWinner = "Player 1 Wins"
            pointsWinner = p1.points
        }else if(p2.points > p1.points){
            img = p2.image ?? ""
            textWinner = "Player 2 Wins"
            pointsWinner = p2.points
        } else{
            textWinner = "Nobody Wins the game"
        }

            if(game.counter >= 5){
            return(
                <Grid container direction="column" justify="center" alignItems="center" className="content-centered">
                   <Paper elevation={3} className="card card-winner">
                       <Badge
                           overlap="circle"
                       >
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
                           onClose={handleClose}


                       >
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
