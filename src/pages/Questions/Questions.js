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
import {deleteQuestion, insertOrUpdateQuestion} from "../../services/questionService";
import * as questionService from "../../services/questionService";
import useTable from "../../components/useTable"
import Controls from "../../components/controls/Controls"
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Popup from "../../components/Popup";
import StudentForm from "../Students/StudentForm";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import QuestionForm from "./QuestionForm";
import {useLocation, useParams} from "react-router-dom";


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
    {id: 'qnum', label: 'Question Number'},
    {id: 'rubrik', label: 'Rubrik', disableSorting: true},
    {id: 'text1', label: 'text1', disableSorting: true},
    {id: 'text2', label: 'text2', disableSorting: true},
    {id: 'text3', label: 'text3', disableSorting: true},
    {id: 'text4', label: 'text4', disableSorting: true},
    {id: 'text5', label: 'text5', disableSorting: true},
    {id: 'text6', label: 'text6', disableSorting: true},
    {id: 'text7', label: 'text7', disableSorting: true},
    {id: 'answer', label: 'answer', disableSorting: true},
    {id: 'type', label: 'type'},
    {id: 'image', label: 'image'},
    {id: 'audio', label: 'audio'},
    {id: 'video', label: 'video'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

export default function Questions(props) {
    const classes = useStyles()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [isEdit, setIsEdit] = useState("false")
    const [records, setRecords] = useState(null);
    const [filterFn, setFilterFn] = useState({fn: items => (items)});
    const [openPopup, setOpenPopup] = useState(false);
    const [refreshRecords, setRefreshRecords] = useState(0)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const testid = parseInt(useParams().testid)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    useEffect(async () => {
        let questions = await questionService.getAllQuestions(testid)
        setRecords(questions)

    }, [refreshRecords]);

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

    const addOrEdit = (question, resetForm) => {
        console.warn(question);
        insertOrUpdateQuestion(question, {isEdit}).then()
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

    const onDelete = (testid, qnum) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteQuestion(testid, qnum).then(() => {
            setRefreshRecords((num) => ++num)
            setNotify({
                isOpen: true,
                message: 'successfully deleted question',
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

                    <Typography variant="h5">테스트: {testid}</Typography>
                    <Typography
                        variant="h3">
                        문재들
                    </Typography>
                    <Controls.Button
                        text="문재 추가"
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
                                    (<TableRow key={item.qnum}>
                                        <TableCell>{item.qnum}</TableCell>
                                        <TableCell>{item.rubrik}</TableCell>
                                        <TableCell>{item.text1}</TableCell>
                                        <TableCell>{item.text2}</TableCell>
                                        <TableCell>{item.text3}</TableCell>
                                        <TableCell>{item.text4}</TableCell>
                                        <TableCell>{item.text5}</TableCell>
                                        <TableCell>{item.text6}</TableCell>
                                        <TableCell>{item.text7}</TableCell>
                                        <TableCell>{item.answer}</TableCell>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell>{item.image}</TableCell>
                                        <TableCell>{item.audio}</TableCell>
                                        <TableCell>{item.video}</TableCell>

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
                                                        title: 'Are you sure you want to delete this question?',
                                                        subTitle: 'You cannot undo this operation',
                                                        onConfirm: () => {
                                                            onDelete(item.test_id, item.qnum)
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
                title="문재 만들기 "
            >
                <QuestionForm
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
