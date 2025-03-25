import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';

const SERVER_URL = "https://notborder.org/optikon";

export default function WordEntryForm() {
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [entries, setEntries] = useState([{ word: '', translation: '' }]);

    const handleChange = (idx, field, value) => {
        const updated = [...entries];
        updated[idx][field] = value;
        setEntries(updated);

        // Auto-add new row if the last row is complete
        const last = updated[updated.length - 1];
        if (last.word.trim() && last.translation.trim()) {
            setEntries([...updated, { word: '', translation: '' }]);
        }
    };

    const handleSubmit = async () => {
        const cleaned = entries.filter(e => e.word.trim() && e.translation.trim());
        if (!groupName.trim()) {
            alert("Please enter a group name.");
            return;
        }
        try {
            const response = await fetch(`${SERVER_URL}/saveWordList.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    group_name: groupName,
                    description: description,
                    words: cleaned
                })
            });
            const result = await response.json();
            console.log('Server response:', result);
            // Reset the form after a successful submission
            setEntries([{ word: '', translation: '' }]);
            setGroupName('');
            setDescription('');
        } catch (error) {
            console.error('Error submitting word list:', error);
        }
    };

    return (
        <Paper style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>Enter Group, Description and Words</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Group Name"
                        fullWidth
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
                {entries.map((entry, idx) => (
                    <React.Fragment key={idx}>
                        <Grid item xs={5}>
                            <TextField
                                label="Word"
                                fullWidth
                                value={entry.word}
                                onChange={(e) => handleChange(idx, 'word', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Translation"
                                fullWidth
                                value={entry.translation}
                                onChange={(e) => handleChange(idx, 'translation', e.target.value)}
                            />
                        </Grid>
                    </React.Fragment>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Finalize
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
