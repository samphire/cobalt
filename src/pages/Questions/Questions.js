import React, {useEffect, useState} from 'react';
import {Search} from "@material-ui/icons";
import {InputAdornment, makeStyles, Paper, Toolbar} from "@material-ui/core";
import {deleteQuestion, insertOrUpdateQuestion} from "../../services/questionService";
import * as questionService from "../../services/questionService";
import useTable from "../../components/useTable"
import Controls from "../../components/controls/Controls"

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
    {id: 'test_id', label: 'Test id'},
    {id: 'qnum', label: 'Question Number'},
    {id: 'rubrik', label: 'Rubrik'},
    {id: 'text1', label: 'text1'},
    {id: 'text2', label: 'text2'},
    {id: 'text3', label: 'text3'},
    {id: 'text4', label: 'text4'},
    {id: 'text5', label: 'text5'},
    {id: 'text6', label: 'text6'},
    {id: 'text7', label: 'text7'},
    {id: 'answer', label: 'answer'},
    {id: 'type', label: 'type', disableSorting: true},
    {id: 'image', label: 'image', disableSorting: true},
    {id: 'audio', label: 'audio'},
    {id: 'video', label: 'video', disableSorting: true},
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

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    useEffect(async () => {
        const testid = 99
        let questions = await questionService.getAllQuestions(testid)
        // const qns = questions.map(x => ({
        //         ...x,
        //         languageName: languages[x.language_id - 1].name,
        //         isActive: x.isActive ? <CheckCircleOutlineIcon fontSize='large'/> : 'no'
        //     }
        // ))
        // console.log(qns)
        // setRecords(qns)
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

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteQuestion(id).then(() => {
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
                    <Controls.Input
                        label="검색"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/>
                            </InputAdornment>)
                        }}
                        className={classes.searchInput}
                        onChange={handleSearch}
                        placeholder={"bob"}
                        />
                </Toolbar>
            </Paper>


        </>
    );
}
