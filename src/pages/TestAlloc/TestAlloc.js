import React, {useEffect, useState} from 'react';

import {Tooltip} from "@mui/material";
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
import {
    deleteTestAlloc,
    getAllTestAllocs,
    insertOrUpdateTestAlloc,
    resetTestAlloc
} from "../../services/testAllocService";
import useTable from "../../components/useTable"
import Controls from "../../components/controls/Controls"
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import TestAllocForm from "./TestAllocForm";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import {useParams} from "react-router-dom";
import {Search} from "@material-ui/icons";


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
        width: '50%',
        marginRight: '5px'
    },
    searchInputDiv: {
        display: "flex"
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
    {id: 'testid', label: '테스트 ID'},
    {id: 'testname', label: '테스트 이름'},
    {id: 'classid', label: '반 ID'},
    {id: 'classname', label: '반 이름'},
    {id: 'start', label: '시작'},
    {id: 'finish', label: '마감'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

export default function TestAlloc(props) {
    const classes = useStyles()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [isEdit, setIsEdit] = useState("false")
    const [records, setRecords] = useState(null);
    const [filterFn, setFilterFn] = useState({fn: items => (items)});
    const [openPopup, setOpenPopup] = useState(false);
    const [refreshRecords, setRefreshRecords] = useState(0)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const myDir = process.env.REACT_APP_DIR

    const {classid, testid} = useParams();

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    useEffect(async () => {
        let testAllocs = await getAllTestAllocs()
        setRecords(testAllocs)

        if (eval(classid)) {
            setClassFilterTerm(classid)
            setFilterFn({
                fn: items => {
                    return items.filter(x => x.classid.includes(classid))
                }
            })
        }
        if (eval(testid)) {
            setTestFilterTerm(testid)
            setFilterFn({
                fn: items => {
                    return items.filter(x => x.testid.includes(testid))
                }
            })
        }
    }, [refreshRecords]);

    const handleTestSearch = e => {
        setTestFilterTerm(e.target.value)
        let target = e.target
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.testname.toLowerCase().includes(target.value))
            }
        })
    }

    const handleClassSearch = e => {
        setClassFilterTerm(e.target.value)
        let target = e.target
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.classname.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (question, resetForm) => {
        console.warn(question);
        insertOrUpdateTestAlloc(question, {isEdit}).then()
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRefreshRecords((num) => ++num)
        setIsEdit("false")
        console.log(refreshRecords)
        setNotify({
            isOpen: true,
            message: 'successfully added question',
            type: 'success'
        })
    }

    const onDelete = (classid, testid) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteTestAlloc(classid, testid).then(() => {
            setRefreshRecords((num) => ++num)
            setNotify({
                isOpen: true,
                message: '테스트 할당을 성공적으로 삭제되었습니다',
                type: 'error'
            })
        });
    }

    const onReset = (classid, testid) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        resetTestAlloc(classid, testid).then(() => {
            setNotify({
                isOpen: true,
                message: `테스트 ${testid} 반 ${classid} 점수 및 응답을 성공적으로 재설정되었습니다`,
                type: 'error'
            })
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const [classFilterTerm, setClassFilterTerm] = useState()
    const [testFilterTerm, setTestFilterTerm] = useState()

    return (
        <>
            <Paper className={classes.pageContent}>

                <Toolbar className={classes.toolbar}>
                    <div className={classes.searchInputDiv}>
                        <Controls.Input
                            label="테스트 필터"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>)
                            }}
                            className={classes.searchInput}
                            onChange={handleTestSearch}
                            placeholder={"테스트 이름"}
                            value={testFilterTerm}
                        />
                        <Controls.Input
                            label="반 필터"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>)
                            }}
                            className={classes.searchInput}
                            onChange={handleClassSearch}
                            placeholder={"반 이름"}
                            value={classFilterTerm}
                        />
                    </div>
                    <Typography
                        variant="h3">
                        테스트 할당
                    </Typography>
                    <Controls.Button
                        text="테스트 할당하기"
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
                                    (<TableRow key={item.classid + item.testid}>
                                        <TableCell>{item.testid}</TableCell>
                                        <Tooltip title="테스트 보기" placement="top-start">
                                            <TableCell onClick={() => {
                                                window.location = `${myDir}/tests/` + item.testid;
                                            }}>{item.testname}</TableCell>
                                        </Tooltip>
                                        <TableCell>{item.classid}</TableCell>
                                        <TableCell>{item.classname}</TableCell>
                                        <TableCell>{item.start}</TableCell>
                                        <TableCell>{item.finish}</TableCell>
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
                                                    console.log(item)
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure you want to delete this test allocation?',
                                                        subTitle: 'You cannot undo this operation',
                                                        onConfirm: () => {
                                                            onDelete(item.classid, item.testid)
                                                        }
                                                    })
                                                }}
                                            >
                                                <Tooltip title="삭재" placement="top">
                                                    <CloseIcon fontSize="small"/>
                                                </Tooltip>
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="tertiary"
                                                onClick={() => {
                                                    console.log(item)
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure you want to reset this test allocation?',
                                                        subTitle: 'All class responses and test scores will be deleted',
                                                        onConfirm: () => {
                                                            onReset(item.classid, item.testid)
                                                        }
                                                    })
                                                }}
                                            >
                                                <Tooltip title="테스트 복구" placement="top">
                                                    <AutoFixHighIcon fontSize="small"/>
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
                title="테스트 할당하기"
            >
                <TestAllocForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                    id={testid}
                    qnum={records ? records.length : 1}
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
    );
}
