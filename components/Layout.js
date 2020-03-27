import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import _ from 'lodash';
import 'antd/dist/antd.css';
import '../core/less/layout.less';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cacheLocations: { '/': {} },
        }
    }

    componentWillMount() {
        let { location } = this.props;
        this._setCacheRouteHistory(location);
    }

    componentWillReceiveProps(nextProps) {
        let { location } = nextProps;
        this._setCacheRouteHistory(location);
    }

    _setCacheRouteHistory(location) {
        let { cacheLocations } = this.state;
        cacheLocations[location.pathname] = location;
    }

    _renderTabsTitle() {
        let { cacheLocations } = this.state;
        let titles = Object.keys(cacheLocations);
        return titles.map(item => {
            if (item === '/')
                return <span key={`titles-home`} className="tabs-home tabs-l">
                    <Link to={item}>home</Link>
                </span>
            return <span key={`titles${item}`} className="tabs-name tabs-l">
                <Link to={item}>
                    {item.replace(/\//, "")}
                </Link>
                <span className="close" onClick={this._closeTabs.bind(this, item)}>×</span>
            </span>
        })
    }

    _closeTabs(pathname) {
        let { cacheLocations } = this.state;
        let { history, onCloseChange } = this.props;
        let titles = Object.keys(cacheLocations);
        let index = titles.indexOf(pathname);
        // 配置关闭后的新序号
        let newIndex = index < titles.length - 1 ? index + 1 : index - 1;
        // 转到关闭后的新路由上
        history.push(titles[newIndex]);
        // 删除当前tab页
        delete cacheLocations[pathname];
        // 删除缓存
        onCloseChange && onCloseChange(pathname);
        this.setState({ cacheLocations });
    }

    render() {
        let { children } = this.props;
        return <div className="layout-container">
            <div className="sidebar">
                <div className="logo">
                    LOGO
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/abc">Abc</Link></li>
                    <li><Link to="/log">Log</Link></li>
                    <li><Link to="/age">Age</Link></li>
                    <li><Link to="/name">Name</Link></li>
                    <li><Link to="/download">DownLoad</Link></li>
                </ul>
            </div>
            <div className="content">
                <div className="head">
                    login
                </div>
                <div className="tabs-title">
                    {this._renderTabsTitle()}
                </div>
                <div className="section">

                    <div className="section-body">

                        <div className="section-content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Layout);