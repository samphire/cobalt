import React, {useState} from 'react';
import {TextField} from "@material-ui/core";
import './Studentmaker.css'
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Questionmaker() {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <><h1>Student Maker</h1>
            <div id='container'>


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
                <br/><br/>
                <div sx={{width: 500, float: 'left'}}>
                    <MuiPickersUtilsProvider sx={{width: 200, float: 'left'} }utils={DateFnsUtils}>
                        <DatePicker
                            sx={{width: 200, float: 'left'}}
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
                        sx={{width: 200, float: 'left'}}
                        renderInput={(params) => <TextField {...params} label="Sex"/>}
                    />
                    <br/>
                </div>
                <Box sx={{width: 300, float: 'right'}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Language"
                        >
                            <MenuItem value={1}>English</MenuItem>
                            <MenuItem value={2}>Russian</MenuItem>
                            <MenuItem value={3}>Chinese</MenuItem>
                            <MenuItem value={4}>Korean</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    id="mobile"
                    className={'textInput'}
                    label={"mobile"}
                    variant={"outlined"}
                />
                <br/><br/>
                <TextField
                    id="email"
                    className={'textInput'}
                    label={"email"}
                    variant={"outlined"}
                />
                <br/><br/>
                <TextField
                    id="comment"
                    className={'textInput'}
                    label={"comment"}
                    variant={"outlined"}
                />
                <br/><br/>
                <TextField
                    id="avatar"
                    className={'textInput'}
                    label={"avatar"}
                    variant={"outlined"}
                />
                <br/><br/>

            </div>
        </>
    )
}
