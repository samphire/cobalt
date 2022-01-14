import React from 'react';
import {Button, lighten, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: lighten(theme.palette.secondary.light, 0.7),
        '& .MuiButton-label': {
            color: theme.palette.secondary.main
        },
        '& .MuiButton-label:hover': {
            color: theme.palette.secondary.dark
        }
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main
        }
    }
}))

export default function ActionButton(props) {

    const {color, children, onClick} = props;
    const classes = useStyles()

    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

