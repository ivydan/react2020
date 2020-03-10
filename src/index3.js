import { cube } from './math';
import _ from 'lodash';
console.log(
    _.join(['Another', 'module', 'loaded!'], ' ')
);
function component(params) {
    var element = document.createElement('pre');

    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
}

document.body.appendChild(component());