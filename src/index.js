
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './home/index.jsx';
import Layout from '../components/Layout';
import RouteConfig from "../core/routeConfig";

const PrimaryLayout = () => (
    <div className="primary-layout">
        <Layout>
            <Route path="/" component={Home} onEnter={_onEnter} onChange={_onEnter}>
                {/* 主页面 */}
                {/* <Route path="/" exact component={Home} /> */}
                {/* 功能页面 */}
                {RouteConfig()}
            </Route>
        </Layout>
    </div>
)

function _onEnter(nextState, replaceState, callback) {
    debugger
}

const Index = () => (
    <Router>
        <PrimaryLayout />
    </Router>
);

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);