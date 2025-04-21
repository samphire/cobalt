import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { getAllClasses } from '../../services/classService';
import ClassNoteCard from './ClassNoteCard';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// Compute start of current week (Monday)
function getCurrentWeekStart() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const day = now.getDay();
    // adjust when day is Sunday (0)
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.setDate(diff));
}

export default function ClassNotesForm() {
    const [classes, setClasses] = useState([]);
    const [classId, setClassId] = useState('');
    const [note, setNote] = useState('');
    const [weekOffset, setWeekOffset] = useState(0);

    // Determine today's index within Mon–Thu
    const dow = new Date().getDay(); // 0 = Sun, 1 = Mon ...
    let todayIndex = dow - 1;
    if (todayIndex < 0) todayIndex = 0;
    if (todayIndex > 3) todayIndex = 3;

    const [dayIndex, setDayIndex] = useState(todayIndex);

    // Calculate selected date
    const weekStart = getCurrentWeekStart();
    const selectedDate = new Date(weekStart);
    selectedDate.setDate(
        weekStart.getDate() + weekOffset * 7 + dayIndex
    );

    const pad = n => n.toString().padStart(2, '0'); // hehe a function
    const dateString =
        `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}`;

    // const dateString = selectedDate.toISOString().slice(0, 10);

    // Only editable when viewing today's date
    const isCurrentDay = weekOffset === 0 && dayIndex === todayIndex;

    useEffect(() => {
        // load classes once
        getAllClasses().then(raw => {
            const opts = raw.map(c => ({ id: c.id, title: c.name }));
            setClasses(opts);
        });
    }, []);

    useEffect(() => {
        // load note whenever class or date changes
        if (!classId) {
            setNote('');
            return;
        }
        fetch(`${SERVER_URL}/getDailyNote.php?classid=${classId}&date=${dateString}`)
            .then(res => res.json())
            .then(data => setNote(data.notes || ''))
            .catch(err => console.error('Error loading note:', err));
    }, [classId, dateString]);

    const handleSave = async () => {
        try {
            await fetch(`${SERVER_URL}/saveDailyNote.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classid: classId, date: dateString, note })
            });
        } catch (err) {
            console.error('Error saving note:', err);
        }
    };

    const prevDate = () => {
        if (dayIndex > 0) {
            setDayIndex(dayIndex - 1);
        } else {
            setWeekOffset(weekOffset - 1);
            setDayIndex(3);
        }
    };

    const nextDate = () => {
        if (dayIndex < 3) {
            setDayIndex(dayIndex + 1);
        } else {
            setWeekOffset(weekOffset + 1);
            setDayIndex(0);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper style={{ padding: 20 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Controls.Select
                            name="classid"
                            label="Class"
                            value={classId}
                            onChange={e => setClassId(e.target.value)}
                            options={classes}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Notes for {dateString}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <ClassNoteCard
                            note={note}
                            editable={!!classId && isCurrentDay}
                            onNoteChange={setNote}
                            onSave={handleSave}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={prevDate}>&larr; Prev</Button>
                        <Button onClick={nextDate} disabled={!classId || isCurrentDay}>
                            Next &rarr;
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
