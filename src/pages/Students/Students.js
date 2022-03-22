import React, {useEffect, useState} from 'react';
import StudentForm from "./StudentForm";
import {
    InputAdornment,
    makeStyles,
    Paper,
    TableBody,
    TableCell,
    TableRow,
    Toolbar,
    Typography
} from "@material-ui/core";
import useTable from "../../components/useTable"
import * as studentService from "../../services/studentService"
import CheckIcon from '@mui/icons-material/Check';
import Controls from '../../components/controls/Controls'
import {Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add"
import Popup from "../../components/Popup"
import {deleteStudent, insertOrUpdateStudent} from "../../services/studentService";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/Notification"
import ConfirmDialog from "../../components/ConfirmDialog"
import {Tooltip} from '@mui/material'

const useStyles = makeStyles(theme => ({
    pageContent: {
        // fontFamily: "'Noto Serif KR', serif",
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        '& .MuiTableCell-root': {
            fontSize: '14px',
            fontWeight: 400,
            borderRight: '1px solid silver',
            paddingTop: '8px',
            paddingBottom: '8px'
        },
    },
    searchInput: {
        width: '15%'
    },
    oblong: {
        position: 'absolute',
        right: '10px'
    },
    tCells: {
        textAlign: "center"
    },
    toolbar: {
        justifyContent: 'space-between'
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
    {id: 'actions', label: 'Actions', disableSorting: true}
]

export default function Students(props) {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [isEdit, setIsEdit] = useState("false")
    const [records, setRecords] = useState(null);
    const [filterFn, setFilterFn] = useState({fn: items => (items)});
    const [openPopup, setOpenPopup] = useState(false);
    const [refreshRecords, setRefreshRecords] = useState(0)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    useEffect(async () => {
        let students = await studentService.getAllStudents()
        let languages = await studentService.getLanguages()
        setLangosh(languages)
        console.log(langosh)
        const studs = students.map(x => ({
                ...x,
                languageName: languages[x.language_id - 1].name,
                isActive: x.isActive ? <CheckIcon fontSize='medium'/> : 'no'
            }
        ))
        console.log(studs)
        setRecords(studs)
    }, [refreshRecords]);

    // useEffect(async () => {
    //     setRecords(await studentService.getAllStudents())
    // }, [refreshRecords])


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

    const addOrEdit = (student, resetForm) => {
        console.warn(student);
        insertOrUpdateStudent(student, {isEdit}).then()
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRefreshRecords((num) => ++num)
        setIsEdit("false")
        console.log(refreshRecords)
        setNotify({
            isOpen: true,
            message: 'successfully added student',
            type: 'success'
        })
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteStudent(id).then(() => {
            setRefreshRecords((num) => ++num)
            setNotify({
                isOpen: true,
                message: 'successfully deleted student',
                type: 'error'
            })
        });
    }

    const [langosh, setLangosh] = useState({id: 1, name: 'glass'});

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <>
            {/*<PageHeader title="New Student" subTitle="Add or Update student"*/}
            {/*            icon={<PeopleOutlineTwoToneIcon fontSize="xx-large"/>}*/}
            {/*/>*/}
            <Paper className={classes.pageContent}>

                <Toolbar className={classes.toolbar}>
                    <Controls.Input
                        label="검색"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/>
                            </InputAdornment>)
                        }}
                        className={classes.searchInput}
                        onChange={handleSearch}
                        placeholder={"이름"}
                        // style={{position: 'absolute', left: '20px'}}
                    />
                    <Typography
                        variant="h3">
                        학생들
                    </Typography>
                    <Controls.Button
                        text="학생 추가"
                        variant="outlined"
                        startIcon={<AddIcon/>}
                        onClick={() => {
                            setIsEdit("false")
                            setRecordForEdit(null)
                            setOpenPopup(true)
                        }}
                        // style={{position: 'absolute', right: '10px'}}
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
                                        <TableCell className={classes.tCells}>{item.isActive}</TableCell>
                                        <TableCell className={classes.tCells}>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => {
                                                    setIsEdit("true")
                                                    openInPopup(item)
                                                }
                                                }
                                            >
                                                <Tooltip title="변집" placement="top">
                                                    <EditOutlinedIcon fontSize="small"/>
                                                </Tooltip>
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure you want to delete this student?',
                                                        subTitle: 'You cannot undo this operation',
                                                        onConfirm: () => {
                                                            onDelete(item.id)
                                                        }
                                                    })
                                                }}
                                            >
                                                <Tooltip title="삭재" placement="top">
                                                    <CloseIcon fontSize="small"/>
                                                </Tooltip>
                                            </Controls.ActionButton>
                                        </TableCell>
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
                <StudentForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                    langosh = {langosh}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
