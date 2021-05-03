import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import lizard from "../assets/images/icon-lizard.svg"
import paper from "../assets/images/icon-paper.svg"
import rock from "../assets/images/icon-rock.svg"
import spock from "../assets/images/icon-spock.svg"
import scissors from "../assets/images/icon-scissors.svg"
import "../assets/scss/components/_cards.scss"
import {MovesEnum} from "../services/game";

const SmallAvatar = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 80,
            height: 80,
        },
    }),
)(Avatar);

const StyleMove = withStyles({
    root: {
        width: 150,
        height: 150,
        backgroundColor: `gray`,
        border: `5px solid red`
    }
})(Avatar);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 200,
            height: 200,
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

interface IPlayerCard{
    horizontalPosition: "left" | "right"
    moveImg: MovesEnum | null
}

function getMoveImage(move:MovesEnum | null){
    // @ts-ignore
    switch (MovesEnum[move]) {
        case MovesEnum.MOVE_LIZARD:
            return lizard
        case MovesEnum.MOVE_PAPER:
            return paper
        case MovesEnum.MOVE_ROCK:
            return rock
        case MovesEnum.MOVE_SCISSORS:
            return scissors
        case MovesEnum.MOVE_SPOCK:
            return spock
        default:
            console.error(`Error movimientos`)
    }
}

function Player(props : IPlayerCard) {
    const classes = useStyles();
    const styleMove = useStyles();

    return (
        <div className={classes.root} >
            <Badge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: props.horizontalPosition,
                }}
                badgeContent={<SmallAvatar alt="Remy Sharp" src="https://placekitten.com/100/120" className=" player__img"/>}
             className="player">
                <Avatar alt="Travis Howard" src={getMoveImage(props.moveImg)} className="player__move"/>
            </Badge>
        </div>
    );
}

export default Player;
