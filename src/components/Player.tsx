import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import lizard from "../assets/images/icon-lizard.svg"
import paper from "../assets/images/icon-paper.svg"
import rock from "../assets/images/icon-rock.svg"
import spock from "../assets/images/icon-spock.svg"
import scissors from "../assets/images/icon-scissors.svg"
import "../assets/scss/components/_cards.scss"
import {MovesEnum} from "../services/game";
import {IPlayer} from "../pages/Game";



interface IPlayerCard {
    horizontalPosition: "left" | "right"
    player: IPlayer
}


const SmallAvatar = withStyles(() =>
    createStyles({
        root: {
            width: 80,
            height: 80,
        },
    }),
)(Avatar);


function getMoveImage(move: MovesEnum | null) {
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

function Player(props: IPlayerCard) {
    // Todo set image
    return (
        <div>
            <Badge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: props.horizontalPosition,
                }}
                badgeContent={<SmallAvatar alt="Remy Sharp"
                                           src={props.player.image?? ''}
                                           className=" player__img"/>}
                className="player">
                <Avatar alt="Travis Howard" src={getMoveImage(props.player.currentMove)} className="player__move"/>
            </Badge>
        </div>
    );
}

export default Player;
