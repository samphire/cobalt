import React from 'react';
import {AppBar, Grid, makeStyles, Toolbar} from "@material-ui/core";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const myDir = process.env.REACT_APP_DIR

const useStyles = makeStyles(theme => ({
    logout: {
        fontSize: '2rem',
        '&:hover': {
            cursor: 'pointer'
        },
        padding: 0,
        margin: 0
    },
    Toolbar: {
        fontFamily: 'Nunito, sans-serif',
        backgroundColor: '#1976d2',
        color: 'white',
        '& a':{
            color: 'white',
            padding: '30px'
        },
        '& a:hover':{
            color: 'orange'
        }
    }
}))

function Header(props) {
    const logout = props.clicko
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar className={classes.Toolbar}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item onClick={logout} className={classes.logout} xs={1}>
                        <EmojiPeopleIcon fontSize="large"/> Logout
                    </Grid>
                    <Grid item xs={3}/>
                    <Grid item xs={1}><a href={myDir + "/students"}>Students</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/classes"}>Classes</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/tests"}>Tests</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/studAlloc"}>Class Allocs</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/testAlloc"}>Test Allocs</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/progress"}>Progress Report</a></Grid>
                    <Grid item xs={3}/>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
