import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button
} from '@material-ui/core';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ClassNoteCard
 *
 * Props:
 * - note: string
 * - editable: boolean    // whether the textarea is editable and save button is shown
 * - onNoteChange: (newNote: string) => void
 * - onSave: () => Promise<void>
 */
export default function ClassNoteCard({ note, editable, onNoteChange, onSave }) {
    const [showToast, setShowToast] = useState(false);
    const [saveDisabled, setSaveDisabled] = useState(false);

    // Reset save button when editable flag changes (e.g., when navigating date)
    useEffect(() => {
        if (editable) {
            setSaveDisabled(false);
        }
    }, [editable]);

    const handleSaveClick = async () => {
        try {
            await onSave();
            setShowToast(true);
            setSaveDisabled(true);
            setTimeout(() => setShowToast(false), 2000);
        } catch (err) {
            console.error('Error saving note:', err);
        }
    };

    return (
        <Card style={{ position: 'relative' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Daily Note
                </Typography>

                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                position: 'absolute',
                                top: 16,
                                left: 16,
                                right: 16,
                                backgroundColor: '#4caf50',
                                color: 'white',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                zIndex: 10,
                                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                                textAlign: 'center'
                            }}
                        >
                            ✅ Saved!
                        </motion.div>
                    )}
                </AnimatePresence>

                <TextField
                    label="Daily Note"
                    multiline
                    fullWidth
                    rows={5}
                    value={note}
                    onChange={e => onNoteChange(e.target.value)}
                    variant="outlined"
                    InputProps={{ readOnly: !editable }}
                    style={{ marginTop: 8 }}
                />

                {editable && (
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                        onClick={handleSaveClick}
                        disabled={saveDisabled}
                    >
                        Save
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
