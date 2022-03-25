import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        // maxWidth: '500px',
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1),
        },
        '& .MuiFormLabel-root, .MuiSelect-root': {
            // fontSize: '1.6rem',
        },
        '& .MuiInputBase-input': {
            // fontSize: '1.6rem',
            color: '#be152a',
            fontWeight: '500'
        },
        '& .MuiFormControlLabel-label': {
            // fontSize: '1.6rem'
        },
        '& .PrivateNotchedOutline-legendLabelled-9': {
            // fontSize: '1.4rem'
        },
        '& .MuiFormHelperText-root': {
            // fontSize: '1.2rem'
        }
    }
}))

export function UseForm(initialValues) {

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const {name, value} = e.target  // this is why radio buttons and checkboxes have to have their relevant values converted to the attribute 'value', rather than 'checked' and so on...
        setValues({
            ...values,
            [name]: value // the squ brackets evaluate the variable name to the value it holds
        })
    }

    const resetForm = () => {
        setValues(initialValues)
        setErrors({})
    }

    return {
        values,
        setValues,
        handleInputChange,
        resetForm,
        errors,
        setErrors
    }
}

export function Form(props) {

    const classes = useStyles()
    const {children, ...other} = props

    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {children}
        </form>
    )
}
