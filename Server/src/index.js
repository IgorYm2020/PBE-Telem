const url = "http://rpi:8080/"
var xd;
function auth() {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const response = fetch(url + "auth?name=" + name + "&password=" + password, { method: 'GET' })
        .then(response => { xd = response; if (response.ok) { return response.text() } else { document.getElementById("Error").innerHTML = "Authentication failed"; return null } })
        .then(string => { if (string === null) { return } xd = string; document.getElementById("mainContent").innerHTML = (new DOMParser()).parseFromString(string, "text/html").activeElement.innerHTML })
        .catch(errorMsg => { console.log("FAIL"); console.log(errorMsg); });
}
// THIS SHOULD BE ON ANOTHER DOUMENT (table.js)
function logout() {
    location.reload()
}
function printRow(row, header) {
    let text = "";
    let mod = header ? "th" : "td";
    text += "<tr>";
    row.forEach((value) => text += "<" + mod + ">" + value + "</" + mod + ">");
    text += "</tr>";
    return text;

}
function printTable(table, contents) {
    let text = "<caption>" + table + "</caption>";
    if (contents.length == 0) {
        return;
    }
    text += '<thead>' + printRow(Object.keys(contents[0]), true) + "</thead>";
    text += "<tbody>"
    contents.forEach((content) => text += printRow(Object.values(content), false));
    text += "</tbody>"
    return text;
}

async function doRequest(url) {
    console.debug(url)
    const data = fetch(url, { method: 'GET' })
        .then(response => { console.log(response); if (response.ok) { return response.text() } else { document.getElementById("Error").innerHTML = "Authentication failed"; return null } })
        .then(data => { console.log(data); return JSON.parse(data) })
        .catch(errorMsg => { console.log("FAIL"); console.log(errorMsg); });
    console.log(data);
    return data;
}

async function getData() {
    const query = document.getElementById("queryInput").value;
    const { table, contents } = await doRequest(url + query);
    document.getElementById("table").innerHTML = printTable(table, contents);
}