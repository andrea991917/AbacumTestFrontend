import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineItem,
    TimelineSeparator
} from '@material-ui/lab';
import {Lens} from '@material-ui/icons'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {IHistory} from "../pages/Game";
import {MovesEnum} from "../services/game";
import {Avatar} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

interface IProps {
    history: IHistory[]
}

export function getWinnerText(history: IHistory) {
    if(!history){
        return ""
    }
    if (history.winner === 0) {
        return 'TIE'
    }
    let m1: any, m2: any;
    const text = [
        [MovesEnum.MOVE_SCISSORS, MovesEnum.MOVE_PAPER, 'Scissors cuts paper'],
        [MovesEnum.MOVE_PAPER, MovesEnum.MOVE_ROCK, 'Paper covers rock'],
        [MovesEnum.MOVE_ROCK, MovesEnum.MOVE_LIZARD, 'Rock crushes lizard'],
        [MovesEnum.MOVE_LIZARD, MovesEnum.MOVE_SPOCK, 'Lizard poisons Spock'],
        [MovesEnum.MOVE_SPOCK, MovesEnum.MOVE_SCISSORS, 'Spock smashes scissors'],
        [MovesEnum.MOVE_SCISSORS, MovesEnum.MOVE_LIZARD, 'Scissors decapitates lizard'],
        [MovesEnum.MOVE_LIZARD, MovesEnum.MOVE_PAPER, 'Lizard eats paper'],
        [MovesEnum.MOVE_PAPER, MovesEnum.MOVE_SPOCK, 'Paper disproves Spock'],
        [MovesEnum.MOVE_SPOCK, MovesEnum.MOVE_ROCK, 'Spock vaporizes rock'],
        [MovesEnum.MOVE_ROCK, MovesEnum.MOVE_SCISSORS, 'Rock crushes scissors'],
    ];
    if (history.winner === 1) {
        m1 = history.p1
        m2 = history.p2
    } else {
        m2 = history.p1
        m1 = history.p2
    }

    // @ts-ignore
    const found = text.find(x => (x[0] === MovesEnum[m1] && x[1] === MovesEnum[m2]))
    return found ? found[2] : ''
}

function getWinnerImg(IHistory: IHistory) {
    if (IHistory.winner === 0) {
        return <Lens/>
    }
    if (IHistory.winner === 1) {
        return <img style={{maxWidth: '50px'}} src={IHistory.img} alt={''}/>
    }
    if (IHistory.winner === 2) {
        return <img style={{maxWidth: '50px'}} src={IHistory.img} alt={''}/>
    }
}


function TimelineGame(props: IProps) {
    const classes = useStyles();

    return (
        <Timeline align="alternate">
            {
                props.history.map(x => {
                    return (
                        <TimelineItem>
                            <TimelineSeparator>
                                <Avatar style={{width: '50px', height: '50px'}}>
                                    {getWinnerImg(x)}
                                </Avatar>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1"><b>{x.winner === 0 ? " Nobody wins this round" : "Player " + x.winner +" wins" }</b>

                                    </Typography>
                                    <Typography>{getWinnerText(x)}</Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    )
                })
            }
        </Timeline>
    );
}

export default TimelineGame;
