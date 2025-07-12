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

const myDir = process.env.REACT_APP_DIR

function App() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        const logged = localStorage.getItem("loggedIn") === "true";
        setIsLoggedin(logged);
    }, []);

    const login = () => {
        localStorage.setItem("loggedIn", "true");
        setIsLoggedin(true);
    }

    function logout() {
        setIsLoggedin(false)
        localStorage.clear()
    }

    const toggleRegister = () => setShowRegister(prev => !prev);

    return (
        <BrowserRouter>
            {isLoggedin ? (
                <div className="App">
                    <Header clicko={logout}/>

                    <Switch>
                        <Route path={myDir + "/qs/:testid/:testname"}>
                            <Questions/>
                        </Route>
                        <Route path={myDir + "/studAlloc/:classid"}>
                            <StudAlloc/>
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
                        <Route path={myDir + "/ReaderAlloc"}>
                            <ReaderAllocationPage/>
                        </Route>
                        <Route path={myDir + "/Reports"}>
                            <ReportsFormPage/>
                        </Route>
                        <Route path={myDir + "/ClassNotes"}>
                            <ClassNotesFormPage/>
                        </Route>
                        <Route path={myDir + "/WordEntry"}>
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
