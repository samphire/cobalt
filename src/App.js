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
import ReaderAllocationPage from "./pages/Readers/ReaderAllocationPage";
import ReportsFormPage from "./pages/Reports/ReportsFormPage";
import WordEntry from "./pages/WordEntry/WordEntry";
import ClassNotesFormPage from "./pages/ClassNotes/ClassNotesFormPage";

function App() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [booting, setBooting] = useState(true);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const ls = localStorage.getItem("loggedIn") === "true";
            const ck = document.cookie.includes("loggedIn=true");
            const final = ls || ck;
            setIsLoggedin(final);
            setBooting(false);
        }, 500);
    }, []);


    useEffect(() => {
        console.log("All cookies:", document.cookie);
        console.log("localStorage keys:", Object.keys(localStorage));
        console.log("loggedIn?", localStorage.getItem("loggedIn"));
    }, []);

    const login = () => {
        localStorage.setItem("loggedIn", "true");
        setIsLoggedin(true);
        document.cookie = "loggedIn=true;path=/";
    }

    function logout() {
        setIsLoggedin(false)
        localStorage.clear()
    }

    const toggleRegister = () => setShowRegister(prev => !prev);

    if (booting) {
        return <div style={{padding: 50}}>🌀 Loading...</div>
    }
    return (
        <BrowserRouter basename={"/cobalt"}>
            {isLoggedin ? (
                <div className="App">
                    <Header clicko={logout}/>

                    <Switch>
                        <Route path={"/qs/:testid/:testname"}>
                            <Questions/>
                        </Route>
                        <Route path={"/studAlloc/:classid"}>
                            <StudAlloc/>
                        </Route>
                        <Route path={"/studAlloc"}>
                            <StudAlloc/>
                        </Route>
                        <Route path={"/testAlloc/:testid/:classid"}>
                            <TestAlloc/>
                        </Route>
                        <Route path={"/tests/:testid"}>
                            <Tests/>
                        </Route>
                        <Route path={"/testAlloc"}>
                            <TestAlloc/>
                        </Route>
                        <Route path={"/progress"}>
                            <ProgressReport/>
                        </Route>
                        <Route path={"/students/:barley"}>
                            <Students/>
                        </Route>
                        <Route path={"/students"}>
                            <Students/>
                        </Route>
                        <Route path={"/tests"}>
                            <Tests/>
                        </Route>
                        <Route path={"/classes"}>
                            <Classes/>
                        </Route>
                        <Route path={"/ReaderAlloc"}>
                            <ReaderAllocationPage/>
                        </Route>
                        <Route path={"/Reports"}>
                            <ReportsFormPage/>
                        </Route>
                        <Route path={"/ClassNotes"}>
                            <ClassNotesFormPage/>
                        </Route>
                        <Route path={"/WordEntry"}>
                            <WordEntry/>
                        </Route>
                    </Switch>
                </div>
            ) : showRegister ? (
                <Register showReg={toggleRegister}/>
            ) : (
                <Login clicko={login} showReg={toggleRegister}/>
            )}
        </BrowserRouter>
    );
}

export default App;
