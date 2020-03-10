// 动态导入lodash 分离chunk

function component(params) {

    return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
        var element = document.createElement('div');
        element.innerHTML = _.join(['Hello', 'lodash'], ' ');
        
        return element;

    }).catch(error =>  'An error occurred while laoding the component'); 
}


component().then(comp => {
    document.body.appendChild(comp);
});