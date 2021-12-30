import React from 'react';
import StudentForm from "./StudentForm";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import PageHeader from "../../components/PageHeader";
import {makeStyles, Paper} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))


export default function Students(props) {

    const classes = useStyles();

    return (
        <>
            <PageHeader title="New Student" subTitle="Add or Update student"
                        icon={<PeopleOutlineTwoToneIcon fontSize="xx-large"/>}
            />
            <Paper className={classes.pageContent}>
                <StudentForm/>
            </Paper>
        </>
    );
};
