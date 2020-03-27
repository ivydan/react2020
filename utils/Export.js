
import XLSX from 'xlsx';
import FileSaver from "file-saver";

const exportXlsx = (col, data) => {
    let formatData = formatXlsxData(col, data);
    let sheetData = XLSX.utils.aoa_to_sheet(formatData);
    let excelOpts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    let excelConfig = {
        SheetNames: ['sheet1'],
        Sheets: {
            sheet1: sheetData
        }
    };
    var excelOut = XLSX.write(excelConfig, excelOpts);
    var blob = new Blob([s2ab(excelOut)], { type: "application/octet-stream" });
    FileSaver.saveAs(blob, 'downlad.xlsx');
}

// 字符串转ArrayBuffer
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i)
        view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

// 格式化Excel能有使用的数据格式 -- 二维数组
function formatXlsxData(col, data) {
    let getData = [];
    let xlsxTitle = [];
    col.map(item => {
        xlsxTitle.push(item.title);
    });
    getData.push(xlsxTitle);
    data.map(item => {
        let colData = []
        col.map(n => {
            colData.push(item[n.dataIndex]);
        });
        getData.push(colData);
    })
    return getData;
}

export default {
    exportXlsx
}