/*import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "milligram";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from "./App";
import "milligram";
import Dashboard from "./Dashboard/dashboard";
import { Provider } from "react-redux";
import store from "./store";
import Notfound from "./notFound"
import CandidateInfo from "./Candidate/candidateInfo";
import CandidateForm from './Candidate/candidateForm';
import 'semantic-ui-css/semantic.min.css'
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/candidates/:cid" component={CandidateInfo} />
                    <Route path="/candidateform/" component={CandidateForm} />
                    <Route component={Notfound} />
                </Switch>
            </div>
        </Router>
    </Provider>,
    rootElement
);