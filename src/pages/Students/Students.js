import React, {useEffect, useState} from 'react';
import StudentForm from "./StudentForm";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import PageHeader from "../../components/PageHeader";
import {InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar} from "@material-ui/core";
import useTable from "../../components/useTable"
import * as studentService from "../../services/studentService"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Controls from '../../components/controls/Controls'
import {Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add"
import Popup from "../../components/Popup"

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        '& .MuiTableCell-root': {
            fontSize: '12px',
            borderRight: '1px solid silver'
        },
    },
    searchInput: {
        width: '15%'
    },
    oblong: {
        position: 'absolute',
        right: '10px'
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
    const [filterFn, setFilterFn] = useState({fn: items => (items)});
    const [openPopup, setOpenPopup] = useState(false);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    useEffect(async () => {
        let students = await studentService.getAllStudents()
        let languages = await studentService.getLanguages()
        const studs = students.map(x => ({
                ...x,
                languageName: languages[x.language_id - 1].name,
                isActive: x.isActive ? <CheckCircleOutlineIcon fontSize='large'/> : 'no'
            }
        ))
        console.log(studs)
        setRecords(studs)
    }, []);

    const handleSearch = e => {
        let target = e.target
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <>
            <PageHeader title="New Student" subTitle="Add or Update student"
                        icon={<PeopleOutlineTwoToneIcon fontSize="xx-large"/>}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="검색"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/>
                            </InputAdornment>)
                        }}
                        className={classes.searchInput}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon/>}
                        onClick={() => {
                            setOpenPopup(true);
                        }}
                        style={{position: 'absolute', right: '10px'}}
                        // className={classes.oblong}
                    />
                </Toolbar>
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
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="학생 만들기 "
            >
                <StudentForm/>
            </Popup>
        </>
    )
}
