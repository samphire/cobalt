import React from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup} from "@material-ui/core";

function RadioGroup(props) {

    const {name, label, value, onChange, items} = props

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row value={value} name={name} onChange={onChange}>
                {
                    items.map((el) => (
                            <FormControlLabel value={el.id} control={<Radio/>} label={el.title}/>
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    );
}

export default RadioGroup;
