import React from 'react';
import {AppBar, Toolbar} from "@mui/material";
import {makeStyles} from "@mui/styles"
import {Grid} from "@material-ui/core";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const useStyles = makeStyles(theme => ({
    logout: {
        fontSize: '2rem',
        '&:hover':{
            cursor: 'pointer'
        }
    }
}))

function Header(props) {

    const logout = props.clicko
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container>
                    <div onClick={logout} className={classes.logout}>
                        <EmojiPeopleIcon fontSize="large"/> Logout
                    </div>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
