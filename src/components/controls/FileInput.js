import React from 'react';
// import React, {useImperativeHandle, useState} from 'react';
// import {valueOrDefault} from "chart.js/helpers";
import {styled} from '@mui/material/styles'

const Input = styled('input')({
    // display: 'none'
})

export default function FileInput(props) {
    const {name, label, helperText, value, error = null, onChange, ...other} = props;

    return (
        <label htmlFor="contained-button-file">
            <Input
                variant="outlined"
                id="contained-button-file"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                {...other}
                {...(error && {error: true, helperText: error})}
                accept="image/*"
                multiple
                type="file"/>
        </label>
    )
}
