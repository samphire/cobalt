import React from 'react';
import ReportsForm from './ReportsForm'; // Adjust the path based on your folder structure
import { Container, Typography } from '@material-ui/core';

export default function ReportsFormPage() {
    const addOrEdit = (data, resetForm) => {
        console.log("Form submitted with data:", data);
        resetForm(); // Reset the form after submission
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Type Student Reports
            </Typography>
            <ReportsForm addOrEdit={addOrEdit} />
        </Container>
    );
}
