import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Testmaker from './components/Testmaker'
import Questionmaker from "./components/Questionmaker";
import Studentmaker from "./components/Studentmaker";
import ProgressReport from "./components/ProgressReport";

function App() {
    return (
        <div className="App">
            <nav>
                <ul>
                    <li className={'myNav'}><a href="/optikonTest/q">Question Maker</a></li>
                    <li><a href="/optikonTest/t">Test Maker</a></li>
                    <li><a href="/optikonTest/s">Student Maker</a></li>
                    <li><a href="/optikonTest/progress">Progress Report</a></li>
                </ul>
            </nav>
            <BrowserRouter>
                <Switch>
                    <Route path="/optikonTest/q">
                        <Questionmaker/>
                    </Route>
                    <Route path="/optikonTest/t">
                        <Testmaker/>
                    </Route>
                    <Route path="/optikonTest/s">
                        <Studentmaker/>
                    </Route>
                    <Route path="/optikonTest/progress">
                        <ProgressReport/>
                    </Route>
                </Switch>
            </BrowserRouter>


        </div>
    );
}

export default App;
