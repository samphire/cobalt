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
import {getStudAllocs, deleteStudAlloc, insertOrUpdateStudAlloc} from "../../services/studAllocService";
import StudAllocForm from "./StudAllocForm"
import useTable from "../../components/useTable"
import Controls from "../../components/controls/Controls"
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
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
    searchInputDiv:{
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
    {id: 'studid', label: 'Student ID'},
    {id: 'studName', label: 'Student Name', disableSorting: true},
    {id: 'classid', label: 'Class ID', disableSorting: true},
    {id: 'className', label: 'Class Name', disableSorting: true},
    {id: 'comment', label: 'Comment', disableSorting: true},
    {id: 'begin', label: 'Begin'},
    {id: 'end', label: 'End'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

export default function StudAlloc(props) {
    const classes = useStyles()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [isEdit, setIsEdit] = useState("false")
    const [records, setRecords] = useState(null);
    const [filterFn, setFilterFn] = useState({fn: items => (items)});
    const [openPopup, setOpenPopup] = useState(false);
    const [refreshRecords, setRefreshRecords] = useState(0)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const studid = parseInt(useParams().studid)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    useEffect(async () => {
        let studAllocs = await getStudAllocs()
        setRecords(studAllocs)

    }, [refreshRecords]);

    const handleStudentSearch = e => {
        setClassFilterTerm("")
        setStudFilterTerm(e.target.value)
        let target = e.target
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.studName.toLowerCase().includes(target.value))
            }
        })
    }

    const handleClassSearch = e => {
        setStudFilterTerm("")
        setClassFilterTerm(e.target.value)
        let target = e.target
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.className.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (studAlloc, resetForm) => {
        console.warn(studAlloc);
        insertOrUpdateStudAlloc(studAlloc, {isEdit}).then()
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRefreshRecords((num) => ++num)
        setIsEdit("false")
        console.log(refreshRecords)
        setNotify({
            isOpen: true,
            message: 'successfully added student class allocation',
            type: 'success'
        })
    }

    const onDelete = (studid, classid) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteStudAlloc(studid, classid).then(() => {
            setRefreshRecords((num) => ++num)
            setNotify({
                isOpen: true,
                message: 'successfully deleted student class allocation',
                type: 'error'
            })
        });
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const [studFilterTerm, setStudFilterTerm] = useState(null)
    const [classFilterTerm, setClassFilterTerm] = useState(null)

    return (
        <>
            <Paper className={classes.pageContent}>

                <Toolbar className={classes.toolbar}>
                    <div className={classes.searchInputDiv}>
                        <Controls.Input
                            label="student filter"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>)
                            }}
                            className={classes.searchInput}
                            onChange={handleStudentSearch}
                            placeholder={"student name"}
                            value={studFilterTerm}
                            // style={{position: 'absolute', left: '20px'}}
                        />
                        <Controls.Input
                            label="class filter"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>)
                            }}
                            className={classes.searchInput}
                            onChange={handleClassSearch}
                            placeholder={"class name"}
                            value={classFilterTerm}
                            // style={{position: 'absolute', left: '20px'}}
                        />
                    </div>
                    <Typography
                        variant="h3">
                        Student Class Allocations
                    </Typography>
                    <Controls.Button
                        text="학생을 반에 추가"
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
                                    (<TableRow key={item.studid + item.classid}>
                                        <TableCell>{item.studid}</TableCell>
                                        <TableCell>{item.studName}</TableCell>
                                        <TableCell>{item.classid}</TableCell>
                                        <TableCell>{item.className}</TableCell>
                                        <TableCell>{item.comment}</TableCell>
                                        <TableCell>{item.begin}</TableCell>
                                        <TableCell>{item.end}</TableCell>

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
                                                        title: 'Are you sure you want to delete this student class allocation?',
                                                        subTitle: 'You cannot undo this operation',
                                                        onConfirm: () => {
                                                            onDelete(item.studid, item.classid)
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
                title="학생을 반에 할당하기 "
            >
                <StudAllocForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                    id={studid}
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
