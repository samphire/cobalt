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
            retain: -document.getElementById('retain').checked || 0,
            oneshot: -state.mySwitch || 0,
            timer: (document.getElementById('fucker') === null ? 0 : document.getElementById('fucker').children[2].value)
        };
        console.log(myData);

        async function bob() {
            let responseObj = await fetch('https://notborder.org/cobalt/testmakerData.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(myData)
            });
            let responseText = await responseObj.text();
            console.log(responseText === 'success' ? 'oh yeah, buddy!' : 'fuck!');
        }
        bob();
    };

    // useEffect(
    //     () => {
    //         alert(state.mySwitch);
    //     },
    //     [state.mySwitch]
    // )

    const myThing = <>
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
        <>
            <h1>Create Test</h1>
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
                                id='retain'
                                name="retain"
                                defaultValue={0}
                            />
                        }
                        label="retain"
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
                    color="secondary"
                    onClick={submit}
                >
                    CREATE
                </Button>

            </div>
        </>
    );
}
