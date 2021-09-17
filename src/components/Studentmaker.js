import React, {useEffect, useState} from 'react';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel, Slider, TextField, Typography, Button, Select, MenuItem} from "@material-ui/core";
import './Questionmaker.css'
import {CloudUpload} from "@material-ui/icons";
import {DatePicker, MuiPickersContext, MuiPickersUtilsProvider} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from '@mui/material/Autocomplete'

// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker"


export default function Questionmaker() {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <>
            <h1>Student Maker</h1>

            <TextField
                id="id"
                className={'textInput'}
                label={"id"}
                variant={"outlined"}
            />
            <br/><br/>
            <TextField
                id="name"
                className={'textInput'}
                label={"name"}
                variant={"outlined"}
            />
            <br/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    disableFuture
                    autoOk
                    format='yyyy-MM-dd'
                    value={startDate} onChange={setStartDate}
                    label={"Date of Birth"}/>
            </MuiPickersUtilsProvider>
            <br/>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={["male", "female"]}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Sex" />}
            />
            <br/>
            <TextField
                id="mobile"
                className={'textInput'}
                label={"mobile"}
                variant={"outlined"}
            />
            <br/>
            <TextField
                id="email"
                className={'textInput'}
                label={"email"}
                variant={"outlined"}
            />
            <br/>
        </>
    )
}
