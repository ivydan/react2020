import React, { Component } from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
        console.log('super', props);
    }

    componentDidMount(){
        console.log("ABC", this.props);
    }

    render() {
        
        return <div>
            Hello React
            <div>
                abc
            </div>
        </div>
    }
}