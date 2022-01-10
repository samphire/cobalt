import React, {useEffect, useState} from 'react';
import StudentForm from "./StudentForm";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import PageHeader from "../../components/PageHeader";
import {makeStyles, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import useTable from "../../components/useTable"
import * as studentService from "../../services/studentService"
import {isArray} from "chart.js/helpers";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Students(props) {

    const classes = useStyles();
    const {TblContainer} = useTable();
    const [records, setRecords] = useState(null);

    useEffect(async () => {
        setRecords(await studentService.getAllStudents())
    }, []);

    return (
        <>
            <PageHeader title="New Student" subTitle="Add or Update student"
                        icon={<PeopleOutlineTwoToneIcon fontSize="xx-large"/>}
            />
            <Paper className={classes.pageContent}>
                {/*    /!*<StudentForm/>*!/*/}
                <TblContainer>
                    <TableBody>
                        {
                            records && (
                                records.map(item =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.DOB || 'none'}</TableCell>
                                        <TableCell>{item.sex}</TableCell>
                                        <TableCell>{item.mobile || 'none'}</TableCell>
                                        <TableCell>{item.email || 'none'}</TableCell>
                                        <TableCell>{item.language_id}</TableCell>
                                        <TableCell>{item.isActive}</TableCell>
                                    </TableRow>)
                                )
                            )
                        }
                    </TableBody>
                </TblContainer>
            </Paper>
        </>
    )
}
