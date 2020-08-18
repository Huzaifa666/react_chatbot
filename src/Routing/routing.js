import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import Dashboard from "../Dashboard/dashboard";
const routing = (
    <Router>
        <div>
            <Route path="/" component={App} />
            <Route path="/dashboard" component={Dashboard} />
        </div>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'));