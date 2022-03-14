import React, {useImperativeHandle, useState} from 'react';
import {TextField} from "@material-ui/core";
import {valueOrDefault} from "chart.js/helpers";

export default function Input(props) {
    const {tabIndex, name, label, helperText, value, error = null, onChange, ...other} = props;

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            inputProps={{tabIndex: tabIndex}}
            {...(error && {error: true, helperText: error})}
        />
    )
}

