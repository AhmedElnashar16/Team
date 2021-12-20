var names = document.getElementById('UserName');
var pw = document.getElementById('PassWord');
var eaddress = document.getElementById('EmailAddress');
var birthd = document.getElementById('fbirthday');


var user_records = new Array();


function store() {
    localStorage.setItem(eaddress.value.toString().toLowerCase(), JSON.stringify({
        "name": names.value,
        "pw": pw.value,
        "eaddress": eaddress.value,
        "slug": '@' + eaddress.value
    }));

    // start edit
    // create tweets records
    localStorage.setItem( '@' + eaddress.value.toString().toLowerCase(), JSON.stringify([
    ]));
    // end edit 
}

function check(event) {
    var pw1 = document.getElementById('password');
    var eaddress1 = document.getElementById('emailaddress');
    var getdata = localStorage.getItem(eaddress1.value.toString().toLowerCase())

    if (getdata !== null) {
        getdata = JSON.parse(getdata)
        console.log(getdata)
        if (getdata.pw.toString() === pw1.value.toString()) {
            console.log(pw1.value.toString())
            alert("Correct data")
        } else {
            document.getElementById("validemail").innerText = "Password or E-mail is not correct"
            event.preventDefault()
        }
    } else {
        document.getElementById("validemail").innerText = "Password or E-mail is not correct"
        event.preventDefault()
    }
}