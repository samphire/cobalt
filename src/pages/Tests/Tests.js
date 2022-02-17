import React, {useEffect, useState} from 'react';
import TestForm from "./TestForm";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import PageHeader from "../../components/PageHeader";
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
import * as testService from "../../services/testService"
import CheckIcon from '@mui/icons-material/Check';
import Controls from '../../components/controls/Controls'
import {Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add"
import Popup from "../../components/Popup"
import {deleteTest, insertOrUpdateTest} from "../../services/testService";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/Notification"
import ConfirmDialog from "../../components/ConfirmDialog";

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
    {id: 'name', label: '테스트 이름'},
    {id: 'description', label: '테스트 설명', disableSorting: true},
    {id: 'created', label: '테스트 만든 년월일'},
    {id: 'print_wrong', label: '틀림 보여줌', disableSorting: true},
    {id: 'print_answer', label: '답변 보여줌', disableSorting: true},
    {id: 'oneshot', label: '완샷'},
    {id: 'retain', label: '유지'},
    {id: 'timer', label: '시간제 노동자'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

export default function Tests(props) {

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
        let tests = await testService.getAllTests()
        const ts = tests.map(x => ({
                ...x,
                // isActive: x.isActive ? <CheckCircleOutlineIcon fontSize='large'/> : 'no'
                print_wrong: x.print_wrong < 0 ? <CheckIcon fontSize='medium'/> : '',
                print_answer: x.print_answer < 0 ? <CheckIcon fontSize='medium'/> : '',
                oneshot: x.oneshot < 0 ? <CheckIcon fontSize='medium'/> : '',
                retain: x.retain < 0 ? <CheckIcon fontSize='medium'/> : ''
            }
        ))
        console.log(ts)
        setRecords(ts)
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

    const addOrEdit = (test, resetForm) => {
        console.warn(test);
        insertOrUpdateTest(test, {isEdit}).then()
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRefreshRecords((num) => ++num)
        setIsEdit("false")
        console.log(refreshRecords)
        setNotify({
            isOpen: true,
            message: 'successfully added test',
            type: 'success'
        })
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteTest(id).then(() => {
            setRefreshRecords((num) => ++num)
            setNotify({
                isOpen: true,
                message: 'successfully deleted test',
                type: 'error'
            })
        });
    }


    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }


    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar className={classes.toolbar}>
                    <Controls.Input
                        lable="검색"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/>
                            </InputAdornment>)
                        }}
                        className={classes.searchInput}
                        onChange={handleSearch}
                        placeholder={"test"}
                    />
                    <Typography
                        variant="h3">
                        테스트
                    </Typography>
                    <Controls.Button
                        text="테스트 주가"
                        variant="outlined"
                        startIcon={<AddIcon/>}
                        onClick={() => {
                            setIsEdit("false")
                            setRecordForEdit(null)
                            setOpenPopup(true)
                        }}
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
                                        <TableCell>{item.description ||
                                        <span style={{color: '#999'}}>{'\u03c6'}</span>}</TableCell>
                                        <TableCell>{item.created}</TableCell>
                                        <TableCell style={{textAlign: 'center'}}>{item.print_wrong}</TableCell>
                                        <TableCell style={{textAlign: 'center'}}>{item.print_answer}</TableCell>
                                        <TableCell style={{textAlign: 'center'}}>{item.oneshot}</TableCell>
                                        <TableCell style={{textAlign: 'center'}}>{item.retain}</TableCell>
                                        <TableCell>{item.timer}</TableCell>
                                        <TableCell className={classes.tCells}>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => {
                                                    setIsEdit("true")
                                                    openInPopup(item)
                                                }
                                                }
                                            >
                                                <EditOutlinedIcon fontSize="small"/>
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure you want to delete this test?',
                                                        subTitle: 'You cannot undo this operation',
                                                        onConfirm: () => {
                                                            onDelete(item.id)
                                                        }
                                                    })
                                                }}
                                            >
                                                <CloseIcon fontSize="small"/>
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
                title="테스트 만들기"
            >
                <TestForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
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
