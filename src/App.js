import React, {useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Testmaker from './components/Testmaker'
import Questionmaker from "./components/Questionmaker";
import ProgressReport from "./components/ProgressReport";
import Students from "./pages/Students/Students";
import Login from "./pages/Login"
import Header from "./components/Header";

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
                <nav style={{marginBottom: '20px'}}>
                    <ul>
                        <li className={'myNav'}><a href="/cobalt/q">Question Maker</a></li>
                        <li><a href="/cobalt/t">Test Maker</a></li>
                        <li><a href="/cobalt/progress">Progress Report</a></li>
                        <li><a href="/cobalt/students">Students</a></li>
                        <li><a href="/cobalt/tests">Tests</a></li>
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
                        <Route path="/cobalt/progress">
                            <ProgressReport/>
                        </Route>
                        <Route path="/cobalt/students">
                            <Students/>
                        </Route>
                        {/*<Route path="/cobalt/tests">*/}
                        {/*    <Tests/>*/}
                        {/*</Route>*/}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    } else {
        return <Login clicko={login}/>
    }
}

export default App;
