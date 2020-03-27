//来源： https://blog.csdn.net/qq_35362655/article/details/103403149

function exportTableById(tableId, exportFileName) {
    var tableArray = new Array();
    tableArray = createDataByTableId(tableId);
    //将一个二维数组转成sheet
    var sheet = XLSX.utils.aoa_to_sheet(tableArray);
    openDownloadDialog(sheet2blob(sheet), exportFileName + '.xlsx');
}

function createDataByTableId(tableId) {
    //表格数据
    var table = PageHelper.getTable(tableId);
    //id数组
    var idArray = new Array();
    idArray = table.getColumnIds();
    //行数
    var rowNum = table.getNumRows();
    //列数
    var colNum = idArray.length;
    //返回的数据
    var tableArray = new Array();
    for (var m = 0; m < rowNum + 1; m++) {
        tableArray[m] = new Array();
    }
    //表头
    for (var i = 0; i < colNum; i++) {
        tableArray[0][i] = document.getElementById(tableId + '$' + idArray[i]).innerHTML;
    }
    //遍历id
    for (var i = 0; i < colNum; i++) {
        //第i列的数据
        var colId = document.getElementsByName(idArray[i]);
        //遍历行
        for (var j = 1; j <= rowNum; j++) {
            //放入数组的第j行i列
            tableArray[j][i] = colId[j - 1].value;
        }
    }
    return tableArray;
}

function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}

function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url);
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || '';
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}