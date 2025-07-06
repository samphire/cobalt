import React, {useEffect, useState} from 'react';
import {TextField, Button, Grid, Paper, Typography} from '@material-ui/core';
import {getAllWordgroups} from "../../services/wordgroupService";
import {getWordgroup} from "../../services/wordgroupService";
import Controls from "../../components/controls/Controls";
import {Box} from "@mui/material";

const SERVER_URL = "https://notborder.org/optikon";

export default function WordEntryForm() {
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [entries, setEntries] = useState([{word: '', translation: ''}]);
    const [wordgroups, setWordgroups] = useState([]);
    const [wordgroupid, setWordgroupid] = useState('');
    const [selectedWordGroup, setSelectedWordGroup] = useState('');
    // const [selectedWordgroupName, setSelectedWordgroupName] = useState('');
    // const [selectedWordgroupDescription, setSelectedWordgroupDescription] = useState('');

    useEffect(() => {
        async function fetchData() {
            let myWordgroups = await getAllWordgroups();
            myWordgroups = myWordgroups.map(item => ({...item, title: item.group_name}));
            setWordgroups(myWordgroups);
        }
        fetchData();
    }, []);

    const handleChange = (idx, field, value) => {
        const updated = [...entries];
        updated[idx][field] = value;
        setEntries(updated);

        // Auto-add new row if the last row is complete
        const last = updated[updated.length - 1];
        if (last.word.trim() && last.translation.trim()) {
            setEntries([...updated, {word: '', translation: ''}]);
        }
    };

    const handleWordGroupChange = (e) => {
        setWordgroupid(e);
        const selectedId = parseInt(e, 10);
        setSelectedWordGroup(wordgroups.find(wg => parseInt(wg.id, 10) === selectedId));
    }

    const testifyWordGroup = async () => {
        try {
            const wordGroupData = await getWordgroup(wordgroupid);
            console.log(wordGroupData);
            const response = await fetch(`${SERVER_URL}/vocaFullBore.php`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    group_name: selectedWordGroup.group_name,
                    description: setSelectedWordGroup.group_desc,
                    words: wordGroupData,
                })
            });
            const result = await response.json();
            console.log('Server response:', result);
        } catch (error) {
            console.error('Error making fullBore tests:', error);
        }
    }

    const handleSubmit = async () => {
        const cleaned = entries.filter(e => e.word.trim() && e.translation.trim());
        if (!groupName.trim()) {
            alert("Please enter a group name.");
            return;
        }

        try {
            const response = await fetch(`${SERVER_URL}/saveWordList.php`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    group_name: groupName,
                    description: description,
                    words: cleaned
                })
            });
            const result = await response.json();
            console.log('Server response:', result);
        } catch (error) {
            console.error('Error submitting word list:', error);
        }

        let myWordgroups = await getAllWordgroups();
        myWordgroups = myWordgroups.map(item => ({...item, title: item.group_name}));
        setWordgroups(myWordgroups);

        // Reset the form after a successful submission
        setEntries([{word: '', translation: ''}]);
        setGroupName('');
        setDescription('');
    };

    return (
        <Paper style={{padding: 20}}>
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
                        <Grid item xs={6}>
                            <TextField
                                label="Word"
                                fullWidth
                                value={entry.word}
                                onChange={(e) => handleChange(idx, 'word', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Translation"
                                fullWidth
                                value={entry.translation}
                                onChange={(e) => handleChange(idx, 'translation', e.target.value)}
                            />
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
            <Grid container spacing={2} alignItems="center" style={{marginTop: 20}}>
                {/* Finalize button on the left */}
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Finalize
                    </Button>
                </Grid>

                {/* Dropdown + Monsterize on the right */}
                <Grid item xs={6}>
                    <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                        <Controls.Select
                            name="wordgroupid"
                            label="Word Group"
                            value={wordgroupid}
                            onChange={(e) => handleWordGroupChange(e.target.value)}
                            options={wordgroups}
                        />
                        {wordgroupid && (
                            <Button variant="contained" color="primary" onClick={testifyWordGroup}>
                                Monsterize
                            </Button>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
