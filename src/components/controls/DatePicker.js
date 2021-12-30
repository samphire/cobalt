import React from 'react';
import {DatePicker as MuiDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({

}))

function DatePicker(props) {

    const classes = useStyles();

    const {name, label, value, onChange} = props

    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        // <MuiPickersUtilsProvider utils={DateFnsUtils}>
        //     <MuiDatePicker disableToolbar
        //                         variant="inline"
        //                         inputVariant="outlined"
        //                         disableFuture
        //                         autoOk
        //                         label={label}
        //                         format="yyyy-MM-dd"
        //                         name={name}
        //                         value={value}
        //                         onChange={date => onChange(convertToDefaultEventParameter(name, date))}
        //     />


        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MuiDatePicker
                variant='dialog'
                disableFuture
                autoOk
                format='yyyy-MM-dd'
                value={value} onChange={date => onChange(convertToDefaultEventParameter(name, date))}
                label={"Date of Birth"}/>
        </MuiPickersUtilsProvider>




        // </MuiPickersUtilsProvider>
    );
}

export default DatePicker;
