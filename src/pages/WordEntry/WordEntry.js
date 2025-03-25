import React from 'react';
import WordEntryForm from './WordEntryForm'; // Adjust the path based on your folder structure
import {Container, Typography} from '@material-ui/core';

export default function WordEntry() {
    const addOrEdit = (data, resetForm) => {
        console.log("Form submitted with data:", data);
        resetForm(); // Reset the form after submission
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Flutter App Word Entry
            </Typography>
            <WordEntryForm />
        </Container>
    );
}
