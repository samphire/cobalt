import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {Form, UseForm} from "../../components/useForm"
import Controls from "../../components/controls/Controls"
import {HowToReg} from "@material-ui/icons";
import {getAllClasses} from "../../services/classService"
import {getAllStudents} from "../../services/studentService"

const initialFieldValues = {
    studid: '',
    studName: '',
    classid: '',
    className: '',
    begin: new Date(),
    end: new Date()
}

export default function ClassForm(props) {

    const {addOrEdit, recordForEdit} = props;
    const [students, setStudents] = useState([{
        studid: 1,
        studName: 'bob'
    }])
    const [classes, setClasses] = useState([{
        id: 1, title: 'blow', comment: '', session_start: '', session_end: ''
    }])

    useEffect(async () => {
        let myStudents = await getAllStudents()
        let myClasses = await getAllClasses()

        myStudents.forEach((el) => { // Transforming 'name' property to 'title'
            Object.keys(el).forEach((myKey) => {
                if (myKey === 'name') {
                    el.title = el['id'] + ', ' + el[myKey]
                    delete el[myKey]
                }
            })
        })
        myClasses.forEach((el) => { // Transforming 'name' property to 'title'
            Object.keys(el).forEach((myKey) => {
                if (myKey === 'name') {
                    el.title = el[myKey]
                    delete el[myKey]
                }
            })
        })

        setClasses(myClasses)
        setStudents(myStudents)
    }, [])

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
                <Grid item xs={12}>
                    <Controls.Select
                        name="classid"
                        label="class"
                        value={values.classid}
                        onChange={handleInputChange}
                        options={classes}
                    />
                    <Controls.Select
                        name="studid"
                        label="student"
                        value={values.studid}
                        onChange={handleInputChange}
                        options={students}
                    />
                    <Controls.DatePicker
                        label="begin"
                        value={values.begin}
                        name="begin"
                        onChange={handleInputChange}
                        disableFuture
                    />
                    <Controls.DatePicker
                        label="end"
                        value={values.end}
                        name="end"
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
    )
}
