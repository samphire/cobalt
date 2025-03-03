import React from 'react';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select as MuiSelect,
    Checkbox,
    ListItemText,
    Chip
} from "@material-ui/core";

function Select(props) {
    const {name, value, label, error = null, onChange, options, multiple = false} = props;

    return (
        <FormControl variant="outlined" {...(error && {error: true})} style={{minWidth: 200}}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                multiple={multiple} // Enable multi-select if `multiple` is true
                name={name}
                label={label}
                value={value}
                onChange={onChange}
                displayEmpty
                MenuProps={{
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    getContentAnchorEl: null // Ensures menu doesn't shift
                }}
                renderValue={(selected) =>
                    multiple ? (
                        <div style={{display: "flex", flexWrap: "wrap", gap: "5px"}}>
                            {options
                                .filter(option => selected.includes(option.id))
                                .map(option => (
                                    <Chip key={option.id} label={option.title || option.name}/>
                                ))}
                        </div>
                    ) : (
                        options.find(option => option.id === selected)?.title || ''
                    )
                }
            >
                {options.map(el => (
                    <MenuItem key={el.id} value={el.id}>
                        {multiple && <Checkbox checked={value.includes(el.id)}/>}
                        <ListItemText primary={el.title || el.name}/>
                    </MenuItem>
                ))}
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}

export default Select;
