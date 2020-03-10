# react2020

index1:script标签之前存在隐式依赖关系，index.js文件执行前还依赖lodash
问题：1. 无法体现脚本的执行需要依赖外部扩展库 2. 依赖不存在或者引入顺序错误将无法执行 3. 引入依赖但不适用。浏览器下载无用代码。

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件。也就是说，以上列出的那些 JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容

