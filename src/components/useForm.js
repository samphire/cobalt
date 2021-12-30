import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        },
        '& .MuiFormLabel-root, .MuiSelect-root' :{
            fontSize: '1.6rem',
        },
        '& .MuiInputBase-input':{
            fontSize: '1.6rem',
            color: '#be152a',
            fontWeight: '500'
        },
        '& .MuiFormControlLabel-label':{
            fontSize: '1.6rem'
        },
        '& .PrivateNotchedOutline-legendLabelled-9':{
            fontSize: '1.4rem'
        }
    }
}))

export function UseForm(initialValues) {

    const [values, setValues] = useState(initialValues)

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return {
        values,
        setValues,
        handleInputChange
    }
}

export function Form(props) {

    const classes = useStyles()

    return (
        <form className={classes.root} autoComplete="off">
            {props.children}
        </form>
    )
}
