import React from 'react';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect} from "@material-ui/core";

function Select(props) {

    const {name, value, label, error = null, onChange, options} = props

    return (
        <FormControl variant="outlined"
                     {...(error && {error: true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                name={name}
                label={label}
                value={value}
                onChange={onChange}
            >
                {
                    options.map(
                        el => (
                            <MenuItem key={el.id} value={el.id}>{el.title}</MenuItem>
                        )
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}

export default Select;
