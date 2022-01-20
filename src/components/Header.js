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
        <AppBar position="static" className={classes.fuck}>
            <Toolbar className={classes.Toolbar}>
                <Grid>
                    <div onClick={logout} className={classes.logout}>
                        <EmojiPeopleIcon fontSize="large"/> Logout
                    </div>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
