import React from 'react';
import {Checkbox as MuiCheckbox, FormControl, FormControlLabel, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    checky: {
        '& .MuiSvgIcon-root':{
            width: "20px",
            height: "20px",
        }
    }
}))

function Checkbox(props) {

    const {name, label, value, onChange} = props
    const classes = useStyles()
    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel control={<MuiCheckbox
                className={classes.checky}
                name={name}
                color="primary"
                checked={value}
                onChange={event => onChange(convertToDefaultEventParameter(name, event.target.checked))}
            />} label={label}/>
        </FormControl>
    );
}

export default Checkbox;

