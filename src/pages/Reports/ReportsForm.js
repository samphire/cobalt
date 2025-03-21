import React, {useState, useEffect} from 'react';
import {Grid, Typography, Paper} from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import {getAllClasses} from '../../services/classService';
import {getStudentsForClass} from '../../services/studentService';
import StudentNoteCard from './StudentNoteCard';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function getWeekNumber(date) {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);

    // Set to nearest Thursday: current date + 4 - current day number
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));

    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);

    return weekNo;
}


function getCurrentWeekStart() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(now.setDate(diff));
}

export default function ReportsForm() {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [values, setValues] = useState({classid: '', students: []});
    const [notes, setNotes] = useState({});
    const [weekOffset, setWeekOffset] = useState(0);

    const selectedWeek = new Date(getCurrentWeekStart());
    selectedWeek.setDate(selectedWeek.getDate() + weekOffset * 7);
    const weekString = selectedWeek.toISOString().slice(0, 10);
    // const isCurrentWeek = weekOffset === 0;
    const weekNumber = getWeekNumber(selectedWeek);
    const isCurrentWeek = weekOffset === 0;

    useEffect(() => {
        getAllClasses().then((rawClasses) => {
            const formatted = rawClasses.map(c => ({
                id: c.id,
                title: c.name
            }));
            setClasses(formatted);
        });
    }, []);


    useEffect(() => {
        if (values.classid) {
            getStudentsForClass(values.classid).then((data) => {
                setStudents(data.map(s => ({
                    ...s,
                    title: `${s.user_email} - ${s.user_name}`,
                    id: s.user_id
                })));
            });
        } else {
            setStudents([]);
        }
    }, [values.classid]);

    useEffect(() => {
        async function loadNotes() {
            const newNotes = {};
            for (const student of values.students) {
                const res = await fetch(SERVER_URL + `/getWeeklyNotes.php?studentid=${student}&week=${weekNumber}`);
                const data = await res.json();
                newNotes[student] = data.note || '';
            }
            setNotes(newNotes);
        }

        if (values.students.length > 0) {
            loadNotes();
        }
    }, [values.students, weekString]);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    const handleStudentChange = e => {
        const {value} = e.target;
        setValues({...values, students: typeof value === 'string' ? value.split(',') : value});
    };

    const handleNoteChange = (userId, note) => {
        setNotes(prev => ({...prev, [userId]: note}));
    };

    const handleSave = async (userId) => {
            console.log(weekString);
            try {
                const response = await fetch(SERVER_URL + '/saveWeeklyNote.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({studentid: userId, week: weekNumber, note: notes[userId]})
                });
            } catch (error) {
                console.log("error saving note: ", error);
            }
        };

    return (
        <Paper style={{padding: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controls.Select
                        name="classid"
                        label="Class"
                        value={values.classid}
                        onChange={handleInputChange}
                        options={classes}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Select
                        name="students"
                        label="Students"
                        value={values.students}
                        onChange={handleStudentChange}
                        options={students}
                        multiple
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Week of {weekString}</Typography>
                </Grid>
                <Grid item container spacing={2}>
                    {values.students.map(studentId => {
                        const student = students.find(s => s.id === studentId);
                        return (
                            <Grid item xs={12} md={6} key={studentId}>
                                <StudentNoteCard
                                    student={student}
                                    note={notes[studentId] || ''}
                                    editable={isCurrentWeek}
                                    onNoteChange={(note) => handleNoteChange(studentId, note)}
                                    onSave={() => handleSave(studentId)}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
            <div className="week-nav">
                <button onClick={() => setWeekOffset(weekOffset - 1)}>&larr;</button>
                <button onClick={() => setWeekOffset(weekOffset + 1)} disabled={isCurrentWeek}>&rarr;</button>
            </div>
        </Paper>
    );
}
