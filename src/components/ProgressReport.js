import React, {useEffect, useState} from 'react';
import {FormControl, Select, MenuItem, InputLabel} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
import CircularProgress from '@mui/material/CircularProgress';
import './ProgressReport.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {getBreakdown} from "../services/dataService";
import Dialog from "@material-ui/core/Dialog"
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";


export default function ProgressReport() {
    const [data, setData] = useState([]);
    const [myClass, setClass] = useState(14);
    const [open, setOpen] = useState(false);
    const [testData, setTestData] = useState([]);

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(async () => {
        const result = await bob(myClass);
        setData(result);
    }, [])

    const handleChange = async (e) => {
        setClass(e.target.value);
        const result = await bob(e.target.value);
        setData(result);
    };

    const getStuff = (e) => {
        let stuffArr = Array();
        getBreakdown(e.target.dataset.studid, e.target.dataset.classid).then((data) => {
            // console.log(data);
            data.map((item, idx) => {
                // stuffArr.push(item.id + ", " + item.name + ", " + item.oneshot + ", " + item.score);
                stuffArr.push(item);
            });
        }).then(() => {
            setTestData(stuffArr);
            // console.log(stuffArr);
            setOpen(true);
        });
    };

    return (
        <>
            <h1>Progress Report</h1>
            <div id='select'>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={myClass}
                        onChange={handleChange}
                    >
                        <MenuItem value={14}>중등반</MenuItem>
                        <MenuItem value={16}>고등반</MenuItem>

                    </Select>
                </FormControl>
            </div>

            <Dialog
                open={open}
                onclose={handleClose}
                aria-labelledby="alert-dialog-title">
                <DialogTitle sx={{fontSize: '18px', fontWeight: 'bold'}}>
                    Individual Test Results
                </DialogTitle>
               <DialogContent sx={{fontSize: '14px'}}>
                   {console.log("printing item")}
                   {testData.map((item)=>{
                       console.log(item);
                       return(
                           item.oneshot === "-1" ?  (
                               <div style={{color: '#00F'}}>{item.id}: {item.name}, {item.score != null ? item.score : 'no-show'}</div>) : (
                               <div>{item.id}: {item.name}, {item.score != null ? item.score : 'no-show'}</div>)
                           )})}

               </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} autofocus>
                        Close
                    </Button>

                </DialogActions>
            </Dialog>

            <TableContainer sx={{width: "fit-content", margin: "auto", backgroundColor: "ivory-"}} component={Paper}>
                <Table sx={{maxWidth: "700px", fontSize: "14px"}} size="small" aria-label="a dense table">
                    <TableHead sx={{backgroundColor: "#444"}}>
                        <TableRow sx={{color: "white"}} onClick={() => {
                            console.log('hello from click handler on row')
                        }}>
                            {/*<TableCell sx={{color: "white"}}>name</TableCell>*/}
                            {/*<TableCell sx={{color: "white"}}><BatteryFullIcon/></TableCell>*/}
                            {/*<TableCell sx={{color: "white"}}><BatteryCharging50Icon/></TableCell>*/}
                            {/*<TableCell sx={{color: "white"}}>Avg Rep</TableCell>*/}
                            {/*<TableCell sx={{color: "white"}}>Word Score</TableCell>*/}
                            {/*<TableCell sx={{color: "white"}}>구구단</TableCell>*/}
                            <TableCell sx={{color: "white", width: "10%", fontSize: "16px"}}>Name</TableCell>
                            <TableCell sx={{color: "white", width: "10%", fontSize: "16px"}}>Tests</TableCell>
                            <TableCell sx={{color: "white", width: "10%", fontSize: "16px"}}>구구단</TableCell>
                            <TableCell sx={{color: "white", width: "10%", fontSize: "16px"}}>Words</TableCell>
                            <TableCell sx={{color: "white", width: "10%", fontSize: "16px"}}>WordTests</TableCell>
                            <TableCell sx={{color: "white", width: "10%", fontSize: "16px"}}>TOTAL</TableCell>
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
                                               sx={{fontWeight: "bold", fontSize: "14px", lineHeight: "0.23", cursor: "zoom-in"}}
                                               onClick={(e) => {
                                                   getStuff(e)
                                               }}>{item.avgscore}</TableCell>
                                    <TableCell sx={{fontSize: "14px", lineHeight: "0.23"}}>{item.math}</TableCell>
                                    <TableCell sx={{fontSize: "14px", lineHeight: "0.23"}}>{item.word}</TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: "14px",
                                            lineHeight: "0.23"
                                        }}>{item.activity > 0 ? item.activity : ''}</TableCell>
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
    )
        ;
}

async function bob(myClass) {
    let responseObj = await fetch('showProgress.php?classid=' + myClass, {
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
        item.total = item.total > 0 ? item.total : Math.round((item.avgscore + item.word + item.math + item.activity) / 4)
    });

    //TODO don't need to calculate total in the php file, offload this to clients.

    const classTotal = myArr.reduce((acc, el) => acc + el.total, 0);
    console.log("class total is " + classTotal);
    const classAvg = classTotal / myArr.length;
    console.log("class average is " + classAvg);
    console.log(myArr);
    progress(classAvg);
    return myArr;
}

function progress(percent) {
    let col;
    // Date value
    const day = 1000 * 60 * 60 * 24;
    const now = new Date();
    const startDate = new Date("2021-09-01");
    const endDate = new Date("2021-12-25");
    const diff = Math.ceil((endDate - startDate) / day);
    const timeProg = Math.ceil((((now - startDate) / day) / diff) * 100);

    console.log("timeprog is " + timeProg);

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
