import React, { lazy } from "react";
import ReactRouter, { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Abc from '../abc';
import About from '../about';
import loadable from "@loadable/component";
import App from '../app';
import Home from '../home';

import DelegateMarkdownLinks from './delegateMarkdownLinks';
import basename from "./basename";
import AsyncComponent from "./asyncComponent";

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
    </header>
    <main>
      <Route path="/" exact component={Home} />
      <Route path="/users" component={App} />
    </main>
  </div>
)

const HomePage =() => <div>Home Page</div>
const UsersPage = () => <div>Users Page</div>

const Index = () => (
  <Router>
    <PrimaryLayout />
  </Router>
)

export default Index;