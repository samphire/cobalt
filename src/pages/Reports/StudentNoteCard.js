import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Avatar
} from '@material-ui/core';
import { motion, AnimatePresence } from 'framer-motion';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function StudentNoteCard({ student, note, editable, onNoteChange, onSave }) {
    const [showToast, setShowToast] = useState(false);
    const [saveDisabled, setSaveDisabled] = useState(false);

    // 🌀 Reset save button when editable changes (i.e., week navigation)
    useEffect(() => {
        if (editable) {
            setSaveDisabled(false);
        }
    }, [editable]);

    const handleSaveClick = async () => {
        await onSave();
        setShowToast(true);
        setSaveDisabled(true); // ✅ disable button after save
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <Card style={{ position: 'relative' }}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Avatar src={`${SERVER_URL}/userPics/${student?.user_email}.png`} alt={student?.user_name} />
                    <Typography variant="h6">{student?.user_name}</Typography>
                </div>

                {/* ✅ Fancy animated toast */}
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                position: 'absolute',
                                top: 90,
                                left: 20,
                                right: 20,
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
                    label="Weekly Note"
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
                        disabled={saveDisabled} // ✅ controlled
                    >
                        Save
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
