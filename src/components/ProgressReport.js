import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    TableCell,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Dialog,
    DialogContent,
    DialogTitle,
    Paper,
    Typography,
    Box,
    CircularProgress
} from "@mui/material";

import {getVocaTestDue, getBreakdown} from "../services/dataService";
import {getAllClasses} from '../services/classService'
import './ProgressReport.css';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

export default function ProgressReport() {
    const [data, setData] = useState([]);
    const [myClass, setClass] = useState(
        {classid: '1', name: 'high class 1', start: '2021-09-01', end: '2021-12-20'}
    );
    const [open, setOpen] = useState(false);
    const [vocaOpen, setVocaOpen] = useState(false);
    const [testData, setTestData] = useState([]);
    const [vocadueData, setVocadueData] = useState([]);
    const [classList, setClassList] = useState([{
        id: 16,
        name: '고등반',
        start: '2022-03-14',
        end: '2022-06-18'
    }])

    const handleClose = () => {
        setOpen(false);
    }
    const handleVocaClose = () => setVocaOpen(false);

    useEffect(async () => {
        const classInfo = await getAllClasses()
        console.log('class info: ')
        console.log(classInfo)
        setClassList(classInfo)
        setClass(classInfo[3])
        const result = await bob(myClass);
        setData(result);
    }, [])

    useEffect(() => {
        if (vocaOpen) {
            const timer = setTimeout(() => {
                handleVocaClose();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [vocaOpen, handleVocaClose]);

    const handleChange = async (e) => {
        const classStuff = JSON.parse(e.target.value)
        console.log('classStuff: ')
        console.log(classStuff)
        setClass(classStuff);
        console.log(classStuff.classid)
        const result = await bob(classStuff);
        setData(result);
    };

    const getStuff = (e) => {
        let stuffArr = [];
        getBreakdown(e.target.dataset.studid, e.target.dataset.classid).then((data) => {
            // console.log(data);
            data.map((item) => {
                stuffArr.push(item);
            });
        }).then(() => {
            setTestData(stuffArr);
            // console.log(stuffArr);
            setOpen(true);
        });
    };

    const getVocaStuff = (e) => {
        getVocaTestDue(e.target.dataset.studid).then((data) => {
            console.log("voca due is " + data);
            setVocadueData(data);
            setVocaOpen(true);
        })
    }

    return (
        <>
            <h1>Progress Report</h1>
            <div id='select'>
                <FormControl>
                    <InputLabel
                        id="demo-simple-select-label"
                        sx={{fontSize: 18}}
                    >
                        Class
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={myClass.classname}
                        onChange={handleChange}
                        sx={{'& .MuiSelect-select': {fontSize: 18}}}
                    >
                        {
                            classList.map((el) => {
                                return (
                                    <MenuItem value={JSON.stringify({
                                        classid: el.id,
                                        classname: el.name,
                                        start: el.session_start,
                                        end: el.session_end
                                    })}>{el.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>

            <Dialog
                sx={{fontSize: 18}}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title">
                <DialogTitle sx={{fontSize: 18, fontWeight: 'bold'}}>
                    개인 테스트 점수
                </DialogTitle>
                <DialogContent>
                    {testData.map((item) => {
                        console.log(item);
                        // id, name, oneshot, score, start, finish
                        const itemStartDate = new Date(item.start);
                        const itemEndDate = new Date(item.finish);
                        const now = new Date();

                        return (
                            now > itemEndDate ? (
                                <div style={{color: '#c8ad9d'}}>
                                    {item.id}: {item.name}, {item.score != null ? item.score : 'no-show'}
                                </div>
                            ) : now < itemStartDate ? (
                                <div style={{color: '#a1a7cf'}}>
                                    {item.id}: {item.name}, {item.score != null ? item.score : 'no-show'}
                                </div>
                            ) : (
                                <div style={{color: '#1c7a02'}}>
                                    {item.id}: {item.name}, {item.score != null ? item.score : 'no-show'}
                                </div>
                            )
                        );
                    })}
                </DialogContent>
            </Dialog>

            <Dialog
                open={vocaOpen}
                // onClose={handleVocaClose()}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle sx={{fontSize: '18px', fontWeight: 'bold'}}>
                    {vocadueData}
                </DialogTitle>
            </Dialog>

            <TableContainer sx={{width: "fit-content", margin: "auto", backgroundColor: "ivory"}}
                            component={Paper}>
                {/*<Table sx={{maxWidth: "700px", fontSize: "14px"}} size="small" aria-label="a dense table">*/}
                <Table
                    size="small"
                    aria-label="a dense table"
                    sx={{
                        maxWidth: 700,
                        fontSize: 24,
                        '& thead th': {
                            color: 'white',
                            fontSize: 16,
                            width: '10%',
                            bgcolor: '#333'
                        },
                        '& tbody tr:hover': {
                            backgroundColor: '#00fbf2',
                            cursor: 'pointer'
                        }
                    }}
                >
                    <TableHead>
                        <TableRow onClick={() => {
                            console.log('hello from click handler on row')
                        }}>
                            <TableCell>학생</TableCell>
                            <TableCell>테스트</TableCell>
                            <TableCell>구구단</TableCell>
                            <TableCell>어휘</TableCell>
                            <TableCell>연습</TableCell>
                            <TableCell>총</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => {
                            item.MathPerc = item.MathPerc > 100 ? 100 : item.MathPerc;
                            item.avgRepnum = Math.round(item.avgRepnum * 100) / 100;
                            return (
                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} key={item.id}>
                                    <TableCell sx={{
                                        fontSize: "14px",
                                        fontWeight: 800,
                                        lineHeight: "0.23"
                                    }}>{item.name}</TableCell>
                                    <TableCell data-studid={item.id} data-classid={item.classid}
                                               sx={{
                                                   fontWeight: "bold",
                                                   fontSize: "14px",
                                                   lineHeight: "0.23",
                                                   cursor: "zoom-in"
                                               }}
                                               onClick={(e) => {
                                                   getStuff(e)
                                               }}>
                                        {item.avgscore}
                                    </TableCell>
                                    <TableCell
                                        sx={{fontSize: "14px", lineHeight: "0.23"}}>{item.math}</TableCell>
                                    <TableCell
                                        sx={{fontSize: "14px", lineHeight: "0.23"}}>{item.word}</TableCell>
                                    <TableCell data-studid={item.id}
                                               sx={{
                                                   fontSize: "14px",
                                                   lineHeight: "0.23",
                                                   cursor: "zoom-in"
                                               }}
                                               onClick={(e) => {
                                                   getVocaStuff(e)
                                               }}>
                                        {item.activity > 0 ? item.activity : ''}
                                    </TableCell>
                                    <TableCell sx={{lineHeight: "0.23"}}>
                                        <Box sx={{position: 'relative', display: 'inline-flex'}}>
                                            <CircularProgress color='success' variant='determinate'
                                                              value={item.total}/>
                                            <Box sx={{
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                position: 'absolute',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'black',
                                                backgroundColor: ''

                                            }}>
                                                <Typography fontSize={"14px"} variant='caption' component='div'
                                                            color='text.secondary'>
                                                    {item.total}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <div id={"progressBarContainer"}>
                    <div className={"progbar"}>
                        <div id={"progressBarData"}/>
                    </div>
                    <div className={"progbar"}>
                        <div id={"progressBarTime"}/>
                    </div>
                </div>
            </TableContainer>
        </>
    );
}

async function bob(myClass) {

    console.log('bobs myClass: ')
    console.log(myClass)

    let responseObj = await fetch(`${SERVER_URL}/showProgress.php?classid=${myClass.classid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain'
        }
    });
    let responseText = await responseObj.text();
    console.log(responseText);
    const myArr = JSON.parse(responseText);

    myArr.map((item) => {
        console.log("treating array");
        console.log(item);
        item.numLearned = item.numLearned === null ? 0 : parseInt(item.numLearned);
        item.numLearning = item.numLearning === null ? 0 : parseInt(item.numLearning);
        item.avgRepnum = item.avgRepnum === null ? 0 : parseInt(item.avgRepnum);
        item.MathPerc = item.MathPerc === null ? 0 : parseInt(item.MathPerc);
        item.wordscore = item.wordscore === null ? 0 : parseInt(item.wordscore);
        item.avgscore = item.avgscore === null ? 0 : parseInt(item.avgscore);
        item.word = item.word === null ? 0 : parseInt(item.word);
        item.math = item.math === null ? 0 : parseInt(item.math);
        item.activity = item.activity === null ? 0 : parseInt(item.activity);
        item.total = item.total === null ? 0 : parseInt(item.total);
        item.total = item.total > 0 ? item.total : Math.round((item.avgscore + item.word + item.math + item.activity) / 4) // if total was null
    });

    //TODO don't need to calculate total in the php file, offload this to clients.

    const classTotal = myArr.reduce((acc, el) => acc + el.total, 0); // adds together everybody's total
    const classAvg = classTotal / myArr.length;  // takes the average
    progress(classAvg, myClass.start, myClass.end);  // sets the width and color of the two progress bars
    return myArr;
}

function progress(percent, start, end) {

    console.log(start + ', ' + typeof start)

    let col;
    // Date value
    const day = 1000 * 60 * 60 * 24;
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diff = Math.ceil((endDate - startDate) / day);
    const timeProg = Math.min(100, Math.ceil((((now - startDate) / day) / diff) * 100));  // Math.ceil to prevent the bar overflowing to the right at the end of the session

    // Colors
    let percGood = percent / timeProg;
    if (percGood > 1.2) col = "#44ff4b";
    if (percGood < 1.2) col = "#abce39";
    if (percGood < 1.05) col = "#cecb39";
    if (percGood < 0.9) col = "#ce9c39";
    if (percGood < 0.75) col = "#ce3939";

    const progBarContainer = document.getElementById("progressBarContainer");
    const dataProgbar = document.getElementById("progressBarData");
    const timeProgbar = document.getElementById("progressBarTime");

    let progressBarWidth = percent * progBarContainer.offsetWidth / 100;
    let timeBarWidth = timeProg * progBarContainer.offsetWidth / 100;
    const myStyle = 'width: ' + progressBarWidth + 'px; background-color: ' + col;
    dataProgbar.setAttribute('style', myStyle);
    timeProgbar.setAttribute('style', "width: " + timeBarWidth + "px; background-color: #24507a");
}
