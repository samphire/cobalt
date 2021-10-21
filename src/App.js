import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Testmaker from './components/Testmaker'
import Questionmaker from "./components/Questionmaker";
import Studentmaker from "./components/Studentmaker";
import ProgressReport from "./components/ProgressReport";

//global urls
// const globalURL = "http://localhost/cobalt";
const globalURL = "https://notborder.org/cobalt"

function App() {
    return (
        <div className="App">
            <nav>
                <ul>
                    <li className={'myNav'}><a href={globalURL + '/q'}>Question Maker</a></li>
                    <li><a href="/cobalt/t">Test Maker</a></li>
                    <li><a href="/cobalt/s">Student Maker</a></li>
                    <li><a href="/cobalt/progress">Progress Report</a></li>
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
                </Switch>
            </BrowserRouter>


        </div>
    );
}

export default App;
