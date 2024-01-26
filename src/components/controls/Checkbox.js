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
    const convertToDefaultEventParameter = (name, value) => ({ // originally, the value property does not have anything of value
        target: {    // all controls are checked for 'name' and 'value'. So, for this checkbox, we assign the value of 'checked' to the attribute 'value'
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
                checked={!(value === null || value === 'no' || !value)}
                // checked={value}
                onChange={event => onChange(convertToDefaultEventParameter(name, event.target.checked))} // assigns the boolean value of 'checked' to the 'value' attribute
            />} label={label}/>
            <FormHelperText
                {...(error && {error: true, helperText: error})} // I'm not sure what this code does!
                error={error}
            >{error}</FormHelperText>
        </FormControl>
    );
}

export default Checkbox;

