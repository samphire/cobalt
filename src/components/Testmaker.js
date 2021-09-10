import React, {useEffect, useState} from 'react';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel, Slider, TextField, Typography, Button} from "@material-ui/core";
import './Testmaker.css'
import {CloudUpload} from "@material-ui/icons";

export default function Testmaker(props) {
    const [state, setState] = useState({
        mySwitch: false
    });

    const handleChange = (event) => {
        setState({mySwitch: event.target.checked});
    };

    const submit = (e) => {
        e.preventDefault();
        const myData = {
            name: document.getElementById('textName').value,
            description: document.getElementById('textDesc').value,
            retain: document.getElementById('retain').checked,
            shuffle: document.getElementById('shuffle').checked,
            oneshot: state.mySwitch,
            praccy: (document.getElementById("praccy") === null ? 0: document.getElementById("praccy").checked),
            timer: (document.getElementById('fucker') === null ? 0: document.getElementById('fucker').children[2].value)
        };
        alert(myData.name + ", " + myData.description + ", " +  myData.retain + ", " + myData.shuffle  + ", " + myData.oneshot + ", " + myData.praccy + ", " + myData.timer);
    };

    // useEffect(
    //     () => {
    //         alert(state.mySwitch);
    //     },
    //     [state.mySwitch]
    // )

    const myThing = <>
        <FormControlLabel
            control={
                <Checkbox
                    id="praccy"
                    name="praccy"
                />
            }
            label="praccy"
        />
        <br/><br/>
        <Typography> Timer </Typography>
        <Slider id="fucker"
                style={{width: 330}}
                defaultValue={30}
                valueLabelDisplay={"auto"}
                variant={"outlined"}
                name={"timer"}
                min={10}
                max={260}
                step={10}
                marks
                valueLabelDisplay="auto"
        />
    </>;

    return (
        <div id="TestmakerContainer">
            <h1>Create Test</h1>

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
                            id='retain'
                            name="retain"
                        />
                    }
                    label="retain"
                />
                <br/>
                <FormControlLabel
                    className={'checkBox'}
                    control={
                        <Checkbox
                            id="shuffle"
                            name="shuffle"
                        />
                    }
                    label="shuffle"
                />
                <br/>
                <FormControlLabel
                    control={
                        <Switch
                            checked={state.mySwitch}
                            onChange={handleChange}
                            color="primary"
                            name="mySwitch"
                        />
                    }
                    label="oneshot"
                />

                <br/>

                {state.mySwitch && myThing}
            </div>
            <br/><br/>
            <Button
                variant="contained"
                startIcon={<CloudUpload/>}
                color="primary"
                onClick={submit}
            >
                CREATE
            </Button>

        </div>
    );
}
