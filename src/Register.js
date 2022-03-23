import React, {useRef, useState, useEffect} from 'react'
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {makeStyles} from "@material-ui/core";
import Button from './components/controls/Button'
import {registerUser} from "./services/credentials"

const useStyles = makeStyles(theme => ({
        section: {
            width: '100%',
            maxWidth: '420px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '1rem',
            backgroundColor: 'rgba(0,0,0,0.7)',
            margin: 'auto',
            fontSize: '22px',
            fontFamily: 'Nunito, sans-serif',
            color: '#fff',
            '& h1': {
                color: '#fff'
            },
            '& a': {
                textDecoration: 'underline',
                color: '#88f',

            },
            '& a:hover': {
                color: '#55f'
            }
        },

        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            flexGrow: 1,
            paddingBottom: '1rem'
        },
        bob: {
            padding: '0.25rem',
            borderRadius: '0.2rem'
        },
        sally: {
            marginTop: '1rem'
        },
        instructions: {
            fontSize: '0.9rem',
            borderRadius: '0.5rem',
            background: '#000',
            color: '#fff',
            padding: '0.25rem',
            position: 'relative',
            bottom: '-10px'
        },
        offscreen: {
            position: "absolute",
            left: '-9999px'
        },
        errMsg: {
            backgroundColor: 'lightpink',
            color: 'firebrick',
            fontWeight: 'bold',
            padding: '0.5rem',
            marginBottom: '0.5rem'
        },
        valid: {
            color: 'limegreen',
            marginLeft: '0.25rem'
        },
        hide: {
            display: 'none'
        }
    })
)

export default function Register(props) {

    const classes = useStyles()

    const disp = props.disp
    const showReg = props.showReg

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
    const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[-_!@#$%]).{6,24}$/

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)
    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)
    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(`new user: ${user} : ${pwd}`)
        const response = await registerUser([user, pwd])
        console.log(response)
        setSuccess(true)
    }

    return (
        <div style={(disp === 99 ? {
            display: 'flex',
            position: 'relative',
            height: '100vh',
            alignItems: 'center'
        } : {display: 'none', position: 'absolute'})}>
            {success ? (
                <section className={classes.section}>
                    <h1>Success!</h1>
                    <p style={{textAlign: 'center'}}>
                        <a href="#" onClick={() => showReg()}>Sign In</a>
                    </p>
                </section>
            ) : (
                <section className={classes.section}>
                    <p ref={errRef} className={errMsg ? classes.errMsg : classes.offscreen}
                       aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <label htmlFor="username" className={classes.sally}>
                            Username:
                            <span className={validName ? classes.valid : classes.hide}>
                        <CheckIcon color="success"/>
                    </span>
                            <span className={validName || !user ? classes.hide : classes.valid}>
                        <CloseIcon sx={{color: "#d03"}}/>
                    </span>
                        </label>
                        <input
                            className={classes.bob}
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote"
                           className={userFocus && user && !validName ? classes.instructions : classes.offscreen}>
                            <InfoIcon color="success"/>
                            &nbsp;&nbsp;&nbsp;4 to 24 characters.<br/>
                            You can use letters, numbers, underscores and hyphens.
                        </p>


                        <label htmlFor="password" className={classes.sally}>
                            Password:
                            <span className={validPwd ? classes.valid : classes.hide}>
                        <CheckIcon color="success"/>
                    </span>
                            <span className={validPwd || !pwd ? classes.hide : classes.valid}>
                        <CloseIcon sx={{color: "#d03"}}/>
                    </span>
                        </label>
                        <input
                            className={classes.bob}
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? classes.instructions : classes.offscreen}>
                            <InfoIcon color="success"/>
                            &nbsp;&nbsp;&nbsp;6 to 24 characters.<br/>
                            You must use at least one letter, one number and a special character: -, _, !, #, %, @, $
                        </p>


                        <label htmlFor="confirm_pwd" className={classes.sally}>
                            Confirm Password:
                            <span className={validMatch && matchPwd ? classes.valid : classes.hide}>
                        <CheckIcon color="success"/>
                    </span>
                            <span className={validMatch || !matchPwd ? classes.hide : classes.valid}>
                        <CloseIcon sx={{color: "#d03"}}/>
                    </span>
                        </label>
                        <input
                            className={classes.bob}
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmNote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmNote"
                           className={matchFocus && !validMatch ? classes.instructions : classes.offscreen}>
                            <InfoIcon color="success"/>
                            &nbsp;&nbsp;&nbsp;Passwords must match
                        </p>
                        <Button disabled={!validName || !validPwd || !validMatch ? true : false}
                                text="Sign Up"
                                type="submit"
                        />
                    </form>
                    <p>
                        Already registered?<br/>
                        <span className={classes.sally}>
                {/*    put router link here  */}
                            <a href="#" onClick={() => showReg()}>Sign In</a>
                </span>
                    </p>
                </section>)
            }
        </div>
    )
}
