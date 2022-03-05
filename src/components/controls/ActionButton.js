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
    },
    tertiary: {
        backgroundColor: lighten("#EB984E", 0.7),
        '& .MuiButton-label': {
            color: "#EB984E",
            width: "20px",
            height: "20px"
        },
        '& .MuiButton-label:hover':{
            color: "#EB984E"
        }
    },
    quaternary: {
        backgroundColor: lighten("#06A248", 0.7),
        '& .MuiButton-label': {
            color: "#06A248",
            width: "20px",
            height: "20px"
        },
        '& .MuiButton-label:hover':{
            color: "#06A248"
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

