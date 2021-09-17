import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Testmaker from './components/Testmaker'
import Questionmaker from "./components/Questionmaker";
import Studentmaker from "./components/Studentmaker";

function App() {
    return (
        <div className="App">
            <nav>
                <ul>
                    <li><a href="/optikonTest/q">Question Maker</a></li>
                    <li><a href="/optikonTest/t">Test Maker</a></li>
                    <li><a href="/optikonTest/s">Student Maker</a></li>
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
                </Switch>
            </BrowserRouter>


        </div>
    );
}

export default App;
