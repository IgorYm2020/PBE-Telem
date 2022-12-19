const parser = require('./parser');
const db = require('./mongo');
const http = require('http');
const webRender = require('./webRender');

webRender.start();

async function processRequest(url) {
    var code;
    var type;
    var content;
    switch (url.split("?")[0]) {
        case "/":
            code = 403;
            type = 5;
            console.log(type);
            type = "text/html"
            content = "Forbidden"
            break;
        case "/timetables":
        case "/tasks":
        case "/marks":
            code = 200;
            type = "text/html";
            const map = parser.parseUrl(url);
            console.log(map)
            const table = parser.getTableName(url);

            // Check if the db has the selected table
            content = JSON.stringify({
                "table": table,
                "contents": await db.getFromDB(table, map)
            });
            break;
        case "/index.html":
            code = 301;
            type = "text/html";
            content = "http://rpi:8080/login";
            break;
        case "/login":
            code = 200;
            type = 5
            type = "text/html";
            content = webRender.basicPage
            break;
        case "/index.js":
            code = 200;
            type = "text/javascript";
            content = webRender.basicScript;
            break;
        case "/auth":
            const query = parser.parseUrl(url);
            if (!(query.size == 2 && query.has("name") && query.has("password"))) {
                code = 403;
                type = "text/html";
                content = "Authentication failed, wrong arguments";
                break;
            }
            const found = await db.auth(query);
            code = found ? 200 : 403;
            type = "text/html";
            content = found ? webRender.tablePage : "Forbidden";
            break;
        default:
            code = 404;
            type = "text/html";
            content = "Not found";
            break;
    }
    return { code, type, content };
}

http.createServer(async function (req, res) {
    const { code, type, content } = await processRequest(req.url);
    if (code == 301) {
        res.writeHead(code, type, { location: content });
        res.end();
        return;
    }
    res.writeHead(code, type);
    res.write(content, "utf-8");
    res.end();
}).listen(8080); 