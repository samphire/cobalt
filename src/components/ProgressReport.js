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


export default function ProgressReport() {
    const [data, setData] = useState([]);
    const [myClass, setClass] = useState(14);

    useEffect(async () => {
        const result = await bob(myClass);
        setData(result);
    }, [])

    const handleChange = async (e) => {
        setClass(e.target.value);
        const result = await bob(e.target.value);
        setData(result);
    };

    return (
        <>
            <h1>Progress Report</h1>
            <div id='select'>
                <FormControl >
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
            <TableContainer component={Paper}>
                <Table sx={{maxWidth: 900, margin: 'auto'}} size="small" aria-label="a dense table">
                    <TableHead sx={{backgroundColor: "#444"}}>
                        <TableRow sx={{color: "white"}}>
                            <TableCell sx={{color: "white"}}>name</TableCell>
                            <TableCell sx={{color: "white"}}><BatteryFullIcon/></TableCell>
                            <TableCell sx={{color: "white"}}><BatteryCharging50Icon/></TableCell>
                            <TableCell sx={{color: "white"}}>Avg Rep</TableCell>
                            <TableCell sx={{color: "white"}}>Word Score</TableCell>
                            <TableCell sx={{color: "white"}}>구구단</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => {
                            item.MathPerc = item.MathPerc > 100 ? 100 : item.MathPerc;
                            item.avgRepnum = Math.round(item.avgRepnum * 100) / 100;
                            return (

                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} key={item.id}>
                                    <TableCell sx={{fontWeight: 800}}>{item.name}</TableCell>
                                    <TableCell>{item.numLearned}</TableCell>
                                    <TableCell>{item.numLearning}</TableCell>
                                    <TableCell>{item.avgRepnum > 0 ? item.avgRepnum : ''}</TableCell>
                                    <TableCell>{item.wordscore}</TableCell>
                                    <TableCell>
                                        <Box sx={{position: 'relative', display: 'inline-flex'}}>
                                            <CircularProgress color='success' variant='determinate'
                                                              value={item.MathPerc}/>
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
                                                <Typography variant='caption' component='div' color='text.secondary'>
                                                    {item.MathPerc}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}


async function bob(myClass) {
    let responseObj = await fetch('showProgress.php?classid=' + myClass, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain'
        }
    });
    let responseText = await responseObj.text();
    // console.log(responseText);
    const myArr = JSON.parse(responseText);
    console.log(myArr);
    return myArr;
}
