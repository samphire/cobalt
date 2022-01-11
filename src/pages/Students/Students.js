import React, {useEffect, useState} from 'react';
import StudentForm from "./StudentForm";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import PageHeader from "../../components/PageHeader";
import {makeStyles, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import useTable from "../../components/useTable"
import * as studentService from "../../services/studentService"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        '& .MuiTableCell-root': {
            fontSize: '12px',
            borderRight: '1px solid silver'
        },

    }
}))

const headCells = [
    {id: 'id', label: 'ID'},
    {id: 'name', label: '이름'},
    {id: 'DOB', label: '생일 년월일'},
    {id: 'sex', label: '성별'},
    {id: 'mobile', label: '전화 번호', disableSorting: true},
    {id: 'email', label: '이메일', disableSorting: true},
    {id: 'languageName', label: '언어'},
    {id: 'guardian_name', label: '보호자 성암', disableSorting: true},
    {id: 'guardian_mobile', label: '보호자 전화', disableSorting: true},
    {id: 'join_date', label: '가입 년월일'},
    {id: 'last_active_date', label: '마지막 활성'},
    {id: 'notes', label: '주목', disableSorting: true},
    {id: 'pass', label: '암호', disableSorting: true},
    {id: 'picUrl', label: '사진', disableSorting: true},
    {id: 'isActive', label: '활성'},
]

export default function Students(props) {

    const classes = useStyles();
    const [records, setRecords] = useState(null);
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells);

    useEffect(async () => {
        let students = await studentService.getAllStudents()
        let languages = await studentService.getLanguages()
        const studs = students.map(x => ({
                ...x,
                languageName: languages[x.language_id - 1].name,
                isActive: x.isActive?<CheckCircleOutlineIcon fontSize='large'/>:'no'
            }
        ))
        console.log(studs)
        setRecords(studs)
    }, []);

    return (
        <>
            <PageHeader title="New Student" subTitle="Add or Update student"
                        icon={<PeopleOutlineTwoToneIcon fontSize="xx-large"/>}
            />
            <Paper className={classes.pageContent}>
                {/*    /!*<StudentForm/>*!/*/}
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting() && (
                                recordsAfterPagingAndSorting().map(item =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.DOB ||
                                        <span style={{color: '#999'}}>{'\u03c6'}</span>}</TableCell>
                                        <TableCell>{item.sex}</TableCell>
                                        <TableCell>{item.mobile ||
                                        <span style={{color: '#999'}}>{'\u03c6'}</span>}</TableCell>
                                        <TableCell>{item.email ||
                                        <span style={{color: '#999'}}>{'\u03c6'}</span>}</TableCell>
                                        <TableCell>{item.languageName}</TableCell>
                                        <TableCell>{item.guardian_name}</TableCell>
                                        <TableCell>{item.guardian_mobile}</TableCell>
                                        <TableCell>{item.join_date}</TableCell>
                                        <TableCell>{item.last_active_date}</TableCell>
                                        <TableCell>{item.notes}</TableCell>
                                        <TableCell>{item.pass}</TableCell>
                                        <TableCell>{item.picUrl}</TableCell>
                                        <TableCell>{item.isActive}</TableCell>
                                    </TableRow>)
                                )
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
        </>
    )
}
