import React, {useEffect, useState} from 'react';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel, Slider, TextField, Typography, Button} from "@material-ui/core";
import './Questionmaker.css'
import {CloudUpload} from "@material-ui/icons";


export default function Questionmaker() {


    return (
        <>
        <h1>Create Question</h1>
        <div id="container">

            <TextField
                id="textName"
                className={'textInput'}
                label={"name"}
                variant={"outlined"}
                name={"readerName"}
            />
            <br/><br/>
            <TextField
                id="textDesc"
                className={'textInput'}
                label={"description"}
                variant={"outlined"}
                name={"readerDesc"}
            />
            <br/>
            <div id="options">
                <FormControlLabel
                    className={'checkBox'}
                    control={
                        <Checkbox
                            id='pwrong'
                            name="pwrong"
                            defaultValue={0}
                        />
                    }
                    label="print wrong"
                />
                <br/>
                <FormControlLabel
                    className={'checkBox'}
                    control={
                        <Checkbox
                            id='panswer'
                            name="panswer"
                            defaultValue={0}
                        />
                    }
                    label="print answer"
                />
                <br/>
                <FormControlLabel
                    className={'checkBox'}
                    control={
                        <Checkbox
                            id='retain'
                            name="retain"
                            defaultValue={0}
                        />
                    }
                    label="retain"
                />
                <br/>


            </div>
            <br/><br/>


        </div>
    </>);
}
