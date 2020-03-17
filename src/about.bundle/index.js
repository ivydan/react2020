import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class About extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div>
            Hello React

            <div>
                About Page
            </div>
        </div>
    }
}

export default withRouter(About);