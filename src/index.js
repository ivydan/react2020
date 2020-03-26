
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RouteConfig from "../core/routeConfig";
import Home from './home/index.jsx';
import Layout from '../components/Layout';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

ReactDOM.render(
    <RouteConfig />,
    document.getElementById('root')
);