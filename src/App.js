import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import ProgressReport from "./components/ProgressReport";
import Students from "./pages/Students/Students";
import Login from "./pages/Login"
import Header from "./components/Header";
import Questions from "./pages/Questions/Questions"
import Tests from "./pages/Tests/Tests";
import Classes from "./pages/Classes/Classes"
import TestAlloc from "./pages/TestAlloc/TestAlloc"
import StudAlloc from "./pages/StudAlloc/StudAlloc"
import Register from "./Register"

const myDir = process.env.REACT_APP_DIR

function App() {

    const [isLoggedin, setIsLoggedin] = useState(false);

    const login = () => {
        setIsLoggedin(true);
    }

    function logout() {
        // window.confirm("Are you sure you want to logout and remove all local storage?");
        setIsLoggedin(false)
        localStorage.clear()
        sessionStorage.clear()
    }

    const [cunt, setCunt] = useState(0)

    const showReg = () => {
        setCunt(cunt === 99 ? 10 : 99)
    }

    if (isLoggedin || sessionStorage.getItem("login") === "true") {

        return (
            <div className="App">
                <Header clicko={logout}/>

                <BrowserRouter>
                    <Switch>
                        <Route path={myDir + "/qs/:testid"}>
                            <Questions/>
                        </Route>
                        <Route path={myDir + "/studAlloc"}>
                            <StudAlloc/>
                        </Route>
                        <Route path={myDir + "/testAlloc/:testid/:classid"}>
                            <TestAlloc/>
                        </Route>
                        <Route path={myDir + "/tests/:testid"}>
                            <Tests/>
                        </Route>
                        <Route path={myDir + "/testAlloc"}>
                            <TestAlloc/>
                        </Route>
                        <Route path={myDir + "/progress"}>
                            <ProgressReport/>
                        </Route>
                        <Route path={myDir + "/students/:barley"}>
                            <Students/>
                        </Route>
                        <Route path={myDir + "/students"}>
                            <Students/>
                        </Route>
                        <Route path={myDir + "/tests"}>
                            <Tests/>
                        </Route>
                        <Route path={myDir + "/classes"}>
                            <Classes/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    } else {
        return (
            <>
                <Login clicko={login} showReg={showReg} disp={cunt}/>
                <Register
                    showReg={showReg}
                    disp={cunt}
                />
            </>
        )
    }
}

export default App;
