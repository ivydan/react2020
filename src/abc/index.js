import React, { Component } from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        return <div>
            Hello React
            <div>
                Font Creator
            </div>
            <div>
                <div className="webfont">
                    <span className="webfont-e002"></span>
                    <span className="webfont-e003"></span>
                    <span className="webfont-e004"></span>
                </div>
            </div>
        </div>
    }
}