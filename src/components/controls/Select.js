import React from 'react';
import {FormControl, InputLabel, MenuItem, Select as MuiSelect} from "@material-ui/core";

function Select(props) {

    const {name, value, label, onChange, options} = props

    return (
        <FormControl variant="outlined">
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
        </FormControl>
    );
}

export default Select;
