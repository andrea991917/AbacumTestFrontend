import React, {useState} from "react";
import {Avatar, Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import {getMove, getWinner, UserResponse, winnerSelection} from "../services/game";
// @ts-ignore
import rules from "../assets/images/image-rules.svg"
import Player from "../components/Player";


interface PointsState{
    player1: number
    player2: number
}

interface MoveState{
    player1: UserResponse | null
    player2: UserResponse | null
}
interface PlayerImg{
    player1: string | null
    player2: string | null
}

function Game() {
    //State para los points
    const [points, setPoints] = useState<PointsState>({
        player1:0,
        player2:0
    })

    //State para playerImage
    const [image, setImage] = useState<PlayerImg>({
            player1: null,
            player2: null
        })
    //State para la jugada
    const [move, setMove] = useState<MoveState>({
        player1: null,
        player2: null
    })
    //State para el ganador
    const [winner, setWinner] = useState<winnerSelection | null>(null)
    //State para la partida
    const [playing, setPlaying] = useState<Boolean>(false)

    const handleClick = ()=>{
        if(playing){
            const p1 = getMove()
            const p2 = getMove()
            const winner = getWinner(p1,p2)

            setMove({
                player1: p1,
                player2: p2
            })
            setWinner(winner)

        }else{
            setPlaying(true)
            setImage({
                player1: "https://placekitten.com/100/120",
                player2: "https://placekitten.com/100/121"
            })
        }
    }

    return (
            <Container fixed>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Paper elevation={3} >
                        <Typography variant="h2" component="h2">
                            Rock, Paper, Scissors, Lizard, Spock
                        </Typography>
                        <img src={rules} />
                    </Paper>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Paper elevation={0}>
                        <p>puntos1: {points.player1}</p>
                        <p>move1: {move.player1}</p>
                        <Avatar alt="P1" src={image.player1 ?? ""} />
                    </Paper>
                    <Paper elevation={0}>
                        <p>ganador actual: {winner}</p>
                    </Paper>
                    <Paper elevation={0}>
                        <p>puntos2: {points.player2}</p>
                        <p>move2: {move.player2}</p>
                        <Avatar alt="P2" src={image.player2 ?? ""}/>
                    </Paper>
                </Grid>
               <Grid container direction="row" justify="center" alignItems="center">
                   <Button variant="outlined" color="primary" onClick={handleClick}>
                       { playing ? "Now" : "Start Playing"}
                   </Button>
               </Grid>
                <Player/>
            </Container>

    );
}

export default Game;
