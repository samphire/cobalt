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
            padding: '20px'
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
                    <Grid item onClick={logout} className={classes.logout} xs={2}>
                        <EmojiPeopleIcon fontSize="large"/> Logout
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={1}><a href={myDir + "/students"}>학생</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/classes"}>반</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/tests"}>테스트</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/studAlloc"}>반 할당</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/testAlloc"}>테스트 할당</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/progress"}>성능</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/ReaderAlloc"}>리더 할당</a></Grid>
                    <Grid item xs={1}><a href={myDir + "/Reports"}>Reports</a></Grid>
                    <Grid item xs={2}/>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
