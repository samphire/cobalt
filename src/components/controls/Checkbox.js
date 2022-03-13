import React from 'react';
import {Checkbox as MuiCheckbox, FormControl, FormControlLabel, FormHelperText, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    checky: {
        '& .MuiSvgIcon-root': {
            width: "20px",
            height: "20px",
        }
    }
}))

function Checkbox(props) {

    const {name, label, helperText, value, error = null, onChange} = props
    const classes = useStyles()
    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl
        >
            <FormControlLabel control={<MuiCheckbox
                className={classes.checky}
                name={name}
                color="primary"
                checked={value}
                onChange={event => onChange(convertToDefaultEventParameter(name, event.target.checked))}
            />} label={label}/>
            <FormHelperText
            {...(error && {error: true, helperText: error})} // I'm not sure what this code does!
            error={error}
            >{error}</FormHelperText>
        </FormControl>
    );
}

export default Checkbox;

