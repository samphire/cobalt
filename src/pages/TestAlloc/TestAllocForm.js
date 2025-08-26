import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {Form, UseForm} from "../../components/useForm"
import Controls from "../../components/controls/Controls"
import {HowToReg} from "@material-ui/icons";
import {getAllClasses} from "../../services/classService"
import {getAllTests} from "../../services/testService"

const bobly = () => {
    let temp = new Date().setTime(new Date().getTime() + 86400000)
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

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                // Fetch in parallel
                const [testsRaw, classesRaw] = await Promise.all([
                    getAllTests(),
                    getAllClasses(),
                ]);

                // Don’t mutate: create new arrays with `title` instead of `name`
                const tests = testsRaw.map(({ name, ...rest }) => ({
                    ...rest,
                    title: name,
                }));

                const classes = classesRaw.map(({ name, ...rest }) => ({
                    ...rest,
                    title: name,
                }));

                if (cancelled) return; // component unmounted → skip setState
                setTests(tests);
                setClasses(classes);
            } catch (err) {
                console.error('Failed to load tests/classes:', err);
            }
        }

        void fetchData();

        // Cleanup to prevent state updates after unmount
        return () => {
            cancelled = true;
        };
    }, []);

    const {
        values,
        setValues,
        handleInputChange,
        resetForm
    } = UseForm(initialFieldValues);

    const handleSubmit = e => {
        e.preventDefault()
        addOrEdit(values, resetForm)
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({...recordForEdit})
    }, [recordForEdit, setValues])

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
