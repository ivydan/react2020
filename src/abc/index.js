import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div>
            Hello React
            <div>
                ABC
                <Link to="/about">About</Link>
            </div>
        </div>
    }
}

export default withRouter(Main);