import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {Form, UseForm} from "../../components/useForm"
import Controls from "../../components/controls/Controls"
import {HowToReg} from "@material-ui/icons";
import {getAllClasses} from "../../services/classService"
import {getAllTests} from "../../services/testService"

const bobly = () => {
    let temp = new Date().setTime(new Date().getTime() + 1 * 86400000)
    return new Date(temp)
}

const initialFieldValues = {
    testid: '',
    testname: '',
    classid: '',
    classname: '',
    start: new Date(),
    finish: bobly()
}


export default function ClassForm(props) {

    const {addOrEdit, recordForEdit} = props;
    const [tests, setTests] = useState([{
        id: 1,
        title: 'bob',
        description: '',
        created: '',
        print_wrong: '',
        print_answer: '',
        oneshot: '',
        retain: '',
        timer: ''
    }])
    const [classes, setClasses] = useState([{id: 1, title: 'blow', comment: '', session_start: '', session_end: ''}])

    useEffect(async () => {
        let myTests = await getAllTests()
        let myClasses = await getAllClasses()

        myTests.forEach((el) => {
            Object.keys(el).forEach((myKey) => {
                if (myKey === 'name') {
                    el.title = el[myKey]
                    delete el[myKey]
                }
            })
        })
        myClasses.forEach((el) => {
            Object.keys(el).forEach((myKey) => {
                if (myKey === 'name') {
                    el.title = el[myKey]
                    delete el[myKey]
                }
            })
        })

        setClasses(myClasses)
        setTests(myTests)
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
                        label="반"
                        value={values.classid}
                        onChange={handleInputChange}
                        options={classes}
                    />

                    <Controls.Select
                        name="testid"
                        label="테스트"
                        value={values.testid}
                        onChange={handleInputChange}
                        options={tests}
                    />

                    <Controls.DatePicker
                        label="시작"
                        value={values.start}
                        name="start"
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        label="바감"
                        value={values.finish}
                        name="finish"
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
