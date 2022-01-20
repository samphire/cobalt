import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography} from "@material-ui/core";
import Controls from "./controls/Controls"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles(theme => ({
    dialog: {
        position: 'absolute',
        top: theme.spacing(5),
        padding: theme.spacing(2)
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: 'rgb(255, 197, 217)',
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem'
        }
    },
    dialogTitle: {
        textAlign: "center"
    }
}))

export default function ConfirmDialog(props) {

    const {confirmDialog, setConfirmDialog} = props;
    const classes = useStyles()

    return (
        <Dialog
            classes={{paper: classes.dialog}}
            open={confirmDialog.isOpen}
        >
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <DeleteForeverIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button
                    text="No"
                    color="default"
                    onClick={()=> setConfirmDialog({...confirmDialog, isOpen: false})}
                />
                <Controls.Button
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    );
}

