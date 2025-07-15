import React, {useEffect, useRef, useState} from 'react';
import TestForm from "./TestForm";
import DvrIcon from '@mui/icons-material/Dvr';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {
    Grid,
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
import CheckIcon from '@mui/icons-material/Check';
import Controls from '../../components/controls/Controls'
import {Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add"
import Popup from "../../components/Popup"
import {deleteTest, insertOrUpdateTest, checkTestImages, getAllTests} from "../../services/testService";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/Notification"
import ConfirmDialog from "../../components/ConfirmDialog";
import PeopleIcon from '@mui/icons-material/People';
import {Tooltip} from "@mui/material";
import {useParams, useHistory} from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL

const useStyles = makeStyles(theme => ({
    pageContent: {
        // fontFamily: "'Noto Serif KR', serif",
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        '& .MuiTableCell-root': {
            fontSize: '14px',
            fontWeight: 400,
            borderRight: '1px solid silver',
            padding: '8px 10px'
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
    {id: 'id', label: 'ID', disableSorting: true},
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

    const classes = useStyles()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [isEdit, setIsEdit] = useState("false")
    const [records, setRecords] = useState(null);
    const [filterFn, setFilterFn] = useState({fn: items => (items)});
    const [openPopup, setOpenPopup] = useState(false);
    const [refreshRecords, setRefreshRecords] = useState(0)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const {testid} = useParams()
    const history = useHistory();
    const terry = useRef()
    const aud = useRef()

    const uploadImages = (e) => {
        e.preventDefault()
        let formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append(`files${i}`, e.target.files[i])
            console.log(formData)
        }
        const requestOptions = {
            method: 'POST',
            body: formData
        }
        fetch(SERVER_URL + "/postData.php?type=imgUpload", requestOptions).then(async response => {
            console.log(response.status + ", " + response.statusText)
        })
        terry.current.style.display = "none"
    }

    const uploadAudio = (e) => {
        e.preventDefault()
        let formData = new FormData()
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append(`files${i}`, e.target.files[i])
            console.log(formData)
        }
        const requestOptions = {
            method: 'POST',
            body: formData
        }
        fetch(SERVER_URL + "/postData.php?type=audUpload", requestOptions).then(async response => {
            console.log(response.status + ", " + response.statusText)
        })
        aud.current.style.display = "none"
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    useEffect(async () => {
            let tests = await getAllTests()
            if (eval(testid)) {
                setFilterFn({
                        fn: items => {
                            return items.filter(x => x.id === testid)
                        }
                    }
                )
            }
            const ts = tests.map(x => ({
                    ...x,
                    print_wrong: x.print_wrong < 0 ? <CheckIcon fontSize='medium'/> : '',
                    print_answer: x.print_answer < 0 ? <CheckIcon fontSize='medium'/> : '',
                    oneshot: x.oneshot < 0 ? <CheckIcon fontSize='medium'/> : '',
                    retain: x.retain < 0 ? <CheckIcon fontSize='medium'/> : ''
                }
            ))
            setRecords(ts)
        }
        ,
        [refreshRecords]
    )
    ;

    const handleSearch = e => {
        let target = e.target
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (test, resetForm) => {
        insertOrUpdateTest(test, {isEdit}).then()
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRefreshRecords((num) => ++num)
        setIsEdit("false")
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
                        placeholder={"테스트"}
                    />
                    <Typography
                        variant="h3">
                        테스트
                    </Typography>

                    <Grid ref={terry} style={{display: 'none'}} item xs={1}>
                        <label htmlFor="terry">그림</label>
                        <input
                            type="file"
                            name="terry"
                            id="terry"
                            multiple
                            onChange={uploadImages}
                            title="그림 선택"
                            accept="image/*"
                        />
                    </Grid>
                    <Grid ref={aud} style={{display: 'none'}} item xs={1}>
                        <label htmlFor="aud">오디오</label>
                        <input
                            type="file"
                            name="aud"
                            id="aud"
                            multiple
                            onChange={uploadAudio}
                            title="오디오 선택"
                            accept="audio/*"
                        />
                    </Grid>
                    <Controls.Button
                        text="테스트 추가"
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
                                                <Tooltip title="변집" placement="top">
                                                    <EditOutlinedIcon fontSize="small"/>
                                                </Tooltip>
                                            </Controls.ActionButton>

                                            <Controls.ActionButton
                                                color="tertiary"
                                                onClick={() => {
                                                    history.push(`/qs/${item.id}/${item.name}`);
                                                }}
                                            >
                                                <Tooltip title="문재들 추가/변집" placement="top">
                                                    <DvrIcon/>
                                                </Tooltip>
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="quaternary"
                                                onClick={() => {
                                                    history.push(`/testAlloc/` + item.id + "/null");
                                                }}
                                            >
                                                <Tooltip title="해당 반" placement="top">
                                                    <PeopleIcon/>
                                                </Tooltip>
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="quinternary"
                                                onClick={async () => {
                                                    const images = await checkTestImages(item.id)
                                                    if (images === "yes") {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: '미디어를 업로드하시겠습니까?',
                                                            subTitle: '업로드 해야 할 이미지가 없습니다.',
                                                            onConfirm: () => {
                                                                console.log(terry.current.style)
                                                                terry.current.style.display = "inline"
                                                                setConfirmDialog({
                                                                    ...confirmDialog,
                                                                    isOpen: false
                                                                })
                                                            }
                                                        })
                                                    }
                                                    if (images === "no") {
                                                        // setConfirmDialog({
                                                        //     isOpen: true,
                                                        //     title: 'Do you want to upload media?',
                                                        //     subTitle: 'Images for this test are not yet on the server',
                                                        //     onConfirm: () => {
                                                        terry.current.style.display = "inline"
                                                        // setConfirmDialog({
                                                        //     ...confirmDialog,
                                                        //     isOpen: false
                                                        // })
                                                        // }
                                                        // })
                                                    }
                                                    aud.current.style.display = "inline"
                                                }}
                                            >
                                                <Tooltip title="그림/오디오 업로드" placement="top">
                                                    <AddPhotoAlternateIcon/>
                                                </Tooltip>
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: '이 테스트를 삭제하시겠습니까?',
                                                        subTitle: '앞으로 이 테스트를 복원할 수 없습니다.',
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
