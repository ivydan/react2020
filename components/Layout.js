import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import _ from 'lodash';
import '../core/less/layout.less';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageList: [],
            currentPage: ''
        }
    }

    componentWillMount() {
        let { children, location } = this.props;
        // this._cacheRouteHistory(location.pathname, children);
    }

    componentWillReceiveProps(nextProps) {
        let { children, location } = nextProps;
        // this._cacheRouteHistory(location.pathname, children);
        this._chaheRoute(location);
    }

    _chaheRoute(location) {
        let { pageList } = this.state;
        pageList.push(location)
        // this.setState({
        //     pageList
        // })
    }

    _cacheRouteHistory(pathname, page) {
        // let newPageList = _.cloneDeep(this.state.pageList);
        // if (!page)
        //     return;
        // if (this._isHaveNotPathName(newPageList, pathname)) {
        //     newPageList.push(page);
        //     this.setState({
        //         pageList: newPageList,
        //         currentPage: pathname
        //     })
        // }
    }

    _isHaveNotPathName(list, name) {
        let isTrue = true;
        list && list.map(item => {
            if (item.props.location.pathname === name) {
                isTrue = false;
            }
        });
        return isTrue;
    }

    render() {
        let { children } = this.props;
        let { pageList } = this.state;
        console.log(this.state, this.props);
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
                </ul>
            </div>
            <div className="content">
                <div className="head">
                    login
                </div>
                <div className="section">
                    <div>
                        {pageList.map(v => {
                            return <span onClick={() => {
                                this.props.history.replace(v)
                            }}>{v.pathname}&nbsp;</span>
                        })}
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Layout);