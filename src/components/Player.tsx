import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import lizard from "../assets/images/icon-lizard.svg"
import "../assets/scss/components/_cards.scss"

const SmallAvatar = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 80,
            height: 80,
            border: `2px solid yellow`,
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

function Player() {
    const classes = useStyles();
    const styleMove = useStyles();

    return (
        <div className={classes.root}>
            <Badge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                badgeContent={<SmallAvatar alt="Remy Sharp" src="https://placekitten.com/100/120" className="player__img"/>}
            >
                <Avatar alt="Travis Howard" src={lizard} classes={{root:'player__move'}}/>
            </Badge>
        </div>
    );
}

export default Player;
