import React, {useEffect, useState} from 'react';

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

    useEffect(async () => {
        const result = await bob();
        setData(result);
    }, [])

    return (
        <>
            <h1>Progress Report</h1>
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
                                    <TableCell>{item.name}</TableCell>
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


async function bob() {
    let responseObj = await fetch('https://notborder.org/scopic/showProgress.php', {
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
