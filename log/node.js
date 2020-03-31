let http = require("http");
let fs = require("fs");
let url = require("url");
let path = require("path");
http.createServer(function(req, res) {
    let obj = url.parse(req.url);
    let paths = obj.pathname;
    // console.log(paths);
    fs.readFile("../dist" + paths, function(err, data) {
        if (paths != "/favicon.ico") {
            console.log(paths);
            let extname = path.extname(paths);
            let type = memu(extname);
            if (err) {
                throw err;
            }
            res.writeHead(200, {"Content-Type": type+";charset=utf-8"});
            res.end(data);
        }
    })

}).listen(9009);
function memu(exname){
    switch(exname){
        case ".html":
            return "text/html";
            break;
        case ".css":
            return "text/css";
            break;
        case ".jpg":
            return "image/jpg";
            break;
        case ".png":
            return "image/png";
            break;
        case ".js":
            return "text/javascript";
            break;
        case ".json":
            return "text/json";
            break;
        case ".jpeg":
            return "image/jpeg";
            break;
        case ".gif":
            return "image/gif";
            break;
        case ".rtf":
            return "application/rtf ";
            break;
        default:
            return "text/plain";
    }
}