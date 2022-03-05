import React from 'react';
import {AppBar, Grid, makeStyles, Toolbar} from "@material-ui/core";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

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
        backgroundColor: '#1976d2',
        color: 'white'
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
                    <Grid item xs={1}><a href="/cobalt/q">Question Maker</a></Grid>
                    {/*<Grid item xs={1}><a href="/cobalt/qs/:testid">Questions</a></Grid>*/}
                    <Grid item xs={1}><a href="/cobalt/progress">Progress Report</a></Grid>
                    <Grid item xs={1}><a href="/cobalt/students">Students</a></Grid>
                    <Grid item xs={1}><a href="/cobalt/tests">Tests</a></Grid>
                    <Grid item xs={1}><a href="/cobalt/classes">Classes</a></Grid>
                    <Grid item xs={3}/>

                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
