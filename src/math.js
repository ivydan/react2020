import _ from 'lodash';
console.log(
    _.join(['Another', 'module', 'loaded!'], ' ')
);
export function square(x) {
    return x * x;
}

export function cube(x) {
    return x * x * x;
}