// make connection
let XMLHttpRequestObject = false;
if (window.XMLHttpRequest) {
    XMLHttpRequestObject = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHttp");
}

// set text
const getText = () => {
    if (XMLHttpRequestObject) {
        const obj = document.querySelector(`#resp-div`);
        XMLHttpRequestObject.open("GET", "text.html");
        XMLHttpRequestObject.onreadystatechange = () => {
            if (XMLHttpRequestObject.readyState === 1) {
                obj.innerHTML = "Loading";
            }
            if (XMLHttpRequestObject.readyState === 4) {
                if (XMLHttpRequestObject.status === 200) {
                    console.log(XMLHttpRequestObject.responseText);
                    obj.innerHTML = XMLHttpRequestObject.responseText;
                } else {
                    obj.innerHTML = XMLHttpRequestObject.statusText;
                }
            }
        };
        XMLHttpRequestObject.send(null);
    }
};

// set input
function loadFakultas() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const myObj = JSON.parse(this.responseText);
        let html = "<option>Pilih Fakultas</option>";
        let idx = 0;
        for (let x of Object.keys(myObj)) {
            html += "<option";
            html += ` value='${idx}'>`;
            html += x;
            html += "</option>";
            idx += 1;
        }
        document.getElementById("fakultas").innerHTML = html;
    };
    xhttp.open("GET", "data.json", true);
    xhttp.send();
}
function loadJurusan(idx) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const myObj = JSON.parse(this.responseText);
        let html = "<option>Pilih Jurusan</option>";
        for (let x of Object.values(myObj)[idx]) {
            html += "<option>";
            html += x;
            html += "</option>";
        }
        document.getElementById("jurusan").innerHTML = html;
    };
    xhttp.open("GET", "data.json", true);
    xhttp.send();
}

const reqBtn = document.querySelector("#req-btn");
reqBtn.addEventListener("click", getText());
