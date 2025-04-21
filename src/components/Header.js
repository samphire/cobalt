import React from 'react';
import {AppBar, Grid, makeStyles, Toolbar, Button, Menu, MenuItem} from "@material-ui/core";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const myDir = process.env.REACT_APP_DIR;

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
        '& a': {
            color: 'white',
            padding: '20px',
            fontSize: '1rem'  // adjust this as needed to match your design
        },
        '& a:hover': {
            color: 'orange'
        }
    },
    menuButton: {
        color: 'white',
        fontSize: '1rem',  // This ensures the Button text matches the anchor links
        textTransform: 'none'  // Optional: disables uppercase styling if not desired
    }
}));

function Header(props) {
    const logout = props.clicko;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar className={classes.Toolbar}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item onClick={logout} className={classes.logout} xs={2}>
                        <EmojiPeopleIcon fontSize="large"/> Logout
                    </Grid>
                    <Grid item xs={2}/>

                    {/* Pull-down menu for 학생 관리 */}
                    <Grid item>
                        <Button
                            aria-controls="student-menu"
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                            className={classes.menuButton}
                        >
                            학생 관리
                        </Button>
                        <Menu
                            id="student-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            PaperProps={{style: {marginTop: '12px', marginLeft: '-30px'}}}
                        >
                            <MenuItem
                                onClick={handleMenuClose}
                                component="a"
                                href={myDir + "/students"}
                            >
                                학생
                            </MenuItem>
                            <MenuItem
                                onClick={handleMenuClose}
                                component="a"
                                href={myDir + "/classes"}
                            >
                                반
                            </MenuItem>
                            <MenuItem
                                onClick={handleMenuClose}
                                component="a"
                                href={myDir + "/studAlloc"}
                            >
                                반 할당
                            </MenuItem>
                        </Menu>
                    </Grid>

                    <Grid item xs={1}>
                        <a href={myDir + "/tests"}>테스트</a>
                    </Grid>
                    <Grid item xs={1}>
                        <a href={myDir + "/testAlloc"}>테스트 할당</a>
                    </Grid>
                    <Grid item xs={1}>
                        <a href={myDir + "/progress"}>성능</a>
                    </Grid>
                    <Grid item xs={1}>
                        <a href={myDir + "/ReaderAlloc"}>리더 할당</a>
                    </Grid>
                    <Grid item xs={1}>
                        <a href={myDir + "/Reports"}>Reports</a>
                    </Grid>
                    <Grid item xs={1}>
                        <a href={myDir + "/ClassNotes"}>ClassNotes</a>
                    </Grid>
                    <Grid item xs={1}>
                        <a href={myDir + "/WordEntry"}>Word Entry</a>
                    </Grid>
                    <Grid item xs={2}/>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
