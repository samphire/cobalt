import React, {useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Testmaker from './components/Testmaker'
import Questionmaker from "./components/Questionmaker";
import Studentmaker from "./components/Studentmaker";
import ProgressReport from "./components/ProgressReport";
import Students from "./pages/Students/Students";
import Login from "./pages/Login"
import Header from "./components/Header";

//global urls
// const globalURL = "http://localhost/cobalt";
const globalURL = "https://notborder.org/cobalt"


function App() {

    const [isLoggedin, setIsLoggedin] = useState(false);
    useEffect(() => {
        return () => {
            alert('login status changed')
        };
    }, [isLoggedin]);

    const login = () => {
        setIsLoggedin(true);
    }

    function logout() {
        window.confirm("Are you sure you want to logout and remove all local storage?");
        setIsLoggedin(false);
        localStorage.clear();
    }

    if (isLoggedin || (localStorage.getItem('user') === 'matt' && localStorage.getItem('pass') === 'rahab123')) {
        return (
            <div className="App">
                <Header clicko={logout}/>
                <nav>
                    <ul>
                        <li className={'myNav'}><a href={globalURL + '/q'}>Question Maker</a></li>
                        <li><a href="/cobalt/t">Test Maker</a></li>
                        <li><a href="/cobalt/s">Student Maker</a></li>
                        <li><a href="/cobalt/progress">Progress Report</a></li>
                        <li><a href="/cobalt/students">Students</a></li>
                    </ul>
                </nav>
                <BrowserRouter>
                    <Switch>
                        <Route path="/cobalt/q">
                            <Questionmaker/>
                        </Route>
                        <Route path="/cobalt/t">
                            <Testmaker/>
                        </Route>
                        <Route path="/cobalt/s">
                            <Studentmaker/>
                        </Route>
                        <Route path="/cobalt/progress">
                            <ProgressReport/>
                        </Route>
                        <Route path="/cobalt/students">
                            <Students/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    } else {
        return <Login clicko={login}/>
    }
}

export default App;
