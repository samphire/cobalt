import React, {useState} from 'react';
import {Avatar, Button, Checkbox, Grid, Link, Typography, Paper} from "@mui/material";
import {FormControlLabel, makeStyles, TextField} from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {validateUser} from '../services/credentials'

const useStyles = makeStyles(theme => ({
    gridStyle: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center'
    },
    paperStyle: {
        fontFamily: 'Nunito, sans-serif',
        padding: theme.spacing(2),
        width: 280,
        margin: '-40px auto 0 auto',
        opacity: 0.7,
        '& .MuiAvatar-root': {
            backgroundColor: '#0d0'
        },
        '& .MuiButton-root': {
            margin: '12px 0',
            fontSize: "1rem"
        },
        '& .MuiInputBase-root, .MuiFormLabel-root': {
            fontSize: "14px"
        },
        '& .MuiFormControlLabel-label': {
            fontSize: "1rem"
        },
        '& .MuiSvgIcon-root': {
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
    const showReg = props.showReg
    const disp = props.disp

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

    // const handleCheck = (e) => {
    //     setRemember(!remember)
    // }

    const login = async () => {
        const result = await validateUser([values.user, values.pass])
        console.log(`user validation result: `)
        console.log(result)
        // if (values.user === 'matt' && values.pass === 'rahab123') {
        //     loginFn(true);
        // } else {
        //     alert('username or password is incorrect!')
        //     return
        // }

        if (result === "success") {
            window.sessionStorage.setItem("user", values.user)
            window.sessionStorage.setItem("login", "true")
            loginFn(true)
        } else {
            window.alert(result)
            return
        }
        //
        // if (remember) {
        //     localStorage.setItem('user', values.user);
        //     localStorage.setItem('pass', values.pass);
        // }
    }

    return (
        <Grid className={classes.gridStyle} style={{display: (disp === 99 ? 'none' : 'flex')}}>
            <Paper elevation={10} className={classes.paperStyle}>
                <Grid align='center'>
                    <Avatar className={classes.avatarStyle}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <h1>Sign In</h1>
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
                    onKeyPress={(e)=>{
                        if(e.key === 'Enter'){
                            e.preventDefault(); // Ensure it is only this code that runs
                            login().then()
                        }
                    }}
                />
                {/*<FormControlLabel*/}
                {/*    control={*/}
                {/*        <Checkbox*/}
                {/*            name='checkedB'*/}
                {/*            color='primary'*/}
                {/*            value={remember}*/}
                {/*            onChange={handleCheck}*/}
                {/*            className={classes.checkBoxStyle}*/}
                {/*        />*/}
                {/*    }*/}
                {/*    label='Remember me'*/}
                {/*/>*/}
                <Button type='submit'
                        color='primary'
                        fullWidth
                        disableElevation
                        variant='contained'
                        onClick={login}
                >Sign in</Button>
                <Typography>
                    <Link href="#" onClick={() => showReg()}>
                        Not Registered?
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}
