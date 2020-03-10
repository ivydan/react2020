import _ from 'lodash';
import printMe from './print';
import '../core/index.css';

function component(params) {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    element.innerHTML = _.join(['Hello', 'webpack', 'ABC']);

    btn.innerHTML = "Click me and check the console";
    btn.onclick = printMe;

    element.appendChild(btn);

    return element
}

document.body.appendChild(component());