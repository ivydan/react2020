import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Abc from '../abc';
import About from '../about';
import loadable from "@loadable/component";
import App from '../app';

import DelegateMarkdownLinks from './delegateMarkdownLinks';
import basename from "./basename";
import AsyncComponent from "./asyncComponent";

/*dva官方代码*/
const cached = {}
function registerModel(app, model) {
    model = model.default || model
    if (!cached[model.namespace]) {
        app.model(model)
        cached[model.namespace] = 1
    }
}

/*动态加载封装*/
const AsyncPage = loadable(props => {
    import(/* webpackChunkName: "abc" */ props.component).then((module) => {
        registerModel(props.app, module.default);
        return import(props.component)
    })
})

// const AsyncPage = loadable(() => import(/* webpackChunkName: "abc" */ "../abc"), {
//     fallback: <Loading />
// })

const OtherComponent = loadable(() => import(/* webpackChunkName: "abc" */ '../abc'), {
    fallback: <Loading />
})

const LazyAbc = lazy(() => import(/* webpackChunkName: "abc" */ '../abc'), {
    fallback: <Loading />
});


const Search = AsyncComponent(() => import(/* webpackChunkName: "abc" */ '../abc'))

function Loading(params) {
    return (
        <div>
            loading.....
        </div>
    )
}

function MyComponent() {
    return (
        <div>
            <OtherComponent />
        </div>
    )
}


export default function Main() {
    return (
        <Router basename={basename}>
            {/* <DelegateMarkdownLinks> 
            <Switch>
                <Route path="/" exact={true} component={Abc} />
                <Route path="/:about" component={About} />
                
            </Switch>
            </DelegateMarkdownLinks>*/}
            {/* <Route path="/" component={App}>
                <Route path="about" component={About} />
                <Route path="abc" component={Abc} />
            </Route> */}
            <ul>
                <li>
                    <Link to="/abc">abc</Link>
                </li>
                <li>
                    <Link to="/about">About1</Link>
                </li>
            </ul>
            <Switch>
                <Route exact path="/about">
                    <About />
                </Route>
                {/* <Route key="abc" path="abc" render={props => <AsyncPage component="../abc" app={Abc} {...props} />} /> */}
                {/* <Route exact path="/abc">
                    <Search />
                </Route> */}
                <Route exact path="/abc" component={Search} />
            </Switch>
        </Router>
    );
}

// <Route path="/:about" component={AsyncComponent(() => import(/* webpackChunkName: "about" */ "../about/index"))} />