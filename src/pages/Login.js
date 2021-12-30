import React, {useState} from 'react';
import {Avatar, Button, Checkbox, Grid, Link, Typography, Paper} from "@mui/material";
import {FormControlLabel, makeStyles, TextField} from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const useStyles = makeStyles(theme => ({
    gridStyle: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center'
    },
    paperStyle: {
        padding: theme.spacing(2),
        width: 280,
        margin: '-40px auto 0 auto',
        opacity: 0.7,
        '& .MuiAvatar-root': {
            backgroundColor: '#0d0'
        },
        '& .MuiButton-root': {
            margin: '8px 0',
            fontSize: "1.3rem"
        },
        '& .MuiInputBase-root, .MuiFormLabel-root':{
        fontSize: "14px"
        },
        '& .MuiFormControlLabel-label':{
            fontSize: "1.2rem"
        },
        '& .MuiSvgIcon-root':{
            width: "20px",
            height: "20px"
        }
    },
    avatarStyle: {
        backgroundColor: '#0e0',
    },
    checkBoxStyle: {
        margin: theme.spacing(1),
        width: "50px"
    }
}));

export default function Login(props) {

    const loginFn = props.clicko;
    const classes = useStyles();
    const [values, setValues] = useState({user: '', pass: ''})
    const [remember, setRemember] = useState(false)

    const handleChange = (e, type) => {
        if (type === 'user') {
            setValues({
                ...values,
                user: e.target.value
            })
        } else {
            setValues({
                ...values,
                pass: e.target.value,
            })
        }
    }

    const handleCheck = (e) => {
        setRemember(!remember)
    }

    const login = () => {
        if (values.user === 'matt' && values.pass === 'rahab123') {
            loginFn(true);
        } else {
            alert('username or password is incorrect!')
            return
        }
        if(remember){
            localStorage.setItem('user', values.user);
            localStorage.setItem('pass', values.pass);
        }
    }

    return (
        <Grid className={classes.gridStyle}>
            <Paper elevation={10} className={classes.paperStyle}>
                <Grid align='center'>
                    <Avatar className={classes.avatarStyle}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField
                    label='Username'
                    placeholder='Enter username'
                    fullWidth
                    required
                    value={values.user}
                    onChange={(e) => handleChange(e, 'user')}
                />
                <TextField
                    label='Password'
                    placeholder='Enter password'
                    fullWidth
                    required
                    type='password'
                    value={values.pass}
                    onChange={(e) => handleChange(e, 'pass')}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name='checkedB'
                            color='primary'
                            value={remember}
                            onChange={handleCheck}
                            className={classes.checkBoxStyle}
                        />
                    }
                    label='Remember me'
                />
                <Button type='submit'
                        color='primary'
                        fullWidth
                        disableElevation
                        variant='contained'
                        onClick={login}
                >Sign in</Button>
                <Typography>
                    <Link href="#">
                        Forgot Password?
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}
