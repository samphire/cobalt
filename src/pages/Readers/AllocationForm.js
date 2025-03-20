import React, {useEffect, useState} from 'react';
import {Form, UseForm} from "../../components/useForm";
import Controls from "../../components/controls/Controls";
import {allocateText, allocateWordgroup} from "../../services/allocationService"; // Service to post allocation records
import {getAllClasses} from "../../services/classService";
import {getAllReaders} from "../../services/readerService";
import {getAllWordgroups} from "../../services/wordgroupService";
import {getStudentsForClass} from "../../services/studentService"; // Should use the linking table to fetch students
import {Paper, Grid} from "@material-ui/core";

// Define initial field values
const initialFieldValues = {
    classid: '',
    // students will be an array of user_id values from reader3.users
    students: [],
    textid: '',
    wordgroupid: ''
};

export default function AllocationForm(props) {
    const {addOrEdit, recordForEdit} = props;
    const [classes, setClasses] = useState([]);
    const [texts, setTexts] = useState([]);
    const [wordgroups, setWordgroups] = useState([]);
    const [students, setStudents] = useState([]);

    const {
        values,
        setValues,
        handleInputChange,
        resetForm,
        isEdit
    } = UseForm(initialFieldValues);

    // On component mount, fetch classes and texts
    useEffect(() => {
        async function fetchData() {
            let myClasses = await getAllClasses();
            let myTexts = await getAllReaders();
            let myWordgroups = await getAllWordgroups();

            // Optionally, if your Controls.Select expects the display field to be 'title'
            myClasses = myClasses.map(item => ({...item, title: item.name}));
            myTexts = myTexts.map(item => ({...item, title: item.name}));
            myWordgroups = myWordgroups.map(item => ({...item, title: item.group_name}));

            setClasses(myClasses);
            setTexts(myTexts);
            setWordgroups(myWordgroups);
        }

        fetchData();
    }, []);

    // When a class is selected, fetch its students
    useEffect(() => {
        async function fetchStudents() {
            if (values.classid) {
                // getStudentsForClass should query optikon.lnk_student_class and join with reader3.users
                let classStudents = await getStudentsForClass(values.classid);
                // Assume that classStudents returns an array of objects that include:
                // user_id, user_email, user_name.
                // Format them so that Controls.Select can display "user_email - user_name"
                classStudents = classStudents.map(item => ({
                    ...item,
                    title: `${item.user_email} - ${item.user_name}`,
                    id: item.user_id
                }));
                setStudents(classStudents);
            } else {
                setStudents([]);
            }
        }

        fetchStudents();
    }, [values.classid]);

    // Handle form submission to allocate the text to each selected student
    const handleAllocate = async e => {
        e.preventDefault();
        if (!values.textid && !values.wordgroupid || values.students.length === 0) return;

        if (values.textid > 0) {
            try {
                // Post an allocation record for each selected student
                await Promise.all(values.students.map(userid =>
                    allocateText({userid, textid: values.textid})
                ));
                alert("Reader Allocated Successfully!");
                // resetForm();
            } catch (error) {
                alert("Error allocating reader. Check console for details");
            }
            setValues({...values, textid: ''});
        } else {
            try {
                // Post an allocation record for each selected student
                await Promise.all(values.students.map(userid =>
                    allocateWordgroup({userid, wordgroupid: values.wordgroupid})
                ));
                alert("Wordgroup Allocated Successfully!");
                // resetForm();
            } catch (error) {
                alert("Error allocating wordgroup. Check console for details");
            }
            setValues({...values, wordgroupid: ''});
        }
    };

    const handleStudentChange = e => {
        const {value} = e.target;
        setValues(prevValues => ({
            ...prevValues,
            students: typeof value === "string" ? value.split(",") : value // Ensure array format
        }));
    };


    // If you want to pre-fill the form when editing
    useEffect(() => {
        if (recordForEdit != null)
            setValues({...recordForEdit});
    }, [recordForEdit]);

    return (
        <Paper elevation={3} style={{padding: "20px", backgroundColor: "#fff"}}>
            <Form onSubmit={handleAllocate}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* Class Dropdown */}
                        <Controls.Select
                            name="classid"
                            label="Class"
                            value={values.classid}
                            onChange={handleInputChange}
                            options={classes}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* Student Multi-Select - appears after a class is selected */}
                        {values.classid && (
                            <Controls.Select
                                name="students"
                                label="Students"
                                value={values.students}
                                onChange={handleStudentChange}
                                options={students}
                                multiple={true} // Enable multi-select with checkboxes
                            />
                        )}
                    </Grid>
                    <Grid item xs={7}>
                        {/* Text Dropdown - appears after students are selected */}
                        {values.students.length > 0 && (
                            <Controls.Select
                                name="textid"
                                label="Text"
                                value={values.textid}
                                onChange={handleInputChange}
                                options={texts}
                            />
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        {/* Wordgroup Dropdown - appears after students are selected */}
                        {values.students.length > 0 && (
                            <Controls.Select
                                name="wordgroupid"
                                label="Word Group"
                                value={values.wordgroupid}
                                onChange={handleInputChange}
                                options={wordgroups}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {/* Allocate Button - appears after a text is selected */}
                        {values.textid && (
                            <Controls.Button
                                type="submit"
                                text="Allocate Text"
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {/* Allocate Button - appears after a word group is selected */}
                        {values.wordgroupid && (
                            <Controls.Button
                                type="submit"
                                text="Allocate Word Group"
                            />
                        )}
                    </Grid>
                </Grid>
            </Form>
        </Paper>
    );
}
