import React from 'react';
import { Container, Typography } from '@material-ui/core';
import ClassNotesForm from './ClassNotesForm';

export default function ClassNotesFormPage() {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Daily Class Notes
            </Typography>
            <ClassNotesForm />
        </Container>
    );
}
