
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './home';
import AsyncComponent from "./asyncComponent";

const RouteContext = require.context('./', true, /\.bundle\.(js|jsx)$/, 'lazy');
//遍历有效组件路径值
const RouteKeys = RouteContext.keys();
console.log(RouteKeys);


const RoutePage = RouteKeys.map((item) => {
    let nameArr = item.split('/');
    let name = nameArr[nameArr.length - 1];
    let path = name.split('.')[0];
    console.log(nameArr, name, path);
    return <Route key={`ROUTE${path}`} path={`/${path}`} component={AsyncComponent(() => import(/* webpackChunkName: "about" */ `${item}`))} />;
});

const NEEDROUTE = function (params) {
    //     let a = [];
    //     const RoutePage = [] 

    return [
        <Route path="/about" key="about" component={AsyncComponent(() => import(/* webpackChunkName: "about" */ "./about/about.bundle.js"))} />,
        <Route path="/abc" key="abc" component={AsyncComponent(() => import(/* webpackChunkName: "abc" */ "./abc/abc.bundle.js"))} />
    ];

    //     console.log(
    //         r,
    //         a,
    //         RoutePage
    //     );
    //     return r
}

// const routes = [
//     {
//         path: "/about",
//         main: AsyncComponent(() => import(/* webpackChunkName: "about" */ "./about/about.bundle.js"))
//     },
//     {
//         path: "/abc",
//         main: AsyncComponent(() => import(/* webpackChunkName: "abc" */ "./abc/abc.bundle.js"))
//     }
// ];

const PrimaryLayout = () => (
    <div className="primary-layout">
        <ul>
            <li>
                <Link to="/abc">abc</Link>

            </li>
            <li>
                <Link to="/about">about</Link>
            </li>
        </ul>
        <Switch>
            {/* 主页面 */}
            <Route path="/" exact component={Home} />
            {/* 功能页面 */}

            {/* {NEEDROUTE()} */}

            {/* {routes.map((route, index) => (
                // You can render a <Route> in as many places
                // as you want in your app. It will render along
                // with any other <Route>s that also match the URL.
                // So, a sidebar or breadcrumbs or anything else
                // that requires you to render multiple things
                // in multiple places at the same URL is nothing
                // more than multiple <Route>s.
                <Route
                    key={index}
                    path={route.path}
                    component={route.main}
                />
            ))} */}

            {RoutePage}

        </Switch>
    </div>
)
const Index = () => (
    <Router>
        <PrimaryLayout />
    </Router>
);

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);

//<Route path="/abc" component={AsyncComponent(() => import(/* webpackChunkName: "abc" */ "./abc/abc.bundle.js"))} />
// <Route path="/about" component={AsyncComponent(() => import(/* webpackChunkName: "about" */ "./about/about.bundle.js"))} />