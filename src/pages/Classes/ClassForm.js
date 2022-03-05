import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import {Form, UseForm} from "../../components/useForm"
import Controls from "../../components/controls/Controls"
import {HowToReg} from "@material-ui/icons";
import {Tooltip} from "@mui/material";

const initialFieldValues = {
    id: '',
    name: '',
    comment: '',
    session_start: new Date("2022-01-01"),
    session_end: new Date("2022-07-01")
}

export default function ClassForm(props) {

    const {addOrEdit, recordForEdit} = props;

    const {
        values,
        setValues,
        handleInputChange,
        resetForm,
        isEdit
    } = UseForm(initialFieldValues);

    const handleSubmit = e => {
        e.preventDefault()
        addOrEdit(values, resetForm)
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({...recordForEdit})
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Tooltip title="Cannot Edit This Field">
                        <Controls.Input
                            label="ID"
                            value={values.id}
                            name="id"
                            onChange={handleInputChange}
                            disabled
                        />
                    </Tooltip>
                    <Controls.Input
                        label="반 이름"
                        value={values.name}
                        name="name"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="주석"
                        value={values.comment}
                        name="comment"
                        multiline
                        rows={4}
                        onChange={handleInputChange}
                    />
                    {/*<TextField*/}
                    {/*    label="주석"*/}
                    {/*    value={values.comment}*/}
                    {/*    name="comment"*/}
                    {/*    multiline*/}
                    {/*    rows={4}*/}
                    {/*    defaultValue="Default Value"*/}
                    {/*    onChange={handleInputChange}*/}
                    {/*/>*/}


                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.DatePicker
                        label="session start"
                        value={values.session_start}
                        name="session_start"
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        label="session end"
                        value={values.session_end}
                        name="session_end"
                        onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="submit"
                            startIcon={<HowToReg/>}
                        />
                        <Controls.Button
                            text="reset"
                            color="secondary"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
}
;
