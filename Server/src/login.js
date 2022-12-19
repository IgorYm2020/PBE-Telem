const url = "http://localhost:3000/"
function auth() {
    const name = document.getElementById("name");
    const password = document.getElementById("password");
    fetch(url + "/auth?name=" + name + "&password=" + password, { method: 'GET' })
        .then(string => { return string.text() })
        // .then( string =>{document.getElementById("mainContent").innerHTML=(new DOMParser()).parseFromString(string,"text/html").activeElement.innerHTML})
        .then(string => { document.getElementById("mainContent").innerHTML = "Hola" })
        .catch(errorMsg => { console.log(errorMsg); });
}