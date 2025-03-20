import React from 'react';
import AllocationForm from './AllocationForm'; // Adjust the path based on your folder structure
import { Container, Typography } from '@material-ui/core';

export default function ReaderAllocationPage() {
    const addOrEdit = (data, resetForm) => {
        console.log("Form submitted with data:", data);
        resetForm(); // Reset the form after submission
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Allocate Texts / Words to Students
            </Typography>
            <AllocationForm addOrEdit={addOrEdit} />
        </Container>
    );
}
